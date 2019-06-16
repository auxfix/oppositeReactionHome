import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface NewsItem {
  _id: String;
  title: String;
  text: String;
  date: String;
}

@Component({
  selector: 'app-list-of-news',
  templateUrl: './list-of-news.component.html',
  styleUrls: ['./list-of-news.component.scss']
})
export class ListOfNewsComponent implements OnInit {

  @Input() news: NewsItem[];
  @Output() editNews = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  editNewsItem (newsId: string) {
    this.editNews.emit({newsId});
  }
}
