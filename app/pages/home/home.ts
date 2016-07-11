import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
declare var navigator: any;
declare var window: any;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public thumbnailData: string;
  constructor(private navController: NavController) {
    //alert(this.thumbnailData);
  }
  openCamera() {
    // capture error callback
    var captureError = function (error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    // start video capture
    navigator.device.capture.captureVideo(this.generateThumbnail, captureError, { limit: 1, duration: 10 });
    
  }
  generateThumbnail(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;
    }
    var newPath = path.replace("file:/", "file:///");
    window.PKVideoThumbnail.createThumbnail(newPath, "IGNORE",
      { mode: "base64", quality: .8, position: 5.0, resize: { height: 384, width: 384 } }).then((imageData) => {
        this.thumbnailData = imageData;
      }).catch((err) => {
        alert(err);
      });
  }
}
