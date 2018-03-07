import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  allArticles: Article[];
  statusCode: number;
  processValidation:boolean = false;
  articleIdToUpdate = null;


  articleForm = new FormGroup({
  	title:new FormControl('', Validators.required),
  	category:new FormControl('', Validators.required)
  })
  constructor(private articleService : ArticleService) { }

  ngOnInit() {
  	this.getAllArticles();
  }

  // get all articles 

  getAllArticles(){
  	this.articleService.getAllArticle().subscribe(
  		data => this.allArticles = data, errorCode => this.statusCode = errorCode);
  }

  onArticleFormSubmit(){
  	this.processValidation = true;
  	if(this.articleForm.invalid){
  		return;
  	}
  	let article = this.articleForm.value;
    if(this.articleIdToUpdate === null){
        this.articleService.getAllArticle()
        .subscribe(articles => {
          if( articles.length !== 0){
            let maxIndex = articles.length - 1;
            let articleWithMaxIndex = articles[maxIndex];
            let articleId = articleWithMaxIndex.id + 1;
            article.id = articleId;
          }else{
             article.id = 1;
          }      
          this.articleService.createArticle(article).subscribe(
              successCode => {
                this.statusCode = successCode;
                this.getAllArticles();
                this.articleForm.reset();
              },
              errorCode => this.statusCode = errorCode);
      });
    }else{
      article.id = this.articleIdToUpdate;   
      this.articleService.updateArticle(article).subscribe(articles => {
        this.getAllArticles();
        this.articleForm.reset();

      },  errorCode => this.statusCode = errorCode)
    }
  	  

  }

  // edit article

  loadArticleToEdit(article){
  		//console.log(article);
      this.articleIdToUpdate = article.id;
  		this.articleService.editArticle(article).subscribe(article => {
  			console.log(article);
								this.articleForm.setValue({ title: article.title, category: article.category})
							},errorCode => this.statusCode = errorCode)

  }

  // Delete article

  deleteArticle(article){
      this.articleService.deleteArticleById(article.id).subscribe(article =>{
        console.log(article);
        this.getAllArticles();
      },errorCode => this.statusCode = errorCode

      )
  }

  backToCreateArticle(){
    this.articleIdToUpdate = null;
    this.articleForm.reset();
  }

}
