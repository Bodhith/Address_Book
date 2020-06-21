import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './COMPONENTS/MainComponent/main.component';
import { HomeComponent } from './COMPONENTS/HomeComponent/home.component';
import { AddContact } from './COMPONENTS/AddContactComponent/addContact.component';
import { ContactDetails } from './COMPONENTS/ContactDetails/contactDetails.component';
import { EditContact } from './COMPONENTS/EditContactComponent/editContactComponent';

const routes: Routes = [
  
  { path: "main", component: MainComponent, outlet: "primary", children: 
      [
        { path: "home", component: HomeComponent, outlet: "secondary", children: 
            [
              { path: "contactDetails/:contactId", component: ContactDetails, outlet: "tertiary" },

              { path: "editContact/:contactId", component: EditContact, outlet: "tertiary " }
            ] 
        },

        { path: "addContact", component: AddContact, outlet: "secondary" }
      ]
  },
  
  {
    path: '**', redirectTo: "/main", outlet: "primary"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }