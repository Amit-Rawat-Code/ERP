using BAL;
using DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class UserReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataSet> GetUserRoleAssignments(BALNavigationMenu obj)
        {
            DataSet result = await DLL.dal.GetUserRoleAssignments(obj);
            return result;
        }

    }
}
