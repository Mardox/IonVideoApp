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
        let captureError = function (error) {
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
        let newPath = path.replace("file:/", "file:///");

        // let b64toBlobAlt = function(dataURI, contentType) {
        //     let ab, byteString, i, ia;
        //     byteString = atob(dataURI.split(",")[1]);
        //     ab = new ArrayBuffer(byteString.length);
        //     ia = new Uint8Array(ab);
        //     i = 0;
        //     while (i < byteString.length) {
        //         ia[i] = byteString.charCodeAt(i);
        //         i++;
        //     }
        //     return new Blob([ab], {
        //         type: contentType
        //     });
        // };
        console.log("path " + newPath)
        let onResolve = (fileEntry) => {
            console.log("file entry : ");
            console.log(fileEntry.name);
            fileEntry.file((data) => {
                let reader: any;
                console.log("data: ");
                console.log(data);
                reader = new FileReader();
                reader.onload = (e: any) => {
                    try {
                        console.log("Before parse file");
                        let videoFile = new Parse.File("video-file.mp4", { base64: e.target.result });
                        console.log("after parse file");
                        videoFile.save().then(() => {
                            // The file has been saved to Parse.
                            console.log("File uploaded....");
                        }, (error) => {
                            // The file either could not be read, or could not be saved to Parse.
                            console.log("File upload failed.");
                        });
                    } catch (err) {
                        console.log(err.message);
                        alert(err.message);
                    }
                };
                reader.readAsDataURL(data);
            });
        }

        let onResolveFail = (err) => {
            console.log(err.message);
        }

        window.resolveLocalFileSystemURL(newPath, onResolve, onResolveFail);


        window.PKVideoThumbnail.createThumbnail(newPath, "IGNORE", { mode: "base64", quality: .8, position: 5.0, resize: { height: 384, width: 384 } }).then((imageData) => {
            this.thumbnail = imageData;
            let img = document.createElement("img");
            img.src = imageData;
            document.getElementById("content").appendChild(img);

            let file = new Parse.File("thumbnail-file", { base64: imageData });
            file.save().then(() => {
                // The file has been saved to Parse.
                console.log("File uploaded....");
                alert("uploaded");
            }, (error) => {
                // The file either could not be read, or could not be saved to Parse.
                console.log("File upload failed.");
            });
        }).catch((err) => {
            alert(err);
        });

        // upload video to parse in the background
        // let parseFile = newPath.replace("file:///", "/");
        // alert(parseFile);
    }

    takePicture() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Image = "data:image/jpeg;base64," + imageData;
            let file = new Parse.File("thumbnail-file", { base64: this.base64Image });
            file.save().then(() => {
                // The file has been saved to Parse.
                console.log("File uploaded....");
                alert("uploaded");
            }, (error) => {
                // The file either could not be read, or could not be saved to Parse.
                console.log("File upload failed.");
                alert(error.message);
            });
        }, (err) => {
            console.log(err);
        });
    }
}
