
import { Results } from './../models/results';
import { Card } from '../models/card';
import { ApiServiceService } from './../services/api-service.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';


const OPEN_TIMEOUT = 1000
const startSound = new Audio('../../assets/start.wav')
const matchSound = new Audio('../../assets/good-6081.mp3')
const failSound = new Audio('../../assets/negative_beeps-6008.mp3')
@Component({
  selector: 'app-cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.scss']
})
export class CardsBoardComponent implements OnInit, OnChanges {

  @Input() rePlay: boolean;
  @Input() reHint: boolean;
  @Output() calcResults = new EventEmitter<Results>()
  // state: Map<string, Card>
  disabled = false
  cards: any[];
  choices: any[] = [];
  matchCount: number = 0
  hintUsingCount: number = 0
  result: Results
  total: number;
  success: number
  constructor(private api: ApiServiceService) {
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
        matchSound.play()
        if (this.matchCount === this.cards.length / 2) this.sendResults()
      } else {
        this.total++
        failSound.play()
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
  async playAgain(): Promise<void> {
    this.cards = await this.api.getImages()
    this.rePlay = false;
    this.hintUsingCount = 0
    this.matchCount = 0
    this.total = 0
    this.success = 0
    startSound.play()
  }
  async ngOnInit(): Promise<void> {
    this.cards = await this.api.getImages()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rePlay']) this.playAgain();
    if (changes['reHint']) {
      this.handleHint();

    }
  }
}
