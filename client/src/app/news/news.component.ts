import { Component, OnInit } from '@angular/core';
import {NewsService} from 'api/news.service';

interface PublicNewsItem {
  _id: String;
  title: String;
  text: String;
  date: String;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class PublicNewsComponent implements OnInit {

  public publicNews: PublicNewsItem[] = [];

  constructor(private http: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  async getNews() {
    const news = await this.http.getAllNews().toPromise();
    console.log(news);
    this.publicNews = news;
  }
}
