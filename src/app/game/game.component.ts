import { Results } from './../models/results';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  rePlay: boolean
  reHint: boolean
  isLoading: boolean = true
  results: Results
  isBack: boolean;
  rDisplay: boolean = false
  constructor() { }
  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 2000)

  }
  handlePlayAgain(event: boolean): void {
    this.rePlay = event
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 2000)
  }
  hint(event: boolean): void {
    this.reHint = event
  }
  catchResults(event) {
    this.results = event
    if (this.results !== undefined) {
      this.rDisplay = true
    }

  }
  handleBack() {
    this.rDisplay = false
  }
}
