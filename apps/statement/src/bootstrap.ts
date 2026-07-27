import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntry } from './remote-entry/entry.component';

bootstrapApplication(RemoteEntry, appConfig).catch((err) => console.error(err));
