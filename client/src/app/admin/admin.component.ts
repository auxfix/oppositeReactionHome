import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  private url = 'http://localhost:3000/tracks';
  private uploader: FileUploader;
  private trackName: String;

  ngOnInit() {
    this.uploader = new FileUploader({url: this.url});

    this.uploader.onBuildItemForm = (fileItem, form) => {
      form.append('trackName', this.trackName);
      return {fileItem, form};
    };
  }

}
