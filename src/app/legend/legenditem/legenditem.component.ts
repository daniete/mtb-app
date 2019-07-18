import {Component, Input, OnInit} from '@angular/core';
import {gpxType} from '../../domain/GPX';
import {GPX} from 'ol/format';
import {MapService} from '../../service/map.service';

@Component({
  selector: 'legenditem',
  templateUrl: './legenditem.component.html',
  styleUrls: ['./legenditem.component.scss']
})
export class LegenditemComponent implements OnInit{

  @Input() gpx: gpxType;

  constructor(
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    this.gpx.path = './assets/gpx/' + this.gpx.name + '.gpx';

    if (!this.gpx.isDragDropLayer) {
      this.gpx.layer = this.mapService.createGPXlayer(this.gpx.path);
    }
    if (this.gpx.shown) {
      this.mapService.addVectorLayer(this.gpx.layer);
    }
  }

  toggleVisible() {
    let scope = this;
    if (!this.gpx.shown) {
      this.mapService.addVectorLayer(this.gpx.layer);
      console.log(this.gpx.layer.getSource().getExtent());
      if (!Number.isFinite(this.gpx.layer.getSource().getExtent()[0])) {
        this.gpx.layer.getSource().on('change', function() {
          let extent = scope.gpx.layer.getSource().getExtent();
          scope.mapService.getMap().getView().fit(extent, scope.mapService.getMap().getSize());
          scope.gpx.layer.getSource().removeEventListener('change')
        });
      } else {
        scope.mapService.getMap().getView().fit(this.gpx.layer.getSource().getExtent(), scope.mapService.getMap().getSize());
      }
      this.toggleCheck();
    } else {
      this.mapService.removeLayer(this.gpx.layer);
      this.toggleCheck();
    }
  }

  toggleCheck() {
    this.gpx.shown = !this.gpx.shown;
  }

}
