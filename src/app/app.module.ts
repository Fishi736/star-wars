import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterBrowserComponent } from './character-browser/character-browser.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { SwapiService } from './swapi.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterBrowserComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SwapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
