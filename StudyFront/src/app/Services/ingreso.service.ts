import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private usuarioConectadoSource = new BehaviorSubject<boolean>(false);
  usuarioConectado$ = this.usuarioConectadoSource.asObservable();

  setUsuarioConectado(valor: boolean): void {
    this.usuarioConectadoSource.next(valor);
  }

  cerrarSesion(): void {
    this.setUsuarioConectado(false);
    localStorage.setItem('usuarioConectado', 'false');
  }

  constructor() { }
}
