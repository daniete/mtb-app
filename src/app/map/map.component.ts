import { Component, OnInit } from '@angular/core';

import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Icon from 'ol/style/Icon.js';
import {fromLonLat} from 'ol/proj.js';
import {GPX, GeoJSON, IGC, KML, TopoJSON} from 'ol/format.js';
import VectorLayer from 'ol/layer/Vector';
import { defaults as defaultInteractions, DragAndDrop} from 'ol/interaction.js';
import {defaults as defaultControls, FullScreen, ScaleLine} from 'ol/control.js';
import { Vector as VectorSource} from 'ol/source.js';

import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

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

    var dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [
        GPX,
        GeoJSON,
        IGC,
        KML,
        TopoJSON
      ]
    });

    var vector = new VectorLayer({
      source: new VectorSource({
        url: './assets/gpx/schoonderbuken-63km.gpx',
        format: new GPX()
      }),
      style: function(feature) {
        return style[feature.getGeometry().getType()];
      }
    });

    let map = new Map({
      interactions: defaultInteractions().extend([dragAndDropInteraction]),
      layers: [this.layer, vector],
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
    map.addControl(this.geocoder);

    var style = {
      'Point': new Style({
        image: new CircleStyle({
          fill: new Fill({
            color: 'rgba(255,255,0,0.4)'
          }),
          radius: 5,
          stroke: new Stroke({
            color: '#ff0',
            width: 1
          })
        })
      }),
      'LineString': new Style({
        stroke: new Stroke({
          color: '#f00',
          width: 3
        })
      }),
      'MultiLineString': new Style({
        stroke: new Stroke({
          color: '#f00',
          width: 3
        })
      })
    };

    dragAndDropInteraction.on('addfeatures', function(event) {
      var vectorSource = new VectorSource({
        features: event.features,
        format: new GPX()
      });
      map.addLayer(new VectorLayer({
        renderMode: 'image',
        source: vectorSource,
        style: function(feature) {
          return style[feature.getGeometry().getType()];
        }
      }));
      map.getView().fit(vectorSource.getExtent());
    });

    var displayFeatureInfo = function(pixel) {
      var features = [];
      map.forEachFeatureAtPixel(pixel, function(feature) {
        features.push(feature);
      });
      if (features.length > 0) {
        var info = [];
        var i, ii;
        for (i = 0, ii = features.length; i < ii; ++i) {
          info.push(features[i].get('name'));
        }
        //document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
      } else {
        //document.getElementById('info').innerHTML = '&nbsp;';
      }
    };

    map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      var pixel = map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });

    map.on('click', function(evt) {
      displayFeatureInfo(evt.pixel);
    });

  }

}
