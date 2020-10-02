import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css'],
})
export class ManageClientsComponent implements OnInit {
  clientForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.clientForm = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/
        ),
        Validators.minLength(2),
        Validators.maxLength(60),
      ]),
      dui: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9]'),
      ]),
      marca: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      model: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
    });
  }
  isFieldValid1(field: string) {
    const client = this.clientForm.get(field);
    return (client.touched || client.dirty) && !client.valid;
  }
  getErrorMessage1(field: string): string {
    let message;
    const forms = this.clientForm.get(field);
    if (forms.hasError('required')) {
      message = 'El campo es requerido.';
    }
    switch (field) {
      case 'name':
        if (forms.hasError('pattern')) {
          message = 'Solo se aceptan letras';
        } else if (forms.hasError('minlength')) {
          message = 'Debe contener como mínimo 2 caracteres';
        } else if (forms.hasError('maxlength')) {
          message = 'Debe contener como máximo 60 caracteres';
        }
        break;
      case 'dui':
        if (forms.hasError('pattern')) {
          message = 'Debe tener el formato 00000000-0';
        }
        break;
      case 'marca' || 'model':
        if (forms.hasError('minlength')) {
          message = 'Debe contener como mínimo 3 caracteres';
        } else if (forms.hasError('maxlength')) {
          message = 'Debe contener como máximo 60 caracteres';
        }
      break;
    }
    return message;
  }
  clients = ['hola'];
  onSave() {
    if(this.clientForm.valid){

    }
  }
  resetClientForm() {
    const client = this.clientForm;
    client.reset();
    Object.keys(client.controls).forEach((key) => {
      client.controls[key].setErrors(null);
    });
  }
}
