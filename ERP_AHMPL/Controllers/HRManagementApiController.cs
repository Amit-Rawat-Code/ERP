using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SEF.Controllers
{
    public class HRManagementMasterApiController : ApiController
    {
        // GET: HRManagementApi
        [HttpPost]
        public async Task<string> InsertUpdateDeleteObservationCriteria(BALHRManagement obj)
        {
            string dt = await DLL.dal.InsertUpdateDeleteObservationCriteria(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetObservationCriteria(BalTransportModule obj)
        {
            DataTable dt = await DLL.dal.GetObservationCriteria(obj);

            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteInterviewRound(BALHRManagement obj)
        {
            string dt = await DLL.dal.InsertUpdateDeleteInterviewRound(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetInterviewRound(BalTransportModule obj)
        {
            DataTable dt = await DLL.dal.GetInterviewRound(obj);

            return dt;
        }
    }
}