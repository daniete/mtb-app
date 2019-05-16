import {Injectable} from '@angular/core';
import {GeoJSON, GPX, IGC, KML, TopoJSON} from 'ol/format';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {DragAndDrop} from 'ol/interaction.js';
import {Vector as VectorSource} from 'ol/source.js';
import VectorLayer from 'ol/layer/Vector';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;
  mapResolution: number;

  constructor() {
  }

  setMap(map) {
    this.map = map;
    this.mapResolution = map.getView().getResolution();
    this.addDragAndDrop();
  }

  getMap() {
    return this.map;
  }

  addVectorLayer(layer) {
    this.getMap().addLayer(layer);
  }

  removeLayer(layer) {
    this.getMap().removeLayer(layer);
  }

  getStyle() {
    return {
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
  }

  addDragAndDrop() {
    let scope = this;
    let dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [
        GPX,
        GeoJSON,
        IGC,
        KML,
        TopoJSON
      ]
    });

    dragAndDropInteraction.on('addfeatures', function (event) {
      var vectorSource = new VectorSource({
        features: event.features,
        format: new GPX()
      });
      scope.map.addLayer(new VectorLayer({
        renderMode: 'image',
        source: vectorSource,
        style: function (feature) {
          return scope.getStyle()[feature.getGeometry().getType()];
        }
      }));
      scope.map.getView().fit(vectorSource.getExtent());
    });

    this.map.addInteraction(dragAndDropInteraction);
  }

}
