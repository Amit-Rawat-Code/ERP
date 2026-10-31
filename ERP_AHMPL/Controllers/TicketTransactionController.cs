using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace SEF.Controllers
{
    public class TicketTransactionController : Controller
    {
        // GET: TicketTransaction
        public ActionResult TicketGenerate()
        {
            return View();            
        }
        public ActionResult TicketResponse()
        {
            return View();
        }
        public ActionResult TicketResponseView()
        {
            return View();
        }

        //public string Check_File()
        //{
        //    string UserSavePath = "~/Uploads/Ticket/";

        //    if (Request.Files.Count > 0 && Request.Files.Count <=5)
        //    {
        //        var File_List = Request.Files;                 
        //        foreach (string file in File_List)
        //        {
        //            HttpPostedFileBase HPFB = Request.Files[file] as HttpPostedFileBase;
        //            long File_Size = new FileInfo(file).Length;
        //            if (HPFB != null)
        //            {
        //                var New_File_Name = "";
        //                var File_Name = Path.GetFileName(HPFB.FileName);
        //                var File_Extenstion = Path.GetExtension(HPFB.FileName);
        //                long FileSize = new FileInfo(File_Name).Length;
        //                if (FileSize <= 2048)
        //                {
        //                    if (File_Extenstion == ".jpg" || File_Extenstion == ".jpeg" || File_Extenstion == ".bmp" || File_Extenstion == ".doc" || File_Extenstion == ".docx" || File_Extenstion == ".xls" || File_Extenstion == ".xlsx" || File_Extenstion == ".pdf")
        //                    {
        //                        New_File_Name = File_Name + File_Extenstion;
        //                        var ServerSavepath = Path.Combine(Server.MapPath(UserSavePath + New_File_Name));
        //                        HPFB.SaveAs(ServerSavepath);
        //                    }
        //                    else
        //                    {
        //                        ViewBag.msg = "Only These File [.jpg|.jpeg|.bmp|.doc|.docx|.xls|.xlsx|.pdf] Accepted";
        //                    }                            
        //                }
        //                else
        //                {
        //                    ViewBag.msg = "File Size is Not Greater Than 2 MB.";
        //                }
        //            }
        //        }
        //    }
        //    return ("");
        //}
    }
}