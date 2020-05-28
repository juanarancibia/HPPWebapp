import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  fg: FormGroup;

  constructor(private fb: FormBuilder, private signupService: SignupService) { }



  ngOnInit(): void {
    this.fg = this.fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required]],
      sexo: [null, [Validators.required]],
      fechaNac: ["", [Validators.required]]
    })
  }

  signUp() {
    if (this.fg.valid) {
      var fgValue = this.fg.value;
      var user = new Usuario(fgValue.email, fgValue.nombre, fgValue.apellido, fgValue.pwd, fgValue.sexo, fgValue.fechaNac);
      console.log("Cargo");
      this.signupService.signup(user).subscribe({
        next: res => { res.name == "SequelizeUniqueConstraintError" ? window.alert("Ya existe un usuario con este email") : window.alert("Ahora puede ingresar con el email: " + res.name); console.log(res) },
        error: err => { err.name == "SequelizeUniqueConstraintError" ? window.alert("Ya existe un usuario con este email") : window.alert("Ocurrio un error al registrar el usuario"); console.log(err) }
      });
    } else {
      window.alert("Complete los campos con los valores correspondientes");
    }
  }

}
