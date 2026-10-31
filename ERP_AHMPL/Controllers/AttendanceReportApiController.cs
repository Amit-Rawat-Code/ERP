using BAL;
using DAL;
using Newtonsoft.Json;
using System.Data;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AttendanceReportApiController : Controller
    {
        #region Employee Attendance
        // GET: EmployeeAttendanceReportMasterApi
        [HttpPost]
        public async Task<string> GetEmployeeAttandanceDateWiseReport(BALEmployeeAttendanceDateWiseReport ob)
        {
            DataTable dt = await DLL.dal.GetEmployeeAttandanceDateWiseReport(ob);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public async Task<string> GetEmployeeAttandanceMonthWiseReport(BALEmployeeAttendanceDateWiseReport ob)
        {
            DataTable dt = await DLL.dal.GetEmployeeAttandanceMonthWiseReport(ob);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public async Task<string> GetEmployeeAttandanceMonthlyReport(BALEmployeeAttendanceDateWiseReport ob)
        {
            DataTable dt = await DLL.dal.GetEmployeeAttandanceMonthlyReport(ob);
            return JsonConvert.SerializeObject(dt);
        }


        [HttpPost]
        public async Task<string> GetEmployeeAttandanceMonthlyInAndOut(BALEmployeeAttendanceDateWiseReport ob)
        {
            DataTable dt = await DLL.dal.GetEmployeeAttandanceMonthlyInAndOut(ob);
            return JsonConvert.SerializeObject(dt);
        }

        #endregion
        #region Punch Log Employee Attendance

        //[HttpPost]
        //public async Task<string> GetPunchLogEmployeeAttandance(BALEmployeeAttendanceDateWiseReport ob)
        //{
        //    DataTable dt = await DLL.dal.GetPunchLogEmployeeAttandance(ob);
        //    return JsonConvert.SerializeObject(dt);
        //}

        #endregion 
    }
}