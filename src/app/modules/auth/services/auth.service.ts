import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(public afAuth: AngularFireAuth,private toastr: ToastrService) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  
  login(email: string, password:string){
    try {
      const result = this.afAuth.signInWithEmailAndPassword(email,password);
      return result;
    } catch (error) {
      this.toastr.error('Ocurrió un problema con la petición enviada','Error');
    }
  }
  loginGoogle(){
    try {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      this.toastr.error('Ocurrió un problema con la petición enviada al servidor','Error');
    }
  }
  register(email: string, password:string){
    try {
      const result = this.afAuth.createUserWithEmailAndPassword(email,password);
      return result
    } catch (error) {
      this.toastr.error('Ocurrió un problema con la petición enviada','Error');
    }
  }
  logout(){
    try {
      this.afAuth.signOut().then(res => {
        localStorage.setItem('user', null);
        localStorage.removeItem('user');
      });
    } catch (error) {
      this.toastr.error('Ocurrió un problema con la petición enviada','Error');
    }
  }
  resetPassword(email:string){
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.toastr.error('Ocurrió un problema con la petición enviada','Error');
    }
  }
  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.email !== null) ? true : false;
  }
}
