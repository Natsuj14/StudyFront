import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  Titulo = "Temas"

  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Tema");
  }
}
