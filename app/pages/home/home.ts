import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
declare var navigator: any;
declare var window: any;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public videoPath: any;
  public thumbnailData: any;

  constructor(private navController: NavController) {
  }

  openCamera() {
    // capture callback
    var captureSuccess = function (mediaFiles) {
      var i, path, len, fail;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
        var thumbnailPath = path.slice(0, -4) + '.png';
        // alert(thumbnailPath);
        // window.PKVideoThumbnail.createThumbnail(path, thumbnailPath).then((data) => {
        //   this.thumbnailData = data;
        //   console.log('thumbnail: ' + this.thumbnailData);
        //   alert(this.thumbnailData);
        // }).catch((err) => { });

        window.PKVideoThumbnail.createThumbnail(path, thumbnailPath, function (prevSucc) {
          return prevImageSuccess(prevSucc);
        }, fail);

        function prevImageSuccess(succ) {
          alert('success');
        };
      }

      // this.videoPath = mediaFiles.fullPath;
      // alert(this.videoPath);
      //this.createThumbnail();
      // console.log('videoPath: ' + this.videoPath);
    };

    // capture error callback
    var captureError = function (error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    // start video capture
    navigator.device.capture.captureVideo(captureSuccess, captureError, { limit: 1, duration: 20 });
  }

  createThumbnail(path) {
    alert('Inside thumbnail');
    var options = {
      mode: window.PKVideoThumbnail.options.mode.base64
    }
    var thumbnailPath = path.slice(0, -4) + '.png';
    window.PKVideoThumbnail.createThumbnail(path, thumbnailPath, options).then((data) => {
      this.thumbnailData = data;
      console.log('thumbnail: ' + this.thumbnailData);
      alert(this.thumbnailData);
    });
  }


}
