import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  Titulo = "Preguntas"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Preguntas");
  }
}
