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
    public class UserMasterApiController : ApiController
    {
        #region UserType Master
        [HttpPost]
        public async Task<DataTable> GetUserType(BALUserMaster obj)
        {
            DataTable dt = await DLL.dal.GetUserType(obj);

            return dt;
        }

        #endregion


        #region User Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteUserMaster(BALUserMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUserMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetUserDetail(BALUserMaster obj)
        {
            DataTable dt = await DLL.dal.GetUserDetail(obj);

            return dt;
        }


        [HttpPost]
        public async Task<string> ProfileUpdate(BALUserMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUserMaster(obj);
            return result;
        }

        #endregion
        //Student Role Assignment Page (Admission Tranaction)
        [HttpPost]
        public async Task<DataTable> GetUserDetailForStudentRole(BALUserMaster obj)
        {
            DataTable dt = await DLL.dal.GetUserDetailForStudentRole(obj);
            return dt;
        }
    }
}
