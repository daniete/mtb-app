import { Component, OnInit } from '@angular/core';
import {RideService} from '../service/ride.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private rideService: RideService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  setRide(ride) {
    this.rideService.setRide(ride);
    this.route.navigate(['/map'])
  }
}
