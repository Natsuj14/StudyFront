import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  Titulo = "Areas"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Area");
  }
}
