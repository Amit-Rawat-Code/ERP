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
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SEF.Controllers
{
    public class AdmissionMasterApiController : ApiController
    {
        [HttpPost]
        public async Task<DataTable> GetCollectStudent(BALCreateBatch obj)
        {
            DataTable dt = await DLL.dal.GetCollectStudent(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetOrderByStudent(BALCreateBatch obj)
        {
            DataTable dt = await DLL.dal.GetOrderByStudent(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteCreateBatch(BALCreateBatch obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCreateBatch(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetBatchMaster(BALCreateBatch obj)
        {
            DataTable dt = await DLL.dal.GetBatchMaster(obj);
            return dt;
        }
        


        [HttpPost]
        public async Task<DataTable> GetClassesWithRespectOfCreatedBatches(BALBatchSlotTime obj)
        {
            DataTable dt = await DLL.dal.GetClassesWithRespectOfCreatedBatches(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteBatchTimeSlot(BALBatchSlotTime obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBatchTimeSlot(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetBatchTimeSlot(BALBatchSlotTime obj)
        {
            DataTable dt = await DLL.dal.GetBatchTimeSlot(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataSet> GetBatchTimeSlotDetail(BALBatchSlotTime obj)
        {
            DataSet ds = await DLL.dal.GetBatchTimeSlotDetail(obj);
            return ds;
        }


        [HttpPost]
        public async Task<string> InsertUpdateDeleteChangeBatch(BALCreateBatch obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteChangeBatch(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetChangeBatch(BALCreateBatch obj)
        {
            DataTable dt = await DLL.dal.GetChangeBatch(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBatchesForMarksEntry(BALBatchTransaction obj)
        {
            DataTable dt = await DLL.dal.GetBatchesForMarksEntry(obj);
            return dt;
        }
       
         [HttpPost]
        public async Task<DataTable> GetEntranceSubjects(BALBatchTransaction obj)
        {
            DataTable dt = await DLL.dal.GetEntranceSubjects(obj);
            return dt;
        }        

        [HttpPost]
        public async Task<DataTable> GetCollegeAdmissionFormDetails(BALCollegeAddmission obj)
        {
           DataTable dt = await DLL.dal.GetCollegeAdmissionFormDetails(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetCollegeStudentDetails(BALCollegeAddmission obj)
        {
            DataTable dt = await DLL.dal.GetCollegeStudentDetails(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeAdmissionFormOtherDetails(BALCollegeAddmission obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeAdmissionFormOtherDetails(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetCollegeAdmissionFormOtherDetails(BALCollegeAddmission obj)
        {
            DataTable dt = await DLL.dal.GetCollegeAdmissionFormOtherDetails(obj);
            return dt;
        }


        //[NonAction]
        //public async Task<string> FileUpload(string data ,string path)
        //{
        //    string uploadedpath=string.Empty;
        //    if (!Request.Content.IsMimeMultipartContent())
        //    {
        //        throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        //    }
        //    //"~/App_Data/Uploadfiles"
        //    bool exists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath(path));
        //    if (!exists) { Directory.CreateDirectory(path); }
        //    var root = HttpContext.Current.Server.MapPath(path);

        //    var provider = new MultipartFormDataStreamProvider(root);
        //    var result = await Request.Content.ReadAsMultipartAsync(provider);


        //    //////"jsonData"
        //    ////var model = result.FormData[data];
        //    ////if (model == null)
        //    ////{
        //    ////    throw new HttpResponseException(HttpStatusCode.BadRequest);
        //    ////}
        //    //////TODO: Do something with the JSON data.  

        //    //////get the posted files  
        //    ////foreach (var file in result.FileData)
        //    ////{
        //    ////    //TODO: Do something with uploaded file.  
        //    ////}

        //    return uploadedpath;
        //}



        //[HttpPost]
        //public async Task<string> InsertUpdateDeleteCollegeAdmissionFormDetails(BALCollegeAddmission obj)
        //{
        //    var a = FileUpload(obj.StudentPhoto, "~/uploads/Student/Photos/Admission");
        //    string result = await DLL.dal.InsertUpdateDeleteCollegeAdmissionFormDetails(obj);
        //    return result;
        //}
    }
}
