import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesService } from 'src/app/service/messages.service';

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
    private _messagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA) public data: { messageDetails: any , detail:boolean}
  ) { }

  messageForm: FormGroup;
  spiner: boolean = false;
  error:string;
  messageDetails: any;
  detail: boolean;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.createMessageForm();
     // Access data.messageDetails directly
    if (this.data && this.data.messageDetails) {
      this.messageDetails = this.data.messageDetails;
      this.detail = this.data.detail;
      console.log("detail",this.messageDetails, this.detail);
      this.messageForm.patchValue(this.messageDetails);
      if(this.detail){
        this.messageForm.get('name')?.disable();
        this.messageForm.get('message')?.disable();
      }
    }

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

    const formData = this.messageForm.value;

    if (this.messageDetails && this.messageDetails._id) {
      // update operation
      this._messagesService.updateMessageById(this.messageDetails._id, formData).subscribe(
        (updatedData) => {
          // Handle successful update
          this._snackBar.open("Message updated successfully!", "Undo", {
            duration: 3000,
          });
          this.messageForm.reset();
          this.dialogRef.close({ success: true, newData: updatedData });
        },
        (error) => {
          // Handle error
          console.error('Error updating message:', error);
        }
      );
    } else {
      // Add operation
      this._messagesService.post(formData).subscribe(
        (res) => {
          this._snackBar.open("Message saved successfully!", "Undo", {
            duration: 3000,
          });
          this.messageForm.reset();
          this.dialogRef.close({ success: true, newData: res });
        },
        (error) => {
          this.spiner = false;
          this.error = "Error saving message!";
        }
      );
    }
  }

  reset() {
    this.messageForm.reset();
  }


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
