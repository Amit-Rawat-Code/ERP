using BAL;
using DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class EnquiryReportApiController : ApiController
    {
        #region Enquiry Register Report      
       
        [HttpPost]
        public async Task<DataSet> GetEnquiryRegisterReport(BALEnquiryReport obj)
        {
            DataSet ds = await DLL.dal.GetEnquiryRegisterReport(obj);
            return ds;
        }
        #endregion

        #region Monthly Enquiry Statistics Report   
        [HttpPost]
        public async Task<string> GetMonthlyEnquiryStatisticsReport(BALEnquiryReport obj)
        {
            DataTable dt = await DLL.dal.GetMonthlyEnquiryStatisticsReport(obj);
            return JsonConvert.SerializeObject(dt);
        }
        #endregion

        #region SocialMediaPostReport

        [HttpPost]
        public async Task<DataTable> GetSocialMediaPostReport(BALPostingForSocialMedia ob)
        {
            DataTable dt = await DLL.dal.GetSocialMediaPostReport(ob);
            return dt;
        }

        #endregion


    }
}