import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormUsuarioComponent } from '../Forms/form-usuario/form-usuario.component';

export class IconOverviewExample {}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  Titulo = "Usuarios";

  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  
  constructor(public api:ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource;
  }

  openDialog(){
    this.dialog.open(FormUsuarioComponent,{
    })
  }

  ngOnInit(): void {
    this.api.GET("Usuario").then((res)=>{

      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]]);
        
      }

      this.dataSource.data=res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      
    })
  }

  loadTable(data:any[]){
    this.displayedColumns=[];

    for(let column in data[0]){
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
