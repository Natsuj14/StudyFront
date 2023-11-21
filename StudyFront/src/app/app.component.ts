import { Component, OnInit } from '@angular/core';
import { IngresoService } from './Services/ingreso.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StudyFront';
  usuarioConectado: boolean;
  constructor(public ingreso: IngresoService) { }

  ngOnInit(): void {
    const usuarioConectadoLocalStorage = localStorage.getItem('usuarioConectado');
    if (usuarioConectadoLocalStorage === 'true') {
      this.usuarioConectado = true;
      // this.ingreso.cerrarSesion();
    } else {
      this.ingreso.usuarioConectado$.subscribe(
        (usuarioConectado: boolean) => {
          this.usuarioConectado = usuarioConectado;
        }
      );
    }
  }
}
