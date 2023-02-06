import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/services/Dialog';
import { Note } from 'src/app/models/Note';
import { CaiService } from 'src/app/services/cai/cai.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  idNote: string;
  noteForm: FormGroup;
  backRouteNote: string;
  titleNote: string;
  isPrincipalNote: boolean;
  dataNote: Note;
  isLoaded: boolean;

  constructor(private route: ActivatedRoute, private dialog: Dialog, private caiService: CaiService, private rolePermission: RolePermission) {
    this.idNote = route.snapshot.paramMap.get('idNote') || '';
    this.noteForm = new FormGroup({});
    this.backRouteNote = '/cai-admin';
    this.titleNote = ((this.idNote === '') ? 'Agregar ' : 'Actualizar ') + 'Nota';
    this.isPrincipalNote = false;
    this.dataNote = new Note();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    if(this.idNote !== '') {
      this.getDataNote();
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.noteForm = new FormGroup({
      activityName: new FormControl(this.dataNote.descripcion, [Validators.required]),
    });
    this.isLoaded = true;
  }

  onSubmit() {
    if(this.noteForm.valid) {
      this.loadNoteData();
      if(this.idNote === '') {
        this.addNote();
      } else {
        this.updateNote();
      }
    } else {
      this.dialog.openDialog('Debe llenar todos los campos', '');
    }
  }

  addNote() {
    this.caiService.addNote(this.dataNote).subscribe({
      next: noteResponse => {
        this.dialog.openDialog(noteResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/notas/', error))
      }
    });
  }

  updateNote() {
    this.caiService.updateNote(this.idNote, this.dataNote).subscribe({
      next: noteResponse => {
        this.dialog.openDialog(noteResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/notas/' + this.idNote, error))
      }
    });
  }

  getDataNote() {
    this.caiService.getNoteItemById(this.idNote).subscribe({
      next: noteResponse => {
        this.dataNote = noteResponse;
        this.initForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/notas/' + this.idNote, error))
      }
    });
  }

  loadNoteData() {
    this.dataNote.descripcion = this.noteForm.get('activityName')?.value;
  }

}
