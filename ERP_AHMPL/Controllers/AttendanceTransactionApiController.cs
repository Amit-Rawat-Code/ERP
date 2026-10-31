using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class AttendanceTransactionApiController : ApiController
    {
        // GET: AttendanceMaster
        #region Employee Attendance DateWise
        public async Task<string> InsertEditEmployeeAttendanceDateWise(EmployeeAttendance obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEmployeeAttendanceDateWise(obj);
            return result;
        }
        public async Task<DataTable> EmployeeAttendanceDateWiseList(EmployeeAttendance obj)
        {
            DataTable dt = await DLL.dal.EmployeeAttendanceDateWiseList(obj);
            return dt;
        }
        #endregion
        #region Employee Attendance Leave
        [HttpPost]
        public async Task<DataTable> EmployeeAttendanceLeaveMasterList(EmployeeLeave obj)
        {
            DataTable dt = await DLL.dal.EmployeeAttendanceLeaveMasterList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteEmployeeLeaveApplication(EmployeeLeave obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEmployeeLeaveApplication(obj);
            return result;
        }
        #endregion
        #region Leave Approval By Level
        [HttpPost]
        public async Task<string> InsertUpdateDeleteLeaveApprovalByLevel(LeaveApprovalByLevel obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteLeaveApprovalByLevel(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetLevelApprovalByLevel(LeaveApprovalByLevel obj)
        {
            DataTable dt = await DLL.dal.GetLevelApprovalByLevel(obj);
            return dt;
        }
        #endregion
        #region Get BioMetirc Thumbs Time
        [HttpPost]
        public async Task<string> InsertUpdateDeleteThumbs(LeaveApprovalByLevel obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteThumbs(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetEmployeeDetailsThumbs(LeaveApprovalByLevel obj)
        {
            DataTable dt = await DLL.dal.GetEmployeeDetailsThumbs(obj);
            return dt;
        }
        #endregion
        #region H.O Employee Attendance DateWise
        public async Task<string> InsertEditHOEmployeeAttendanceDateWise(EmployeeAttendance obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEmployeeAttendanceDateWise(obj);
            return result;
        }
        public async Task<DataTable> EmployeeHOAttendanceDateWiseList(EmployeeAttendance obj)
        {
            DataTable dt = await DLL.dal.EmployeeAttendanceDateWiseList(obj);
            return dt;
        }
        #endregion
    }
}