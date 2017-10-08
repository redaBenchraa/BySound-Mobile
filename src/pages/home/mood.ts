import {MediaObject} from "@ionic-native/media";
export class mood{
  constructor(public name:string, public activated : boolean  = false, public volume: number = 50,public sound : MediaObject = null) {}
}
