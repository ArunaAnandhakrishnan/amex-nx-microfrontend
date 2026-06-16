import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SharedUiModule – place components, directives, and pipes here
 * that are consumed by two or more micro-frontend applications.
 * Examples: header wrapper, sidebar, common table component, spinner.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
})
export class SharedUiModule {}
