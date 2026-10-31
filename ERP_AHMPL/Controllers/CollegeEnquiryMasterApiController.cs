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
    public class CollegeEnquiryMasterApiController : ApiController
    {
        #region College City Area Master
        // Perform DML Operation on 
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeCityAreaMaster(BALCollegeEnquiryModule obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeCityAreaMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetCollegeCityAreaMaster(BALCollegeEnquiryModule obj)
        {
            DataTable dt = await DLL.dal.GetCollegeCityAreaMaster(obj);
            return dt;
        }

        #endregion

        #region College Enquiry Source Master
        // Perform DML Operation 
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeEnquirySourceMaster(BALCollegeEnquiryModule obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeEnquirySourceMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetCollegeEnquirySourceMaster(BALCollegeEnquiryModule obj)
        {
            DataTable dt = await DLL.dal.GetCollegeEnquirySourceMaster(obj);
            return dt;
        }
        #endregion

        #region College Enquiry Type Master
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeEnquiryTypeMaster(BALCollegeEnquiryModule obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeEnquiryTypeMaster(obj);

            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetCollegeEnquiryTypeMaster(BALCollegeEnquiryModule obj)
        {
            //  BALEnquiryModule obj = JsonConvert.DeserializeObject<BALEnquiryModule>(jsonResult.ToString());
            DataTable dt = await DLL.dal.GetCollegeEnquiryTypeMaster(obj);
            return dt;

        }

        #endregion
    }
}
