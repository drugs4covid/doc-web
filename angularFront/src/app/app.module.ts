import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { NewComponent } from './views/new/new.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditComponent } from './views/edit/edit.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import  {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {MatDividerModule  } from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
   
    LoginComponent,
    NewComponent,
    DashboardComponent,
    EditComponent,

  ],
  imports: [
    NgxDropzoneModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NgbModule,

    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
