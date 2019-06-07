import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-control-track-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.scss']
})
export class ControlButtonComponent implements OnInit {

  @Input() icon: string;
  @Output() clickButton = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onButtonClick() {
    this.clickButton.emit();
  }

}
