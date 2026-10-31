using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class AccountReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetTrialReport(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetTrialReport(obj);
            return dt;
        }
        
        [HttpPost]
        public async Task<DataTable> GetLedgerReport(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedgerReport(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetMultipleLedgerReport(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetMultipleLedgerReport(obj);
            return dt;
        }
        
    }
}