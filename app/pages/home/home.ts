import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
declare var navigator: any;
declare var window: any;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public thumbnailData: string;
  public base64Image: string;

  constructor(private navController: NavController) {
  }

  openCamera() {
    // capture callback
    //var context = this;
    //var captureSuccess = function (mediaFiles) {
      // var i, path, len;
      // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      //   path = mediaFiles[i].fullPath;
      //   alert(path);
      //   navigator.createThumbnail(path, function (err, imageData) {
      //     if (err)
      //       throw err;

      //     context.thumbnailData = "data:image/jpeg;base64," + imageData;
      //     alert(context.thumbnailData);
      //     var img = document.createElement("img");
      //     img.src = context.thumbnailData;
      //   });

        // navigator.createThumbnail(path).then((imageData) => {
        //   thumbnailData = "data:image/jpeg;base64," + imageData;
        //   alert(thumbnailData);
        // });

        // do something interesting with the file
        // var thumbnailPath = path.slice(0, -4) + '.png';
        // alert(thumbnailPath);
        // window.PKVideoThumbnail.createThumbnail(path, thumbnailPath).then((data) => {
        //   this.thumbnailData = data;
        //   console.log('thumbnail: ' + this.thumbnailData);
        //   alert(this.thumbnailData);
        // }).catch((err) => { });

        // window.PKVideoThumbnail.createThumbnail(path, thumbnailPath, function (prevSucc) {
        //   return prevImageSuccess(prevSucc);
        // }, fail);

        // function prevImageSuccess(succ) {
        //   alert('success');
        // };
      //}

      // this.videoPath = mediaFiles.fullPath;
      // alert(this.videoPath);
      //this.createThumbnail();
      // console.log('videoPath: ' + this.videoPath);
    //};

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
      { mode: "base64", quality: .8, position: 5.0, resize: { height: 384, width: 384 } }).then((data) => {
        //alert(data);
        this.base64Image = data;
      }).catch((err) => {
        alert(err);
      });
  }

  // createThumbnail(path) {
  //   alert('Inside thumbnail');
  //   var options = {
  //     mode: window.PKVideoThumbnail.options.mode.base64
  //   }
  //   var thumbnailPath = path.slice(0, -4) + '.png';
  //   window.PKVideoThumbnail.createThumbnail(path, thumbnailPath, options).then((data) => {
  //     this.thumbnailData = data;
  //     console.log('thumbnail: ' + this.thumbnailData);
  //     alert(this.thumbnailData);
  //   });
  // }

}
