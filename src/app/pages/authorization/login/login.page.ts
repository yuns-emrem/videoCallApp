import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private readonly formBuilder: FormBuilder;
  private readonly authService: AuthService;

  loginForm: FormGroup;
  isProcces: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    authService: AuthService,

  ) {
    this.formBuilder = formBuilder;
    this.authService = authService;
  }

  ngOnInit() {
    this.loginFormBuilder();
  }

  public loginFormBuilder(){
    this.loginForm = this.formBuilder.group({
      email:[
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
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

  public async onSignin(){
    const {
      email,
      password,
    } = this.loginForm.value;

    await this.authService.signin(email,password)
    if(this.authService.isLoggedIn)
    this.isProcces = true;
    console.log(email,password,'giriş yapıldı');
  }

  handleLogout(){
    this.isProcces = false;
  }



}
