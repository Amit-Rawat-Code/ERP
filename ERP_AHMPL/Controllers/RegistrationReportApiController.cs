using BAL;
using DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;


namespace SEF.Controllers
{
    public class RegistrationReportApiController : ApiController
    {
        // GET: RegistrationReportApi
        #region Monthly Enquiry Statistics Report   
        [HttpPost]
        public async Task<DataSet> GetDatewiseRegistrationFormReceiveReport(BALEnquiryReport obj)
        {
            DataSet ds = await DLL.dal.GetDatewiseRegistrationFormReceiveReport(obj);
            return ds;
        }
        
        [HttpPost]
        public async Task<DataSet> GetDatewiseRegistrationFormSaleReport(BALEnquiryReport obj)
        {
            DataSet dt = await DLL.dal.GetDatewiseRegistrationFormSaleReport(obj);
            return dt ;
        }

        #endregion
    }
}