using System;
using BAL;
using DAL;
using Newtonsoft.Json;
using System.Data;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Text;
using System.IO;

namespace WebSite.Controllers
{
    public class ApiController : Controller
    {
        // GET: Api
        [HttpPost]
        public async Task<string> GetTabMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetTabMaster(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetMenuMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetMenuMaster(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetWebSubMenuMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetWebSubMenuMaster(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetUploadedPhotoList(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetUploadedPhotoList(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetDigitalNoticeBoard(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetDigitalNoticeBoard(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetBanner(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetBanner(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetBodyContent(BALDynamicWebsite obj)
        {
            DataTable result = await DLL.dal.GetBodyContent(obj);
            return JsonConvert.SerializeObject(result);
        }
        [HttpPost]
        public async Task<string> GetBodyContentNew(BALDynamicWebsite obj)
        {
            DataTable result = await DLL.dal.GetUploadedPhotoListBodyContent(obj);
            return JsonConvert.SerializeObject(result);
        }
        [HttpPost]
        public async Task<string> GetBodyCenterContentWithSlider(BALDynamicWebsite obj)
        {
            DataSet result = await DLL.dal.GetBodyCenterContentWithSlider(obj);
            return JsonConvert.SerializeObject(result);
        }
        [HttpPost]
        public async Task<string> InsertContactUs(BALDynamicWebsite obj)
        {
            try
            {
                string result = await DLL.dal.InsertContactUs(obj);
                if (result == "1")
                {
                    var senderEmail = new MailAddress("team.development@superhouseeducation.com", "DPS Website");                    
                    var receiverEmail = new MailAddress(obj.Email, "Receiver");
                    var password = "webD@1234";
                    var sub = obj.Subject;
                    var body = obj.Message;
                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(senderEmail.Address, password)
                    };
                    using (var mess = new MailMessage(senderEmail, receiverEmail)
                    {
                        Subject = obj.Subject,
                        Body = body
                    })
                    {
                        smtp.Send(mess);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<string> SendEmail(BALDynamicWebsite obj)
        {
            try
            {
                string result = "";
                if (obj.Name != null && obj.Subject != null && obj.Message != null && obj.Contact != null)
                {
                    result = await DLL.dal.InsertContactUs(obj);
                }
                if (result == "1")
                {
                    var senderEmail = new MailAddress("team.development@superhouseeducation.com", "DPS Website");
                    var receiverEmail = new MailAddress("team.development@superhouseeducation.com", "Receiver");
                    var password = "webD@1234";
                    var sub = obj.Subject;
                    var body = obj.Message;
                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(senderEmail.Address, password)
                    };
                    using (var mess = new MailMessage(senderEmail, receiverEmail)
                    {
                        Subject = obj.Subject,
                        Body = body
                    })
                    {
                        smtp.Send(mess);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        public async Task<string> GetContactUsContentMaster(BALDynamicWebsite obj)
        {
            DataTable result = await DLL.dal.GetContactUsContentMaster(obj);
            return JsonConvert.SerializeObject(result);
        }
        [HttpPost]
        public async Task<string> ConnectionConnector(BALConnectionConnector obj)
        {
            DataTable dt = await DLL.dal.GetWebsiteConnectionConnector(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetTheme(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetTheme(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetSession(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetSession(obj);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public async Task<string> GetUploadedVideoList(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetUploadedVideoList(obj);
            return JsonConvert.SerializeObject(dt); 
        }


        [HttpPost]
        public async Task<string> GetMediaGallery(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetMediaFiles(obj);
            return JsonConvert.SerializeObject(dt);
        }

        [HttpPost]
        public async Task<string> GetDocsData(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetDocsAndInfo(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> InsertCareer(BALDynamicWebsite obj)
        {
            try
            {
                byte[] bytes = null;
                string extention = "";
                //string seprator = "";
                StringBuilder uplo = new StringBuilder();
                obj.AlbumIcon1 = obj.MediafileUrl;
                string convert = obj.AlbumIcon1.Replace("data:application/pdf;base64,", String.Empty);
                bytes = Convert.FromBase64String(convert);
                extention = ".pdf";
                var imageStream = new MemoryStream(bytes, false);
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
                string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/Career/Pdf/";
                string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/Career/Pdf/" + NewFileName + extention;
                string filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
                bool exists = System.IO.Directory.Exists(filePath);
                if (!exists)
                {
                    System.IO.Directory.CreateDirectory(filePath);
                }
                FileStream file = new FileStream(filePath + NewFileName + extention, FileMode.Create, FileAccess.Write);
                imageStream.WriteTo(file);
                file.Close();
                imageStream.Close();
                //uplo.Append(seprator);
                uplo.Append(uploadpaths);
                //seprator = ",";
                obj.MediaId = uplo.ToString().Trim();
                string result = await DLL.dal.InsertCareer(obj);
                return result;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<string> GetErpLogin(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetErpLogin(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetTopHeaderData(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetTopHeaderData(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetLogoImage(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetLogoImage(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetSidebarLinkData(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetSidebarLinkData(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetClass(BALGblClassMaster obj)
        {
            DataTable dt = await DLL.dal.GetClasses(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetCountry(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetCountry(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetState(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetState(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetCity(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetCity(obj);
            return JsonConvert.SerializeObject(dt);
        }
        //[HttpPost]
        //public async Task<string> GetAccordianContent(BALGlobalMaster obj)
        //{
        //    DataTable dt = await DLL.dal.GetCity(obj);
        //    return JsonConvert.SerializeObject(dt);
        //}
        [HttpPost]
        public async Task<string> GetAccordianContentLayout(BALDynamicWebsite obj)
        {
            DataTable result = await DLL.dal.GetAccordianContentLayout(obj);
            return JsonConvert.SerializeObject(result);
        }

        [HttpPost]
        public async Task<string> GetImageData(BALDynamicWebsite obj)
        {
            DataSet dt = await DLL.dal.GetImageData(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> GetImageGallery(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetImageGallary(obj);
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public async Task<string> UpdateVisitorCount(BALDynamicWebsite obj)
        {
            string dt = await DLL.dal.InsertUpdateDeleteThemeMaster(obj);
            return JsonConvert.SerializeObject(dt);
        }
    }
}