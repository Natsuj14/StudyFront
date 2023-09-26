import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public api: HttpClient) { }
  Url = "https://localhost:7211/api/"

  public async GET(controller:String) {
    var result:any
    await this.api.get(this.Url+controller).toPromise().then((res => {
      console.log(res);
      result=res;
    })
    )
    return result;
  }
  
  public async post(controller:String, body: any) {
    return await this.api.post(this.Url + controller, body).subscribe((res) => {});
  }

  public async delete(controller:String, Id: string) {
    return this.api.delete(this.Url + controller + "/" + Id);
  }

  public async create(controller:String, body: any) {
    return this.api.post(this.Url + controller, body);
  }

  public async update(controller:String, Id: string, body: any) {
    return this.api.put(this.Url+controller + "/" + Id, body);
  }

}
