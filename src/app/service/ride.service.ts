import {Injectable} from '@angular/core';
import {GpxEnum} from '../domain/GPX';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  ride;

  allRides = GpxEnum;

  setRide(ride) {
    this.ride = this.allRides[ride];
  }

}
