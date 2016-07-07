import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
declare var navigator : any;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public videoPath: any;

  constructor(private navController: NavController) {
  }

  openCamera() {
    // capture callback
    var captureSuccess = function (mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        this.videoPath = path;
      }
    };

    // capture error callback
    var captureError = function (error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    // start video capture
    navigator.device.capture.captureVideo(captureSuccess, captureError, { limit: 1, duration: 10 });
  }


}
