import { Component, OnInit } from '@angular/core';

import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js';
import {fromLonLat} from 'ol/proj.js';
import {defaults as defaultControls, FullScreen, ScaleLine} from 'ol/control.js';

import Geocoder from 'ol-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss',
  ]
})

export class MapComponent implements OnInit {

  map: Map;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  geocoder: Geocoder;

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source});

    this.view = new View({
      center: fromLonLat([4.34878, 50.85045]),
      zoom: 8
    });

    this.map = new Map({
      layers: [this.layer],
      target: 'map',
      view: this.view,
      controls: defaultControls().extend([
        new FullScreen({
          tipLabel: 'Volledig scherm'
        }),
        new ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')})
      ]),
    });

    this.geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      lang: 'nl',
      placeholder: 'Zoek adres...',
      limit: 5,
      debug: false,
      autoComplete: true,
      keepOpen: true,
      featureStyle: new Style({
        image: new Icon({
          color: '#4271AE',
          crossOrigin: 'anonymous',
          src: 'http://openlayers.org/en/latest/examples/data/dot.png'
        })
      })
    });
    this.map.addControl(this.geocoder);

  }
}
