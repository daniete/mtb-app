import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'legende',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  constructor() { }

  legendModus: boolean = true;

  ngOnInit() {
  }

  toggleModus(modus) {
    this.legendModus = modus;
  }

}
