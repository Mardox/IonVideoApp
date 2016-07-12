import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
declare var navigator: any;
declare var window: any;

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    public thumbnail: string;
    public base64Image: string;

    constructor(private navController: NavController) {
    }
    takeVideo() {
        // capture error callback
        var captureError = function (error) {
            alert('Error code: ' + error.code + ' Capture Error');
        };
        // start video capture
        navigator.device.capture.captureVideo(this.generateThumbnail, captureError, { limit: 1, duration: 10 });
    }
    generateThumbnail = (mediaFiles) => {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
        }
        var newPath = path.replace("file:/", "file:///");
        window.PKVideoThumbnail.createThumbnail(newPath, "IGNORE", { mode: "base64", quality: .8, position: 5.0, resize: { height: 384, width: 384 } }).then((imageData) => {
            this.thumbnail = imageData;
            var img = document.createElement("img");
            img.src = imageData;
            document.getElementById("content").appendChild(img);
        }).catch((err) => {
            alert(err);
        });
    }

    takePicture() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, (err) => {
            console.log(err);
        });
    }
}
