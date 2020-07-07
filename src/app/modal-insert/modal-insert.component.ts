import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewslistService } from '../service/newslist.service';

@Component({
  selector: 'modal-insert',
  templateUrl: './modal-insert.component.html',
  styleUrls: ['./modal-insert.component.scss']
})

export class ModalInsertComponent implements OnInit {

  newsAddForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private newsSer: NewslistService) { }

    public items = [
      'pizza',
      'ppsdas','dasdasd','dasdiiads'
    ];
  ngOnInit(): void {
    this.newsAddForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      newsImage: ['', Validators.required]
    });
  }

  setImageData(t) {
    this.newsAddForm.patchValue({
      newsImage: t.files[0]
    });
  }
  showData() {
    let formData = new FormData();
    formData.append('title', this.newsAddForm.value.title);
    formData.append('description', this.newsAddForm.value.description);
    formData.append('newsImage', this.newsAddForm.value.newsImage);

    this.newsSer.addNewsData(formData)
      .then((res: any) => {
        this.newsAddForm.reset();
      }).catch(error => {
        console.log(error);
      });
  }

  onItemAdded(e){
    console.log(e);
  }
}
