import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from 'src/app/services/Dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-signature',
  templateUrl: './add-signature.component.html',
  styleUrls: ['./add-signature.component.css']
})
export class AddSignatureComponent implements OnInit {

  signature: FormGroup;

  constructor(private userService: UserService, public dialog: Dialog) {
    this.signature = new FormGroup({});
  }

  ngOnInit(): void {
    this.signature = new FormGroup({
      signatureInputFile: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });
  }

  addSignature() {
    if(this.signature.valid) {
      this.userService.addSignature(this.signature.controls['file'].value).subscribe({
        next: userServiceResponse => {
          sessionStorage.setItem('idSignature', userServiceResponse.firma.id);
          this.dialog.openDialog(userServiceResponse.msg, '');
        }
      });
    }
  }

  loadFile(event: any) {
    if(event.target.files.length > 0) {
      const fileEvent = event.target.files[0];
      this.signature.patchValue({
        file: fileEvent
      });
    }
  }

}
