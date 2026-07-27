import { Component } from '@angular/core';
import { StatementPage } from '../app/pages/statement/statement.page';

@Component({
  selector: 'app-statement-entry',
  standalone: true,
  imports: [StatementPage],
  template: `<app-statement-page></app-statement-page>`,
})
export class RemoteEntry {}
