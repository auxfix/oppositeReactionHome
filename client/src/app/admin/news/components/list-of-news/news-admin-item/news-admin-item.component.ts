import {Component, Input, OnInit} from '@angular/core';

interface NewsItem {
  _id: String;
  title: String;
  text: String;
  date: String;
}

@Component({
  selector: 'app-news-admin-item',
  templateUrl: './news-admin-item.component.html',
  styleUrls: ['./news-admin-item.component.scss']
})
export class NewsAdminItemComponent implements OnInit {
  @Input() data: NewsItem;

  constructor() { }

  ngOnInit() {
  }

}
