import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  isLoading: boolean = true
  lazyTime: number = 0
  musicMuted:boolean = false


  constructor() { 
    console.log(this.musicMuted);
  }
}
