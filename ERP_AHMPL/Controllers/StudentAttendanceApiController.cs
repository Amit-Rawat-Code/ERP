using BAL;
using DAL;
using Newtonsoft.Json;
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
    public class StudentAttendanceApiController : ApiController
    {   
        [HttpPost]
        public async Task<string> InsertEditStudentAttendanceDateWise(StudentAttendance obj)
        {
            string result = await  DLL.dal.InsertEditStudentAttendanceDateWise(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetStudentAttendanceDateWiseList(StudentAttendance obj)
        {
            DataTable result = await DLL.dal.GetStudentAttendanceDateWiseList(obj);
            return result;
        }

        [HttpPost]
        public async Task<string> InsertEditStudentAttendanceSubjectWise(StudentAttendance obj)
        {
            string result = await DLL.dal.InsertEditStudentAttendanceSubjectWise(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetStudentAttendanceSubjectWiseList(StudentAttendance obj)
        {
            DataTable result = await DLL.dal.GetStudentAttendanceSubjectWiseList(obj);
            return result;
        }

    }
}
