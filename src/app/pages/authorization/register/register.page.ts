import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private formBuilder:FormBuilder;
  private auth:AuthService;

  registerForm:FormGroup;

  constructor(
    auth:AuthService,
    formBuilder:FormBuilder,

  ) { 
    this.auth=auth;
    this.formBuilder=formBuilder;
    
  }

  ngOnInit() {
    this.registerFormBuilder();
  }


  public registerFormBuilder(){
    this.registerForm = this.formBuilder.group({
      email:[
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ],

      username:[
        '',
        Validators.compose([
          Validators.required,
        ])
      ],

      password:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])
      ],

    })
  }

  

  public async onSignup(){
    const {
      email,
      username,
     password,
    }=this.registerForm.value

    console.log(email,username,password,'eklendi');
    await this.auth.signup(email,password,username)
    if(this.auth.isProcces)
    this.auth.isProcces = true

  }

}
