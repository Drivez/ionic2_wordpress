import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Api {

  url = "https://demo.kildedal.no";

  constructor(public http: Http) {
    console.log('Hello you :-)');
  }

  index(id){
    return this.http.get( this.url + '/wp-json/wp/v2/posts/?_embed&?filter[order]=DESC&filter[posts_per_page]=5&page=' + id)
    .map(data => data.json());
  }

  search(keyword,id){
    return this.http.get( this.url + '/wp-json/wp/v2/posts?_embed&?filter[order]=DESC&filter[posts_per_page]=5&search=' + keyword + '&page=' + id)
    .map(data => data.json());
  }

  category(){
    return this.http.get( this.url + '/wp-json/wp/v2/categories')
    .map(data => data.json());
  }

  posts_category(id,page){
    return this.http.get( this.url + '/wp-json/wp/v2/posts?_embed&categories='+id+'&filter[order]=DESC&filter[posts_per_page]=5&page=' + page)
    .map(data => data.json());
  }

}
