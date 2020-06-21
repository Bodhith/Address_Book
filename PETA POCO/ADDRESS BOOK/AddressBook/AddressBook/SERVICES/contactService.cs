using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using AutoMapper;

using AddressBook.MODEL;

using SqlConnection;

namespace AddressBook.SERVICES
{
    public class ContactService
    {
        public int AddContact(ContactModel contact)
        {
            SqlConnectionDB dataBase = new SqlConnectionDB("SqlConnection");

            ContactsTable tableData = new ContactsTable();

            Mapper.Map(contact, tableData);

            return (int)dataBase.Insert(tableName: "dbo.ContactsTable", primaryKeyName: "Id", autoIncrement: false, poco: tableData);

        }

        public ContactModel GetContact(int Id)
        {
            SqlConnectionDB dataBase = new SqlConnectionDB("SqlConnection");

            ContactModel contact = new ContactModel();

            ContactsTable contactTable = new ContactsTable();

            contactTable = dataBase.Single<ContactsTable>("WHERE Id = @0", Id);

            Mapper.Map(contactTable, contact);

            return contact;
        }

        public List<ContactModel> GetContactsList()
        {
            SqlConnectionDB dataBase = new SqlConnectionDB("SqlConnection");

            List<ContactModel> contactsList = new List<ContactModel>();

            List<ContactsTable> contactsTable = dataBase.Fetch<ContactsTable>("select * from ContactsTable;");

            Mapper.Map(contactsTable, contactsList);

            return contactsList;

        }

        public int DeleteContact(int Id)
        {
            SqlConnectionDB dataBase = new SqlConnectionDB("SqlConnection");

            int rowsEffected;

            rowsEffected = dataBase.Delete(tableName: "dbo.ContactsTable", primaryKeyName: "id", poco: null, primaryKeyValue: Id);

            return rowsEffected;
        }
    }
}