import { Results } from './../models/results';
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

let endSound: HTMLAudioElement
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() results: Results
  @Output() backEvent = new EventEmitter()

  constructor() {
    endSound ??= new Audio(`${environment.server_base}/assets/end.wav${environment.server_base_raw}`)
  }

  ngOnInit(): void {
    endSound.play()
    endSound.volume = 0.5
  }
  sendBackEvent() {
    this.backEvent.emit()
  }

}
