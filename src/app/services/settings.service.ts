import { Settings } from './../models/settings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings
  constructor() {
    this.settings = new Settings()
    this.settings.images_type = 'shape'
    this.settings.using_hint_button = true;
    this.settings.cards_count = '6';
  }

}
