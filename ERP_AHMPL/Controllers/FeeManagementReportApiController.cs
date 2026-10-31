using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using BAL;
using DAL;
using Newtonsoft.Json;

namespace SEF.Controllers
{
    public class FeeManagementReportApiController : ApiController
    {
        // GET: FeeManagementReportApi
        [HttpPost]
        public async Task<DataSet> GetFeeDefaulterNoticeReport(FeesDetails obj)
        {
            DataSet dt = await DLL.dal.GetFeeDefaulterNoticeReport(obj);
            return dt;
        }


        public async Task<DataTable> SearchStudentsForFeeDetails(FeesDetails obj)
        {
            DataTable dt = await DLL.dal.SearchStudentsForFeeDetails(obj);
            return dt;
        }

        public async Task<DataTable> PendingFeeRegisterReport(FeesDetails obj)
        {
            DataTable dt = await DLL.dal.PendingFeeRegisterReport(obj);
            return dt;
        }


        //SearchStudents
    }
}