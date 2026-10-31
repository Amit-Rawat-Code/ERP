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
    public class StudentEquiryReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetStudentEnquiryReport(BALStudentEnquiryReport obj)
        {
            DataTable dt = await DLL.dal.GetStudentEnquiryReport(obj);
            return dt;
        }


    }
}