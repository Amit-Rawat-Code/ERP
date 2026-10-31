using BAL;
using DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SEF.Controllers
{
    public class MasterApiController : ApiController
    {

        #region Group Master
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteGroupMaster(BALMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteGroupMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetGroupMaster(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetGroupMaster(obj);
            return dt;
        }

        #endregion


        #region Society Master
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteSocietyMaster(BALMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSocietyMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetSocietyMaster(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetSocietyMaster(obj);
            return dt;
        }

        #endregion



        #region School Master
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteSchoolMaster(BALMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSchoolMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetSchoolMaster(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetSchoolMaster(obj);
            return dt;
        }

        #endregion GetBranchMaster




        #region Branch Master
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteBranchMaster(BALMaster obj)
        {
            string basePath1 = "Uploads/Logo/";
            string basePath2 = "Uploads/BackGroundImage/";
            FileStream file;
            MemoryStream imageStream;
            byte[] bytes;
            if (!string.IsNullOrEmpty(obj.BranchLogo))
            {
                if (obj.BranchLogo.Contains("data:image/"))
                {
                    bytes = Convert.FromBase64String(Regex.Replace(obj.BranchLogo, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                    string path1 = basePath1 + obj.DisplayCode.Replace("/", "_") + obj.BranchCode + ".png";
                    imageStream = new MemoryStream(bytes, false);
                    file = new FileStream(HttpContext.Current.Server.MapPath("~/" + path1), FileMode.Create, FileAccess.Write);
                    imageStream.WriteTo(file);
                    file.Close();
                    imageStream.Close();

                    obj.BranchLogo = "../" + path1;
                }
            }

            if (!string.IsNullOrEmpty(obj.BackgroundImage))
            {
                if (obj.BackgroundImage.Contains("data:image/"))
                {
                    bytes = Convert.FromBase64String(Regex.Replace(obj.BackgroundImage, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                    string path2 = basePath2 + obj.DisplayCode.Replace("/", "_") + obj.BranchCode + ".png";
                    imageStream = new MemoryStream(bytes, false);
                    file = new FileStream(HttpContext.Current.Server.MapPath("~/" + path2), FileMode.Create, FileAccess.Write);
                    imageStream.WriteTo(file);
                    file.Close();
                    imageStream.Close();

                    obj.BackgroundImage = "../" + path2;
                }
            }

            string result = await DLL.dal.InsertUpdateDeleteBranchMaster(obj);
            return result;
        }
        // Perform Select Operation List<BALMaster>
        [HttpPost]
        public async Task<DataTable> GetBranchMaster(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetBranchMaster(obj);
            return dt;
           
        }

        #endregion GetBranchMaster

        #region Role Master
        [HttpPost]
        public async Task<DataTable> GetUserLevel(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetUserLevel(obj);
            return dt;
        }


        [HttpPost]
        public async Task<string> InsertUpdateDeleteRoleMaster(BALMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteRoleMaster(obj);
            return result;
        }
        // Perform Select Operation List<BALMaster>
        [HttpPost]
        public async Task<DataTable> GetRoleMaster(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetRoleMaster(obj);
            return dt;

        }

        #endregion Get Role Master


        #region Role Options
        [HttpPost]
        public async Task<DataTable> GetRoles(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetRoles(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetModules(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetModules(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetMobileModules(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetMobileModules(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetSubMenues(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubMenues(obj);
            return dt;
        }
        #endregion

        #region Lavel wise User List
        [HttpPost]
        public async Task<DataTable> GetLavelWiseUser(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetRoles(obj);
            return dt;
        }

        #endregion

        #region Master Bank List
        [HttpPost]
        public async Task<DataTable> GetBankMaster(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetBanks(obj);
            return dt;
        }
        #endregion

        #region Get Excel Format No
        [HttpPost]
        public async Task<DataTable> GetExcelFormatNo(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetExcelFormatNo(obj);
            return dt;
        }
        #endregion

        #region Ticket Generate
        [HttpPost]
        public async Task<DataTable> GetMenu(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetMenu(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetSubMenu(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubMenu(obj);
            return dt;
        }
        #endregion

    }
}