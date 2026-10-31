using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Data;
using BAL;
using DAL;
using System.Text;

namespace SEF.Controllers
{
    public class EnquiryMasterApiController : ApiController
    {

        //POST api/<controller>
        #region City Area Master
        // Perform DML Operation on 
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCityAreaMaster(BALEnquiryModule obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCityAreaMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetCityAreaMaster(BALEnquiryModule obj)
        {
            DataTable dt = await DLL.dal.GetCityAreaMaster(obj);
            return dt;  
        }

        #endregion

        #region Enquiry Source Master
        // Perform DML Operation 
        [HttpPost]
        public async Task<string> InsertUpdateDeleteEnquirySourceMaster(BALEnquiryModule obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEnquirySourceMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetEnquirySourceMaster(BALEnquiryModule obj)
        {
            DataTable dt = await DLL.dal.GetEnquirySourceMaster(obj);
            return dt;
        }
        #endregion

        #region Enquiry Type Master
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteEnquiryTypeMaster(BALEnquiryModule obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEnquiryTypeMaster(obj);
           
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetEnquiryTypeMaster(BALEnquiryModule obj)
        {
          //  BALEnquiryModule obj = JsonConvert.DeserializeObject<BALEnquiryModule>(jsonResult.ToString());
            DataTable dt = await DLL.dal.GetEnquiryTypeMaster(obj);
            return dt;
          
        }

        #endregion

    }
}