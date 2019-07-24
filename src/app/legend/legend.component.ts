import { Component, OnInit } from '@angular/core';
import {MapService} from '../service/map.service';
import {RideService} from '../service/ride.service';

@Component({
  selector: 'legende',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  gpxFiles = this.rideService.ride;

  constructor(
    public mapService: MapService,
    private rideService: RideService
  ) {

  }

  ngOnInit() {
    this.rideService.ride.subscribe(gpxFiles => this.gpxFiles = gpxFiles)
  }

  setRide(ride) {
    this.rideService.setRide(ride);
  }

}
