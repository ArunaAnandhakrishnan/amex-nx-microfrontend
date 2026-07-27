import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'statement',
  exposes: {
    './Routes': 'apps/statement/src/remote-entry/entry.routes.ts',
  },
};
export default config;
