import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewslistService {

  baseUrl = 'http://localhost:3000/news';
  constructor(private http: HttpClient ) { }

  addNewsData(data){
    return this.http.post(`${this.baseUrl}`, data).toPromise();
  }

  getPaginatedNews(postData): Promise<any>{
    return this.http.post(`${this.baseUrl}/articles`, postData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).toPromise();
  }

  deleteNewsData(id): Promise<any>{
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).toPromise();
  }

}
