import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {Camera} from "ionic-native";
declare var navigator: any;
declare var window: any;
declare function require(name: string);
let Parse = require("parse/node");

@Component({
    templateUrl: "build/pages/home/home.html"
})
export class HomePage {
    public thumbnail: string;
    public base64Image: string;

    constructor(private navController: NavController) {
    }
    takeVideo() {
        // capture error callback
        let captureError = function(error) {
            alert("Error code: " + error.code + " Capture Error");
        };
        // start video capture
        navigator.device.capture.captureVideo(this.generateThumbnail, captureError, { limit: 1, duration: 10 });
    }
    generateThumbnail = (mediaFiles) => {
        let i: any, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
        }

        // upload video to parse in the background
        // let file = new Parse.File("video-file", path);
        // file.save().then(function() {
        //     // The file has been saved to Parse.
        //     console.log("File uploaded....");
        // }, function(error) {
        //     // The file either could not be read, or could not be saved to Parse.
        //     console.log("File upload failed.");
        // });

        let newPath = path.replace("file:/", "file:///");
        window.PKVideoThumbnail.createThumbnail(newPath, "IGNORE", { mode: "base64", quality: .8, position: 5.0, resize: { height: 384, width: 384 } }).then((imageData) => {
            this.thumbnail = imageData;
            let img = document.createElement("img");
            img.src = imageData;
            document.getElementById("content").appendChild(img);

            let file = new Parse.File("thumbnail-file", {base64: imageData});
            file.save().then(function() {
                // The file has been saved to Parse.
                console.log("File uploaded....");
            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                console.log("File upload failed.");
            });
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
            let file = new Parse.File("thumbnail-file", {base64: this.base64Image});
            file.save().then(function() {
                // The file has been saved to Parse.
                console.log("File uploaded....");
                alert("uploaded");
            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                console.log("File upload failed.");
                alert(error.message);
            });
        }, (err) => {
            console.log(err);
        });
    }
}
