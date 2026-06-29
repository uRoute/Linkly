import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostdetailsService {

  constructor(private _HttpClient:HttpClient) { }
}
