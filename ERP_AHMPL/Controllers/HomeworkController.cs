using BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Text.RegularExpressions;
using DAL;
using System.Data;

namespace SMS.Controllers
{
    public class HomeworkController : Controller
    {
        //HomeworkServiceClient client = new HomeworkServiceClient();
        // GET: Homework
        public ActionResult Homework()
        {
            return View();
        }
         
        public ActionResult HomeworkDetails()
        {
            return View();
        }
        //[HttpPost]
        //public async Task<DataTable> SubjectEmpWise(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.SubjectEmpWise(obj);
        //    return result;
        //}


        //public async Task<DataTable> getAllStudent(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.getAllStudent(obj);
        //    return result;
        //}
        //public async Task<string> SubmittedHomework(HomeWork obj)
        //{
        //    string result = await DLL.dal.SubmittedHomework(obj);
        //    return result;
        //}
        //public async Task<string> SendNotification(HomeWork obj)
        //{
        //    string result = await DLL.dal.SendNotification(obj);
        //    return result; 
        //}
        //public async Task<string> HomeworkInsert(HomeWork obj)
        //{
        //    //-----------------------------Note: This Code is moved to HomworkApiController.cs----------------------
        //    //try
        //    //{
        //    //    if (!string.IsNullOrEmpty(obj.Attachment))
        //    //    {
        //    //        if (obj.Name != "preview")
        //    //        {
        //    //            string NewFileName = obj.TopicName;
        //    //            if (NewFileName.Length > 5)
        //    //            {
        //    //                NewFileName = NewFileName.Substring(0, 5);
        //    //            }
        //    //            string strPassword = Guid.NewGuid().ToString("N").Substring(0, 4);
        //    //            NewFileName += strPassword;
        //    //            NewFileName += DateTime.Now.Year.ToString();
        //    //            NewFileName += DateTime.Now.Month.ToString();
        //    //            NewFileName += DateTime.Now.Day.ToString();
        //    //            NewFileName += DateTime.Now.Hour.ToString();
        //    //            NewFileName += DateTime.Now.Minute.ToString();
        //    //            NewFileName += DateTime.Now.Second.ToString();
        //    //            NewFileName += DateTime.Now.Millisecond.ToString();
        //    //            NewFileName += obj.schoolCode.ToString() + obj.branchCode.ToString() + obj.SessionId.ToString();

        //    //            byte[] data = Convert.FromBase64String(obj.Attachment);
        //    //            var imageStream = new MemoryStream(data, false);
        //    //            string extention = obj.Name == "image" ? ".jpeg" : ".pdf";
        //    //            //string fileName =   Guid.NewGuid().ToString();
        //    //            string fileName = NewFileName;
        //    //            string filePth = "DownloadMat/HomeWork/" + fileName + extention;
        //    //            FileStream file = new FileStream(Server.MapPath("~/" + filePth), FileMode.Create, FileAccess.Write);
        //    //            imageStream.WriteTo(file);
        //    //            file.Close();
        //    //            imageStream.Close();
        //    //            obj.Attachment = filePth;
        //    //        }
        //    //    }
        //    //}
        //    //catch (Exception ex) { }
        //    string result = await DLL.dal.HomeworkInsert(obj);
        //    return result;
        //    //-----------------------------Note: This Code is moved to HomworkApiController.cs----------------------
        //}
        //public async Task<DataTable> GetAllHomeWork(HomeWork obj)
        //{ 
        //    DataTable result = await DLL.dal.GetAllHomeWork(obj);
        //    return result;
        //}

        //public async Task<string> DeleteSHomework(HomeWork obj)
        //{
        //    string result = await DLL.dal.DeleteSHomework(obj);
        //    return result;
        //}

        //public async Task<DataTable> GetHomeworkId(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.GetHomeworkId(obj);
        //    return result;
        //}
        //public async Task<DataTable> GetHomeworkfor(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.GetHomeworkfor(obj);
        //    return result;
        //}

        //public async Task<DataTable> HomeworkTopic(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.HomeworkTopic(obj);
        //    return result;
        //}
        //public async Task<DataTable> GetEmployeeClass(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.GetEmployeeClass(obj);
        //    return result;
        //}
        //public async Task<DataTable> GetEmployeeSection(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.GetEmployeeSection(obj);
        //    return result;
        //}

        public ActionResult AllHomeWork()
        {
            return View();
        }
        public ActionResult VedioHomework()
        {
            return View();
        }
        //public async Task<DataTable> GetAllVedioHomeWork(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.GetAllVedioHomeWork(obj);
        //    return result;
        //}
        //public async Task<string> UpdateHomeworkApprove(HomeWork obj)
        //{
        //    string result = await DLL.dal.UpdateHomeworkApprove(obj);
        //    return result;
        //}
        public ActionResult HomeworkReport()
        {
            return View();
        }
        //public async Task<DataTable> GetHomeWorkTopicClassSectionSubjectEmpWise(HomeWork obj)
        //{
        //    DataTable result = await DLL.dal.GetHomeWorkTopicClassSectionSubjectEmpWise(obj);
        //    return result;
        //}
        public ActionResult HomeworkSubmitionDetails()
        {
            return View();
        }
    }
}