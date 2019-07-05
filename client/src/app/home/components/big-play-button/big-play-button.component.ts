import {Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TracksService} from 'api/tracks.service';

@Component({
  selector: 'app-big-play-button',
  templateUrl: './big-play-button.component.html',
  styleUrls: ['./big-play-button.component.scss'],
  providers: [TracksService],
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
export class BigPlayButtonComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private http: TracksService) { }

  get isPlay() {
    return this.isPlaying;
  }

  get isPause() {
    return !this.isPlaying;
  }

  public resetButtonAnimTrigger: string;

  public isPlaying = false;

  public track;

  public audio;

  public volume = 50;

  async ngOnInit() {
    this.resetButtonAnimTrigger = 'hold';
    this.audio = new Audio();
    this.track = await this.http.getFrontPageTrack().toPromise();
    this.audio.src = `http://localhost:3000/tracks/play/${this.track.songId}`;
    this.audio.load();
    this.audio.volume = 0.5;
  }

  ngAfterViewInit() {
    this.audio.onended = () => {
      this.audio.currentTime = 0;
      this.isPlaying = false;
    };
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio = null;
  }

  onChangeVolume(event) {
    this.audio.volume = event / 100;
    this.volume = event;
  }

  rotateEnd() {
    this.resetButtonAnimTrigger = 'hold';
  }

  doReset() {
    this.isPlaying = false;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.resetButtonAnimTrigger = 'rotate';
  }

  changeState() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }

    this.isPlaying = !this.isPlaying;
  }
}
