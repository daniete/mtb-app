import {Injectable} from '@angular/core';
import {GeoJSON, GPX, IGC, KML, TopoJSON} from 'ol/format';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {DragAndDrop} from 'ol/interaction.js';
import {Vector as VectorSource} from 'ol/source.js';
import VectorLayer from 'ol/layer/Vector';
import {gpxType} from '../domain/GPX';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;
  mapResolution: number;
  dragAndDropLayers = [];

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

  createGPXlayer(gpxPath) {
    let scope = this;
    let layer = new VectorLayer({
      source: new VectorSource({
        url: gpxPath,
        format: new GPX()
      }),
      style: function (feature) {
        return scope.getStyle()[feature.getGeometry().getType()];
      }
    });
    return layer;
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
      let vectorSource = new VectorSource({
        features: event.features,
        format: new GPX()
      });
      let dragDropLayer = new VectorLayer({
        renderMode: 'image',
        source: vectorSource,
        style: function (feature) {
          return scope.getStyle()[feature.getGeometry().getType()];
        }
      });
      scope.map.addLayer(dragDropLayer);
      scope.map.getView().fit(vectorSource.getExtent());

      let newLayer = new gpxType(event.file.name, '', true, dragDropLayer, true);
      scope.dragAndDropLayers.push(newLayer);
    });

    this.map.addInteraction(dragAndDropInteraction);
  }

}
