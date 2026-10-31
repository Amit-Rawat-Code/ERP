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
    public class StudentAndTeacherDetailsApiController : ApiController
    {
        // GET: StudentAndTeacherDetails
        [HttpPost]
        public async Task<DataTable> GetStudentAndTeacherList(StudentAttendance obj)
        {
            DataTable dt = await DLL.dal.GetStudentAndTeacherList(obj);
            return dt;
        }
    }
}