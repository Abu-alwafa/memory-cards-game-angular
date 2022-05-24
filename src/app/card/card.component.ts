import { environment } from 'src/environments/environment';
import { Component, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';


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
  constructor() {
  }

  isOpened = false
  hintCards = []
  handleClick() {
    if (!this.opened && !this.disabled) {
      this.opened = true
      this.oppenCard.emit(true)
    }
  }
  ngOnInit(): void {
    this.isOpened = true
    setTimeout(() => this.isOpened = false, 4000)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opened'] || changes['matched']) {
      this.isOpened = this.opened || this.matched
    }
  }
}
