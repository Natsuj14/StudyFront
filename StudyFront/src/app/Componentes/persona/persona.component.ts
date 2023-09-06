import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  Titulo = "Personas"
  
  constructor(public api: ApiService) {

  }
  ngOnInit(): void {
    this.api.GET("Persona");
  }
}
