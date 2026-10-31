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
using Newtonsoft.Json;

namespace SEF.Controllers
{
    public class CollegeEnquiryReportApiController : ApiController
    {
        #region College Enquiry Register Report      

        [HttpPost]
        public async Task<DataSet> GetCollegeEnquiryRegisterReport(BALCollegeEnquiryReport obj)
        {
            DataSet ds = await DLL.dal.GetCollegeEnquiryRegisterReport(obj);
            return ds;
        }
        #endregion

        #region College Monthly Enquiry Statistics Report   
        [HttpPost]
        public async Task<string> GetCollegeMonthlyEnquiryStatisticsReport(BALCollegeEnquiryReport obj)
        {
            DataTable dt = await DLL.dal.GetCollegeMonthlyEnquiryStatisticsReport(obj);
            return JsonConvert.SerializeObject(dt);
        }
        #endregion

        #region College SocialMediaPostReport

        [HttpPost]
        public async Task<DataTable> GetCollegeSocialMediaPostReport(BALCollegePostingForSocialMedia obj)
        {
            DataTable dt = await DLL.dal.GetCollegeSocialMediaPostReport(obj);
            return dt;
        }

        #endregion
    }
}
