import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth,private router:Router) { }
  login(email:string,password:string){
    this.auth.signInWithEmailAndPassword(email,password)
    .then(() => {
      alert("Login successful");
      this.router.navigate(['/todo']);
    })
    .catch((err) => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  registor(email:string,password:string){
    this.auth.createUserWithEmailAndPassword(email,password)
    .then(() => {
      alert("Login successful");
      this.router.navigate(['/login']);
    })
    .catch((err) => {
      alert(err.message);
      this.router.navigate(['/registor']);
    })
  }
}
