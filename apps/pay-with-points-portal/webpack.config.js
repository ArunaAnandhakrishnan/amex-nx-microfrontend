const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'payWithPointsPortal',
  exposes: {
    './Routes': './apps/pay-with-points-portal/src/remote-entry/entry.routes.ts',
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
  publicPath: 'http://localhost:4207/',
  scriptType: 'text/javascript',
};

module.exports = mfConfig;
