import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  currentImage: any;
  constructor(public photoService: PhotoService,private photoViewer: PhotoViewer) {}

  viewPhoto(foto:any){
    this.photoViewer.show(foto);

  }
  ngOnInit() {
    this.photoService.loadSaved();
  }
}
