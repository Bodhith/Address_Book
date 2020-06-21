import { ContactModel } from '../MODELS/contact.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ContactsList } from '../COMPONENTS/ContactsList/contactsList.component';

@Injectable({
    providedIn: "root"
})

export class ContactService
{
    private ContactsList = new Array<ContactModel>();

    private ContactsListSource = new BehaviorSubject<Array<ContactModel>>(this.ContactsList);

    public CurrentContactsList = this.ContactsListSource.asObservable();

    private serverUrl: string;

    constructor(private httpClient: HttpClient)
    {
        this.serverUrl =  "https://localhost:44370";
    }

    /*                                                      GET                                                          */

    public GetContacts()
    {
        return  this.ContactsList;
    }
    
    public GetDetails(id: number) : ContactModel
    {
        let selectedContact: ContactModel;

        this.ContactsList.forEach(contact => {
            if( contact.id == id )
            {
                selectedContact = contact;

                return;
            }
        });
        
        return selectedContact;
    }

    public GetNames(id: number)
    {
        this.ContactsList.forEach(contact => {
            if( contact.id == id )
            {
                return contact.name;
            }
        });
         
        return null;
    }

    public GetEmails(id: number)
    {
        this.ContactsList.forEach(contact => {
            if( contact.id == id )
            {
                return contact.email;
            }
        });
         
        return null;
    }

    public GetPhones(id: number)
    {
        this.ContactsList.forEach(contact => {
            if( contact.id == id )
            {
                return contact.phoneNumber;
            }
        });
         
        return null;
    }

    public GetAddresses(id: number)
    {
        this.ContactsList.forEach(contact => {
            if( contact.id == id )
            {
                return contact.address;
            }
        });
         
        return null;
    }

    public GetContactsListFromDb()
    {
        this.httpClient.get(this.serverUrl+"/contact/getContactsList").subscribe( contactsList => {

            this.ContactsList.length = 0;

            Object.values(contactsList).forEach( contactAttribute => {

                this.ContactsList.push( new ContactModel(contactAttribute['id'], contactAttribute['name'], contactAttribute['email'], contactAttribute['phoneNumber'], contactAttribute['address']) );

            });
            
            this.ContactsListSource.next(this.ContactsList);

        });
    }

    /*                                                   END OF GET                                                       */

    /*                                                     MODIFY                                                         */    


    public AddContact(contact: ContactModel) : void
    {
        if( this.CheckContactExistsById(contact.id) == false )
        {
            this.httpClient.post(this.serverUrl+"/contact/addContact", contact).subscribe(val => {

                this.ContactsList.push(contact);

            });
        }
    }

    public DeleteContact(id: number)
    {
        if( this.CheckContactExistsById(id) == true )
        {
            this.httpClient.get(this.serverUrl+"/contact/deleteContact/"+id.toString()).subscribe(val => {

                this.ContactsList = this.ContactsList.filter(contact => contact.id != id);

                this.ContactsListSource.next(this.ContactsList);
            });
        }
    }

    /*                                                  END OF MODIFY                                                    */

    /*                                                      MISC                                                         */
    
    public CheckContactExistsById(id: number)   :   boolean
    {
        let contactExist: boolean;

        contactExist = false;

        this.ContactsList.forEach(contact => {

            if( contact.id == id )
            {
                //          Already exists

                contactExist = true;

                return;
            }

        });

        return contactExist;
    }

    public GetNewContactId()
    {
        let id : number;

        id = Math.floor(Math.random()*50)+1;

        while( this.CheckContactExistsById(id) )
        {
        }

        return id;
    }

    CreateContactFromObject(contactObject: object)
    {
        let newContact: ContactModel;


    }

    /*                                                   END OF MISC                                                     */     
}