import { environment } from 'src/environments/environment';
import { SettingsService } from './../services/settings.service';
import { Settings } from '../models/settings';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

let homeMusic: HTMLAudioElement
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostListener('onload') onReload() {
    homeMusic.play()
    // homeMusic.currentTime = 0
  }
  settings: Settings
  server_base = environment.server_base
  server_base_raw = environment.server_base_raw

  imgs_types = ['shape', 'beach', 'technology', 'nature', 'abstract', 'art']
  cards_count = [
    { value: '4', text: '8 Card' },
    { value: '6', text: '12 Card' },
    { value: '8', text: '16 Card' },
    { value: '10', text: '20 Card' }
  ]
  constructor(private router: Router, private settingsService: SettingsService) {
    homeMusic ??= new Audio(`${environment.server_base}/assets/home.mp3${environment.server_base_raw}`)
  }

  ngOnInit(): void {
    homeMusic.play()
    homeMusic.loop = true
    this.settings = this.settingsService.settings
  }
  ngOnDestroy(): void {
    homeMusic.pause()
    homeMusic.currentTime = 0
  }
  onSubmit() {
    this.router.navigate(['game']);
  }
}
