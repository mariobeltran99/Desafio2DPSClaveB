import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from '../../services/clients.service';
import { RepairsService } from '../../services/repairs.service';
import { RepairView } from '../../interfaces/repair-view';
import { Client } from '../../interfaces/client';
import { ModalDeleteRepairsComponent } from '../modal-delete-repairs/modal-delete-repairs.component';
@Component({
  selector: 'app-manage-repairs',
  templateUrl: './manage-repairs.component.html',
  styleUrls: ['./manage-repairs.component.css'],
})
export class ManageRepairsComponent implements OnInit {
  repairForm: FormGroup;
  repairs: RepairView[] = [];
  createMode: boolean = true;
  clientsReg: Client[] = [];
  reids: string = null;
  repairName = null;
  descrep: number = 0;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private clientServices: ClientsService,
    private repairServices: RepairsService
  ) {}

  ngOnInit() {
    this.repairForm = this.fb.group({
      client: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [
        Validators.required,
        Validators.pattern('^([0-9]+(.?[0-9]?[0-9]?)?)'),
        Validators.min(5.0),
        Validators.max(10000.0),
      ]),
    });
    this.clientServices.getClients().subscribe((respond) => {
      this.clientsReg = [];
      respond.docs.forEach((value) => {
        const data = value.data();
        const client: Client = {
          name: data.name,
          dui: data.dui,
          marca: data.marca,
          model: data.model,
          visit: data.visit,
        };
        this.clientsReg.push(client);
      });
    });
    this.loadRepairs();
  }
  isFieldValid1(field: string) {
    const repai = this.repairForm.get(field);
    return (repai.touched || repai.dirty) && !repai.valid;
  }
  getErrorMessage1(field: string) {
    let message;
    const forms = this.repairForm.get(field);
    if (forms.hasError('required')) {
      message = 'El campo es requerido.';
    }
    switch (field) {
      case 'cost':
        if (forms.hasError('pattern')) {
          message = 'Solo números con formato (0.00)';
        } else if (forms.hasError('min')) {
          message = 'Debe ser mínimo $5.00';
        } else if (forms.hasError('max')) {
          message = 'Debe ser máximo $10,000.00';
        }
        break;
    }
    return message;
  }
  onSave() {
    if (this.repairForm.valid) {
      const { client, cost } = this.repairForm.value;
      const desc1 = 0.05;
      const desc2 = 0.10;
      this.clientServices.getExistsDUI(client).subscribe((respond) => {
        const clients = respond.docs[0].data() as Client;
        const clientID = respond.docs[0].id;
        let desc = 0;
        if (clients.visit == 2) {
          desc = desc1;
        } else if (clients.visit > 4) {
          desc = desc2;
        } else {
          desc = 0;
        }
        const vists = {
          visit: clients.visit + 1,
        };
        this.clientServices.editClientFragment(clientID, vists);
        const ticket = {
          name: clients.name,
          dui: clients.dui,
          marca: clients.marca,
          model: clients.model,
          cost: cost,
          desc: desc,
          amountdesc: cost * desc,
          pay: cost - cost * desc,
        };
        this.repairServices
          .saveRepair(ticket)
          .then((res) => {
            this.resetRepairForm();
            this.toastr.success(
              'Reparación Registrada',
              'Enviado Exitosamente'
            );
            this.loadRepairs();
            this.repairForm.get('client').setValue('');
          })
          .catch((ex) => {
            this.toastr.error(
              'No se pudo completar la petición al servidor',
              'Error'
            );
          });
      });
    }
  }
  loadRepairs() {
    this.repairServices.getRepairs().subscribe((respond) => {
      this.repairs = [];
      respond.docs.forEach((value) => {
        const data = value.data();
        const id = value.id;
        const repair: RepairView = {
          id: id,
          name: data.name,
          dui: data.dui,
          marca: data.marca,
          model: data.model,
          cost: data.cost,
          desc: data.desc,
          amountdesc: data.amountdesc,
          pay: data.pay,
        };
        this.repairs.push(repair);
      });
    });
  }
  onEdit() {
    if (this.repairForm.valid) {
      const { cost } = this.repairForm.value;
      const ticket = {
        cost: cost,
        desc: this.descrep,
        amountdesc: cost * this.descrep,
        pay: cost - cost * this.descrep,
      };
      this.repairServices
        .editRepairFragment(this.reids, ticket)
        .then((res) => {
          this.resetRepairForm();
          this.toastr.success(
            'Reparación Actualizada',
            'Modificación Exitosamente'
          );
          this.loadRepairs();
          this.createMode = true;
          this.descrep = 0;
          this.reids = null;
          this.repairName = null;
          this.repairForm.controls['client'].enable();
          this.repairForm.get('client').setValue('');
        })
        .catch((ex) => {
          this.toastr.error(
            'No se pudo completar la petición al servidor',
            'Error'
          );
        });
    }
  }
  
  editRepair(repairs: RepairView) {
    this.reids = repairs.id;
    this.repairName = 'Nombre: ' + repairs.name + ' --- DUI: ' + repairs.dui;
    this.repairForm
      .get('client')
      .setValue('Nombre: ' + repairs.name + ' --- DUI: ' + repairs.dui);
    this.repairForm.controls['client'].disable();
    this.repairForm.get('cost').setValue(repairs.cost);
    this.createMode = false;
    this.descrep = repairs.desc;
  }
  deleteRepair(id: string) {
    if(this.createMode == true){
      const dialogRef = this.dialog.open(ModalDeleteRepairsComponent);
      dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.repairServices
          .deleteRepair(id)
          .then((res) => {
            this.loadRepairs();
            this.toastr.success('Reparación Eliminada', 'Eliminado Exitosamente');
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
  generateTicket(repair: RepairView) {
    
  }
  resetRepairForm() {
    const repair = this.repairForm;
    repair.reset();
    Object.keys(repair.controls).forEach((key) => {
      repair.controls[key].setErrors(null);
    });
  }
}
