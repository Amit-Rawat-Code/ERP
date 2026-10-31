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
    public class AttendanceMasterApiController : ApiController
    {
        // GET: AttendanceMaster
        #region LeaveTypeMaster
        [HttpPost]
        public async Task<string> InsertUpdateDeleteLeaveTypeMaster(EmpAttendance obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteLeaveTypeMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetLeaveTypeMaster(EmpAttendance obj)
        {
            DataTable dt = await DLL.dal.GetLeaveTypeMaster(obj);
            return dt;
        }

        #endregion

        #region Master Abbreviation
        [HttpPost]
        public async Task<string> InsertUpdateDeleteAbbreviationMaster(EmpAttendance obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteAbbreviationMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetAbbreviationMaster(EmpAttendance obj)
        {
            DataTable dt = await DLL.dal.GetAbbreviationMaster(obj);
            return dt;
        }

        #endregion


        
        }
}