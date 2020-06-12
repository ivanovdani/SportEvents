import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class CrudService {

  private baseUrl: string;
  private entity: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api';
  }

  setEntity(name: string) {
    this.entity = name;
  }

  getAll<T>() {
    return this.http.get<T>(`${this.baseUrl}/${this.entity}`);
  }

  get(id) {
    return this.http.get(`${this.baseUrl}/${this.entity}/${id}`);
  }

  create(data) {
    return this.http.post(`${this.baseUrl}/${this.entity}`, data);
  }

  update(id, data) {
    return this.http.put(`${this.baseUrl}/${this.entity}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/${this.entity}/${id}`);
  }

}
