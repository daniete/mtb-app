import {Injectable} from '@angular/core';
import {GpxEnum} from '../domain/GPX';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private rideSource = new BehaviorSubject(null);
  ride = this.rideSource.asObservable();

  allRides = GpxEnum;

  setRide(ride) {
    this.rideSource.next(this.allRides[ride]);
  }

}
