import { Component, OnInit } from "@angular/core";
import { ContactModel } from 'src/app/MODELS/contact.model';
import { ContactService } from 'src/app/SERVICES/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Component({
    selector: "contactsList",
    templateUrl: "./contactsList.component.html",
    styleUrls: ["./contactsList.component.css"]
})

export class ContactsList implements OnInit
{
    public ContactsList: Array<ContactModel>;
    
    constructor(private contactService: ContactService, private activatedRouter: ActivatedRoute, private router: Router)
    {
    }

    ngOnInit()
    {
        this.PrintContactsList();
    }

    PrintContactsList()
    {
        this.contactService.GetContactsListFromDb();

        this.contactService.CurrentContactsList.subscribe(params => {
            
            this.ContactsList = params;

            return;
        });
    }

    Redirect(contactId: number)
    {
        this.router.navigateByUrl("/main/(secondary:home/(tertiary:contactDetails/"+contactId.toString()+"))");
    }
}