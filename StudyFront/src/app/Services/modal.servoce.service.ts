import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServoceService {

  titulo = "";
  accion = new BehaviorSubject("");
  constructor() { }
}
