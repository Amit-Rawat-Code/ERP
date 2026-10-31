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
    public class StudentAttendanceReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetStudentAttendanceClassDateWiseList(StudentAttendance obj)
        {
            DataTable result = await DLL.dal.GetStudentAttendanceClassDateWiseList(obj);
            return result;
        }
    }
}
