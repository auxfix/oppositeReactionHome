import { Component, OnInit } from '@angular/core';
import {NewsService} from 'api/news.service';

interface NewsItem {
  _id: String;
  title: String;
  text: String;
  date: String;
}

@Component({
  selector: 'app-admin-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  public news: NewsItem[] = [];

  constructor(private http: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.http.getAllNews()
      .subscribe(news => {
        console.log(news);
        this.news = news;
      }, error => console.log(error));
  }
}
