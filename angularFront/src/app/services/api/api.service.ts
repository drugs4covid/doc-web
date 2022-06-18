import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {ResponseI} from '../../models/response.interface';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import{Observable} from 'rxjs';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url:string="http://localhost:8000"
  url:string="http://localhost:8000"
  errorMessage;
  form: any;

  constructor(private http:HttpClient,private cookies: CookieService) { }
  

  login(form: any): Observable<any> {
    return this.http.post<ResponseI>(this.url+"/login", form);
    /* return this.http.post("https://reqres.in/api/login", username); */
  }

  /* login(user: any): Observable<any> {
    var formData: any = new FormData();
    formData.append("username", this.form.get('username').value);
    formData.append("password", this.form.get('password').value);
    return this.http.post('http://127.0.0.1:8000/login', formData)
    
  } */
  getAllIndex(): Observable<any> {
    let urlAllindex=this.url+"/allindex"
    
    return this.http.get(urlAllindex);
  }
  getIndex(index: any,id:any): Observable<any> {
    let urlgetIndex=this.url+"/index"
    let params = new HttpParams().set("index",index).set("id", id); //Create new HttpParams
    return this.http.get(urlgetIndex, {params: params});
  }
  
  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
    
  }
  logOut() {
    console.log(this.getMyuser())
    this.cookies.delete("username");
    this.cookies.delete("token");
    
  }
  getToken() {
    return this.cookies.get("token");
  }
  setMyUser(token: string) {
    this.cookies.set("username", token);
    
  }
  getMyuser() {
    return this.cookies.get("username");
  }
  getUser(user: any): Observable<any> {
    let urlgetuser=this.url+"/user"
    return this.http.get(urlgetuser,{
      params: { username:user }});
  }
  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }
  postIndex(index: any,id: any,json: any) {
    let urlnewIndex=this.url+"/newIndex"
    let params = new HttpParams().set("index",index).set("id", id).set("author",this.cookies.get("username")); //Create new HttpParams
    return this.http.post(urlnewIndex,json, {params: params})
    
  }
  postpdf(pdf: any,id: any,index: any,author: any) {
    let urlpdftoJson=this.url+"/pdftoJson"
    let params = new HttpParams().set("index",index).set("id", id).set("author", author); //Create new HttpParams
    return this.http.post(urlpdftoJson,pdf,{params: params})
    
  }
  deleteentireIndex(index: any) {
    let urlDelete=this.url+"/deleteindex"
    let params = new HttpParams().set("index",index); //Create new HttpParams
    return this.http.delete(urlDelete,{params: params})
    
  }
  deletedoc(index: any,id: any) {
    let urlDelete=this.url+"/indexbyid"
    let params = new HttpParams().set("index",index).set("id",id); //Create new HttpParams
    return this.http.delete(urlDelete,{params: params})
    
  }
  getdocs(index: any) {
    let urlgetdocs=this.url+"/search"
    let params = new HttpParams().set("index",index); //Create new HttpParams
    return this.http.get(urlgetdocs, {params: params})
    
  }
  searchMatch(index: any,searchvar: any) {
    let urlsearchmatch=this.url+"/searchMatch"
    let params = new HttpParams().set("index",index).set("matchRequested",searchvar); //Create new HttpParams
    return this.http.get(urlsearchmatch,{params: params})
    
  }
  getMapping(index: any) {
    let urlmapping=this.url+"/mapping"
    let params = new HttpParams().set("index",index); //Create new HttpParams
    return this.http.get(urlmapping,{params: params})
    
  }

}
