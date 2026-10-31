using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using DAL;
using BAL;
using System.Web.Http;

namespace SEF.Controllers
{
    public class AdmissionReportApiController : ApiController
    {
        // GET: AdmissionReportApi
        [HttpPost]
        public async Task<DataTable> GetDateWiseAdmissionReport(BALAddmission ob)
        {
            DataTable dt = await DLL.dal.GetDateWiseAdmissionReport(ob);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetClassWiseAdmissionReport(BALAddmission ob)
        {
            DataTable dt = await DLL.dal.GetClassWiseAdmissionReport(ob);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetSessionWiseAdmissionReport(BALAddmission ob)
        {
            DataTable dt = await DLL.dal.GetSessionWiseAdmissionReport(ob);
            return dt;
        }

    }
}