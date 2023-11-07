import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RolesModels } from 'src/app/Models/RolesModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-rol',
  templateUrl: './form-rol.component.html',
  styleUrls: ['./form-rol.component.css']
})
export class FormRolComponent implements OnInit {

  private fb = inject(FormBuilder);
  addressFormRol = this.fb.group({
    descripcionRol: ['', Validators.required]
  });

  titulo = "";
  accion = "";
  infoRol: RolesModels = {
    descripcion: "",
  }

  infoRolPut = {
    idRol: 0,
    descripcionRol: "",
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
    if (this.modalService.accion.value == 'Modificar') {
      this.addressFormRol.controls['descripcionRol'].setValue(
        this.modalService.rol.descripcion + ''
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoRol.descripcion = this.addressFormRol.controls['descripcionRol'].value;

      console.log(this.infoRol);

      if (this.modalService.accion.value == "Modificar") {

        this.infoRolPut.idRol = this.modalService.id;
        this.infoRolPut.descripcionRol = this.infoRol.descripcion;

        const response = await this.api.put("Rol",this.modalService.id+'', this.infoRolPut);

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

        const response = await this.api.post("Rol", this.infoRol);

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