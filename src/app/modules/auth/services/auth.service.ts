import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,private toastr: ToastrService) { }
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
      this.afAuth.signOut();
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
}
