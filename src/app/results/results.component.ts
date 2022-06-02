import { Results } from './../models/results';
import { Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

let endSound: HTMLAudioElement
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() results: Results
  @Output() backEvent = new EventEmitter()
  show: boolean = false
  constructor() {
    endSound ??= new Audio(`${environment.server_base}/assets/end.wav${environment.server_base_raw}`)
  }

  ngOnInit(): void {
    endSound.play()
    endSound.volume = 0.5
  }
  sendBackEvent() {
    this.backEvent.emit()
    this.show = false
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['results']) this.show = true
  }
}
