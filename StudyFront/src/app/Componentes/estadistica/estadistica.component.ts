import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  Titulo = "Estadisticas"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Estadisticas");
  }

}
