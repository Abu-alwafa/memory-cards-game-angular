import { ActionsService } from './../services/actions.service';
import { environment } from 'src/environments/environment';

import { Results } from './../models/results';
import { Card } from '../models/card';
import { ApiServiceService } from './../services/api-service.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';


const OPEN_TIMEOUT = 500
let matchedSound: HTMLAudioElement
let failedSound: HTMLAudioElement
let startSound: HTMLAudioElement
@Component({
  selector: 'app-cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.scss']
})
export class CardsBoardComponent implements OnInit, OnChanges {

  @Input() rePlay: boolean;
  @Input() reHint: boolean;
  @Output() calcResults = new EventEmitter<Results>()
  @Output() loadingState = new EventEmitter<boolean>()
  // state: Map<string, Card>
  disabled = false
  cards: any[];
  choices: any[] = [];
  matchCount: number = 0
  hintUsingCount: number = 0
  result: Results
  total: number;
  success: number
  isloading: boolean = true


  constructor(private api: ApiServiceService, private actions: ActionsService) {
    (document.querySelector(':root') as any)?.style.setProperty('--card-bg', `url('${environment.server_base}/assets/background.png${environment.server_base_raw}') #27496d`)
    matchedSound ??= new Audio(`${environment.server_base}/assets/nice.wav${environment.server_base_raw}`)
    failedSound ??= new Audio(`${environment.server_base}/assets/negative_beeps-6008.mp3${environment.server_base_raw}`)
    failedSound.volume = 0.5
    // startSound ??= new Audio(`${environment.server_base}/assets/start.wav${environment.server_base_raw}`)
  }




  st: any // time out prop

  private _clearChoices(): void {
    this.choices = []
    this.disabled = false
  }

  handleOpen(card) {

    if (this.st) clearTimeout(this.st) // clearing first timeout after first choice

    if (this.choices.find(x => x.id == card.id)) return // skipping next code if choice 2 is exactly card choosen in last click

    this.choices.push(card)
    card.opened = true
    this.disabled = this.choices.length > 1 // make cards disabled after 2 choice choosen

    if (this.choices.length > 1) { // checking when 2 choice choosen

      this.st = setTimeout(() => {
        this._clearChoices() // clearing choices
        this.cards.forEach(c => c.opened = c.matched) // closing opened cards if no matching there 
      }, OPEN_TIMEOUT)

      // checking matching
      const isMatch = this.choices.every(item => item.url === card.url)
      if (isMatch) {
        this.choices.forEach(c => c.matched = true) // make choosen cards matched if there is matching
        this.success++
        this.total++
        this.matchCount++
        matchedSound?.play()
        if (this.matchCount === this.cards.length / 2) this.sendResults()
      } else {
        this.total++
        failedSound?.play()
      }
    }
  }
  handleHint() {
    let hintCard: Card
    const filteredCards = this.cards?.filter((card) => !card.matched)
    let randomIndex = Math.floor(Math.random() * filteredCards?.length)
    hintCard = filteredCards && filteredCards[randomIndex]
    this.cards?.filter(card => card.url === hintCard.url).forEach(c => c.matched = true)
    this.matchCount++
    this.hintUsingCount++
  }
  sendResults() {
    this.result = new Results(this.total, this.success, this.hintUsingCount)
    this.calcResults.emit(this.result)
  }
  sendLoadingState() {
    this.loadingState.emit(this.isloading)
  }
  async playAgain(): Promise<void> {
    this.cards = await this.api.getImages()
    if (this.cards.length) {
      this.cards.forEach(card => {
        card.opened = true
        card.loaded = false
      })
      this.isloading = false
    } else this.isloading = true


    this.rePlay = false;
    this.hintUsingCount = 0
    this.matchCount = 0
    this.total = 0
    this.success = 0
    this.sendLoadingState()
    this.actions.lazyTime = 200;
    startSound?.play()
  }
  ngOnInit() {
    // this.cards = await this.api.getImages()
    // this.cards = this.cards.map(card => ({ ...card, loaded: false, opened: true }))
    // this.isloading = false
    // this.sendLoadingState()
    this.playAgain();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rePlay']) this.playAgain();
    if (changes['reHint']) {
      this.handleHint();
    }
    if (changes['cards']) {

    }
  }
}
