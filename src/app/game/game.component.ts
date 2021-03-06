import { ApiServiceService } from './../services/api-service.service';
import { ActionsService } from './../services/actions.service';
import { Results } from './../models/results';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

let gameMusic: HTMLAudioElement
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  rePlay: boolean
  reHint: boolean
  isLoading: boolean = true
  results: Results
  isBack: boolean;
  rDisplay: boolean = false
  constructor(private actions: ActionsService, private api: ApiServiceService) {
    gameMusic ??= new Audio(`${environment.server_base}/assets/game.mp3${environment.server_base_raw}`)
    gameMusic.loop = true
    gameMusic.volume = 0.4
  }
  


  ngOnInit(): void {
    if(this.actions.musicMuted){
      gameMusic.pause()
      gameMusic.muted = true
    }else {
      gameMusic.play()
      gameMusic.muted = false
    }
  }
  
  catchLoadingState(event) {
    this.isLoading = event
  }
  handlePlayAgain(event: boolean): void {
    this.rePlay = event
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

  ngOnDestroy(): void {
    gameMusic.pause()
    gameMusic.currentTime = 0
  }
}
