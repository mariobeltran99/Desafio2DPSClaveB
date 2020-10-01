import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
    });
  }

  isFieldValid1(field: string) {
    const forgot = this.forgotForm.get(field);
    return (forgot.touched || forgot.dirty) && !forgot.valid;
  }
  getErrorMessage1(field: string): string {
    let message;
    const forms = this.forgotForm.get(field);
    if (forms.hasError('required')) {
      message = 'El campo es requerido.';
    } else if (forms.hasError('email')) {
      message =
        'El correo ingresado es inválido, debe cumplir este formato: juan@gmail.com';
    } else if (forms.hasError('maxlength')) {
      message = 'Debe contener como máximo cien caracteres';
    }
    return message;
  }
  onReset() {
    const { email } = this.forgotForm.value;
    this.authServices
      .resetPassword(email)
      .then((res) => {
        this.toastr.success('Revise su bandeja de entrada para restablecer la contraseña','Correo Enviado Exitosamente');
        this.resetForgotForm();
      })
      .catch((err) => {
        this.toastr.warning('No se pudo enviar el correo para restablecer su contraseña','Advertencia');
      });
  }
  resetForgotForm() {
    const forgot = this.forgotForm;
    forgot.reset();
    Object.keys(forgot.controls).forEach((key) => {
      forgot.controls[key].setErrors(null);
    });
  }
}
