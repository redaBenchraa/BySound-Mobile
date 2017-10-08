import {Component, OnInit} from '@angular/core';
import * as Granim from 'granim';
import {mood} from "./mood";
import { Media } from '@ionic-native/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})

export class HomePage implements OnInit {

  moods : mood[] = [new mood("rain"),new mood("storm"),new mood("night"),new mood("flame"),new mood("forest"),new mood("wind"),new mood("coffee"),new mood("wave")];

  constructor(private media: Media) {

  }
  ngOnInit()    {
    let granimInstance = new Granim({
      element: '#canvas-image',
      direction: 'top-bottom',
      opacity: [0.1, .1, 0],
      isPausedWhenNotInView: true,
      states : {
        "default-state": {
          gradients: [
            ['#634848', '#3b2828', '#3b2828'],
            ['#b73131', '#ff0004', '#ff0004']
          ],
          transitionSpeed: 2000
        }
      }
    });
  }
  activate(mood:mood){
    if(mood.sound == null){
      mood.sound = this.media.create("/android_asset/www/assets/sounds/"+mood.name+".mp3");
      mood.sound.setVolume(mood.volume/100);
    }
    mood.sound.play();
    if(!mood.activated){
      mood.sound.onStatusUpdate.subscribe(status => {
        if( status == 4  ) {
          mood.sound.play();
        }
      });
      mood.sound.onSuccess.subscribe(() => console.log('Action is successful'));
      mood.sound.onError.subscribe(error => console.log('Error!', error ));
    }else{
      mood.sound.stop();
      mood.sound.release();
      mood.sound = null;
    }
    mood.activated =!mood.activated;
  }

  slide(mood:mood){
    mood.sound.setVolume(mood.volume/100);
  }
}
