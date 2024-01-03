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
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MessagesService } from 'src/app/service/messages.service';


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


  constructor(
    public dialog: MatDialog,
    private _messagesService: MessagesService
    ) {      
   }
  displayedColumns: string[] = ['ID', 'Name', 'Message', 'Date', 'Action'];
  dataSource: any;
  spiner: boolean = true;
 public messageText:string;

 //ngrx
 products: Observable<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshData();

    // this._messagesService.gets().subscribe(msgs => {
    //   this.dataSource = new MatTableDataSource<any>(msgs);
    //   this.dataSource.paginator = this.paginator;
    //   this.spiner = false;
    // })
  }

// Add a parameter to receive data in the openDialog method
openDialog(messageDetails: any, detail:boolean): void {
  const dialogRef = this.dialog.open(DialogFormComponent, {
    height: '400px',
    width: '600px',
    panelClass: 'dialogC',
    // Pass the data to the dialog
    data: { messageDetails: messageDetails , detail: detail}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.refreshData(); // Refresh data after dialog close
  });
}

  openMsgDialog(msg:string): void {
    this.dialog.open(MessageDialog, {
      data: {
        messageText:msg
      },
    });
  }

  delete(msg: any): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this message?');
    if (isConfirmed) {
      this._messagesService.delete(msg._id)
        .pipe(
          tap(() => console.log('Message deleted successfully')),
          catchError(error => {
            console.error('Error deleting message:', error);
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.refreshData(); // Refresh data after deletion
        });
    }
  }

  update(msg:any) {
    console.log("update",msg);
    this._messagesService.getMessageById(msg._id).subscribe(msg => {
      console.log("update by id", msg);
      // Open the dialog and pass the message details as data
      this.openDialog(msg, false);
    })

  }

  details(msg:any, detail:boolean) {
    console.log("details",msg);
    this._messagesService.getMessageById(msg._id).subscribe(msg => {
      console.log("details by id", msg);
      // Open the dialog and pass the message details as data
      this.openDialog(msg, detail);
    })

  }

  private refreshData(): void {
    this.dataSource = this._messagesService.gets();
    this.dataSource.subscribe((msgs:any) => {
      this.dataSource = new MatTableDataSource<any>(msgs);
      this.dataSource.paginator = this.paginator;
      this.spiner = false;
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