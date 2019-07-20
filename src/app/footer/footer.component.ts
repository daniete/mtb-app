import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  route;

  constructor(
    private router: Router
  ) {  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      // see also
      if(val instanceof NavigationEnd) {
        this.route = val.url;
      }
    });
  }

  onMap() {
    return this.route === '/map';
  }

}
