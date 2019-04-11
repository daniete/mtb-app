import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import {defaults as defaultControls, OverviewMap, FullScreen, ScaleLine} from 'ol/control.js';

import { fromLonLat } from 'ol/proj';

import { Geocoder, xfdsf } from 'ol-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss',
    '../../assets/css/ol.css'
  ]
})

export class MapComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 3
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view,
      controls: defaultControls().extend([
        new FullScreen({
          tipLabel: 'Volledig scherm'
        }),
        new ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')})
      ]),
    });
  }
}
