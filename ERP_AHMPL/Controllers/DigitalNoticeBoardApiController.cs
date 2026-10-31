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
    //[RoutePrefix("api/NoticeBoard")]///api/NoticeBoard/GetList
    public class DigitalNoticeBoardApiController : ApiController
    {
        #region Digital Notice Board


        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalNoticeBoardFiles()
        {
            var paths="";
            var file =      HttpContext.Current.Request.Files.Count > 0 ?
                            HttpContext.Current.Request.Files[0] : null;
            string[] Data =  HttpContext.Current.Request.Form.Count > 0 ?
                             HttpContext.Current.Request.Form.GetValues("TransID") : null;
            var d = HttpContext.Current.Request.Form.Count > 0 ?
                             HttpContext.Current.Request.Form.GetKey(0) : null;
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
                bool exists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath("~/uploads/NoticeBoard/"));
              
                if (!exists)
                    System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/uploads/NoticeBoard/"));
                paths = Path.Combine(
                    HttpContext.Current.Server.MapPath("~/uploads/NoticeBoard/"),
                    fileName
                );
                file.SaveAs(paths);
                obj.AttachmentPath = "../uploads/NoticeBoard/" + fileName; 
                obj.AttachmentType = Path.GetExtension(file.FileName);
            }
            
           
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalNoticeBoardFiles(obj);
              return dt;
         
        }

        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalNoticeBoardWeb()
        {
            string uploadingpath = "~/Uploads/NoticeBoard/";
            string rootpath = "";
            rootpath = System.Web.Hosting.HostingEnvironment.MapPath(uploadingpath);
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            var provider = new MultipartFormDataStreamProvider(rootpath);
            try
            {
                var data = await Request.Content.ReadAsMultipartAsync(provider);
                    var model = data.FormData["model"];
                    BALDigital obj = JsonConvert.DeserializeObject<BALDigital>(model);
                bool exists = System.IO.Directory.Exists(rootpath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(rootpath);

                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    System.Web.HttpPostedFile hpf = hfc[i];

                    if (hpf.ContentLength > 0)
                    {
                        string fname = Path.GetFileName(hpf.FileName);
                        
                        string uniquefname = Guid.NewGuid().ToString() + '_' + fname;
                        hpf.SaveAs(rootpath + uniquefname);
                        if (i == 0)
                        { obj.AttachmentPath = uploadingpath + uniquefname;
                            obj.AttachmentType = Path.GetExtension(hpf.FileName);
                        }
                    }

                }

                DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalNoticeBoard(obj);
                return dt;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new DataTable();
            }
                
        }
        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalNoticeBoard(BALDigital obj)
        {
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalNoticeBoard(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteDigitalNoticeBoardApi(BALDigital obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteDigitalNoticeBoardApi(obj);
            return result;
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
            //DataTable dt = await DLL.dal.GetDesignationType(obj);
            DataTable dt = await DLL.dal.GetRoleMaster(obj);

            return dt; 
        }
      
        [HttpPost]
        public async Task<DataTable> GetDigitalNoticeBoard(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetDigitalNoticeBoard(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetStudentsList(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetStudentsList(obj);
            return dt;
        }


        #endregion

        #region Digital Notice Board-Student Panel

        [HttpPost]
        public async Task<DataTable> DigitalNoticeBoardAtStudentPanel(BALDigital obj)
        {
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalDiaryAtStudentPanel(obj);
            return dt;
        }





        #endregion


        
    }
}