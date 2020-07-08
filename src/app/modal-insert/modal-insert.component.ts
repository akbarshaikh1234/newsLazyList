import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewslistService } from '../service/newslist.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'modal-insert',
  templateUrl: './modal-insert.component.html',
  styleUrls: ['./modal-insert.component.scss']
})

export class ModalInsertComponent implements OnInit {

  newsAddForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // fruitCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  chips: string[] = ['Technology'];
  allTags: string[] = [
    'Technology', 'Business', 'Economy', 'World', 'Electronics',
    'Trade', 'Breaking New', 'Colleges and Universities', 'Current Events', 'Environmental',
    'Government', 'Magazines', 'Media', 'Newspapers', 'Politics', 'Regional News', 'Religion-and-Spirituality',
    'Sports', 'Traffic & Roads', 'Weather'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('chipList') chipList: ElementRef<HTMLInputElement>;
  @Output() inserted = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private newsSer: NewslistService
  ) { }

  ngOnInit(): void {
    this.newsAddForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      newsImage: ['', Validators.required],
      tags: ['']
    });

    this.onChanges();
  }
  onChanges() {
    this.filteredTags = this.newsAddForm.get('tags').valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  setImageData(t) {
    this.newsAddForm.patchValue({
      newsImage: t.files[0]
    });
  }

  sendData() {
    console.log(this.newsAddForm.value)
    console.log(this.chips);
    let formData = new FormData();
    formData.append('title', this.newsAddForm.value.title);
    formData.append('description', this.newsAddForm.value.description);
    formData.append('newsImage', this.newsAddForm.value.newsImage);
    formData.append('tags', JSON.stringify(this.chips));
    this.newsSer.addNewsData(formData)
      .then((res: any) => {
        this.inserted.emit(true);
        this.newsAddForm.reset();
      }).catch(error => {
        console.log(error);
      });
  }

  remove(tag: string) {
    const index = this.chips.indexOf(tag);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.chips.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
