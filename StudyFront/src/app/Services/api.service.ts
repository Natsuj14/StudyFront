import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public api: HttpClient) { }
  Url = "https://localhost:7211/api/"

  public async GET(controller: String) {
    var result: any
    await this.api.get(this.Url + controller).toPromise().then((res => {
      console.log(res);
      result = res;
    }))
    return result;
  }

  public async post(controller: String, body: any) {
    return await this.api.post(this.Url + controller, body).subscribe((res) => { });
  }

  public async delete(controller: String, Id: string) {
    var result: any;
    await this.api.delete(this.Url + controller + "/" + Id).toPromise().then((res => {
      console.log(res);
      result = res;
    }))
    return result;
  }

  public async create(controller: String, body: any) {
    return this.api.post(this.Url + controller, body);
  }

  public async put(controller: String, Id: string, body: any) {
    return await this.api.put(this.Url + controller + "/" + Id, body).subscribe((res) => { });
  }

  public async login(usuario: string, contrasena: string): Promise<any> {
    
    return await this.api.get(this.Url + "Usuario" + `/${usuario}/${contrasena}`, { observe: 'response' }).toPromise();

  }



}
