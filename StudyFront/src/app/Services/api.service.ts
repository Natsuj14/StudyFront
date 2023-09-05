import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public api: HttpClient) { }

  Url = "https://localhost:7211/api/"
  public async GET(controller:String) {
    await this.api.get(this.Url+controller).toPromise().then((res => {
      console.log(res);
    })
    )
  }
}
