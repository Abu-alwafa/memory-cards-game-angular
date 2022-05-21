import { SettingsService } from './../services/settings.service';
import { Settings } from '../models/settings';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  settings: Settings
  constructor(private router: Router, private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.settings = this.settingsService.settings
  }
  onSubmit() {
    this.router.navigate(['game']);
  }
}
