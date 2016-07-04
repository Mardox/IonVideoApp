import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public base64Image: string;

  constructor(private navController: NavController) {
  }

  openCamera() {
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        mediaType: Camera.MediaType.ALLMEDIA,
        targetHeight: 1000,
        targetWidth: 1000
    }).then((videoData) => {
        this.base64Image = "data:image/jpeg;base64," + videoData; 
    }, (err) => {
        console.log(err);
    });
  }
}
