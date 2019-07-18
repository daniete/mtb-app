import { Component, OnInit } from '@angular/core';
import {gpxArray} from '../domain/GPX';
import {MapService} from '../service/map.service';

@Component({
  selector: 'legende',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  gpxFiles = gpxArray;

  constructor(
    public mapService: MapService
  ) {

  }

  ngOnInit() {
  }

}
