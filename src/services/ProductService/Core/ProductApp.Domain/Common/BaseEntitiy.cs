using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductApp.Domain.Common
{
    public class BaseEntitiy
    {
        //snow flakes algoritması na bak
        [BsonElement("_id")]
        public Guid Id { get; set; }
    }
}
