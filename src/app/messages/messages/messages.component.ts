import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';


import { CommonModule } from '@angular/common';


// materials 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule,MatPaginator} from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  standalone:true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,


],
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
    // list to store blogs
    list$!: Observable<any[]>;
    // showLoading$!:Observable<boolean>;


  constructor(public dialog: MatDialog
    ) {      
   }
  displayedColumns: string[] = ['ID', 'Name', 'Message', 'Date'];
  dataSource: any;
  spiner: boolean = true;
 public messageText:string;

 //ngrx
 products: Observable<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {

    // this._messagesService.gets().subscribe(msgs => {
    //   this.dataSource = new MatTableDataSource<Message>(msgs);
    //   this.dataSource.paginator = this.paginator;
    //   this.spiner = false;
    // })
  }

  openDialog(): void {
    this.dialog.open(DialogFormComponent, {
      height: '400px',
      width: '600px',
      panelClass: 'dialogC',
    });
  }

  openMsgDialog(msg:string): void {
    this.dialog.open(MessageDialog, {
      data: {
        messageText:msg
      },
    });
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  template: '<h3>{{data?.messageText}}</h3>',
})
export class MessageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}
}