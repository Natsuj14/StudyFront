import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from 'src/app/Services/api.service';
import { IngresoService } from 'src/app/Services/ingreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public api: ApiService, public ingreso: IngresoService) {
  }

  public async salir() {

    const result = await Swal.fire({
          title: '¿Desear cerrar sesion?',
          text: '¿Desea cerrar sesion definitivamente?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        });
    
        if (result.isConfirmed) {
          try {
    
            // Clear local storage
            localStorage.setItem('usuarioConectado', 'false');
            this.ingreso.cerrarSesion;
            window.location.reload();
            console.log("Salir");
        
    
          } catch (error) {
            Swal.fire(
              'Error al cerrar sesion',
              'Por favor, inténtelo de nuevo',
              'error'
            );
          }
        }
    // Clear local storage
  }
}

