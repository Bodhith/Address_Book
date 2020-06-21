import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/SERVICES/contact.service';
import { ContactModel } from 'src/app/MODELS/contact.model';

@Component({
    templateUrl: "./contactDetails.component.html",
    styleUrls: ["./contactDetails.component.css"],
})

export class ContactDetails implements OnInit
{
    private contactId: number;
    private userBasicSections: number;
    public contact: ContactModel;

    contactAttributeValues: Array<string>;

    constructor(private router: Router, private activatedRouter: ActivatedRoute, private contactService: ContactService)             // Should this be an Activated router of a Snapshot is fine?
    {
    }

    ngOnInit()
    {
        this.PrintDetails();
    }

    PrintDetails()
    {
        this.contactAttributeValues = new Array<string>();

        this.userBasicSections = 5;

        this.activatedRouter.params.subscribe(params => {

            this.contactId = parseInt(params['contactId']);

            this.contact = this.contactService.GetDetails(this.contactId);
        });
    }

    EditContact()
    {
        this.router.navigateByUrl("/main/(secondary:home/(tertiary:editContact/"+this.contactId.toString()+"))");

        console.log("/main/(secondary:home/(tertiary:editContact/"+this.contactId.toString()+"))");
    }

    DeleteContact()
    {
        this.contactService.DeleteContact(this.contactId);

        this.router.navigateByUrl("/main/(secondary:home)")
    }
}   