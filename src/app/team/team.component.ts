import { Component, OnInit } from '@angular/core';
import {TEAMCONFIG} from '../domain/team-config';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teamConfig = TEAMCONFIG;

  constructor() { }

  ngOnInit() {
  }

}
