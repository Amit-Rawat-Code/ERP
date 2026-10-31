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
using System.Web.Http;

namespace SEF.Controllers
{
    public class CollegeAdmissionTransactionApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetCollegeDocumentDetail(BALCollegeAddmission obj)
        {
            DataTable dt = await DLL.dal.GetCollegeDocumentDetail(obj);
            return dt;
        }

        [HttpPost]

        public async Task<string> InsertUpdateDeleteCollegeDocumentDetail()
        {
            BALCollegeAddmission obj = new BALCollegeAddmission();
            try
            {
                string path = "~/Uploads/CollegeDocs/";
                string UploadPath = "/Uploads/CollegeDocs/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(path);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                bool exists = System.IO.Directory.Exists(rootpath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(rootpath);
                var provider = new MultipartFormDataStreamProvider(rootpath);

                var data = await Request.Content.ReadAsMultipartAsync(provider);

                var model = data.FormData["model"];

                obj = JsonConvert.DeserializeObject<BALCollegeAddmission>(model);
                

                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    if (i == obj.index)
                    {
                        System.Web.HttpPostedFile hpf = hfc[i];
                        if (hpf.ContentLength > 0)
                        {
                            string fname = Path.GetFileName(hpf.FileName);
                            var File_Extenstion = Path.GetExtension(hpf.FileName);
                            string NewFileName = "";
                            NewFileName += DateTime.Now.Year.ToString();
                            NewFileName += DateTime.Now.Month.ToString();
                            NewFileName += DateTime.Now.Day.ToString();
                            NewFileName += DateTime.Now.Hour.ToString();
                            NewFileName += DateTime.Now.Minute.ToString();
                            NewFileName += DateTime.Now.Second.ToString();
                            NewFileName += DateTime.Now.Millisecond.ToString();

                            string abc = UploadPath + obj.CreatedBy + '_' + NewFileName + File_Extenstion;
                            var ServerSavepath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath(abc));
                            hpf.SaveAs(ServerSavepath);
                            string filePath = NewFileName + File_Extenstion;
                            obj.DocumentPath = abc;
                        }
                    }                    
                }

                string result1 = await DLL.dal.InsertUpdateDeleteCollegeDocumentDetail(obj);
                return result1;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeAdmissionFormDetails()
        {
            string uploadingpath = "~/uploads/Student/Photos/Admission/";
            string rootpath = "";
            rootpath = System.Web.Hosting.HostingEnvironment.MapPath(uploadingpath);
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            var provider = new MultipartFormDataStreamProvider(rootpath);
            var data = await Request.Content.ReadAsMultipartAsync(provider);
            var model = data.FormData["model"];
            BALCollegeAddmission obj = JsonConvert.DeserializeObject<BALCollegeAddmission>(model);

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
                    if (i == 0) { obj.StudentPhoto = uploadingpath + uniquefname; }
                    else if (i == 1) { obj.StudentSign = uploadingpath + uniquefname; }
                    else if (i == 2) { obj.FatherPhoto = uploadingpath + uniquefname; }
                    else if (i == 3) { obj.FatherSign = uploadingpath + uniquefname; }
                    else if (i == 4) { obj.MotherPhoto = uploadingpath + uniquefname; }
                    else if (i == 5) { obj.MotherSign = uploadingpath + uniquefname; }
                    else if (i == 6) { obj.LocalGuardianPhoto = uploadingpath + uniquefname; }
                    else if (i == 7) { obj.LocalGuardianSign = uploadingpath + uniquefname; }
                }

            }
            string result = await DLL.dal.InsertUpdateDeleteCollegeAdmissionFormDetails(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetCollegeAdmissionFormDetailList(BALCollegeAddmission obj)
        {
            DataTable dt = await DLL.dal.GetCollegeAdmissionFormDetailList(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetStudentDetails(BALCollegeAddmission obj)
        {
            DataTable result = await DLL.dal.GetStudentDetails(obj);
            return result;
        }
    }
}
