using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace managment_app.Shared.Services
{
    public interface IIdentityService
    {
        Guid UserId { get; }
        string UserName { get; }

        List<string> Roles { get; }
    }
}
