using BAL;
using Newtonsoft.Json;
using System;
using System.Data;
using System.IO;
using System.Net.Http;

using System.Threading.Tasks;
using System.Web.Http;



namespace SEF.Controllers
{
    public class SocialMediaPostApiController : ApiController
    {

        private const string ImagePath = "";
        // GET: SocialMediaPostApi
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSocialMediaPost()
        {

            string uploadingpath = "~/Uploads/SocialMedia/";
            string rootpath = "";
            rootpath = System.Web.Hosting.HostingEnvironment.MapPath(uploadingpath);
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            var provider = new MultipartFormDataStreamProvider(rootpath);
            var data = await Request.Content.ReadAsMultipartAsync(provider);
            var model = data.FormData["model"];
            BALPostingForSocialMedia obj1 = JsonConvert.DeserializeObject<BALPostingForSocialMedia>(model);
            string PathWithDisplayCode = "~/Uploads/SocialMedia/" + obj1.DisplayCode + "/ContentImages/";
            string PathWithDisplayCode15 = "/Uploads/SocialMedia/" + obj1.DisplayCode + "/ContentImages/";
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
                        obj1.ImageUrl = PathWithDisplayCode15.Trim() + NewFileName + fname;
                    }
                }
            }

            string result = await DAL.DLL.dal.InsertUpdateDeleteSocialMediaPost(obj1);
            return result;

        }
        //[HttpPost]
        //public async Task<string> InsertUpdateDeleteSocialMediaPost(BALPostingForSocialMedia ob)
        //{
        //    string dt = await DAL.DLL.dal.InsertUpdateDeleteSocialMediaPost(ob);
        //    return JsonConvert.SerializeObject(dt);
        //}

        [HttpPost]
        public async Task<DataTable> GetSocialMediaPost(BALPostingForSocialMedia obj)
        {
            DataTable dt = await DAL.DLL.dal.GetSocialMediaPost(obj);
            if(obj.Action==10 || obj.Action == 9)
            foreach(DataRow dr in dt.Rows)
            {
                string transid = dr["TransId"].ToString();
                string rowno = dr["Rowno"].ToString();
                string enquirySourceCode = dr["EnquirySourceCode"].ToString() ;

                //string entransid = new SecurityClass().Encrypt(transid);
                //string rnrowno = new SecurityClass().Encrypt(rowno);
                //string enenquirySourceCode = new SecurityClass().Encrypt(enquirySourceCode);

                //dr["TransId"] = entransid;
                //dr["Rowno"] = rnrowno;
                //dr["EnquirySourceCode"] = enenquirySourceCode;
            }
            return dt;
        }
       
        [HttpPost]
        public async Task<DataTable> GetSocialMediaData(BALPostingForSocialMedia obj)
        {
            DataTable dt = await DAL.DLL.dal.GetSocialMediaData(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetSocialMediaPostLink(BALPostingForSocialMedia obj)
        {
            DataTable dt = await DAL.DLL.dal.GetSocialMediaPostLink(obj);
            return dt;
        }

    }
}