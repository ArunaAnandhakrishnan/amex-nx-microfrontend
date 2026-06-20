import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  constructor(private router: Router) {}

  onSocRoc(): void {
    this.router.navigate(['masters/country-master']);
  }
}