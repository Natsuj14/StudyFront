import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  Titulo = "Pruebas"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Prueba");
  }

}
