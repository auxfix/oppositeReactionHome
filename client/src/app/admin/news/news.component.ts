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
  public editTrackId: string;
  public isNewNews = true;
  public isEditMode = false;

  constructor(private http: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  get isShowList() {
    return !this.isEditMode;
  }

  get isShowEditForm() {
    return this.isEditMode;
  }

  addNews() {
    this.isEditMode = true;
    this.editTrackId = null;
    this.isNewNews = true;
  }

  editNews(newsId) {
    this.isEditMode = true;
    this.editTrackId = newsId;
    this.isNewNews = false;
  }

  newsHasBeenSaved() {
    this.isEditMode = false;
    this.editTrackId = null;
    this.getNews();
  }

  toListState() {
    this.isEditMode = false;
    this.editTrackId = null;
  }

  getNews() {
    this.http.getAllNews()
      .subscribe(news => {
        console.log(news);
        this.news = news;
      }, error => console.log(error));
  }
}
