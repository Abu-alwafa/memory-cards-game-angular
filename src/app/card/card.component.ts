import { ActionsService } from './../services/actions.service';
import { Component, Input, OnInit, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SettingsService } from '../services/settings.service';

let lazyTime: number
let closingCardsTime: number;
let movingTimeOut: any
let closingTimeOut: any
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges, OnInit {
  @Input() card: any;
  @Input() opened: any;
  @Input() disabled: any;
  @Input() matched: any;

  @Output() oppenCard = new EventEmitter<boolean>()

  constructor(private settingService: SettingsService, private actions: ActionsService) {
    closingCardsTime = Number(this.settingService.settings.cards_count) * 2 * 350
    lazyTime = this.actions.lazyTime
  }

  isOpened: boolean;

  moveCard(card: any) {
    movingTimeOut = setTimeout(() => {
      card.loaded = true
    }, lazyTime);
    lazyTime += 150
  }
  handleClick() {
    if (!this.opened && !this.disabled) {
      this.opened = true
      this.oppenCard.emit(true)
    }
  }
  ngOnInit(): void {
    closingTimeOut ?? clearTimeout(closingTimeOut)
    movingTimeOut ?? clearTimeout(movingTimeOut)

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opened'] || changes['matched']) {
      this.isOpened = this.opened || this.matched
    }
    if (changes['card']) {
      this.moveCard(this.card)
      this.actions.isLoading = false

      closingTimeOut = setTimeout(() => {
        this.card.opened = false
      }, closingCardsTime);
    }
  }
}
