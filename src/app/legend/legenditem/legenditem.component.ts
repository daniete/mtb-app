import {Component, Input, OnInit} from '@angular/core';
import {gpxType} from '../../domain/GPX';
import VectorLayer from 'ol/layer/Vector';
import {Vector as VectorSource} from 'ol/source';
import {GPX} from 'ol/format';
import {MapService} from '../../service/map.service';

@Component({
  selector: 'legenditem',
  templateUrl: './legenditem.component.html',
  styleUrls: ['./legenditem.component.scss']
})
export class LegenditemComponent implements OnInit{

  layer;

  @Input() gpx: gpxType;

  constructor(
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    this.gpx.path = './assets/gpx/' + this.gpx.name + '.gpx'

    if (this.gpx.shown) {
      this.addLayer()
    }
  }

  addLayer() {
    let scope = this;
    this.layer = new VectorLayer({
      source: new VectorSource({
        url: this.gpx.path,
        format: new GPX()
      }),
      style: function (feature) {
        return scope.mapService.getStyle()[feature.getGeometry().getType()];
      }
    });
    this.mapService.addVectorLayer(this.layer);
  }

  toggleVisible() {
    let scope = this;
    if (!this.layer) {
      this.addLayer()
      this.toggleCheck();
    } else {
      this.mapService.removeLayer(this.layer);
      this.layer = null;
      this.toggleCheck();
    }
  }

  toggleCheck() {
    this.gpx.shown = !this.gpx.shown;
  }

}
