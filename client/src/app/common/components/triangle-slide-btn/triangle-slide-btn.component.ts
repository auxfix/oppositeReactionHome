import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'or-triangle-slide-btn',
  templateUrl: './triangle-slide-btn.component.html',
  styleUrls: ['./triangle-slide-btn.component.scss'],
  animations: [
    trigger('slideButtonAnim', [
      state('down', style({
        width: '2.4rem',
        height: '2.4rem',
        top: '0.6rem',
        left: '0.29rem',
        paddingTop: '0.7rem',
        fontSize: '1.6rem',
      })),
      state('up', style({
        width: '3rem',
        height: '3rem',
        top: 0,
        left: 0,
        paddingTop: '1.7rem',
        fontSize: '2rem',
      })),
      transition('down => up', [
        animate('0.2s')
      ]),
      transition('up => down', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class TriangleSlideBtnComponent implements OnInit {

  public slideButtonAnimTrigger: string;
  @Output() clickBtn = new EventEmitter<any>();

  ngOnInit() {
    this.slideButtonAnimTrigger = 'down';
  }

  onBtnClick() {
    this.slideButtonAnimTrigger = 'up';
    this.clickBtn.emit();
  }

  slideEnd() {
    this.slideButtonAnimTrigger = 'down';
  }

}
