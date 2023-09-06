import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  Titulo = "Materias"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Materia");
  }
}
