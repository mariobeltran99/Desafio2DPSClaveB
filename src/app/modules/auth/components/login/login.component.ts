import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.registerForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S+$/
        ),
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    });
  }
  isFieldValid1(field: string) {
    const login = this.loginForm.get(field);
    return (login.touched || login.dirty) && !login.valid;
  }

  getErrorMessage1(field: string): string {
    let message;
    const forms = this.loginForm.get(field);
    if (forms.hasError('required')) {
      message = 'El campo es requerido.';
    }
    switch (field) {
      case 'password':
        if (forms.hasError('minlength')) {
          message = 'Debe contener al menos seis caracteres';
        } else if (forms.hasError('minlength')) {
          message = 'Debe contener como mínimo ocho caracteres';
        }
        break;
      case 'email':
        if (forms.hasError('email')) {
          message =
            'El correo ingresado es inválido, debe cumplir este formato: juan@gmail.com';
        } else if (forms.hasError('maxlength')) {
          message = 'Debe contener como máximo cien caracteres';
        }
        break;
    }
    return message;
  }
  isFieldValid2(field: string) {
    const register = this.registerForm.get(field);
    return (register.touched || register.dirty) && !register.valid;
  }
  getErrorMessage2(field: string): string {
    let message;
    const forms = this.registerForm.get(field);
    if (forms.hasError('required')) {
      message = 'El campo es requerido.';
    }
    switch (field) {
      case 'password':
        if (forms.hasError('pattern')) {
          message =
            'Debe contener al menos un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.';
        } else if (forms.hasError('minlength')) {
          message = 'Debe contener como mínimo ocho caracteres';
        }
        break;
      case 'email':
        if (forms.hasError('email')) {
          message =
            'El correo ingresado es inválido, debe cumplir este formato: juan@gmail.com';
        } else if (forms.hasError('maxlength')) {
          message = 'Debe contener como máximo cien caracteres';
        }
        break;
    }
    return message;
  }
  onLogin() {
    if(this.loginForm.valid){
      const {email,password} = this.loginForm.value;
      this.authServices.login(email,password).then(respond => {
        this.resetLoginForm();
        this.router.navigate(['/employee/manage-clients']);
      }).catch(ex => {
        this.toastr.warning('Pueda que no exista el usuario ingresado','Advertencia');
      })
    }
  }
  onLoginGoogle() {
    this.authServices.loginGoogle().then(respond => {
      this.router.navigate(['/employee/manage-clients']);
    }).catch(ex => {
      this.toastr.warning('Hay problemas con el proveedor de Google, vuelva a intentarlo nuevamente','Advertencia');
    })
  }
  onRegister() {
    if(this.registerForm.valid){
      const {email,password,passwordConfirm} = this.registerForm.value;
      if(password == passwordConfirm){
        this.authServices.register(email,password).then(respond => {
          this.resetRegisterForm();
          this.router.navigate(['/employee/manage-clients']);
        }).catch(ex => {})
      }else{
        this.toastr.warning('Las contraseñas no coinciden','Advertencia');
      }
    } 
  }
  resetLoginForm() {
    const login = this.loginForm;
    login.reset();
    Object.keys(login.controls).forEach((key) => {
      login.controls[key].setErrors(null);
    });
  }
  resetRegisterForm() {
    const register = this.registerForm;
    register.reset();
    Object.keys(register.controls).forEach((key) => {
      register.controls[key].setErrors(null);
    });
  }
}
