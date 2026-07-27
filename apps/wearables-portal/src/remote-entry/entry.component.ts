import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root outlet for the Wearables remote when mounted inside the Shell.
 * Standalone replacement for the previous WearablesEntryComponent
 * (was declared in WearablesRemoteEntryModule with `standalone: false`).
 */
@Component({
  selector: 'wearables-entry',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class WearablesEntryComponent {}
