import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';
import { SinglePage } from '../../pages/single/single';


@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class Category {
  title:string = this.navParams.data.title;
  datas: any = [];
  pagination:number = 1;
  constructor(
    public navCtrl: NavController,
    private api: Api,
    public navParams: NavParams
  ) {
    api.posts_category(navParams.data.id, 1).subscribe(datas => {
      this.datas = datas;
    })
  }

  doInfinite(ev){
    this.pagination++;
    this.api.posts_category(this.navParams.data.id, this.pagination).subscribe(datas => {
      ev.complete();
      if(datas.lenght !== 0){
        for(let i of datas){
          this.datas.push(i);
        }
      }
    });
  }

  openSingle(url, title){
    this.navCtrl.push(SinglePage, {
      url: url,
      title: title
    });
  }

  ionViewDidLoad() {
    console.log('Hello Category Page');
    this.title = this.navParams.data.title;
  }

}
