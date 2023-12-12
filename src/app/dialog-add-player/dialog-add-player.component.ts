import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
name: any = ''

constructor( public dialogRef: MatDialogRef<DialogAddPlayerComponent>){}

onNoClick(){
  this.dialogRef.close();
}

}
