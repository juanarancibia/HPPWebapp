import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { Token } from '@angular/compiler/src/ml_parser/lexer';

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

  constructor(private loginService: LoginService) { }

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
        next: tok => { localStorage.setItem('token', tok.token); localStorage.setItem('rol', tok.rol); },
        error: err => console.log(err)
      }
    );
  }
}
