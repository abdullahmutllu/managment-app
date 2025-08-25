using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace managment_app.Shared.Options
{
    public class KeyloackOption
    {
        public required string Address { get; set; }
        public required string Issuer { get; set; }
        public required string Audience { get; set; }
    }
}
