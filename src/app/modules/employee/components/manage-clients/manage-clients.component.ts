import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientView } from '../../interfaces/client-view';
import { ClientsService } from '../../services/clients.service';
import { ModalDeleteClientComponent } from '../modal-delete-client/modal-delete-client.component';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css'],
})
export class ManageClientsComponent implements OnInit {
  clientForm: FormGroup;
  createMode: boolean = true;
  constructor(
    private fb: FormBuilder,
    private clientServices: ClientsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

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
        Validators.minLength(2),
        Validators.maxLength(60),
      ]),
      model: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
      ]),
    });
    this.loadClients();
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
      case 'marca':
        if (forms.hasError('minlength')) {
          message = 'Debe contener como mínimo 2 caracteres';
        } else if (forms.hasError('maxlength')) {
          message = 'Debe contener como máximo 60 caracteres';
        }
        break;
      case 'model':
        if (forms.hasError('minlength')) {
          message = 'Debe contener como mínimo 2 caracteres';
        } else if (forms.hasError('maxlength')) {
          message = 'Debe contener como máximo 60 caracteres';
        }
        break;
    }
    return message;
  }
  onSave() {
    if (this.clientForm.valid) {
      const { name, dui, marca, model } = this.clientForm.value;
      const reg = new RegExp('^\\s');
      if (
        reg.test(marca) == true ||
        reg.test(model) == true ||
        reg.test(name)
      ) {
        this.toastr.warning(
          'Hay campos rellenados con espacios',
          'Advertencia'
        );
      } else {
        this.clientServices.getExistsDUI(dui).subscribe((respond) => {
          const duiCount = respond.docs.length;
          if (duiCount == 0) {
            const client = {
              name: name,
              dui: dui,
              marca: marca,
              model: model,
              visit: 0,
            };
            this.clientServices
              .saveClient(client)
              .then((res) => {
                this.resetClientForm();
                this.toastr.success(
                  'Cliente Registrado',
                  'Enviado Exitosamente'
                );
                this.loadClients();
                this.clientForm.get('name').setValue('');
              })
              .catch((ex) => {
                this.toastr.error(
                  'No se pudo completar la petición al servidor',
                  'Error'
                );
              });
          } else {
            this.toastr.warning('Este dui ya existe', 'Advertencia');
          }
        });
      }
    }
  }
  clients: ClientView[] = [];
  loadClients() {
    this.clientServices.getClients().subscribe((respond) => {
      this.clients = [];
      respond.docs.forEach((value) => {
        const data = value.data();
        const id = value.id;
        const client: ClientView = {
          id: id,
          name: data.name,
          dui: data.dui,
          marca: data.marca,
          model: data.model,
          visit: data.visit,
        };
        this.clients.push(client);
      });
    });
  }
  cids: string = null;
  editClient(client: ClientView) {
    this.cids = client.id;
    this.clientForm.get('name').setValue(client.name);
    this.clientForm.get('dui').setValue(client.dui);
    this.clientForm.controls['dui'].disable();
    this.clientForm.get('marca').setValue(client.marca);
    this.clientForm.get('model').setValue(client.model);
    this.createMode = false;
  }
  onEdit() {
    if (this.clientForm.valid) {
      const { name, marca, model } = this.clientForm.value;
      const reg = new RegExp('^\\s');
      if (
        reg.test(marca) == true ||
        reg.test(model) == true ||
        reg.test(name)
      ) {
        this.toastr.warning(
          'Hay campos rellenados con espacios',
          'Advertencia'
        );
      } else {
        const client = {
          name: name,
          marca: marca,
          model: model,
        };
        this.clientServices
          .editClientFragment(this.cids, client)
          .then((res) => {
            this.toastr.success('Cliente Editado', 'Modificado Exitosamente');
            this.loadClients();
            this.createMode = true;
            this.cids = null;
            this.clientForm.controls['dui'].enable();
            this.resetClientForm();
            this.clientForm.get('name').setValue('');
          })
          .catch((ex) => {
            this.toastr.error(
              'No se pudo completar la petición al servidor',
              'Error'
            );
          });
      }
    }
  }
  deleteClient(id: string) {
    if(this.createMode == true){
      const dialogRef = this.dialog.open(ModalDeleteClientComponent);
      dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.clientServices
          .deleteClient(id)
          .then((res) => {
            this.loadClients();
            this.toastr.success('Cliente Eliminado', 'Eliminado Exitosamente');
          })
          .catch((ex) => {
            this.toastr.error(
              'No se pudo completar la petición al servidor',
              'Error'
            );
          });
      }
    });
    }else{
      this.toastr.error(
        'No se puede eliminar registros porque se esta ejecutando una acción de edición',
        'Error'
      );
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
