import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//--angular material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {AngularMaterialModule} from './modules/core/models/angular-material/angular-material.module';

//--firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

//--others imports
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


//--components imports
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { ViewCentralComponent } from './modules/employee/components/view-central/view-central.component';
import { ManageClientsComponent } from './modules/employee/components/manage-clients/manage-clients.component';
import { ManageRepairsComponent } from './modules/employee/components/manage-repairs/manage-repairs.component';
import { PageNotFoundComponent } from './modules/core/components/page-not-found/page-not-found.component';
import { ModalSignOutComponent } from './modules/core/components/modal-sign-out/modal-sign-out.component';
import { ForgotPasswordComponent } from './modules/auth/components/forgot-password/forgot-password.component';
import { ModalDeleteClientComponent } from './modules/employee/components/modal-delete-client/modal-delete-client.component';
import { ModalDeleteRepairsComponent } from './modules/employee/components/modal-delete-repairs/modal-delete-repairs.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewCentralComponent,
    ManageClientsComponent,
    ManageRepairsComponent,
    PageNotFoundComponent,
    ModalSignOutComponent,
    ForgotPasswordComponent,
    ModalDeleteClientComponent,
    ModalDeleteRepairsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
