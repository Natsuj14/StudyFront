import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  Titulo = "Modulos"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Modulos");
  }
}
