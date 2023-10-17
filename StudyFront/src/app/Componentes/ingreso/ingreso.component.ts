import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormUsuarioComponent } from '../Forms/form-usuario/form-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { FormIngresoComponent } from '../Forms/form-ingreso/form-ingreso.component';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})

export class IngresoComponent implements OnInit {

  Titulo = "Ingresos";

  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(public api:ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource;
  }

  openDialog(){
    this.dialog.open(FormIngresoComponent,{
    })
  }

  ngOnInit(): void {
    this.api.GET("Ingreso").then((res) => {

      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]]);

      }

      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);

    })
  }

  loadTable(data: any[]) {
    this.displayedColumns = [];

    for (let column in data[0]) {
      this.displayedColumns.push(column);
    }
    this.displayedColumns.push('Acciones');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
