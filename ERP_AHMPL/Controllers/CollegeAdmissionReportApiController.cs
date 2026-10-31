using BAL;
using DAL;
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
    public class CollegeAdmissionReportApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetCollegeAdmissionReport(BALCollegeAddmission obj)
        {
            DataTable dt = await DLL.dal.GetCollegeAdmissionReport(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataSet> GetCollegeAdmissionReportList(BALCollegeAddmission obj)
        {
            DataSet dt = await DLL.dal.GetCollegeAdmissionReportList(obj);
            return dt;
        }
    }
}
