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
    public class LoginApiController : ApiController
    {
        #region Connection Connector
        [HttpPost]
        public async Task<DataTable> ConnectionConnector(BALConnectionConnector obj)
        {
            DataTable dt = await DLL.dal.GetConnectionConnector(obj);
            return dt;
        }
        #endregion

        #region User Authentication
        [HttpPost]
        public async Task<DataTable> UserAuthentication(BALAuthentication obj)
        {
            DataTable dt = await DLL.dal.UserAuthentication(obj);
            return dt;
        }
        #endregion

        #region SwitchSchool
        [HttpPost]
        public async Task<DataTable> GetAllotedSession(BALUserMaster obj)
        {
            obj.Action = 1;
            DataTable dt = await DLL.dal.GetAllotedSession(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetAllotedFinancialYear(BALUserMaster obj)
        {
            obj.Action = 2;
            DataTable dt = await DLL.dal.GetAllotedFinancialYear(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetAllotedSchoolSessionWise(BALUserMaster obj)
        {
            obj.Action = 3;
            DataTable dt = await DLL.dal.GetAllotedSchoolSessionWise(obj);
            return dt;
        }
        #endregion
    }
}
