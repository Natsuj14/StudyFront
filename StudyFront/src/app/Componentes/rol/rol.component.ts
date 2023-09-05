import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  Titulo = "Roles"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Rol");
  }

}
