import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { EntryComponent } from './app/remote-entry/entry.component';

bootstrapApplication(EntryComponent, appConfig).catch((err) => console.error(err));
