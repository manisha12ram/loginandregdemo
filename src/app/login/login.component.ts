import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { 
    console.log("construtor call")
  }

  loginForm: FormGroup;
  isSubmitted  =  false;

  ngOnInit() {
    console.log("oninit call")
    this.loginForm  =  this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, 
          Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
        password: ['', [Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
}
login()
{
  console.log(this.loginForm.value);
  this.isSubmitted = true;
  if(this.loginForm.invalid)
  {
    return;
  }
  let user= this.loginForm.value;

  if((user.email === "manisha12@gmail.com" || user.email === "9840672086") && user.password === "Chicken@65")
  {
    this.authService.login(user);
  this.router.navigateByUrl('/admin');
  }
  else {
    alert("Invalid credentials");
  }
}
get formControls() { return this.loginForm.controls; }
}
