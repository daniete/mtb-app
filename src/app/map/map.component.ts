import {Component, OnDestroy, OnInit} from '@angular/core';

import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Icon from 'ol/style/Icon.js';
import {fromLonLat} from 'ol/proj.js';
import {defaults as defaultControls, FullScreen, ScaleLine} from 'ol/control.js';
import {Style} from 'ol/style.js';

import Geocoder from 'ol-geocoder';
import {MapService} from '../service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss',
  ]
})

export class MapComponent implements OnInit, OnDestroy {

  map: Map;
  layer: OlTileLayer;

  constructor(
    private mapService: MapService
  ) {

  }
  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    const scope = this;
    this.layer = new OlTileLayer({
      source: new OlXYZ({
        url: 'http://tile.osm.org/{z}/{x}/{y}.png'
      })
    });

    const map = new Map({
      layers: [this.layer],
      target: 'map',
      view: new View({
        center: fromLonLat([4.34878, 50.85045]),
        zoom: 8
      }),
      controls: defaultControls().extend([
        new FullScreen({
          tipLabel: 'Volledig scherm'
        }),
        new ScaleLine({
          className: 'ol-scale-line',
          target: document.getElementById('scale-line')
        }),
        new Geocoder('nominatim', {
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
        })
      ]),
    });

    const view = map.getView();
    view.on('change:resolution', function() {
      scope.mapService.mapResolution = view.getResolution();
    }, this);
    this.mapService.setMap(map);
  }

  ngOnDestroy(): void {
    document.getElementById('scale-line').innerHTML = '';
  }

}
