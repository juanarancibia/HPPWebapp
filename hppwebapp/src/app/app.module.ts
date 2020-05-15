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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CargaEntrenamientoComponent,
    EntrenamientoDiarioComponent,
    ConsultaEntrenamientoComponent,
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
