import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AreasModels } from 'src/app/Models/AreasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.css']
})
export class FormAreaComponent implements OnInit {

  private fb = inject(FormBuilder);
  addressFormArea = this.fb.group({
    nombre: ['', Validators.required]
  });

  titulo = "";
  accion = "";

  infoArea: AreasModels = {
    nombre: "",
  }

  infoAreaPut ={
    idArea: 0,
    nombre: "",
  }

  hasUnitNumber = false;

  constructor(
    public api: ApiService,
    public modalService: ModalServoceService
  ) {

  }

  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
    console.log(this.modalService.area);
    if (this.modalService.accion.value == 'Modificar') {
      this.addressFormArea.controls['nombre'].setValue(
        this.modalService.area.nombre + ''
      );
    }else{
    }

  }

  async onSubmit(): Promise<void> {
    try {
      this.infoArea.nombre = this.addressFormArea.controls['nombre'].value;

      if (this.modalService.accion.value == "Modificar") {

        this.infoAreaPut.idArea = this.modalService.id;
        this.infoAreaPut.nombre = this.infoArea.nombre;

        const response = await this.api.put("Area",this.modalService.id+'', this.infoAreaPut);

        if (response) {
          const result = await Swal.fire({
            title: 'Dato modificado',
            text: 'Se modificó el campo exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          if (result.isConfirmed) {
            window.location.reload();
          }
        } else {
          Swal.fire(
            'Error al enviar los datos',
            'Ha ocurrido un error al editar el campo',
            'error'
          );
        }
        
      } else {

        const response = await this.api.post("Area", this.infoArea);

        if (response) {
          const result = await Swal.fire({
            title: 'Nuevo dato añadido',
            text: 'Se añadió el campo exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          if (result.isConfirmed) {
            window.location.reload();
          }
        } else {
          Swal.fire(
            'Error al enviar los datos',
            'Ha ocurrido un error al agregar el campo',
            'error'
          );
        }
      }

    } catch (error) {
      Swal.fire(
        'Error al enviar los datos',
        'Por favor complete los campos correctamente',
        'error'
      );
    }
  }
}