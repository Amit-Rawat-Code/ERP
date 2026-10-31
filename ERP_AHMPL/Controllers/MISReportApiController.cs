using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class MISReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetMISReport(BALMIS obj)
        {
            DataTable dt = await DLL.dal.GetMISReport(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetStaffAttendanceSummary(BALMIS obj)
        {
            DataTable dt = await DLL.dal.GetStaffAttendanceSummary(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataSet> GetMISReports(BALMIS obj)
        {
            DataSet dt = await DLL.dal.GetMISReports(obj);
            return dt;
        }
    }
}