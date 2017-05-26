import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {
  title:string = this.navParams.get('title');
  datas:any = [];
  comments: any = [];
  segment:string = 'posts';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    http.get(navParams.get('url')+'/?_embed').subscribe(datas => {
      this.datas = [datas.json()]
      http.get(datas.json()._links.replies[0].href).subscribe(comment=>{
        this.comments = comment.json();
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Single');
  }

}
