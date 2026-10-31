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
    public class CollegeEnquiryDashBoardApiController : ApiController
    {
        [HttpPost]
        public async Task<DataSet> GetEnquiryDashBoard(BALCollegeEnquiryForm obj)
        {
            DataSet ds = await DLL.dal.GetDashBoardLevel1(obj);
            return ds;
        }
        [HttpPost]
        public async Task<DataTable> GetLavelWiseUser(BALCollegeEnquiryForm obj)
        {
            DataTable dt = await DLL.dal.GetLavelWiseUser(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> UpdateUserIdOfEnquiry(BALCollegeEnquiryForm obj)
        {
            string result = await DLL.dal.UpdateUserIdOfEnquiry(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetCollegeEnquiryFollowupFormOffline(BALCollegeEnquiryForm obj)
        {
            obj.Action = 5;
            DataSet ds = await DLL.dal.GetCollegeEnquiryFollowupFormOffline(obj);
            return ds;
        }
        [HttpPost]
        public async Task<string> UpdateEnquiryFormFromFollowUp(BALCollegeEnquiryForm obj)
        {
            obj.Action = 1;
            string result = await DLL.dal.InsertUpdateDeleteCollegeEnquiryFollowupFormOffline(obj);
            return result;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeEnquiryFollowUpFormOffline(BALCollegeEnquiryForm obj)
        {
            obj.Action = 2;
            string result = await DLL.dal.InsertUpdateDeleteCollegeEnquiryFollowupFormOffline(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetEnquiryCollegeFormOffline(BALCollegeEnquiryForm obj)
        {
            DataTable dt = await DLL.dal.GetEnquiryCollegeFormOffline(obj);
            return dt;
        }
    }
}
