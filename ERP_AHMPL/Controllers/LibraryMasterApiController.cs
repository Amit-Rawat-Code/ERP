using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.IO;
using System.Text.RegularExpressions;

namespace SEF.Controllers
{
    public class LibraryMasterApiController : ApiController
    {
        #region Almera Master
        [HttpPost]
        public async Task<DataTable> GetAlmeraMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetAlmeraMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteAlmeraMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteAlmeraMaster(obj);
            return result;
        }
        #endregion

        #region Rack Master
        [HttpPost]
        public async Task<DataTable> GetRackMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetRackMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteRackMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteRackMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetAlmeraList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetAlmeraList(obj);
            return dt;
        }
        #endregion
        #region Bin Master
        [HttpPost]
        public async Task<DataTable> GetBinMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBinMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteBinMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBinMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetRackList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetRackList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> BindBinList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.BindBinList(obj);
            return dt;
        }
        #endregion

        #region Author Master        
        [HttpPost]
        public async Task<DataTable> GetAuthorMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetAuthorMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteAuthorMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteAuthorMaster(obj);
            return result;
        }
        #endregion

        #region Binding Type Master        
        [HttpPost]
        public async Task<DataTable> GetBindingTypeMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBindingTypeMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteBindingTypeMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBindingTypeMaster(obj);
            return result;
        }
        #endregion
        #region Book Accessories Master
        [HttpPost]
        public async Task<DataTable> GetBookAccessoriesMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBookAccessoriesMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteBookAccessoriesMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBookAccessoriesMaster(obj);
            return result;
        }

        #endregion
        #region Publisher Master
        [HttpPost]
        public async Task<DataTable> GetPublisherMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetPublisherMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeletePublisherMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeletePublisherMaster(obj);
            return result;
        }
        #endregion
        #region Book Master
        [HttpPost]
        public async Task<DataTable> GetBookMasterList(BookMaster obj)
        {
            DataTable dt = await DLL.dal.GetBookMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteBookMaster(BookMaster obj)
        {
            byte[] bytes = null;
            string path = "";
            string basePath = "eBook/";
            MemoryStream imageStream = null;
            string NewFileName = "";
            string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);            
            NewFileName += strUnique;
            NewFileName += DateTime.Now.Year.ToString();
            NewFileName += DateTime.Now.Month.ToString();
            NewFileName += DateTime.Now.Day.ToString();
            NewFileName += DateTime.Now.Hour.ToString();
            NewFileName += DateTime.Now.Minute.ToString();
            NewFileName += DateTime.Now.Second.ToString();
            NewFileName += DateTime.Now.Millisecond.ToString();
            FileStream file = null;
            string uploadingpath = "/Uploads/Site/";
            try
            {
                if (!string.IsNullOrEmpty(obj.CoverPhotoPath))
                {
                    if (obj.CoverPhotoPath.Contains("data:image/"))
                    {
                        bytes = Convert.FromBase64String(Regex.Replace(obj.CoverPhotoPath, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                        path = uploadingpath + basePath + @"CoverPhoto/";
                        bool exists = System.IO.Directory.Exists(System.Web.HttpContext.Current.Server.MapPath(path));
                        if ((!exists))
                        {
                            System.IO.Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath(path));
                        }
                        imageStream = new MemoryStream(bytes, false);
                        string PathToSave = path + "Cover_" + NewFileName + ".jpeg";
                        string filePath = System.Web.HttpContext.Current.Server.MapPath(PathToSave);
                        file = new FileStream(filePath, FileMode.Create, FileAccess.Write);
                        imageStream.WriteTo(file);
                        file.Close();
                        imageStream.Close();
                        obj.CoverPhotoPath = PathToSave;
                    }
                }
                string NewFileNamepdf = "";
                string strUnique1 = Guid.NewGuid().ToString("N").Substring(0, 4);
                NewFileName += strUnique1;
                NewFileNamepdf += DateTime.Now.Year.ToString();
                NewFileNamepdf += DateTime.Now.Month.ToString();
                NewFileNamepdf += DateTime.Now.Day.ToString();
                NewFileNamepdf += DateTime.Now.Hour.ToString();
                NewFileNamepdf += DateTime.Now.Minute.ToString();
                NewFileNamepdf += DateTime.Now.Second.ToString();
                NewFileNamepdf += DateTime.Now.Millisecond.ToString();                
                if (!string.IsNullOrEmpty(obj.BookPDFPath))
                {
                    if (obj.BookPDFPath.Contains("data:application/pdf"))
                    {
                        bytes = Convert.FromBase64String(Regex.Replace(obj.BookPDFPath, @"^data:application\/[a-zA-Z]+;base64,", string.Empty));
                        path = uploadingpath + basePath + "BookPDF/";
                        bool exists = System.IO.Directory.Exists(System.Web.HttpContext.Current.Server.MapPath(path));
                        if ((!exists))
                        {
                            System.IO.Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath(path));
                        }
                        imageStream = new MemoryStream(bytes, false);
                        string PathToSave = path + "Book_" + NewFileNamepdf + ".pdf";
                        string filePath = System.Web.HttpContext.Current.Server.MapPath(PathToSave);
                        file = new FileStream(filePath, FileMode.Create, FileAccess.Write);
                        imageStream.WriteTo(file);
                        file.Close();
                        imageStream.Close();
                        obj.BookPDFPath = PathToSave;
                    }
                }

                string result = await DLL.dal.InsertUpdateDeleteBookMaster(obj);
                return result;
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }            
        }
        [HttpPost]
        public async Task<DataTable> GetSubjectLibList(BookMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectLibList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBookAcceNameLibList(BookMaster obj)
        {
            DataTable dt = await DLL.dal.GetBookAcceNameLibList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetAuthorLibList(BookMaster obj)
        {
            DataTable dt = await DLL.dal.GetAuthorLibList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetPublisherLibList(BookMaster obj)
        {
            DataTable dt = await DLL.dal.GetPublisherLibList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetCategoryLibList(BookMaster obj)
        {
            DataTable dt = await DLL.dal.GetCategoryLibList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetEditionTypeLibList(BookMaster obj)
        {
            DataTable dt = await DLL.dal.GetEditionTypeLibList(obj);
            return dt;
        }
        #endregion
        #region Subject Group Master
        [HttpPost]
        public async Task<DataTable> GetLibSubjectGrpMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetLibSubjectGrpMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteLibSubjectGrpMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteLibSubjectGrpMaster(obj);
            return result;
        }
        #endregion
        #region Subject Master
        [HttpPost]
        public async Task<DataTable> GetLibSubjectMasterList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetLibSubjectMasterList(obj);
            return dt;
        }
        public async Task<string> InsertUpdateDeleteLibSubjectMaster(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteLibSubjectMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetSubjectGrpLibList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetSubjectGrpLibList(obj);
            return dt;
        }
        #endregion
        #region Late Fine Master
        [HttpPost]
        public async Task<DataTable> GetLateFineMaster(LateFine obj)
        {
            DataTable dt = await DLL.dal.GetLateFineMaster(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteLateFineMaster(LateFine obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteLateFineMaster(obj);
            return result;
        }
        #endregion

        #region Accession Setting
        [HttpPost]
        public async Task<DataTable> GetAccessionSetting(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetAccessionSetting(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteAccessionSetting(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteAccessionSetting(obj);
            return result;
        }
        #endregion
    }
}
