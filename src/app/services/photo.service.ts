import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Storage } from "@ionic/storage";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureImageOptions,
  CaptureVideoOptions
} from "@ionic-native/media-capture/ngx";

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  public videos: any[];
  public photos: any[] = [];
  constructor(
    private camera: Camera,
    private storage: Storage,
    private mediaCapture: MediaCapture
  ) {}

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.photos.unshift({
          data: "data:image/jpeg;base64," + imageData
        });
        this.storage.set("photos", this.photos);
      },
      err => {
        console.log("Camera issue: " + err);
      }
    );
  }

  recordVideo() {
    let options: CaptureVideoOptions = {limit: 1};
    this.mediaCapture
      .captureVideo(options)
      .then(
        (data: MediaFile[]) =>{
          this.photos.unshift(data);
          this.storage.set("photos", this.photos);
        }, 
        (err: CaptureError) => console.error(err)
      );
  }

  loadSaved() {
    this.storage.get("photos").then(photos => {
      this.photos = photos || [];
    });
  }
  deleteAll() {
    this.storage.clear;
    this.photos = [];
  }
}

class Photo {
  data: any;
}