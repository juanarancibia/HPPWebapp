import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { MenuComponent } from "./components/menu/menu.component";
import { CargaEntrenamientoComponent } from "./components/carga-entrenamiento/carga-entrenamiento.component";
import { EntrenamientoDiarioComponent } from './components/entrenamiento-diario/entrenamiento-diario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConsultaEntrenamientoComponent } from './components/consulta-entrenamiento/consulta-entrenamiento.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaScoreComponent } from './components/consulta-score/consulta-score.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { FilterPipe } from './filter.pipe';
import { UpdateUsuarioComponent } from './components/update-usuario/update-usuario.component';
import { ModificarEntrenamientoComponent } from './components/modificar-entrenamiento/modificar-entrenamiento.component';
import { ModificarPerfilComponent } from './components/modificar-perfil/modificar-perfil.component';
import { MisScoresComponent } from './components/mis-scores/mis-scores.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CargaEntrenamientoComponent,
    EntrenamientoDiarioComponent,
    ConsultaEntrenamientoComponent,
    ConsultaScoreComponent,
    SignUpComponent,
    AltaUsuarioComponent,
    UpdateUsuarioComponent,
    FilterPipe,
    ModificarEntrenamientoComponent,
    ModificarPerfilComponent,
    MisScoresComponent,
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      { path: "entrenamiento-diario", component: EntrenamientoDiarioComponent },
      { path: "carga-entrenamiento", component: CargaEntrenamientoComponent },
      { path: "consultar-entrenamiento", component: ConsultaEntrenamientoComponent },
      { path: "consulta-scores", component: ConsultaScoreComponent },
      { path: "signup", component: SignUpComponent },
      { path: "alta-usuario", component: AltaUsuarioComponent },
      { path: "update-usuario", component: UpdateUsuarioComponent },
      { path: "modificar-entrenamiento", component: ModificarEntrenamientoComponent },
      { path: "modificar-perfil", component: ModificarPerfilComponent },
      { path: "mis-scores", component: MisScoresComponent },
      { path: "", component: EntrenamientoDiarioComponent }
    ]),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
