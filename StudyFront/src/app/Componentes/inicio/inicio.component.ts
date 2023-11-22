import { Component } from '@angular/core';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  usuarioExiste = true;
  dis1: string = 'none';
  dis2: string = 'block';
  place: string = '0';

  divs=[
    
  ]

  constructor(public modalService: ModalServoceService) {
    this.modalService.accion.next("Crear cuenta");
    this.modalService.titulo = "Registrarse";
    this.modalService.login = true;
  }

  iniciarSesion() {
    this.dis1 = 'none';
    this.dis2 = 'block';
    this.place = '0';
    setTimeout(() => {
      this.dis1 = 'none';
      this.dis2 = 'block';
    }, 50);
  }

  registrarse() {
    this.dis1 = 'block';
    this.dis2 = 'none';
    this.place = '410px';
    setTimeout(() => {
      this.dis1 = 'block';
      this.dis2 = 'none';
    }, 50);
  }
}
