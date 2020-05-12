import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { MenuComponent } from "./components/menu/menu.component";
import { CargaEntrenamientoComponent } from "./components/carga-entrenamiento/carga-entrenamiento.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CargaEntrenamientoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
