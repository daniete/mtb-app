import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './map/map.component';
import {TeamComponent} from './team/team.component';
import {HomeComponent} from './home/home.component';
import {WeatherComponent} from './weather/weather.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'map', component: MapComponent},
  {path: 'team', component: TeamComponent},
  {path: 'weather', component: WeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
