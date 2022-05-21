import { Router } from '@angular/router';
import { Results } from './../models/results';
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() results: Results
  @Output() backEvent = new EventEmitter()

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  sendBackEvent() {
    this.backEvent.emit()
  }

}
