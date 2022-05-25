import { ActionsService } from './services/actions.service';
import { SettingsService } from './services/settings.service';
import { ApiServiceService } from './services/api-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { CardsBoardComponent } from './cards-board/cards-board.component';
import { ToolsComponent } from './tools/tools.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CardsBoardComponent,
    ToolsComponent,
    CardComponent,
    HomeComponent,
    ResultsComponent
  ],
  imports: [

    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ApiServiceService, SettingsService, ActionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
