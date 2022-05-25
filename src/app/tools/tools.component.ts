import { SettingsService } from './../services/settings.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
let hintAbleTime: number
let hintTimeOut: any
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit, OnChanges {
  @Input() rePlay: boolean;
  @Input() reHint: boolean;
  @Output() playAgain: EventEmitter<boolean> = new EventEmitter()
  @Output() hintEvent: EventEmitter<boolean> = new EventEmitter()
  constructor(private router: Router, private settingService: SettingsService) {
    hintAbleTime = Number(this.settingService.settings.cards_count) * 2 * 300
  }

  hintCount: number = 0;
  isUsingHintBtn: boolean = this.settingService.settings.using_hint_button
  ngOnInit(): void {

  }
  playAgainFunc() {
    this.playAgain.emit(!this.rePlay);
    this.hintCount = 0
    clearTimeout(hintTimeOut)
  }
  hintFunc() {
    if (this.hintCount > 0) {
      this.hintEvent.emit(!this.reHint)
      this.hintCount--
    }
  }
  homeFunc() {
    this.router.navigate(['home'])
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rePlay']) {
      hintTimeOut = setTimeout(() => this.hintCount = 3, hintAbleTime)
    }
  }
}
