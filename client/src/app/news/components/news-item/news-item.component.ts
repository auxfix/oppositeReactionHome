import {Component, Input, OnInit} from '@angular/core';

interface PublicNewsItem {
  _id: String;
  title: String;
  text: String;
  date: String;
}

@Component({
  selector: 'app-public-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class PublicNewsItemComponent implements OnInit {

  @Input() public newsItem: PublicNewsItem;

  constructor() { }

  ngOnInit() {
  }

}
