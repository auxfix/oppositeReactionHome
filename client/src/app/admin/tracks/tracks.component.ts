import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-admin-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class AdminTracksComponent implements OnInit {

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
