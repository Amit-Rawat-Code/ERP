using BAL;
using DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.ModelBinding;

namespace SEF.Controllers
{
    public class DigitalComplainApiController : ApiController
    {
        #region Digital Complain 


        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalComplainFiles()
        {
            var paths="";
            var file =      HttpContext.Current.Request.Files.Count > 0 ?
                            HttpContext.Current.Request.Files[0] : null;
            string[] Data =  HttpContext.Current.Request.Form.Count > 0 ?
                             HttpContext.Current.Request.Form.GetValues("TransID") : null;
            string[] Data1 = HttpContext.Current.Request.Form.Count > 0 ?
                             HttpContext.Current.Request.Form.GetValues("RelationshipId") : null;
            string[] Data2 = HttpContext.Current.Request.Form.Count > 0 ?
                             HttpContext.Current.Request.Form.GetValues("SessionId") : null;
            BALDigital obj = new BALDigital();
            obj.TransID = Data[0];
            obj.RelationshipId = Convert.ToInt32(Data1[0]);
            obj.SessionId = Convert.ToInt32(Data2[0]);
           if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                fileName = fileName.Replace(" ", "");
                bool exists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath("~/uploads/Complain/"));
              
                if (!exists)
                    System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/uploads/Complain/"));
                paths = Path.Combine(
                    HttpContext.Current.Server.MapPath("~/uploads/Complain/"),
                    fileName
                );
                file.SaveAs(paths);
                obj.AttachmentPath = "../uploads/Complain/" + fileName; 
                obj.AttachmentType = Path.GetExtension(file.FileName);
            }
            
           
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalComplainFiles(obj);
              return dt;
         
        }


        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalComplain(BALDigital obj)
        {
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalComplain(obj);
            return dt;
        }


        [HttpPost]
        public async Task<DataTable> GetSearchingList(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetSearchingListByRole(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetSendBy(BALMaster obj)
        {   
            //DataTable dt = await DLL.dal.GetDesignationType(obj);
            DataTable dt = await DLL.dal.GetRoleMaster(obj);

            return dt; 
        }

        [HttpPost]
        public async Task<DataTable> GetComplains(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetDigitalComplain(obj);
            return dt;
        }
        
        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalComplainChatBox(BALDigital obj)
        {
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalComplainChatBox(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetComplainChatBox(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetDigitalComplainChatBox(obj);
            return dt;
        }
        #endregion



    }
}