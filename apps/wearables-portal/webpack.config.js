const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'wearablesPortal',
  exposes: {
    './Module': './apps/wearables-portal/src/app/remote-entry/entry.module.ts',
  },
  shared: {
    ...shareAll({
      singleton:       true,
      strictVersion:   false,
      requiredVersion: 'auto',
    }),
  },
});

mfConfig.output = {
  ...mfConfig.output,
  publicPath: 'http://localhost:4206/',
  scriptType: 'text/javascript',
};

module.exports = mfConfig;
