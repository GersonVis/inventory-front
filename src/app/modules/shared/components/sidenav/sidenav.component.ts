import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  menuNav = [{ name: "Home", route: "home", icon: "home" },
  { name: "Categories", route: "category", icon: "category" },
  { name: "Productos", route: "products", icon: "production_quantity_limits" }]

  mobileQuery: MediaQueryList;
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
