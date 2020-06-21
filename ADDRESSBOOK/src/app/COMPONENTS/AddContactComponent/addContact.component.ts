import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/SERVICES/contact.service';
import { ContactModel } from 'src/app/MODELS/contact.model';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: "./addContact.component.html",
    styleUrls: ["./addContact.component.css"]
})

export class AddContact implements OnInit
{
    AddContactForm: FormGroup;

    NameInputErrors: Map<string,string>;
    EmailInputErrors: Map<string,string>;
    PhoneInputErrors: Map<string,string>;
    AddressInputErrors: Map<string,string>;

    constructor(private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute, 
                private contactService: ContactService, private router: Router, private httpClient: HttpClient)
    {
    }

    ngOnInit()
    {
        this.MakeForm();
    }

    MakeForm()
    {
        this.ValidationErrorMessages();

        this.AddContactForm = this.formBuilder.group({
            'nameInput': ['', [Validators.required]],
            'emailInput': ['', [Validators.email, Validators.maxLength(345)]],
            'phoneInput': ['', [Validators.pattern("^[0-9]+$"), Validators.maxLength(15)]],
            'addressInput': ['', [Validators.maxLength(100)]]
        });
    }

    ValidationErrorMessages()
    {
        this.NameInputErrors = new Map<string,string>();

        this.EmailInputErrors = new Map<string,string>();

        this.PhoneInputErrors = new Map<string,string>();

        this.AddressInputErrors = new Map<string,string>();

        this.NameInputErrors.set('required','Name is a Must.');

        this.EmailInputErrors.set('email', 'Not a Email format.');

        this.PhoneInputErrors.set('pattern', 'Enter Phone Number.');
    }

    AddContactFormSubmit()
    {
        let contact: ContactModel;

        if( this.AddContactForm.status === "VALID" )
        {
            contact = new ContactModel(
                 this.contactService.GetNewContactId(), 
                 this.AddContactForm.value.nameInput,
                 this.AddContactForm.value.emailInput,
                 this.AddContactForm.value.phoneInput,
                 this.AddContactForm.value.addressInput
                 );

            this.contactService.AddContact(contact);
        }
    }
}