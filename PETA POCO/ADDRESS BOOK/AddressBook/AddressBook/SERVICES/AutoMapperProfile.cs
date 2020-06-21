using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using AddressBook.MODEL;
using SqlConnection;

namespace AddressBook.SERVICES
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ContactModel, ContactsTable>();

            CreateMap<ContactsTable, ContactModel>();
        }

        [Obsolete]
        public static void Run()
        {
            AutoMapper.Mapper.Initialize(configuration =>
            {
                configuration.AddProfile<AutoMapperProfile>();
            });
        }
    }
}