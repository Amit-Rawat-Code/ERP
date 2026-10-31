using BAL;
using DAL;
using Newtonsoft.Json;
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
    public class DigitalDiaryApiController : ApiController
    {
        #region Digital Diary
        [HttpPost]
        public async Task<DataTable> GetClassList(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetClassList(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetSectionList(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetSectionList(obj);
            return dt;
        }


        [HttpPost]
        public async Task<DataTable> GetStudentsList(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetStudentsList(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalDiaryFiles()
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
                bool exists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath("~/uploads/Diary/"));

                if (!exists)
                    System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/uploads/Diary/"));
                
                paths = Path.Combine(
                   HttpContext.Current.Server.MapPath("~/uploads/Diary/"),
                   fileName
               );
                
                file.SaveAs(paths);
                obj.AttachmentPath = "../uploads/Diary/" + fileName;
                obj.AttachmentType = Path.GetExtension(file.FileName);
            }


            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalDiaryFiles(obj);
            return dt;

        }



        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalDiary(BALDigital obj)
        {
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalDiary(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalDiaryWeb()
        {
            string uploadingpath = "~/Uploads/Diary/";
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
                        {
                            obj.AttachmentPath = uploadingpath + uniquefname;
                            obj.AttachmentType = Path.GetExtension(hpf.FileName);
                        }
                    }

                }

                var result = await DLL.dal.InsertUpdateDeleteDigitalDiary(obj);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new DataTable();
            }

        }


        [HttpPost]
        public async Task<DataTable> GetDigitalDiary(BALDigital obj)
        {
            DataTable dt = await DLL.dal.GetDigitalDiary(obj);
            return dt;
        }


        [HttpPost]
        public async Task<DataTable> InsertUpdateDeleteDigitalDiaryAtStudentPanel(BALDigital obj)
        {
            DataTable dt = await DLL.dal.InsertUpdateDeleteDigitalDiaryAtStudentPanel(obj);
            return dt;
        }



        #endregion


    }
}
