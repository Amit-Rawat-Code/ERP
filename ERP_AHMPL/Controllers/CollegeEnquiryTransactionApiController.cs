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
    public class CollegeEnquiryTransactionApiController : ApiController
    {
        #region Enquiry Form Offlile
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeEnquiryFormOffline(BALCollegeEnquiryForm obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeEnquiryFormOffline(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetEnquiryCollegeFormOffline(BALCollegeEnquiryForm obj)
        {
            DataTable dt = await DLL.dal.GetEnquiryCollegeFormOffline(obj);
            return dt;
        }

        #endregion
        #region Enquiry FollowUp Offline

        [HttpPost]
        public async Task<string> SendEnquiryToAnotherCollege(BALCollegeEnquiryForm obj)
        {
            string ds = await DLL.dal.SendEnquiryToAnotherCollege(obj);
            return ds;
        }
        [HttpPost]
        public async Task<DataTable> GetAllCollegeBranch(BALCollegeEnquiryForm obj)
        {
            DataTable ds = await DLL.dal.GetAllCollegeBranch(obj);
            return ds;
        }

        #endregion

        #region Enquiry Form For Social Media & Website
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeEnquiryFormForSocialMediaWebsite(BALCollegeEnquiryForm obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeEnquiryFormForSocialMediaWebsite(obj);
            return result;

        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetCollegeEnquiryFormForSocialMediaWebsite(BALCollegeEnquiryForm obj)
        {
            DataTable dt = await DLL.dal.GetCollegeEnquiryFormForSocialMediaWebsite(obj);
            return dt;

        }

        #endregion
    }
}
