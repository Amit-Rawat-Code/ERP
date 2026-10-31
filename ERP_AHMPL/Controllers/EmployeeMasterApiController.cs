using BAL;
using DAL;
using System;
using System.Data;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SMS.Controllers
{
    public class EmployeeMasterApiController : ApiController
    {
        
        [HttpPost]
        public async Task<string> InsertUpdateDeleteDepartmentMaster(Department obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteDepartmentMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetDepartmentMaster(Department obj)
        {
            DataTable dt = await DLL.dal.GetDepartmentMaster(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteDesignationMaster(Designation obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteDesignationMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetDesignationMaster(Designation obj)
        {
            DataTable dt = await DLL.dal.GetDesignationMaster(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteGradeMaster(Grade obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteGradeMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetGradeMaster(Grade obj)
        {
            DataTable dt = await DLL.dal.GetGradeMaster(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteEmployeeRegistration(EmployeeDetails obj)
        {
            string basePath = "Uploads/Employee/Photos/";
            string EmployeePhoto = "";
            if (!string.IsNullOrEmpty(obj.EmployeePhotoPath))
            {
                if (obj.EmployeePhotoPath.Contains("data:image/"))
                {
                    EmployeePhoto = obj.EmployeePhotoPath;
                    obj.EmployeePhotoPath = "Yes";
                }
            }
            string result = await DLL.dal.InsertUpdateDeleteEmployeeRegistration(obj);
            if (result.Split('$').Length > 1)
            {
                obj.EmployeeId = result.Split('$')[1].Replace("\"", "");
            }
            if (obj.EmployeeId != null)
            {
                if (!string.IsNullOrEmpty(EmployeePhoto))
                {
                    if (EmployeePhoto.Contains("data:image/"))
                    {
                        byte[] bytes = Convert.FromBase64String(Regex.Replace(EmployeePhoto, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                        string path = basePath + obj.EmployeeId.Replace("/", "_") + obj.RelationshipId + obj.SessionId.ToString() + ".jpeg";

                        MemoryStream imageStream = new MemoryStream(bytes, false);
                        FileStream file = new FileStream(HttpContext.Current.Server.MapPath("~/" + path), FileMode.Create, FileAccess.Write);
                        imageStream.WriteTo(file);
                        file.Close();
                        imageStream.Close();

                        //obj.EmployeePhotoPath = "../" + path;
                    }
                }
            }
            result = result.Split('$')[0];
            return result;
        }


        [HttpPost]
        public async Task<DataSet> GetEmployeeList(EmployeeDetails obj)
        {
            DataSet ds = await DLL.dal.GetEmployeeList(obj);
            return ds;
        }
        #region
        [HttpPost]
        public async Task<string> InsertUpdateDeleteHOBioMetricRegistrationMaster(EmployeeDetails obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteHOBioMetricRegistrationMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetHOBioMetricRegistrationMaster(EmployeeDetails obj)
        {
            DataTable dt = await DLL.dal.GetHOBioMetricRegistrationMaster(obj);
            return dt;
        }
        #endregion
        //public async Task<string> GetEmployeeListUsingDesignationType(EmployeeDetails obj)
        //{
        //    string result = "0";

        //    result = await Task.Factory.StartNew(() => client.GetEmployeeListUsingDesignationType(obj), CancellationToken.None, TaskCreationOptions.LongRunning, TaskScheduler.Default);

        //    return result;
        //}
        //public async Task<string> GetEmployeeCount(BranchAuthorization obj)
        //{
        //    obj.Action = 5;
        //    string result = await Task.Factory.StartNew(() => client.GetEmployeeCount(obj));
        //    return result;
        //}
        //public async Task<string> GetBirthDayAdminPanelList(EmployeeBirthDayReminder obj)
        //{
        //    string result = await Task.Factory.StartNew(() => client.EmployeeBirthDayReminderAdminPanelList(obj));
        //    return result;
        //}

    }
}