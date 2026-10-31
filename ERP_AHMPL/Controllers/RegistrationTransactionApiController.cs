using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SEF.Controllers
{
    public class RegistrationTransactionApiController : ApiController
    {
        #region Registration Form Sale Entry
        // Perform Insert Update Delete Operation GetNavigationMenuForRole
        [HttpPost]
        public async Task<string> InsertUpdateDeleteRegistrationFormSaleEntry(BALRegistrationFormSaleEntry obj)
        {    
            string result = await DLL.dal.InsertUpdateDeleteRegistrationFormSaleEntry(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetRegistrationFormSaleEntry(BALRegistrationFormSaleEntry obj)
        {
            DataTable result = await DLL.dal.GetRegistrationFormSaleEntry(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetStudentDetails(BALRegistrationFormSaleEntry obj)
        {
            DataSet result = await DLL.dal.GetStudentDetails(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetAmountByClass(BALRegistrationFormSaleEntry obj)
        {
            DataTable result = await DLL.dal.GetAmountByClass(obj);
            return result;
        }


        #endregion

        #region Registration Form Submission
        // Perform Insert Update Delete Operation GetNavigationMenuForRole
        [HttpPost]
        public async Task<string> InsertUpdateDeleteRegistrationFormSubmission(BALRegistrationFormSubmission obj)
        {
            string basePath = "Uploads/Student/Photos/Submission/";
            string StudentPhoto = "";
            if (!string.IsNullOrEmpty(obj.StudentPhoto))
            {
                if (obj.StudentPhoto.Contains("data:image/"))
                {
                    StudentPhoto = obj.StudentPhoto;
                }
            }
            string result = await DLL.dal.InsertUpdateDeleteRegistrationFormSubmission(obj);
            if (result.Split('_').Length == 2)
                if (!string.IsNullOrEmpty(obj.StudentPhoto))
                {
                    if (StudentPhoto.Contains("data:image/"))
                    {
                        byte[] bytes = Convert.FromBase64String(Regex.Replace(StudentPhoto, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                        string path = basePath + result.Split('_')[1] + ".jpeg";
                        MemoryStream imageStream = new MemoryStream(bytes, false);
                        FileStream file = new FileStream(HttpContext.Current.Server.MapPath("~/" + path), FileMode.Create, FileAccess.Write);
                        imageStream.WriteTo(file);
                        file.Close();
                        imageStream.Close();

                        obj.Action = 2;
                        obj.TransID = result.Split('_')[1];
                        obj.StudentPhoto = "../"+path;
                        await DLL.dal.InsertUpdateDeleteRegistrationFormSubmission(obj);
                    }
                }
            return result.Split('_')[0];
        }

        [HttpPost]
        public async Task<DataTable> GetRegistrationFormSubmission(BALRegistrationFormSubmission obj)
        {
            DataTable result = await DLL.dal.GetRegistrationFormSubmission(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetStudentDetailsFromRegistrationSale(BALRegistrationFormSubmission obj)
        {
            DataSet result = await DLL.dal.GetStudentDetailsFromRegistrationSale(obj);
            return result;
        }

        #endregion

        #region Registration Fee Posting
        [HttpPost]
        public async Task<string> InsertUpdateDeleteRegistrationFeePosting(BALRegistrationFeePosting obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteRegistrationFeePosting(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetRegistrationFormSaleTransactions(BALRegistrationFeePosting obj)
        {
            DataTable result = await DLL.dal.GetRegistrationFormSaleTransactions(obj);
            return result;
        }
        #endregion
    }
}
