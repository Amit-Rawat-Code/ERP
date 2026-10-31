using BAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using System;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using Repository;

namespace SEF.Controllers
{
    public class TicketTransactionApiController : ApiController
    {
        readonly IDALTicket_Trans _DALTicket_Trans;
        public TicketTransactionApiController(IDALTicket_Trans DALTicket_Trans)
        {
            this._DALTicket_Trans = DALTicket_Trans;
        }

        #region Ticket Generate
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteTicketGenerate()
        {
            try
            {
                BALTicket obj1 = new BALTicket();
               
                string UploadPath = "~/Uploads/Site/Ticket/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(UploadPath);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);

                var data = await Request.Content.ReadAsMultipartAsync(provider);
                var model = data.FormData["model"];
                obj1 = JsonConvert.DeserializeObject<BALTicket>(model);

                //bool Folder_exists = System.IO.Directory.Exists(PathWithDisplayCode);

                //if (Folder_exists == false)
                //{
                //    if (!Directory.Exists(FolderName))
                //    {
                //        DirectoryInfo di = Directory.CreateDirectory(FolderName);
                //    }
                //}
                //---------------------------------------------------------------------------------
                //for (int i = 0; i <= hfc.Count - 1; i++)
                //{                 
                //    System.Web.HttpPostedFile aa = hfc[i];
                //    if (aa.ContentLength > 0)
                //    {
                //        //long FileSize = new FileInfo(File_Name).Length;
                //    }
                //}

                //--------------------------------------------------------------------------------







                List<TicketAttachments> listobj = new List<TicketAttachments>();
                TicketAttachments taobj;

                //long File_Size = new FileInfo(hfc).Length;
                
                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    taobj = new TicketAttachments();
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

                        string abc = UploadPath + obj1.CreatedBy + '_' + NewFileName + File_Extenstion;
                        var ServerSavepath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath(abc));
                        hpf.SaveAs(ServerSavepath);
                        taobj.FilePath = abc;
                        taobj.FileName = NewFileName + File_Extenstion;
                        listobj.Add(taobj);                       
                    }
                }
                obj1.FileJson = JsonConvert.SerializeObject(listobj);  
                
                string result1 = await _DALTicket_Trans.InsertUpdateDeleteTicketGenerate(obj1).ConfigureAwait(false);
                return result1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetTicketGenerate(BALTicket obj)
        {
            DataTable dt = await _DALTicket_Trans.GetTicketGenerate(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Ticket Response
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteTicketResponse()
        {
            try
            {
                BALTicket obj1 = new BALTicket();

                string UploadPath = "~/Uploads/Site/Ticket/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(UploadPath);
                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);
                var data = await Request.Content.ReadAsMultipartAsync(provider);
                var model = data.FormData["model"];
                obj1 = JsonConvert.DeserializeObject<BALTicket>(model);

                //bool Folder_exists = System.IO.Directory.Exists(PathWithDisplayCode);

                //if (Folder_exists == false)
                //{
                //    if (!Directory.Exists(FolderName))
                //    {
                //        DirectoryInfo di = Directory.CreateDirectory(FolderName);
                //    }
                //}

                List<TicketAttachments> listobj = new List<TicketAttachments>();
                TicketAttachments taobj;

                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    taobj = new TicketAttachments();
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

                        string abc = UploadPath + obj1.CreatedBy + '_' + NewFileName + File_Extenstion;
                        var ServerSavepath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath(abc));
                        hpf.SaveAs(ServerSavepath);
                        taobj.FilePath = abc;
                        taobj.FileName = obj1.CreatedBy + '_' + NewFileName + File_Extenstion;
                        listobj.Add(taobj);
                    }
                }
                obj1.FileJson = JsonConvert.SerializeObject(listobj);

                string result1 = await _DALTicket_Trans.InsertUpdateDeleteTicketResponse(obj1).ConfigureAwait(false);
                return result1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetTicketResponse(BALTicket obj)
        {
            DataTable dt = await _DALTicket_Trans.GetTicketResponse(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region TicketStatus Final 
        [System.Web.Http.HttpPost]
        public async Task<string> UpdateFinalTicketStatus(BALTicket obj)
        {
            string result = await _DALTicket_Trans.UpdateFinalTicketStatus(obj).ConfigureAwait(false);
            return result;
        }
        #endregion
    }
}


