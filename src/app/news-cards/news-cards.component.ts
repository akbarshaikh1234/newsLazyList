import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { NewslistService } from '../service/newslist.service';

@Component({
  selector: 'news-cards',
  templateUrl: './news-cards.component.html',
  styleUrls: ['./news-cards.component.scss']
})
export class NewsCardsComponent implements OnInit {

  @Input() article;

  @Output() delete = new EventEmitter<any>();
  observer;

  constructor(private newsSer: NewslistService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            entry.target.src = entry.target['data-src'];
            this.observer.unobserve(entry.target);
          }
        });
      });

      const myImgs = document.querySelectorAll('.articleImg');
      myImgs.forEach(image => {
        this.observer.observe(image);
      });
    }, 1000);

  }

  deleteData(news){
    this.newsSer.deleteNewsData(news._id)
    .then(res => {
      if (res.statusCode === 200){
        this.delete.emit(news);
      }
    }).catch(error => {
      console.log(error);
    });
  }

}
