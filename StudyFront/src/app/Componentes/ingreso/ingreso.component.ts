import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {
  Titulo = "Ingresos"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Ingreso");
  }

}
