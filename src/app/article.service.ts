import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Article } from './article';

@Injectable()
export class ArticleService {

  articleUrl = "http://localhost:3000/articles";

  constructor(private http:Http) { }

  getAllArticle():Observable<Article[]>{
    return this.http.get(this.articleUrl).map(this.extractData).catch(this.handleError);
  }

  // create article

  createArticle(article:Article):Observable<number>{
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });

    return this.http.post(this.articleUrl, article, options).map(success => success.status).catch(this.handleError);
  }

  // Edit article

  editArticle(article:Article):Observable<Article>{
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.articleUrl+'/'+article.id, options).map(this.extractData).catch(this.handleError);
  }

  // edit article by id

  updateArticle(article:Article):Observable<Article>{
    console.log(article);
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.articleUrl+'/'+article.id, article, options).map(this.extractData).catch(this.handleError);
  }

  // Delete article

  deleteArticleById(article:Article):Observable<article>{
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.articleUrl+'/'+article, options).map(this.extractData).catch(this.handleError);
  }

  // data
  
  private extractData(res: Response){
    let body = res.json();
    return body;
  }

  //error handler

  private handleError(error: Response | any){
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
