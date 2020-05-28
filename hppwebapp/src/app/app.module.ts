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
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SignUpComponent } from './components/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CargaEntrenamientoComponent,
    EntrenamientoDiarioComponent,
    ConsultaEntrenamientoComponent,
    ConsultaScoreComponent,
    LandingPageComponent,
    SignUpComponent,
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
      { path: "", component: LandingPageComponent }
    ]),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
