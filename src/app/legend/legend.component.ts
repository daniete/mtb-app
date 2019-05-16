import { Component, OnInit } from '@angular/core';
import {gpxArray} from '../domain/GPX';

@Component({
  selector: 'legende',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  gpxFiles = gpxArray

  constructor() {

  }

  ngOnInit() {
  }

}
