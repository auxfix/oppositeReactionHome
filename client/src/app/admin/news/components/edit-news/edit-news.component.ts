import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {NewsService} from 'api/news.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  @Input() newsId: string;
  @Input() isNewNews: boolean;
  @Output() saveNewsCallback = new EventEmitter<any>();
  @Output() backCallback = new EventEmitter<any>();

  @ViewChild('newsEditFormTag') newsEditFormRef: NgForm;

// form data
  public newsEditForm: FormGroup;

  constructor(public fb: FormBuilder, private http: NewsService) {

  }

  ngOnInit(): void {
    this.newsEditForm = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });

    this.setInitState();
  }

  async setInitState() {
    if (this.isNewNews) {
      this.newsEditForm.setValue({
        title: '',
        text: ''
      });
    } else {
      const newsItem = await this.http.getNewsItem(this.newsId).toPromise();
      this.newsEditForm.setValue({
        title: newsItem.title,
        text: newsItem.text
      });
    }
  }

  saveNews() {
    this.newsEditFormRef.ngSubmit.emit();
  }

  back() {
    this.backCallback.emit();
  }

  async delete() {
    await this.http.deleteNews(this.newsId).toPromise();
    this.saveNewsCallback.emit();
  }

  async onFormSubmit() {
    const newsItem = this.newsEditForm.value;
    const newsData = {title: newsItem.title, text: newsItem.text};
    if (this.isNewNews) {
      await this.http.postNews(newsData).toPromise();
    } else {
      await this.http.editNews(this.newsId, newsData).toPromise();
    }
    this.saveNewsCallback.emit();
  }
}
