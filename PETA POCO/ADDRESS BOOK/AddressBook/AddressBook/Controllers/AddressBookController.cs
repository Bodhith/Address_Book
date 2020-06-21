using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Web.Http.Cors;

using AddressBook.MODEL;

using AddressBook.SERVICES;

namespace AddressBook.CONTROLLER
{
    [EnableCors(origins: "http://127.0.0.1:8080", headers: "*", methods: "*")]
    public class AddressBookController : ApiController
    {

        [HttpGet]
        [Route("contact/getContactsList")]
        public List<ContactModel> SendContactsList()
        {
            ContactService contactService = new ContactService();

            return contactService.GetContactsList();
        }

        [HttpPost]
        [Route("contact/addContact")]
        public void AddContact([FromBody] ContactModel contact)
        {
            ContactService contactService = new ContactService();

            contactService.AddContact(contact);
        }

        [HttpGet]
        [Route("contact/deleteContact/{id}")]
        public int DeleteContact(int id)
        {
            ContactService contactService = new ContactService();

            int rowsEffected;

            rowsEffected = contactService.DeleteContact(id);

            return rowsEffected;
        }
    }
}
