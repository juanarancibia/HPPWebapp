import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    pwd: "",
  };


  public loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      pwd: new FormControl(),
    });
  }

  login(): any {
    this.user = {
      email: this.loginForm.value.email,
      pwd: this.loginForm.value.pwd,
    };

    this.loginService.logInUsuario(this.user).subscribe(
      {
        next: tok => { localStorage.setItem('token', tok.token); localStorage.setItem('rol', tok.rol); this.router.navigateByUrl('entrenamiento-diario'); },
        error: err => console.log(err)
      }
    );
  }
}
