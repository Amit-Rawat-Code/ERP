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
    public class AccountDashBoardApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetLedger_Temp(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedger_Temp(obj);
            return dt;
        }
    }
}