import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import  { ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './COMPONENTS/MainComponent/main.component';
import { HomeComponent } from './COMPONENTS/HomeComponent/home.component';
import { ContactsList } from './COMPONENTS/ContactsList/contactsList.component';
import { AddContact } from './COMPONENTS/AddContactComponent/addContact.component';
import { ContactDetails } from './COMPONENTS/ContactDetails/contactDetails.component';
import { EditContact } from './COMPONENTS/EditContactComponent/editContactComponent';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],

  declarations: [
    AppComponent,

    MainComponent,
    HomeComponent,
    ContactsList,
    AddContact,
    ContactDetails,
    EditContact
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
