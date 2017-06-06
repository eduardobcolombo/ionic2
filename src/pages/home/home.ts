import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  OCRAD: any;
  constructor(
  public navCtrl: NavController,
  public loadingCtrl: LoadingController

  ) {

  }

  takePicture(){
  // You can check the values here:
  // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        allowEdit: true,
        correctOrientation: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
  analyze() {
    let loader = this.loadingCtrl.create({
     content: 'Analizando a foto...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('imageOCR'), text => {
      loader.dismissAll();
      alert(text);
      console.log(text);
    });
}

}
