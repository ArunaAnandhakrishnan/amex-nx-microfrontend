const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'wearablesPortal',
  exposes: {
    './Routes': './apps/wearables-portal/src/remote-entry/entry.routes.ts',
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

mfConfig.devServer = {
  port: 4206,
  allowedHosts: ['all'],
  headers: {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  },
};

module.exports = mfConfig;