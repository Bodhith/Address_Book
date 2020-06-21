import { stringify } from '@angular/compiler/src/util';
import { ContactAttributeTypes } from '../ENUMS/contactAttributeTypes.enum';

export class ContactModel
{

    public id: number;
    
    public name: string;
    
    public email: string;
    
    public phoneNumber: string;
    
    public address: string;

    //public customData: Array<Map<string,string>>;

    constructor(id: number, name: string, email: string, phoneNumber: string, address: string)
    {
        this.id = id;

        this.name = name;
        
        this.email = email;
        
        this.phoneNumber = phoneNumber;
        
        this.address = address;
    }
}