using BAL;
using DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SEF.Controllers
{
    public sealed class MainMaster
    {
        private static MainMaster instance = null;
        private static readonly object padlock = new object();

        MainMaster()
        {
        }
        public static MainMaster Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new MainMaster();
                        }
                    }
                }
                return instance;
            }
        }

        public string FooterId = "";
        public string FooterIds = "";
        public string Language = "";
        public string Action = "";
        public string BannerImageName = "";
        public string BannerTitle = "";
        public string Slogan = "";
        public string BannerType = "";
        public string BannerAltText = "";
        public string IsActive = "";
        public string fileInput = "";
        public string IsApproved = "";
        public string LayoutCode = "";
        public string LayoutPartId = "";
        public string UnitTypeCode = "";
        public string Code = "";
        public string TabId = "";
        public string TabName = "";
        public string DisplayCode = "";
        public string URLType = "";
        public string TargetUnitId = "";
        public string TargetLayoutId = "";
        public string URL = "";
        public string SeqNo = "";
        public string Attachment = "";
        public string MenuId = "";
        public string MenuNameEng = "";
        public string MenuNameHin = "";
        public string SubMenuId = "";
        public string SubMenuNameEng = "";
        public string SubMenuNameHin = "";
        public string unittypeids = "";
        public string unitids = "";
        public string FooterTextEng = "";
        public string FooterTextHin = "";
        public string QuickLinksTextEng = "";
        public string QuickLinksTextHin = "";
        public string FooterHeaderId = "";
        public string QuickLinksId = "";
        public string QuickLinksHeaderId = "";
        public string QuickLinksIds = "";
        public string ImageId = "";
        public string CreatedBy = "";
        public string UpdatedBy = "";
        public string UnitTitle = "";
        public string UnitName = "";
        public string logopath = "";
        public string ContentEng = "";
        public string ContentHin = "";
        public string Remarks = "";
        public string SloganImagePath = "";
        public string hosturl = "";
        public string FacebookLink = "";
        public string TwitterLink = "";
        public string YoutubeLink = "";
        public string HomeVideoLink = "";
        public string YoutubeFeed = "";
        public string FacebookFeed = "";
        public int RelationShipId = 0;
        public int SessionId = 0;
        public int FyId = 0;
        public int UserId = 0;
        public string MediafileUrl = "";
        public string thumbImgInput = "";
    }
    public sealed class DynamicWebsiteApiController : ApiController
    {
        public void SetValues(BALDynamicWebsite obj)
        {
            MainMaster.Instance.Action = obj.Action;
            MainMaster.Instance.UnitTypeCode = obj.UnitTypeCode;
            MainMaster.Instance.Code = obj.Code;
            MainMaster.Instance.LayoutCode = obj.LayoutCode;
            MainMaster.Instance.LayoutPartId = obj.LayoutPartId;
            MainMaster.Instance.TabId = obj.TabId;
            MainMaster.Instance.TabName = obj.TabName;
            MainMaster.Instance.MenuId = obj.MenuId;
            MainMaster.Instance.MenuNameEng = obj.MenuName;
            MainMaster.Instance.SubMenuId = obj.SubMenuId;
            MainMaster.Instance.SubMenuNameEng = obj.SubMenuName;
            MainMaster.Instance.DisplayCode = obj.DisplayCode;
            MainMaster.Instance.fileInput = obj.fileInput;
            MainMaster.Instance.URL = obj.URL;
            MainMaster.Instance.URLType = obj.URLType;
            MainMaster.Instance.TargetUnitId = obj.TargetUnitId;
            MainMaster.Instance.TargetLayoutId = obj.TargetLayoutCode;
            MainMaster.Instance.SeqNo = obj.SeqNo;
            MainMaster.Instance.IsActive = obj.IsActive;
            MainMaster.Instance.IsApproved = obj.IsApproved;
            MainMaster.Instance.FooterId = obj.FooterId;
            MainMaster.Instance.FooterHeaderId = obj.FooterHeaderId;
            MainMaster.Instance.FooterIds = obj.FooterIds;
            MainMaster.Instance.FooterTextEng = obj.FooterTextEng;
            MainMaster.Instance.FooterTextHin = obj.FooterTextHin;
            MainMaster.Instance.QuickLinksId = obj.QuickLinksId;
            MainMaster.Instance.QuickLinksIds = obj.QuickLinksIds;
            MainMaster.Instance.QuickLinksHeaderId = obj.QuickLinksHeaderId;
            MainMaster.Instance.QuickLinksTextHin = obj.QuickLinksTextHin;
            MainMaster.Instance.QuickLinksTextEng = obj.QuickLinksTextEng;
            MainMaster.Instance.unitids = obj.unitids;
            MainMaster.Instance.unittypeids = obj.unittypeids;
            MainMaster.Instance.Language = obj.Language;
            MainMaster.Instance.CreatedBy = obj.CreatedBy;
            MainMaster.Instance.UpdatedBy = obj.UpdatedBy;
            MainMaster.Instance.UnitName = obj.UnitName;
            MainMaster.Instance.UnitTitle = obj.UnitTitle;
            MainMaster.Instance.logopath = obj.logopath;
            MainMaster.Instance.Attachment = obj.Attachment;
            MainMaster.Instance.ContentEng = obj.ContentEng;
            MainMaster.Instance.ContentHin = obj.ContentHin;
            MainMaster.Instance.Remarks = obj.Remarks;
            MainMaster.Instance.FacebookLink = obj.FacebookLink;
            MainMaster.Instance.TwitterLink = obj.TwitterLink;
            MainMaster.Instance.YoutubeLink = obj.YoutubeLink;
            MainMaster.Instance.FacebookFeed = obj.FacebookFeed;
            MainMaster.Instance.YoutubeFeed = obj.YoutubeFeed;
            MainMaster.Instance.HomeVideoLink = obj.HomeVideoLink;
            MainMaster.Instance.RelationShipId = obj.RelationshipId;
            MainMaster.Instance.SessionId = obj.SessionId;
            MainMaster.Instance.FyId = obj.FYId;
            MainMaster.Instance.UserId = obj.UserId;
            MainMaster.Instance.MediafileUrl = obj.MediafileUrl;
            MainMaster.Instance.thumbImgInput = obj.thumbImgInput;

        }
        //GET: DynamicWebsiteApi
        #region Layout Master
        [HttpPost]
        public async Task<DataTable> GetLayoutMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetLayoutMaster(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteLayoutMaster()
        {
            try
            {
                BALDynamicWebsite obj = new BALDynamicWebsite();
                string uploadingpath = "~/Uploads/Site/";
                string rootpath = "";
                rootpath = System.Web.Hosting.HostingEnvironment.MapPath(uploadingpath);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);
                var data = await Request.Content.ReadAsMultipartAsync(provider);
                var model = data.FormData["model"];
                BALDynamicWebsite obj1 = JsonConvert.DeserializeObject<BALDynamicWebsite>(model);
                string PathWithDisplayCode = "~/Uploads/Site/" + obj1.DisplayCode + "/LayoutsImages/";
                string PathWithDisplayCode15 = System.Web.Hosting.HostingEnvironment.MapPath(PathWithDisplayCode);
                string PathWithDisplayCode14 = "/Uploads/Site/" + obj1.DisplayCode + "/LayoutsImages/";

                bool exists = System.IO.Directory.Exists(PathWithDisplayCode15);

                if ((!exists))
                {
                    System.IO.Directory.CreateDirectory(PathWithDisplayCode15);
                }
                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    System.Web.HttpPostedFile hpf = hfc[i];
                    if (hpf.ContentLength > 0)
                    {
                        string fname = Path.GetFileName(hpf.FileName);
                        string NewFileName = "";
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();
                        if (obj1.fileInput != null)
                        {
                            hpf.SaveAs(PathWithDisplayCode15 + NewFileName + fname);
                            obj1.LayoutDemoImage = PathWithDisplayCode14 + NewFileName.Trim() + fname;
                        }
                    }
                }

                string result = await DLL.dal.InsertUpdateDeleteLayoutMaster(obj1);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        
        #region Layout Part Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteLayoutPart(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteLayoutPart(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetLayoutPart(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetLayoutPart(obj);
            return dt;
        }
        #endregion
        
        #region Unit Type Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteUnitTypeMaster(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUnitTypeMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetUnitTypeMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetUnitTypeMaster(obj);
            return dt;
        }
        #endregion

        #region Unit Master
        [HttpPost]
        public async Task<string> UploadAttachmentUnitLogo()
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ?
                            HttpContext.Current.Request.Files[0] : null;
            string Fullpath = "~/Uploads/Site/";
            string rootpath = "";
            rootpath = System.Web.Hosting.HostingEnvironment.MapPath(Fullpath);
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            var provider = new MultipartFormDataStreamProvider(rootpath);
            //var data = await Request.Content.ReadAsMultipartAsync(provider);
            BALDynamicWebsite obj = new BALDynamicWebsite()
            {
                Action = MainMaster.Instance.Action,
                UnitTypeCode = MainMaster.Instance.UnitTypeCode,
                Code = MainMaster.Instance.Code,
                DisplayCode = MainMaster.Instance.DisplayCode,
                UnitTitle = MainMaster.Instance.UnitTitle,
                UnitName = MainMaster.Instance.UnitName,
                IsActive = MainMaster.Instance.IsActive,
                IsApproved = MainMaster.Instance.IsApproved,
                CreatedBy = MainMaster.Instance.CreatedBy,
                UpdatedBy = MainMaster.Instance.UpdatedBy,
                FacebookLink = MainMaster.Instance.FacebookLink,
                TwitterLink = MainMaster.Instance.TwitterLink,
                YoutubeLink = MainMaster.Instance.YoutubeLink,
                HomeVideoLink = MainMaster.Instance.HomeVideoLink,
                YoutubeFeed = MainMaster.Instance.YoutubeFeed,
                FacebookFeed = MainMaster.Instance.FacebookFeed,
                RelationshipId = MainMaster.Instance.RelationShipId,
                SessionId = MainMaster.Instance.SessionId,               
            };
            string result = "";
            string filePth = "";
            for (int i = 0; i <= hfc.Count - 1; i++)
            {
                System.Web.HttpPostedFile hpf = hfc[i];
                if (hpf.ContentLength > 0)
                {
                    string NewFileName = "";
                    NewFileName += DateTime.Now.Year.ToString();
                    NewFileName += DateTime.Now.Month.ToString();
                    NewFileName += DateTime.Now.Day.ToString();
                    NewFileName += DateTime.Now.Hour.ToString();
                    NewFileName += DateTime.Now.Minute.ToString();
                    NewFileName += DateTime.Now.Second.ToString();
                    NewFileName += DateTime.Now.Millisecond.ToString();
                    filePth = Fullpath + obj.DisplayCode + "/LogoImages/";
                    obj.logopath = "/Uploads/Site/" + obj.DisplayCode + "/LogoImages/" + NewFileName + Path.GetExtension(file.FileName);
                    bool exists = System.IO.Directory.Exists(System.Web.Hosting.HostingEnvironment.MapPath(filePth));
                    if ((!exists))
                    {
                        System.IO.Directory.CreateDirectory(System.Web.Hosting.HostingEnvironment.MapPath(filePth));
                        hpf.SaveAs(System.Web.Hosting.HostingEnvironment.MapPath(filePth + NewFileName + Path.GetExtension(file.FileName)));
                    }
                    else
                    {
                        hpf.SaveAs(System.Web.Hosting.HostingEnvironment.MapPath(filePth + NewFileName + Path.GetExtension(file.FileName)));
                    }  
                }
                
            }
            result = await DLL.dal.InsertUpdateDeleteUnitMaster(obj);
            return result;
        }
        public async Task<string> InsertUpdateDeleteUnitMaster(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteUnitMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetUnitMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetUnitMaster(obj);
            return dt;
        }
        #endregion
        
        #region Tab Master
        [HttpPost]
        public async Task<string> UploadAttachmentTab()
        {
            string result = "";
            BALDynamicWebsite obj = new BALDynamicWebsite();
            if (obj.URLType == "A")
            {
                var file = HttpContext.Current.Request.Files.Count > 0 ?
                           HttpContext.Current.Request.Files[0] : null;
                string Fullpath = HttpContext.Current.Server.MapPath("~/SiteAttachments/");
                string NewFileName = "";
                NewFileName += DateTime.Now.Year.ToString();
                NewFileName += DateTime.Now.Month.ToString();
                NewFileName += DateTime.Now.Day.ToString();
                NewFileName += DateTime.Now.Hour.ToString();
                NewFileName += DateTime.Now.Minute.ToString();
                NewFileName += DateTime.Now.Second.ToString();
                NewFileName += DateTime.Now.Millisecond.ToString();
                if (HttpContext.Current.Request.Files.Count == 0)
                {
                    obj.Attachment = obj.Attachment;
                    result = await DLL.dal.InsertUpdateDeleteTabMaster(obj);
                }
                else
                {
                    string filePth = Fullpath + obj.TabName.Replace("&", "") + NewFileName + Path.GetFileName(file.FileName);
                    obj.Attachment = "../../SiteAttachments/" + obj.TabName.Replace("&", "") + NewFileName + Path.GetExtension(file.FileName);

                    result = await DLL.dal.InsertUpdateDeleteTabMaster(obj);

                    if (result == "1" || result == "2")
                    {
                        file.SaveAs(filePth);
                    }
                }
            }
            else
            {
                string uploadingpath = "~/Uploads/Site/";
                string rootpath = "";
                rootpath = System.Web.Hosting.HostingEnvironment.MapPath(uploadingpath);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);
                var data = await Request.Content.ReadAsMultipartAsync(provider);
                var model = data.FormData["model"];
                BALDynamicWebsite obj1 = JsonConvert.DeserializeObject<BALDynamicWebsite>(model);
                string PathWithDisplayCode = "~/Uploads/Site/" + obj1.DisplayCode + "/TabImages/";
                string PathWithDisplayCode15 = System.Web.Hosting.HostingEnvironment.MapPath(PathWithDisplayCode);
                string PathWithDisplayCode14 = "/Uploads/Site/" + obj1.DisplayCode + "/TabImages/";

                bool exists = System.IO.Directory.Exists(PathWithDisplayCode15);

                if ((!exists))
                {
                    System.IO.Directory.CreateDirectory(PathWithDisplayCode15);
                }
                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    System.Web.HttpPostedFile hpf = hfc[i];
                    if (hpf.ContentLength > 0)
                    {
                        string fname = Path.GetFileName(hpf.FileName);
                        string NewFileName = "";
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();
                        if (obj1.fileInput != null)
                        {
                            hpf.SaveAs(PathWithDisplayCode15 + NewFileName + fname);
                            obj1.TabImage = PathWithDisplayCode14 + NewFileName.Trim() + fname;
                        }
                    }
                }
                result = await DLL.dal.InsertUpdateDeleteTabMaster(obj1);
            }

            return result;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTabMaster(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTabMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTabMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetTabMaster(obj);
            return dt;
        }
        #endregion
        
        #region Menu Master
        [HttpPost]
        public async Task<string> UploadAttachmentMenu(BALDynamicWebsite obj)
        {
            string result = "";

            if (obj.URLType == "A")
            {
                //var file = HttpContext.Current.Request.Files.Count > 0 ?
                //           HttpContext.Current.Request.Files[0] : null;
                //string Fullpath = HttpContext.Current.Server.MapPath("~/SiteAttachments/");

                //string NewFileName = "";

                //NewFileName += DateTime.Now.Year.ToString();
                //NewFileName += DateTime.Now.Month.ToString();
                //NewFileName += DateTime.Now.Day.ToString();
                //NewFileName += DateTime.Now.Hour.ToString();
                //NewFileName += DateTime.Now.Minute.ToString();
                //NewFileName += DateTime.Now.Second.ToString();
                //NewFileName += DateTime.Now.Millisecond.ToString();
                //if (HttpContext.Current.Request.Files.Count == 0)
                //{
                //    obj.Attachment = obj.Attachment;
                //    result = await DLL.dal.InsertUpdateDeleteMenuMaster(obj);
                //}
                //else
                //{
                //    string filePth = Fullpath + obj.TabName.Replace("&", "") + NewFileName + Path.GetFileName(file.FileName);
                //    obj.Attachment = "../../SiteAttachments/" + obj.TabName.Replace("&", "") + NewFileName + Path.GetExtension(file.FileName);

                //    result = await DLL.dal.InsertUpdateDeleteMenuMaster(obj);

                //    if (result == "1" || result == "2")
                //    {
                //        file.SaveAs(filePth);
                //    }
                //}
                byte[] bytes = null;
                string extention = "";


                if (obj.Attachment != null)
                {
                    StringBuilder uplo = new StringBuilder();
                    obj.AlbumIcon = obj.Attachment;
                    string convert = obj.AlbumIcon.Replace("data:application/pdf;base64,", String.Empty);
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
                    string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/PdfFiles/Pdf/";
                    string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/PdfFiles/Pdf/" + NewFileName + extention;
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
                    result = await DLL.dal.InsertUpdateDeleteMenuMaster(obj);
                    return result.ToString();

                }
                else
                {
                    result = "Please check the upload file";
                    return result.ToString();
                }
            }
            else
            {
                result = await DLL.dal.InsertUpdateDeleteMenuMaster(obj);
            }
            return result;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteMenuMaster(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteMenuMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetMenuMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetMenuMaster(obj);
            return dt;
        }

        #endregion
        
        #region Sub Menu Master
        [HttpPost]
        public async Task<string> UploadAttachmentSubMenu(BALDynamicWebsite obj)
        {
            string result = "";
            if (obj.URLType == "A")
            {
                var file = HttpContext.Current.Request.Files.Count > 0 ?
                           HttpContext.Current.Request.Files[0] : null;
                string Fullpath = HttpContext.Current.Server.MapPath("~/SiteAttachments/");

                string NewFileName = "";

                NewFileName += DateTime.Now.Year.ToString();
                NewFileName += DateTime.Now.Month.ToString();
                NewFileName += DateTime.Now.Day.ToString();
                NewFileName += DateTime.Now.Hour.ToString();
                NewFileName += DateTime.Now.Minute.ToString();
                NewFileName += DateTime.Now.Second.ToString();
                NewFileName += DateTime.Now.Millisecond.ToString();
                if (HttpContext.Current.Request.Files.Count == 0)
                {
                    obj.Attachment = obj.Attachment;
                    result = await DLL.dal.InsertUpdateDeleteWebSubMenuMaster(obj);
                }
                else
                {
                    string filePth = Fullpath + obj.TabName.Replace("&", "") + NewFileName + Path.GetFileName(file.FileName);
                    obj.Attachment = "../../SiteAttachments/" + obj.TabName.Replace("&", "") + NewFileName + Path.GetExtension(file.FileName);

                    result = await DLL.dal.InsertUpdateDeleteWebSubMenuMaster(obj);

                    if (result == "1" || result == "2")
                    {
                        file.SaveAs(filePth);
                    }
                }
            }
            else
            {
                result = await DLL.dal.InsertUpdateDeleteWebSubMenuMaster(obj);
            }

            return result;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteWebSubMenuMaster(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteWebSubMenuMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetWebSubMenuMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetWebSubMenuMaster(obj);
            return dt;
        }
        #endregion
        
        #region Footer Header
        [HttpPost]
        public async Task<string> InsertUpdateDeleteFooterHeader(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteFooterHeader(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetFooterHeader(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetFooterHeader(obj);
            return dt;
        }
        #endregion
        
        #region Body Content Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteBodyContent()
        {
            BALDynamicWebsite obj = new BALDynamicWebsite();
            string uploadingpath = "~/Uploads/Site/";
            string rootpath = "";
            rootpath = System.Web.Hosting.HostingEnvironment.MapPath(uploadingpath);
            string result = "";
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            var provider = new MultipartFormDataStreamProvider(rootpath);
            //if (provider.Contents.Count > 0)
            //{
            var data = await Request.Content.ReadAsMultipartAsync(provider);
            var model = data.FormData["model"];
            BALDynamicWebsite obj1 = JsonConvert.DeserializeObject<BALDynamicWebsite>(model);

            string PathWithDisplayCode = "~/Uploads/Site/" + obj1.DisplayCode + "/HeadingImages/";
            string PathWithDisplayCode1 = "~/Uploads/Site/" + obj1.DisplayCode + "/ContentImages/";

            string PathWithDisplayCode14 = System.Web.Hosting.HostingEnvironment.MapPath(PathWithDisplayCode);
            string PathWithDisplayCode15 = System.Web.Hosting.HostingEnvironment.MapPath(PathWithDisplayCode1);

            string PathWithDisplayCode2 = "/Uploads/Site/" + obj1.DisplayCode + "/HeadingImages/";
            string PathWithDisplayCode3 = "/Uploads/Site/" + obj1.DisplayCode + "/ContentImages/";

            bool exists = System.IO.Directory.Exists(PathWithDisplayCode14);
            bool exists1 = System.IO.Directory.Exists(PathWithDisplayCode15);
            if ((!exists) && (!exists1))
            {
                System.IO.Directory.CreateDirectory(PathWithDisplayCode14);
                System.IO.Directory.CreateDirectory(PathWithDisplayCode15);
            }
            for (int i = 0; i <= hfc.Count - 1; i++)
            {
                System.Web.HttpPostedFile hpf = hfc[i];
                if (hpf.ContentLength > 0)
                {
                    string fileName = hpf.FileName.Replace(" ", string.Empty);
                    string fname = Path.GetFileName(fileName);
                    string NewFileName = "";
                    NewFileName += DateTime.Now.Year.ToString();
                    NewFileName += DateTime.Now.Month.ToString();
                    NewFileName += DateTime.Now.Day.ToString();
                    NewFileName += DateTime.Now.Hour.ToString();
                    NewFileName += DateTime.Now.Minute.ToString();
                    NewFileName += DateTime.Now.Second.ToString();
                    NewFileName += DateTime.Now.Millisecond.ToString();
                    if (obj1.fileInput != null && i == 0)
                    {
                        hpf.SaveAs(PathWithDisplayCode14 + NewFileName + fname);
                        obj1.BodyContentHeadingImgPath = PathWithDisplayCode2 + NewFileName.Trim() + fname;
                    }
                    else
                    {
                        hpf.SaveAs(PathWithDisplayCode15 + NewFileName + fname);
                        obj1.ImgPath = PathWithDisplayCode3 + NewFileName.Trim() + fname;
                    }
                }
            }
            result = await DLL.dal.InsertUpdateDeleteBodyContent(obj1);
            // }
            // result = await DLL.dal.InsertUpdateDeleteBodyContent(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetBodyContent(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetBodyContent(obj);
            return dt;
        }
        #endregion
        
        #region Image Content Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteImageContent()
        {
            try
            {
                string uploadingpath = "~/Uploads/Site/";
                string rootpath = "";
                rootpath = System.Web.Hosting.HostingEnvironment.MapPath(uploadingpath);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);
                var data = await Request.Content.ReadAsMultipartAsync(provider);
                var model = data.FormData["model"];
                BALDynamicWebsite obj1 = JsonConvert.DeserializeObject<BALDynamicWebsite>(model);


                string PathWithDisplayCode = "~/Uploads/Site/" + obj1.DisplayCode + "/ContentImages/";
                string PathWithDisplayCode15 = "/Uploads/Site/" + obj1.DisplayCode + "/ContentImages/";
                string PathWithDisplayCode14 = System.Web.Hosting.HostingEnvironment.MapPath(PathWithDisplayCode);

                bool exists = System.IO.Directory.Exists(PathWithDisplayCode14);
                if (!exists)
                {
                    System.IO.Directory.CreateDirectory(PathWithDisplayCode14);
                }
                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    System.Web.HttpPostedFile hpf = hfc[i];
                    if (hpf.ContentLength > 0)
                    {
                        string fname = Path.GetFileName(hpf.FileName);
                        string NewFileName = "";
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();

                        hpf.SaveAs(PathWithDisplayCode14 + NewFileName + fname);
                        if (i == 0)
                        {
                            obj1.ImgPath = PathWithDisplayCode15.Trim() + NewFileName + fname;
                        }
                    }
                }
                string result = await DLL.dal.InsertUpdateDeleteBodyContent(obj1);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        
        #region Create Album
        [HttpPost]
        public async Task<string> SavePhotoAlbum(BALDynamicWebsite obj)
        {
            if (obj.Name != "preview")
            {
                if (!string.IsNullOrEmpty(obj.AlbumIcon))
                {
                    byte[] bytes = null;
                    string extention = "";
                    StringBuilder uplo = new StringBuilder();
                    bytes = Convert.FromBase64String(obj.AlbumIcon);
                    extention = ".jpg";
                    var imageStream = new MemoryStream(bytes, false);
                    string NewFileName = "";
                    if (NewFileName.Length > 3)
                    {
                        NewFileName = NewFileName.Substring(0, 3);
                    }
                    NewFileName += DateTime.Now.Year.ToString();
                    NewFileName += DateTime.Now.Month.ToString();
                    NewFileName += DateTime.Now.Day.ToString();
                    NewFileName += DateTime.Now.Hour.ToString();
                    NewFileName += DateTime.Now.Minute.ToString();
                    NewFileName += DateTime.Now.Second.ToString();
                    NewFileName += DateTime.Now.Millisecond.ToString();

                    string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/PhotoGallery/";
                    string uploadpathS = "/Uploads/Site/" + obj.DisplayCode + "/PhotoGallery/" + NewFileName + extention;
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
                    obj.AlbumIcon = uploadpathS.Trim();

                }
            }
            string result = await DLL.dal.InsertPhotoAlbum(obj);
            return result.ToString();
        }
        [HttpPost]
        public async Task<DataTable> GetPhotoAlbumList(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetPhotoAlbumList(obj);
            return dt;
        }
        #endregion
        
        #region Upload Photo In Album
        [HttpPost]
        public async Task<string> UploadFilesGallery(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string extention = "";
            string seprator = "";
            string result = "";
            StringBuilder uplo = new StringBuilder();
            if (obj.PhotoIdList!=null) { 
            for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
            {
                obj.AlbumIcon = obj.PhotoIdList[a];
                bytes = Convert.FromBase64String(obj.AlbumIcon);
                extention = ".jpg";
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
                string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/PhotoGallery/";
                string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/PhotoGallery/" + NewFileName + extention;
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
                uplo.Append(seprator);
                uplo.Append(uploadpaths);
                seprator = ",";
                obj.PhotoId = uplo.ToString().Trim();

            }
             result = await DLL.dal.InsertPhotoUploading(obj);
            return result.ToString();
            }
             result = await DLL.dal.InsertPhotoUploading(obj);
            return result.ToString();

        }
        [HttpPost]
        public async Task<DataTable> GetUploadedPhotoList(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetUploadedPhotoList(obj);
            return dt;
        }
        #endregion
        
        #region Banner Master
        [HttpPost]
        public async Task<DataTable> GetBanner(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetBanner(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> UploadFiles(BALDynamicWebsite obj)
        {
            try
            {
                string result = "";
                HttpResponseMessage response = new HttpResponseMessage();
                string Fullpath = System.Web.HttpContext.Current.Server.MapPath("~/Uploads/Site/" + obj.DisplayCode + "/Banner/");
                bool exists = System.IO.Directory.Exists(Fullpath);
                if (!exists)
                {
                    System.IO.Directory.CreateDirectory(Fullpath);
                }
                string Fullpaths = "/Uploads/Site/" + obj.DisplayCode + "/Banner/";
                List<string> photolist = new List<string>();
                string PhotoName = "";
                string NewFileName = "";
                string extention = ".jpg";
                if (obj.ImageName != null)
                {
                    for (int i = 0; i < 1; i++)
                    {
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();
                        PhotoName = "Banner_" + NewFileName + i + extention;
                        photolist.Add(PhotoName);
                    }
                }
                obj.PhotoIdList = photolist;
                byte[] bytes = null;
                string path = "";
                string basePath = System.Web.HttpContext.Current.Server.MapPath("~/Uploads/Site/" + obj.DisplayCode + "/Slogan/");
                bool exist = System.IO.Directory.Exists(basePath);
                if (!exist)
                {
                    System.IO.Directory.CreateDirectory(basePath);
                }
                string basePaths = "/Uploads/Site/" + obj.DisplayCode + "/Slogan/";
                MemoryStream imageStream = null;
                FileStream filees = null;
                if (!string.IsNullOrEmpty(obj.SloganImagePath))
                {
                    if (obj.SloganImagePath.Contains("data:image/"))
                    {
                        bytes = Convert.FromBase64String(Regex.Replace(obj.SloganImagePath, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                        if (bytes != null)
                        {
                            path = basePath + "Slogan_" + obj.UnitId + DateTime.Now.ToString("yyyyMMddhhmmss") + ".jpeg";
                            imageStream = new MemoryStream(bytes, false);
                            filees = new FileStream(System.Web.HttpContext.Current.Server.MapPath(path), FileMode.Create, FileAccess.Write);
                            imageStream.WriteTo(filees);
                            filees.Close();
                            imageStream.Close();
                            obj.SloganImagePath = basePaths + "Slogan_" + obj.UnitId + DateTime.Now.ToString("yyyyMMddhhmmss") + ".jpeg";
                        }
                    }
                    else
                    {
                        obj.SloganImagePath = obj.SloganImagePath.Replace("..", "");
                    }
                }
                if (photolist.Count == 0)
                {
                    result = await DLL.dal.InsertUpdateDeleteBannerMaster(obj);
                }
                else
                {
                    for (int img = 0; img < photolist.Count; img++)
                    {
                        obj.BannerImagePath = Fullpaths + "Banner_" + obj.UnitId + NewFileName + ".jpeg";
                        result = await DLL.dal.InsertUpdateDeleteBannerMaster(obj);
                        if (result == "1" || result == "2")
                        {
                            if (obj.ImageName.Contains("data:image/"))
                            {
                                bytes = Convert.FromBase64String(Regex.Replace(obj.ImageName, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                                if (bytes != null)
                                {
                                    path = Fullpath + "Banner_" + obj.UnitId + NewFileName + ".jpeg";
                                    imageStream = new MemoryStream(bytes, false);
                                    filees = new FileStream(path, FileMode.Create, FileAccess.Write);
                                    imageStream.WriteTo(filees);
                                    filees.Close();
                                    imageStream.Close();

                                }
                            }
                        }
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        
        #region Contact Us Master
        public async Task<string> InsertUpdateDeleteContactUsMaster(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteContactUsMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetContactUsMaster(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetContactUsContentMaster(obj);
            return dt;
        }

        #endregion
        
        #region Event Slider Master
        [HttpPost]
        public async Task<DataTable> GetEventSlider(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetBanner(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> EventSlider(BALDynamicWebsite obj)
        {
            try
            {
                string result = "";
                HttpResponseMessage response = new HttpResponseMessage();
                string Fullpath = System.Web.HttpContext.Current.Server.MapPath("~/Uploads/Site/" + obj.DisplayCode + "/EventSlider/");
                bool exists = System.IO.Directory.Exists(Fullpath);
                if (!exists)
                {
                    System.IO.Directory.CreateDirectory(Fullpath);
                }
                string Fullpaths = "/Uploads/Site/" + obj.DisplayCode + "/EventSlider/";
                List<string> photolist = new List<string>();
                string PhotoName = "";
                string NewFileName = "";
                string extention = ".jpg";
                if (obj.ImageName != null)
                {
                    for (int i = 0; i < 1; i++)
                    {
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();
                        PhotoName = "Slider_" + NewFileName + i + extention;
                        photolist.Add(PhotoName);
                    }
                }
                obj.PhotoIdList = photolist;
                byte[] bytes = null;
                string path = "";
                MemoryStream imageStream = null;
                FileStream filees = null;
                if (photolist.Count == 0)
                {
                    result = await DLL.dal.InsertUpdateDeleteBannerMaster(obj);
                }
                else
                {
                    for (int img = 0; img < photolist.Count; img++)
                    {
                        obj.BannerImagePath = Fullpaths + "Slider_" + obj.UnitId + NewFileName + ".jpeg";
                        result = await DLL.dal.InsertUpdateDeleteBannerMaster(obj);
                        if (result == "1" || result == "2")
                        {
                            if (obj.ImageName.Contains("data:image/"))
                            {
                                bytes = Convert.FromBase64String(Regex.Replace(obj.ImageName, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                                if (bytes != null)
                                {
                                    path = Fullpath + "Slider_" + obj.UnitId + NewFileName + ".jpeg";
                                    imageStream = new MemoryStream(bytes, false);
                                    filees = new FileStream(path, FileMode.Create, FileAccess.Write);
                                    imageStream.WriteTo(filees);
                                    filees.Close();
                                    imageStream.Close();

                                }
                            }
                        }
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        
        #region Theme Master 
        [HttpPost]
        public async Task<DataTable> GetTheme(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetTheme(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> ThemeMaster(BALDynamicWebsite obj)
        {
            try
            {
                string result = await DLL.dal.InsertUpdateDeleteThemeMaster(obj);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        
        #region Upload Video In Album
        [HttpPost]
        public async Task<string> UploadVideoUrl(BALDynamicWebsite obj)
        {
            //byte[] bytes = null;
            //string extention = "";
            //string seprator = "";
            //StringBuilder uplo = new StringBuilder();
            //for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
            //{
            //    obj.AlbumIcon = obj.PhotoIdList[a];
            //    bytes = Convert.FromBase64String(obj.AlbumIcon);
            //    extention = ".jpg";
            //    var imageStream = new MemoryStream(bytes, false);
            //    string NewFileName = "";

            //    string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
            //    NewFileName += strUnique;
            //    NewFileName += DateTime.Now.Year.ToString();
            //    NewFileName += DateTime.Now.Month.ToString();
            //    NewFileName += DateTime.Now.Day.ToString();
            //    NewFileName += DateTime.Now.Hour.ToString();
            //    NewFileName += DateTime.Now.Minute.ToString();
            //    NewFileName += DateTime.Now.Second.ToString();
            //    NewFileName += DateTime.Now.Millisecond.ToString();
            //    string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/AlbumIcon/";
            //    string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/AlbumIcon/" + NewFileName + extention;
            //    string filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
            //    bool exists = System.IO.Directory.Exists(filePath);
            //    if (!exists)
            //    {
            //        System.IO.Directory.CreateDirectory(filePath);
            //    }
            //    FileStream file = new FileStream(filePath + NewFileName + extention, FileMode.Create, FileAccess.Write);
            //    imageStream.WriteTo(file);
            //    file.Close();
            //    imageStream.Close();
            //    uplo.Append(seprator);
            //    uplo.Append(uploadpaths);
            //    seprator = ",";
            //    obj.AlbumIcon = uplo.ToString().Trim();

            //}
            string result = await DLL.dal.UploadVideoUrl(obj);
            return result.ToString();

        }
        [HttpPost]
        public async Task<DataTable> GetUploadedVideoList(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetUploadedVideoList(obj);

            return dt;
        }
        #endregion

        #region Upload Media In Gallery
        [HttpPost]
        public async Task<string> InsertUpdateDeleteMediaGalleryFile(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string filePath = "";
            string extention = "";
            string seprator = "";
            string result = "";
            
            

            if (obj.MediafileUrl!=null)
                  {
                StringBuilder uplo = new StringBuilder();
                obj.AlbumIcon1 = obj.MediafileUrl;
                string convert = obj.AlbumIcon1.Replace("data:application/pdf;base64,", String.Empty);
                bytes = Convert.FromBase64String(convert);
                extention = ".pdf";
                var imageStream = new MemoryStream(bytes, false);
                

                string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
                string NewFileName = "";
                NewFileName += strUnique;
                NewFileName += DateTime.Now.Year.ToString();
                NewFileName += DateTime.Now.Month.ToString();
                NewFileName += DateTime.Now.Day.ToString();
                NewFileName += DateTime.Now.Hour.ToString();
                NewFileName += DateTime.Now.Minute.ToString();
                NewFileName += DateTime.Now.Second.ToString();
                NewFileName += DateTime.Now.Millisecond.ToString();
                string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/MediaGallery/Pdf/";
                string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/MediaGallery/Pdf/" + NewFileName + extention;
                filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
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

            }
            if (obj.thumbImgInput != null)
            {
                StringBuilder uplo = new StringBuilder();

                obj.AlbumIcon = obj.thumbImgInput;
                    bytes = Convert.FromBase64String(obj.AlbumIcon);
                    extention = ".jpg";
                    var imageStream = new MemoryStream(bytes, false);
                    

                    string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
                    string NewFileName = "";
                    NewFileName += strUnique;
                    NewFileName += DateTime.Now.Year.ToString();
                    NewFileName += DateTime.Now.Month.ToString();
                    NewFileName += DateTime.Now.Day.ToString();
                    NewFileName += DateTime.Now.Hour.ToString();
                    NewFileName += DateTime.Now.Minute.ToString();
                    NewFileName += DateTime.Now.Second.ToString();
                    NewFileName += DateTime.Now.Millisecond.ToString();
                    string uploadpath1 = "~/Uploads/Site/" + obj.DisplayCode + "/MediaGallery/Images/";
                    string uploadpaths1 = "/Uploads/Site/" + obj.DisplayCode + "/MediaGallery/Images/" + NewFileName + extention;
                    filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath1);
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
                    uplo.Append(uploadpaths1);
                    //seprator = ",";
                    obj.ImageId = uplo.ToString().Trim();

                
                result = await DLL.dal.InsertUpdateDeleteMediaFile(obj);
                return result.ToString();
            }

            string result2 = await DLL.dal.InsertUpdateDeleteMediaFile(obj);
            return result2.ToString();
        }
        [HttpPost]
        public async Task<DataTable> GetMedaiFiles(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetMediaFiles(obj);
            return dt;
        }
        #endregion
        #region Upload Pdf and Description
        [HttpPost]
        public async Task<string> InsertUpdateDeleteDocsAndInfo(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string extention = "";
           

            if (obj.MediafileUrl != null)
            {
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
                string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/DocsAndInfo/Pdf/";
                string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/DocsAndInfo/Pdf/" + NewFileName + extention;
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
                string result = await DLL.dal.InsertUpdateDeleteDocsAndInfo(obj);
                return result.ToString();
            }
           
            else
            {
                string result = "Please check the upload file";
                return result.ToString();
            }
        }
        [HttpPost]
        public async Task<DataTable> GetDocsAndInfo(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetDocsAndInfo(obj);
            return dt;
        }
        #endregion
        #region
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTopSocialMediaLink(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string extention = "";
            string seprator = "";
            StringBuilder uplo = new StringBuilder();
            if (obj.PhotoIdList != null)
            {
                for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
                {
                    obj.AlbumIcon = obj.PhotoIdList[a];
                    bytes = Convert.FromBase64String(obj.AlbumIcon);
                    extention = ".jpg";
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
                    string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/SocialIconImages/";
                    string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/SocialIconImages/" + NewFileName + extention;
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
                    uplo.Append(seprator);
                    uplo.Append(uploadpaths);
                    seprator = ",";
                    obj.PhotoId = uplo.ToString().Trim();

                }
            }            

            string result = await DLL.dal.InsertUpdateDeleteTopSocialMediaLink(obj);
                
            
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTopSocialMediaLink(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetTopSocialMediaLink(obj);
            return dt;
        }
        #endregion
        #region
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSidebarLink(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string extention = "";
            string seprator = "";
            StringBuilder uplo = new StringBuilder();
            for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
            {
                obj.AlbumIcon = obj.PhotoIdList[a];
                bytes = Convert.FromBase64String(obj.AlbumIcon);
                extention = ".jpg";
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
                string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/SidebarLinkImages/";
                string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/SidebarLinkImages/" + NewFileName + extention;
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
                uplo.Append(seprator);
                uplo.Append(uploadpaths);
                seprator = ",";
                obj.PhotoId = uplo.ToString().Trim();

            }

            string result = await DLL.dal.InsertUpdateDeleteSidebarLink(obj);


            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSidebarLink(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetSidebarLink(obj);
            return dt;
        }
        #endregion

        #region Accordian Header
        [HttpPost]
        public async Task<DataTable> GetAccordianLayout(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetAccordianLayout(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteAccordianLayout(BALDynamicWebsite obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteAccordianLayout(obj);
            return result;
        }
        #endregion

        #region Accordian Detail
        [HttpPost]
        public async Task<DataTable> GetAccordianContentLayout(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetAccordianContentLayout(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteAccordianContentLayout(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string extention = "";
            string seprator = "";
            string result = "";
            StringBuilder uplo = new StringBuilder();
            if (obj.PhotoIdList != null)
            {
                for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
                {
                    obj.AlbumIcon = obj.PhotoIdList[a];
                    bytes = Convert.FromBase64String(obj.AlbumIcon);
                    extention = ".jpg";
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
                    string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/AccordianImages/";
                    string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/AccordianImages/" + NewFileName + extention;
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
                    uplo.Append(seprator);
                    uplo.Append(uploadpaths);
                    seprator = ",";
                    obj.PhotoId = uplo.ToString().Trim();

                }
                result = await DLL.dal.InsertUpdateDeleteAccordianContentLayout(obj);
                return result;
            }
            result = await DLL.dal.InsertUpdateDeleteAccordianContentLayout(obj);
            return result;
        }
        #endregion
        #region Upload Media Image In Gallery
        [HttpPost]
        public async Task<string> InsertUpdateDeleteMediaImageGalleryFile(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string filePath = "";
            string extention = "";
            string seprator = "";
            string result = "";

            StringBuilder uplo = new StringBuilder();

            if (obj.PhotoIdList != null)
            {
                for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
                {
                    obj.AlbumIcon = obj.PhotoIdList[a];
                    bytes = Convert.FromBase64String(obj.AlbumIcon);
                    extention = ".jpg";
                    var imageStream = new MemoryStream(bytes, false);


                    string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
                    string NewFileName = "";
                    NewFileName += strUnique;
                    NewFileName += DateTime.Now.Year.ToString();
                    NewFileName += DateTime.Now.Month.ToString();
                    NewFileName += DateTime.Now.Day.ToString();
                    NewFileName += DateTime.Now.Hour.ToString();
                    NewFileName += DateTime.Now.Minute.ToString();
                    NewFileName += DateTime.Now.Second.ToString();
                    NewFileName += DateTime.Now.Millisecond.ToString();
                    string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/PhotoGallery/Images/";
                    string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/PhotoGallery/Images/" + NewFileName + extention;
                    filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
                    bool exists = System.IO.Directory.Exists(filePath);
                    if (!exists)
                    {
                        System.IO.Directory.CreateDirectory(filePath);
                    }
                    FileStream file = new FileStream(filePath + NewFileName + extention, FileMode.Create, FileAccess.Write);
                    imageStream.WriteTo(file);
                    file.Close();
                    imageStream.Close();
                    uplo.Append(seprator);
                    uplo.Append(uploadpaths);
                    seprator = ",";
                    obj.ImageId = uplo.ToString().Trim();

                }
                result = await DLL.dal.InsertUpdateDeleteMediaImageFile(obj);
                return result.ToString();
            }

            string result2 = await DLL.dal.InsertUpdateDeleteMediaImageFile(obj);
            return result2.ToString();
        }
        [HttpPost]
        public async Task<DataTable> GetMediaImageFiles(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetMediaImageFiles(obj);
            return dt;
        }
        #endregion

        #region Upload MultiplePhoto In BodyContent
        [HttpPost]
        public async Task<string> UploadMultipleFilesBodyContent(BALDynamicWebsite obj)
        {
            byte[] bytes = null;
            string extention = "";
            string seprator = "";
            string result = "";
            StringBuilder uplo = new StringBuilder();
            if (obj.PhotoIdList != null)
            {
                for (int a = 0; a < obj.PhotoIdList.Count; a = a + 1)
                {
                    obj.AlbumIcon = obj.PhotoIdList[a];
                    bytes = Convert.FromBase64String(obj.AlbumIcon);
                    extention = ".jpg";
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
                    string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/ContentImages/";
                    string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/ContentImages/" + NewFileName + extention;
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
                    uplo.Append(seprator);
                    uplo.Append(uploadpaths);
                    seprator = ",";
                    obj.PhotoId = uplo.ToString().Trim();

                }
                result = await DLL.dal.InsertUpdateDeleteMultipleBodyContent(obj);
                return result.ToString();
            }
            result = await DLL.dal.InsertUpdateDeleteMultipleBodyContent(obj);
            return result.ToString();

        }

        [HttpPost]
        public async Task<DataTable> GetUploadedPhotoListNew(BALDynamicWebsite obj)
        {
            DataTable dt = await DLL.dal.GetUploadedPhotoListBodyContent(obj);
            return dt;
        }
        #endregion

    }

}