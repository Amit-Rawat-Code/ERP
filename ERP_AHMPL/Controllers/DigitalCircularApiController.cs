using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SEF.Controllers
{
    public class DigitalCircularApiController : ApiController
    {
        #region Digital Circular


        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalCircularFiles()
        {
            var paths = "";
            var file = HttpContext.Current.Request.Files.Count > 0 ?
                            HttpContext.Current.Request.Files[0] : null;
            string[] Data = HttpContext.Current.Request.Form.Count > 0 ?
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
                bool exists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath("~/uploads/Circular/"));

                if (!exists)
                    System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/uploads/Circular/"));
                paths = Path.Combine(
                    HttpContext.Current.Server.MapPath("~/uploads/Circular/"),
                    fileName
                );
                file.SaveAs(paths);
                obj.AttachmentPath = "../uploads/Circular/" + fileName;
                obj.AttachmentType = Path.GetExtension(file.FileName);
            }


            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalCircularFiles(obj);
            return dt;

        }


        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalCircular(BALDigital obj)
        {
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalCircular(obj);
            return dt;
        }


        [HttpPost]
        public async Task<DataTable> GetSearchingList(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetSearchingList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetSendBy(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetRoleMaster(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetDigitalCircular(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetDigitalCircular(obj);
            return dt;
        }


        #endregion
    }
}
