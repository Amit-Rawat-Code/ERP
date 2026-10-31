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
    public class FeeReportApiController : ApiController
    {
        // GET: FeeReportApi
        [HttpPost]
        public async Task<DataSet> GetFeeDefaulterNoticeReport(FeesDetails obj)
        {
            DataSet dt = await DLL.dal.GetFeeDefaulterNoticeReport(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> SearchStudentsForFeeDetails(FeesDetails obj)
        {
            DataTable dt = await DLL.dal.SearchStudentsForFeeDetails(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> PendingFeeRegisterReport(FeesDetails obj)
        {
            DataTable dt = await DLL.dal.PendingFeeRegisterReport(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataSet> FeeConcessionChartReport(FeesDetails obj)
        {
            DataSet ds = await DLL.dal.FeeConcessionChartReport(obj);
            return ds;
        }
        [HttpPost]
        public async Task<DataTable> InstallmentMappingReport(BALInstallmentMappingMaster obj)
        {
            DataTable dt = await DLL.dal.InstallmentMappingReport(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetPendingFeeRegisterReportInstallmentWise(FeesDetails obj)
        {
            DataTable dt = await DLL.dal.PendingFeeRegisterReportInstallmentWise(obj);

            return dt;
        }
    }
}