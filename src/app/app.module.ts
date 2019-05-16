import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FooterComponent} from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { InfoComponent } from './info/info.component';
import { LegendComponent } from './legend/legend.component';
import { LegenditemComponent } from './legend/legenditem/legenditem.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MapComponent,
    InfoComponent,
    LegendComponent,
    LegenditemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
