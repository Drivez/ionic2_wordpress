import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Api } from '../providers/api';
import { IndexPage } from '../pages/index/index';
import { SinglePage} from '../pages/single/single';
import { Category } from '../pages/category/category';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IndexPage;
  isHome: boolean = false;
  pages:any = [];

  constructor(public platform: Platform, private api: Api) {
    this.initializeApp();

    api.category().subscribe(datas => {
      for(let i of datas){
        this.pages.push({
          title: i.name,
          id: i.id
        })
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(Category, {
      id: page.id,
      title: page.title
    });
    this.isHome = true;
  }

  openHome(){
    this.nav.setRoot(IndexPage);
    this.isHome = false;
  }
}
