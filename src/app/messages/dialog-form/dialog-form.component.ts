import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface DialogData {
  name: '',
  message: ''
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
],
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormComponent>,
    private _snackBar: MatSnackBar,
  ) { }

  messageForm: FormGroup;
  spiner: boolean = false;
  error:string;
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.createMessageForm();
  }

  createMessageForm() {
    this.messageForm = this.fb.group({
      name: ['',Validators.required],
      message: ['',Validators.required]
    })
  }

  submit() {
    this.spiner = true;
    console.log("form", this.messageForm.value);
    
    // this._messagesService.post(this.messageForm.value).then(res => {
    //   this._snackBar.open("Message saved successfully!", "Undo", {
    //     duration: 3000
    //   });
    //   this.messageForm.reset()
    //   this.onNoClick();
    //   this.spiner = false;
    // }).catch(err=>{
    //   this.error="Error!";
    // });

  }

  reset(){
    this.messageForm.reset()
  }
}
