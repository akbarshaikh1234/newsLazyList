import { Component, OnInit } from '@angular/core';
import { NewslistService } from './service/newslist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  pageOption = [5, 10, 25, 50, 100];


  totalPages = 5;
  pageSize = 5;
  page = 1;

  postData = {
    page_size: 5,
    page_num: 1
  };
  
  newsData = [];
  constructor(private newsServ: NewslistService){}


  ngOnInit(){
    this.getNewsList();
  }

  getNewsList(){
    this.newsServ.getPaginatedNews(this.postData)
    .then( (res: any) => {
      this.totalPages = Math.ceil(res.totalEntries / res.page_size);
      this.newsData = res.data;
    }).catch(err => {
    });
  }

  pageSizeChange(size){
    this.page = 1;
    this.postData = {
      page_size : size,
      page_num:this.page
    }

    this.getNewsList()
  }

  newsList(count){
    this.page += count;
    this.postData.page_num = this.page;
    this.getNewsList();
  }

  deletedData(data){
    console.log("deleted data :",data);
    this.getNewsList();
  }
}
