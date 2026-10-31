using DAL;
using BAL;
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
    public class HRReportsApiController : ApiController
    {
        // GET: HRReportsApi
        #region LeaveStatus
        [HttpPost]
        public async Task<DataTable> GetEmployeeLeaveStatus(BALEmployeeLeaveStatusReport obj)
        {
            DataTable dt = await DLL.dal.GetEmployeeLeaveStatus(obj);
            return dt;
        }
        #endregion

        #region Employee Attendance Count Date Wise
        [HttpPost]
        public async Task<DataTable> GetEmployeeAttendanceCountDateWise(EmployeeAttendance obj)
        {
            DataTable dt = await DLL.dal.GetEmployeeAttendanceCountDateWise(obj);
            return dt;
        }
        #endregion
    }
}