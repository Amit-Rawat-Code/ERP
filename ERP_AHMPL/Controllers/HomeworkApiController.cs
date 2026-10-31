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
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.ModelBinding;

namespace SEF.Controllers
{

    public class HomeworkApiController : ApiController
    {
        #region Homework


        [HttpPost]
        public async Task<string> InsertUpdateDeleteHomeworks()
        {
            HomeWork obj = new HomeWork();
            try
            {
                string path = "~/Uploads/Homework/";
                string UploadPath = "/Uploads/Homework/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(path);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);

                var data = await Request.Content.ReadAsMultipartAsync(provider);

                var model = data.FormData["model"];

                obj = JsonConvert.DeserializeObject<HomeWork>(model);

                List<AttachmentList> listobj = new List<AttachmentList>();
                AttachmentList HWobj;
                bool exists = System.IO.Directory.Exists(rootpath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(rootpath);

                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    HWobj = new AttachmentList();
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
                        HWobj.Attachment = abc;
                        HWobj.Name = NewFileName + File_Extenstion;
                        listobj.Add(HWobj);
                        switch (i)
                        {
                            case 0:
                                obj.Attachment = abc;
                                break;
                            case 1:
                                obj.Attachment2 = abc;
                                break;
                            case 2:
                                obj.Attachment3 = abc;
                                break;
                            case 3:
                                obj.Attachment4 = abc;
                                break;
                            case 4:
                                obj.Attachment5 = abc;
                                break;
                            case 5:
                                obj.Attachment6 = abc;
                                break;
                            case 6:
                                obj.Attachment7 = abc;
                                break;
                            case 7:
                                obj.Attachment8 = abc;
                                break;
                            case 8:
                                obj.Attachment9 = abc;
                                break;

                            case 9:
                                obj.Attachment10 = abc;
                                break;
                        }
                    }

                }

                string result1 = await DLL.dal.InsertUpdateDeleteHomework(obj);
                return result1;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteHomeworksForMobile()
        {
            try
            {
                //var paths = "";
                string path = "~/Uploads/Homework/";
                string UploadPath = "/Uploads/Homework/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(path);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var file = HttpContext.Current.Request.Files.Count > 0 ?
                                HttpContext.Current.Request.Files[0] : null;
                string[] Data = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("TransID") : null;
                var d = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetKey(0) : null;
                string[] Data1 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("RelationshipId") : null;
                string[] Data2 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("SessionId") : null;
                string[] Data3 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("PVNo") : null;
                string[] Data4 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("VType") : null;
                string[] Data5 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("VDate") : null;
                string[] Data6 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("ClassCode") : null;
                string[] Data7 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("SectionCode") : null;
                string[] Data8 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("SubjectCode") : null;
                string[] Data9 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("IsAllSubject") : null;
                string[] Data10 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("HomeWorkDate") : null;
                string[] Data11 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("ShowDate") : null;
                string[] Data12 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("EndDate") : null;
                string[] Data13 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("VideoPath") : null;
                string[] Data14 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("Title") : null;
                string[] Data15 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("Description") : null;
                string[] Data16 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("StudentsList") : null;
                string[] Data17 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("Action") : null;
                string[] Data18 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("FYId") : null;
                string[] Data19 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("CreatedBy") : null;
                string[] Data20 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("UpdatedBy") : null;
                string[] Data21 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("SubmissionRequired") : null;


                HomeWork obj = new HomeWork();

                //obj.TransID = Data[0];
                obj.RelationshipId = Convert.ToInt32(Data1[0]);
                obj.SessionId = Convert.ToInt32(Data2[0]);
                //obj.PVNo = Data3[0];
                //obj.VType = Data4[0];
                //obj.VDate = Data5[0];
                obj.ClassCode = Data6[0];
                obj.SectionCode = Data7[0];
                obj.SubjectCode = Data8[0];
                obj.IsAllSubject = Data9[0];
                //obj.HomeWorkDate = Data10[0];
                obj.ShowDate = Data11[0];
                obj.EndDate = Data12[0];
                obj.VideoPath = Data13[0];
                obj.Title = Data14[0];
                obj.Description = Data15[0];
                obj.StudentCodeList = Data16[0];
                obj.Action = Convert.ToInt32(Data17[0]);
                obj.FYId = Convert.ToInt32(Data18[0]);
                obj.CreatedBy = Data19[0];
                obj.UpdatedBy = Data20[0];
                obj.IsSubmissionRequired = Data21[0];


                List<AttachmentList> listobj = new List<AttachmentList>();
                AttachmentList HWobj;
                bool exists = System.IO.Directory.Exists(rootpath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(rootpath);
                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    HWobj = new AttachmentList();
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
                        HWobj.Attachment = abc;
                        HWobj.Name = NewFileName + File_Extenstion;
                        listobj.Add(HWobj);
                        switch (i)
                        {
                            case 0:
                                obj.Attachment = abc;
                                break;
                            case 1:
                                obj.Attachment2 = abc;
                                break;
                            case 2:
                                obj.Attachment3 = abc;
                                break;
                            case 3:
                                obj.Attachment4 = abc;
                                break;
                            case 4:
                                obj.Attachment5 = abc;
                                break;
                            case 5:
                                obj.Attachment6 = abc;
                                break;
                            case 6:
                                obj.Attachment7 = abc;
                                break;
                            case 7:
                                obj.Attachment8 = abc;
                                break;
                            case 8:
                                obj.Attachment9 = abc;
                                break;
                            case 9:
                                obj.Attachment10 = abc;
                                break;
                        }
                    }



                }
                string dt = await DLL.dal.InsertUpdateDeleteHomework(obj);
                return dt;


            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        //    [HttpPost]
        //public async Task<string> InsertUpdateDeleteHomeworks(BALDigital obj)
        //{
        //    string basePath = "~/Uploads/Homework/";
        //    string Attachment = "";
        //    if (!string.IsNullOrEmpty(obj.Attachment))
        //    {
        //        if (obj.Attachment.Contains("data:image/")|| obj.Attachment.Contains("data:pdf/"))
        //        {
        //            Attachment = obj.Attachment;
        //        }
        //    }
        //    string result = await DLL.dal.InsertUpdateDeleteHomework(obj);
        //    if (result.Split('_').Length == 2)
        //        if (!string.IsNullOrEmpty(obj.Attachment))
        //        {
        //            if (Attachment.Contains("data:image/"))
        //            {
        //                byte[] bytes = Convert.FromBase64String(Regex.Replace(Attachment, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
        //                string path = basePath + result.Split('_')[1] + ".jpeg";
        //                MemoryStream imageStream = new MemoryStream(bytes, false);
        //                FileStream file = new FileStream(HttpContext.Current.Server.MapPath("~/" + path), FileMode.Create, FileAccess.Write);
        //                imageStream.WriteTo(file);
        //                file.Close();
        //                imageStream.Close();

        //                obj.Action = 2;
        //                obj.TransID = result.Split('_')[1];
        //                obj.Attachment = "../" + path;

        //            }
        //                if (Attachment.Contains("data:pdf/"))
        //                {
        //                    byte[] bytes = Convert.FromBase64String(Regex.Replace(Attachment, @"^data:pdf\/[a-zA-Z]+;base64,", string.Empty));
        //                    string path = basePath + result.Split('_')[1] + ".pdf";
        //                    MemoryStream imageStream = new MemoryStream(bytes, false);
        //                    FileStream file = new FileStream(HttpContext.Current.Server.MapPath("~/" + path), FileMode.Create, FileAccess.Write);
        //                    imageStream.WriteTo(file);
        //                    file.Close();
        //                    imageStream.Close();

        //                    obj.Action = 2;
        //                    obj.TransID = result.Split('_')[1];
        //                    obj.Attachment = "../" + path;

        //                }
        //                await DLL.dal.InsertUpdateDeleteHomework(obj);
        //            }
        //   // return result.Split('_')[0];


        //    return result= await DLL.dal.InsertUpdateDeleteHomework(obj);
        //}
        [HttpPost]
        public async Task<DataTable> GETHomeWork(BALDigital obj)
        {
            var result = await DLL.dal.GetHomework(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetHomeWorkTopic(HomeWork obj)
        {
            var result = await DLL.dal.HomeworkTopic(obj);
            return result;
        }


        [HttpPost]
        public async Task<DataTable> GETHomeWorkReport(HomeWork obj)
        {
            var result = await DLL.dal.GetHomeworkReport(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetEmployeeClass(HomeWork obj)
        {
            DataTable result = await DLL.dal.GetEmployeeClass(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetEmployeeSection(HomeWork obj)
        {
            DataTable result = await DLL.dal.GetEmployeeSection(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetHomeworkfor(HomeWork obj)
        {
            DataTable result = await DLL.dal.GetHomeworkfor(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetClassWiseSubject(HomeWork obj)
        {
            DataTable result = await DLL.dal.GetClassWiseSubject(obj);
            return result;
        }

        #endregion


        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }
        public string Base64Decode(string base64EncodedData)
        {

            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);

            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);

        }

        public async Task<bool> SaveFile(string base64Str, string basepath, string ImgName, string ext)
        {
            String path = HttpContext.Current.Server.MapPath(basepath); //Path

            //Check if directory exist
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            string imageName = ImgName + ext;

            //set the image path
            string imgPath = Path.Combine(path, imageName);

            byte[] imageBytes = Convert.FromBase64String(base64Str);

            FileStream fs = new FileStream(imgPath, FileMode.Create, FileAccess.ReadWrite);
            BinaryWriter bw = new BinaryWriter(fs);
            await Task.Factory.StartNew(() => bw.Write(imageBytes));
            bw.Close();

            return true;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }


        [HttpPost]
        public async Task<DataTable> getAllStudent(HomeWork obj)
        {
            DataTable result = await DLL.dal.getAllStudent(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetAllHomeWorkExecptTransId(HomeWork obj)
        {
            DataTable result = await DLL.dal.GetAllHomeWorkExecptTransId(obj);
            return result;
        }
        [HttpPost]
        public async Task<string> HomeWorkSubmittedbyStudent()
        {
            HomeWork obj = new HomeWork();
            try
            {
                string path = "~/Uploads/Homework/";
                string UploadPath = "/Uploads/Homework/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(path);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);

                var data = await Request.Content.ReadAsMultipartAsync(provider);

                var model = data.FormData["model"];

                obj = JsonConvert.DeserializeObject<HomeWork>(model);

                List<AttachmentList> listobj = new List<AttachmentList>();
                AttachmentList HWobj;
                bool exists = System.IO.Directory.Exists(rootpath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(rootpath);

                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    HWobj = new AttachmentList();
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
                        HWobj.Attachment = abc;
                        HWobj.Name = NewFileName + File_Extenstion;
                        listobj.Add(HWobj);
                        switch (i)
                        {
                            case 0:
                                obj.Attachment = abc;
                                break;
                            case 1:
                                obj.Attachment2 = abc;
                                break;
                            case 2:
                                obj.Attachment3 = abc;
                                break;
                            case 3:
                                obj.Attachment4 = abc;
                                break;
                            case 4:
                                obj.Attachment5 = abc;
                                break;
                            case 5:
                                obj.Attachment6 = abc;
                                break;
                            case 6:
                                obj.Attachment7 = abc;
                                break;
                            case 7:
                                obj.Attachment8 = abc;
                                break;
                            case 8:
                                obj.Attachment9 = abc;
                                break;
                            case 9:
                                obj.Attachment10 = abc;
                                break;
                        }
                    }

                }

                string result1 = await DLL.dal.HomeWorkSubmittedbyStudent(obj);
                return result1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<string> HomeWorkSubmittedbyStudentForMobile()
        {
            try
            {
                //var paths = "";
                string path = "~/Uploads/Homework/";
                string UploadPath = "/Uploads/Homework/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(path);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                string[] Data = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("TransID") : null;
                string[] Data1 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("RelationshipId") : null;
                string[] Data2 = HttpContext.Current.Request.Form.Count > 0 ?
                                 HttpContext.Current.Request.Form.GetValues("SessionId") : null;
                string[] Data3 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("Action") : null;
                string[] Data4 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("FYId") : null;
                string[] Data5 = HttpContext.Current.Request.Form.Count > 0 ?
                                     HttpContext.Current.Request.Form.GetValues("StudentCode") : null;



                HomeWork obj = new HomeWork();

                obj.TransID = Data[0];
                obj.RelationshipId = Convert.ToInt32(Data1[0]);
                obj.SessionId = Convert.ToInt32(Data2[0]);
                obj.Action = Convert.ToInt32(Data3[0]);
                obj.FYId = Convert.ToInt32(Data4[0]);
                obj.StudentCode = Data5[0];


                List<AttachmentList> listobj = new List<AttachmentList>();
                AttachmentList HWobj;
                bool exists = System.IO.Directory.Exists(rootpath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(rootpath);
                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    HWobj = new AttachmentList();
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
                        HWobj.Attachment = abc;
                        HWobj.Name = NewFileName + File_Extenstion;
                        listobj.Add(HWobj);
                        switch (i)
                        {
                            case 0:
                                obj.Attachment = abc;
                                break;
                            case 1:
                                obj.Attachment2 = abc;
                                break;
                            case 2:
                                obj.Attachment3 = abc;
                                break;
                            case 3:
                                obj.Attachment4 = abc;
                                break;
                            case 4:
                                obj.Attachment5 = abc;
                                break;
                            case 5:
                                obj.Attachment6 = abc;
                                break;
                            case 6:
                                obj.Attachment7 = abc;
                                break;
                            case 7:
                                obj.Attachment8 = abc;
                                break;
                            case 8:
                                obj.Attachment9 = abc;
                                break;
                            case 9:
                                obj.Attachment10 = abc;
                                break;
                        }
                    }



                }
                string dt = await DLL.dal.HomeWorkSubmittedbyStudent(obj);
                return dt;


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        public async Task<string> SubmittedHomework(HomeWork obj)
        {
            string result1 = await DLL.dal.SubmittedHomework(obj);
            return result1;
        }
    }
}