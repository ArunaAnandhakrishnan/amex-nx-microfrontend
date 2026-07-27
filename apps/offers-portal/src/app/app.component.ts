import { Component, OnInit, Inject } from "@angular/core";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";

import {
  AmexTopNavBarComponent,
  AmexTabBarComponent,
  AmexTabItem,
  AmexSidebarMenuComponent,
  AmexLogoutConfirmationComponent,
} from "@ui-components/ui";
import { LOGIN_APP_URL } from "@amex/shared-services";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexLogoutConfirmationComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  showLogout = false;
  activeTab = "offers";
  tabs: AmexTabItem[] = [
    { id: "account", label: "Online Account Services" },
    { id: "supp", label: "Supplementary Access Helper" },
    { id: "offers", label: "Offers" },
    { id: "benefits", label: "Benefits" },
  ];

  constructor(
    private router: Router,
    @Inject(LOGIN_APP_URL) private loginAppUrl: string,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.activeTab = url.includes("/benefits") ? "benefits" : "offers";
      });
  }

  onTabClick(id: string): void {
    this.activeTab = id;

    switch (id) {
      case "offers":
        this.router.navigate(["/offers"]);
        break;

      case "benefits":
        this.router.navigate(["/offers/benefits"]);
        break;
    }
  }

  onLogout(): void {
    this.showLogout = false;
    // TODO: verify against @amex/shared-services — this should call the
    // shared logout endpoint (e.g. AuthApiService.logout()) to clear the
    // HttpOnly session cookie server-side before redirecting. Redirecting
    // alone does not invalidate the cookie.
    window.location.href = this.loginAppUrl;
  }
}
