const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, val] = arg.replace(/^--/, '').split('=');
  acc[key] = val === undefined ? true : val;
  return acc;
}, {});

const REGISTRY = args.registry || process.env.VERDACCIO_REGISTRY || 'http://localhost:4873';
const PROJECT = args.project || process.env.NX_PROJECT || 'ui';
const BUILD_TARGET = args.target || process.env.NX_BUILD_TARGET || 'build:production';
const DIST_DIR = path.resolve(process.cwd(), args.distDir || process.env.DIST_DIR || 'dist/ui-components');
const BUMP = args.bump || null; 
const UNPUBLISH_ONLY = !!args['unpublish-only'];
const DRY_RUN = !!args['dry-run'];
const SKIP_INSTALL = !!args['skip-install'];

function log(msg) {
  console.log(`\x1b[36m[publish-ui]\x1b[0m ${msg}`);
}
function warn(msg) {
  console.log(`\x1b[33m[publish-ui]\x1b[0m ${msg}`);
}
function err(msg) {
  console.error(`\x1b[31m[publish-ui]\x1b[0m ${msg}`);
}

function run(cmd, opts = {}) {
  log(`$ ${cmd}`);
  if (DRY_RUN) return '';
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', ...opts }).trim();
}

function runInherit(cmd, opts = {}) {
  log(`$ ${cmd}`);
  if (DRY_RUN) return;
  execSync(cmd, { stdio: 'inherit', ...opts });
}

function sleep(ms) {
  Atomics.wait(
    new Int32Array(new SharedArrayBuffer(4)),
    0,
    0,
    ms
  );
}

function readPkg(dir) {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`package.json not found at ${pkgPath}. Did the build run?`);
  }
  return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
}

function versionExistsOnRegistry(pkgName, version) {
  try {
    const out = run(`npm view ${pkgName}@${version} version --registry ${REGISTRY}`, { stdio: 'pipe' });
    return out === version;
  } catch (e) {
    return false;
  }
}

function packageExistsOnRegistry(pkgName) {
  try {
    run(`npm view ${pkgName} versions --registry ${REGISTRY}`, { stdio: 'pipe' });
    return true;
  } catch (e) {
    return false;
  }
}

function needsInstall() {
  const nodeModulesDir = path.resolve(process.cwd(), 'node_modules');
  const pkgLockPath = path.resolve(process.cwd(), 'package-lock.json');
  const pkgJsonPath = path.resolve(process.cwd(), 'package.json');

  if (!fs.existsSync(nodeModulesDir)) {
    log('node_modules not found — install needed.');
    return true;
  }

  const nodeModulesTime = fs.statSync(nodeModulesDir).mtimeMs;
const checkPath = fs.existsSync(pkgLockPath) ? pkgLockPath : pkgJsonPath;
  if (!fs.existsSync(checkPath)) {
    log('No package.json/package-lock.json found to compare — skipping install check, installing to be safe.');
    return true;
  }

  const depsTime = fs.statSync(checkPath).mtimeMs;

  if (depsTime > nodeModulesTime) {
    log(`${path.basename(checkPath)} is newer than node_modules — dependencies changed, install needed.`);
    return true;
  }

  log('node_modules is up to date with package.json/package-lock.json — skipping install.');
  return false;
}

function installDeps() {
  if (SKIP_INSTALL) {
    log('Skipping npm install (--skip-install passed).');
    return;
  }
  if (!needsInstall()) return;
  log('Running npm install at workspace root...');
  runInherit(`npm install`);
}
function build() {
  log(`Building project "${PROJECT}" (target: ${BUILD_TARGET})...`);
  runInherit(`npx nx run ${PROJECT}:${BUILD_TARGET}`);
}

function bumpVersion() {
  if (!BUMP) return;
  log(`Bumping version in ${DIST_DIR} (${BUMP})...`);
 runInherit(`npm version ${BUMP} --no-git-tag-version`, { cwd: DIST_DIR });
}

function unpublishIfExists(pkgName, version) {
  if (versionExistsOnRegistry(pkgName, version)) {
    warn(`${pkgName}@${version} already exists on ${REGISTRY} — unpublishing first.`);
    try {
      run(`npm unpublish ${pkgName}@${version} --force --registry ${REGISTRY}`);
    } catch (e) {
     warn(`Version-level unpublish failed, retrying full package unpublish...`);
      run(`npm unpublish ${pkgName} --force --registry ${REGISTRY}`);
    }
    if (!DRY_RUN) sleep(2000);
  } else {
    log(`${pkgName}@${version} is not on the registry yet — nothing to unpublish.`);
  }
}

function unpublishAll(pkgName) {
  if (packageExistsOnRegistry(pkgName)) {
    warn(`Removing all published versions of ${pkgName} from ${REGISTRY}...`);
    run(`npm unpublish ${pkgName} --force --registry ${REGISTRY}`);
  } else {
    log(`${pkgName} has nothing published on ${REGISTRY}.`);
  }
}

function publish() {
  log(`Publishing from ${DIST_DIR} to ${REGISTRY}...`);
  runInherit(`npm publish --registry ${REGISTRY}`, { cwd: DIST_DIR });
}

(function main() {
  log(`Registry: ${REGISTRY}`);

  if (UNPUBLISH_ONLY) {
    const pkg = readPkg(DIST_DIR) ? readPkg(DIST_DIR) : null;
    const pkgName = pkg ? pkg.name : readPkg(path.resolve(process.cwd(), 'libs/ui')).name;
    unpublishAll(pkgName);
    log('Done (unpublish-only).');
    return;
  }

  installDeps();
  build();
  bumpVersion();

  const pkg = readPkg(DIST_DIR);
  log(`Package: ${pkg.name}@${pkg.version}`);

  if (!BUMP) {
   unpublishIfExists(pkg.name, pkg.version);
  }

  publish();
  log(`✅ Published ${pkg.name}@${pkg.version} to ${REGISTRY}`);
  log(`Teammates can now run: npm install ${pkg.name}@${pkg.version} --registry ${REGISTRY}`);
})();