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
    if (!this.gpx.shown) {
      this.mapService.addGpx(this.gpx);
    } else {
      this.mapService.removeLayer(this.gpx.layer);
    }
    this.toggleCheck();
  }

  toggleCheck() {
    this.gpx.shown = !this.gpx.shown;
  }

}
