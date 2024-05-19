import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrl: './registor.component.css'
})
export class RegistorComponent {
  constructor(private auth : AuthService){}
  email : string = '';
  password : string = '';
  registor(){
    if(this.email == ''){
      alert("Please enter email");
      return;
    }
    if(this.password == ''){
      alert("Please enter password");
      return;
    }
    this.auth.register(this.email,this.password);
    this.email = '';
    this.password = '';
  }
}
