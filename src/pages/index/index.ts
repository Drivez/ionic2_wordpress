import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Api } from '../../providers/api';
import { SinglePage } from '../../pages/single/single';


@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  datas: any = [];
  searchKeyword: string = "";
  searchType:boolean = false;
  pagination:number = 1;

  constructor(
    public navCtrl: NavController,
    private api: Api,
    public navParams: NavParams,
    private keyboard: Keyboard
  ) {
    api.index(1).subscribe(datas => {
      this.datas = datas;
    })
  }

  openSingle(url, title){
    this.navCtrl.push(SinglePage, {
      url: url,
      title: title
    });
  }
  search(keyword){
    this.searchType = true;
    this.api.search(keyword, 1).subscribe(datas => {
      this.datas = datas;
    });
  }

  onCancel(ev){
    if(!ev.target.value){
      this.api.index(1).subscribe(datas => {
        this.datas = datas;
        this.searchType = false;
        this.keyboard.close();
      });
    }
  }

  doInfinite(ev){
    this.pagination++;
    if(this.searchType === false){
      this.api.index(this.pagination).subscribe(datas => {
        ev.complete();
        if(datas.length !== 0){
          for(let i of datas){
            this.datas.push(i);
          }
        }
      })
    }else if(this.searchType === true){
      this.api.search(this.searchKeyword, this.pagination).subscribe(datas => {
        ev.complete();
        if(datas.length !== 0){
          for(let i of datas){
            this.datas.push(i);
          }
        }
      });
    }
  }
closeKeyboard(){
this.keyboard.close();
}

}
