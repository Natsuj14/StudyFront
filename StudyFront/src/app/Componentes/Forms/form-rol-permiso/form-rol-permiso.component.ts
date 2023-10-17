import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { RolPermisoModels } from 'src/app/Models/RolPermisoModels';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-rol-permiso',
  templateUrl: './form-rol-permiso.component.html',
  styleUrls: ['./form-rol-permiso.component.css']
})
export class FormRolPermisoComponent {
  private fb = inject(FormBuilder);
  addressFormRolPermiso = this.fb.group({
    rol: [null, Validators.required],
    modulo: [null, Validators.required],
    permisoGet: [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoPost:  [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoDelete:  [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoPut:  [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoGetById:  [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],

  });

  infoRolPermiso: RolPermisoModels = {
    IdRol: 0,
    IdModulo: 0,
    PermisoPost: true,
    PermisoDelete: false,
    PermisoGet: false,
    PermisoPut: false,
    PermisoGetById: false
  }

  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];

  constructor(public api: ApiService) {

  }

  async onSubmit(): Promise<void> {
    try {
      this.infoRolPermiso.IdRol = this.addressFormRolPermiso.controls['rol'].value;
      this.infoRolPermiso.IdModulo = this.addressFormRolPermiso.controls['modulo'].value;
      this.infoRolPermiso.PermisoDelete = this.addressFormRolPermiso.controls['permisoDelete'].value === 'Si';
      this.infoRolPermiso.PermisoPost = this.addressFormRolPermiso.controls['permisoPost'].value === 'Si';
      this.infoRolPermiso.PermisoGet = this.addressFormRolPermiso.controls['permisoGet'].value === 'Si';
      this.infoRolPermiso.PermisoPut = this.addressFormRolPermiso.controls['permisoPut'].value === 'Si';
      this.infoRolPermiso.PermisoGetById = this.addressFormRolPermiso.controls['permisoGetById'].value === 'Si';
      
      console.log(this.infoRolPermiso);

      const response = await this.api.post("RolPermiso", this.infoRolPermiso);

      if (response) {
        console.log(response);
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
    } catch (error) {
      Swal.fire(
        'Error al enviar los datos',
        'Por favor complete los campos correctamente',
        'error'
      );
    }
  }

}
