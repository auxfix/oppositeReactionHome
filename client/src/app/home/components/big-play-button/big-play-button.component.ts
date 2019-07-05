import {Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-big-play-button',
  templateUrl: './big-play-button.component.html',
  styleUrls: ['./big-play-button.component.scss'],
  animations: [
    trigger('resetButtonAnim', [
      state('hold', style({
        transform: 'rotate(0deg)',
      })),
      state('rotate', style({
        transform: 'rotate(350deg)',
      })),
      transition('rotate => hold', [
        animate('0.4s')
      ]),
      transition('hold => rotate', [
        animate('0.4s')
      ]),
    ]),
  ]
})
export class BigPlayButtonComponent implements OnInit {

  constructor() { }

  get isPlay() {
    return this.isPlaying;
  }

  get isPause() {
    return !this.isPlaying;
  }

  public resetButtonAnimTrigger: string;

  public isPlaying = false;

  ngOnInit() {
    this.resetButtonAnimTrigger = 'hold';
  }

  rotateEnd() {
    this.resetButtonAnimTrigger = 'hold';
  }

  doReset() {
    this.isPlaying = false;
    this.resetButtonAnimTrigger = 'rotate';
  }

  changeState() {
    this.isPlaying = !this.isPlaying;
  }
}
