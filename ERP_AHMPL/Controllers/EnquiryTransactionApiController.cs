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
using System.Web.UI.WebControls;
using System.Xml;

namespace SEF.Controllers
{
    public class EnquiryTransactionApiController : ApiController
    {
        #region Enquiry Form For Social Media & Website
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteEnquiryFormForSocialMediaWebsite(BALEnquiryForm obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEnquiryFormForSocialMediaWebsite(obj);
            return result;

        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetEnquiryFormForSocialMediaWebsite(BALEnquiryForm obj)
        {
            DataTable dt = await DLL.dal.GetEnquiryFormForSocialMediaWebsite(obj);
            return dt;
        
        }

        #endregion

        #region Enquiry Form Offlile
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteEnquiryFormOffline(BALEnquiryForm obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEnquiryFormOffline(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetEnquiryFormOffline(BALEnquiryForm obj)
        {
            DataTable dt = await DLL.dal.GetEnquiryFormOffline(obj);
            return dt;
        }

        #endregion

        #region Enquiry FollowUp Offline
        [HttpPost]
        public async Task<string> InsertUpdateDeleteEnquiryFollowUpFormOffline(BALEnquiryForm obj)
        {
            obj.Action = 2;
            string result = await DLL.dal.InsertUpdateDeleteEnquiryFollowupFormOffline(obj);
            return result;
        }
        [HttpPost]
        public async Task<string> UpdateEnquiryFormFromFollowUp(BALEnquiryForm obj)
        {
            obj.Action = 1;
            string result = await DLL.dal.InsertUpdateDeleteEnquiryFollowupFormOffline(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetEnquiryFollowupFormOffline(BALEnquiryForm obj)
        {
            obj.Action = 5;
            DataSet ds = await DLL.dal.GetEnquiryFollowupFormOffline(obj);
            return ds;
        }
        [HttpPost]
        public async Task<string> SendEnquiryToAnotherSchool(BALEnquiryForm obj)
        {
            string ds = await DLL.dal.SendEnquiryToAnotherSchool(obj);
            return ds;
        }
        [HttpPost]
        public async Task<DataTable> GetAllBranch(BALEnquiryForm obj)
        {
            DataTable ds = await DLL.dal.GetAllBranch(obj);
            return ds;
        }

        #endregion

    }
}
