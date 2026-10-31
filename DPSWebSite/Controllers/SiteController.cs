using BAL;
using DAL;
//using SEF.Controllers;
using System;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;


namespace WebSite.Controllers
{
    public class SiteController : Controller
    {
        // GET: Site        
        BALDynamicWebsite balobj = new BALDynamicWebsite();
        string UnitCode = null,TabId=null,DefaultUnitCode=null,Name=null, unitName=null, menuid = null, submenuid = null;
        //public async Task<string> GetHomeTab(string UnitCode, int RelationshipId)
        //{
        //    DynamicWebsiteController obj = new DynamicWebsiteController();
        //    //balobj.Action = "6";
        //    //StringBuilder sb = new StringBuilder();
        //    //string str = Request.Url.Host;
        //    //int port = Request.Url.Port;
        //    //foreach (char c in str)
        //    //{
        //    //    if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_')
        //    //    {
        //    //        sb.Append(c);
        //    //    }
        //    //}
        //    //balobj.URL = str + ":" + port.ToString();
        //    //DataTable defaultunit = await DLL.dal.GetUnitMaster(balobj);
        //    //if(defaultunit!=null && defaultunit.Rows.Count>0)
        //    //{
        //    //    UnitCode = defaultunit.Rows[0][0].ToString();
        //    //    balobj.RelationshipId = Convert.ToInt32(defaultunit.Rows[0][1]);
        //    //}    
        //    balobj.RelationshipId = RelationshipId;
        //    balobj.Action = "6";
        //    balobj.UnitId = UnitCode;
            
        //    DataTable result = await DLL.dal.GetTabMaster(balobj);
        //    if(result!=null && result.Rows.Count>0)
        //    {
        //        TabId = result.Rows[0][0].ToString();
        //    }
        //    return TabId;
        //}
        public async Task<ActionResult> Home()
        {    
            try
            {
                //DynamicWebsiteController obj = new DynamicWebsiteController();
                balobj.Action = "6";
                StringBuilder sb = new StringBuilder();
                string str = Request.Url.Host;
                int port = Request.Url.Port;
                foreach (char c in str)
                {
                    if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_')
                    {
                        sb.Append(c);
                    }
                }
                if (port != 80)
                    balobj.URL = str + ":" + port.ToString();
                else
                    balobj.URL = str;
                DataTable defaultunit = await DLL.dal.GetUnitMaster(balobj);
                if (defaultunit != null && defaultunit.Rows.Count > 0)
                {
                    balobj.UnitId = defaultunit.Rows[0][0].ToString();
                    balobj.RelationshipId = Convert.ToInt32(defaultunit.Rows[0][1]);
                    Name = defaultunit.Rows[0][2].ToString();
                    DataTable result = await DLL.dal.GetTabMaster(balobj);
                    if (result != null && result.Rows.Count > 0)
                    {
                        TabId = result.Rows[0][0].ToString();
                        string eng_urlids = "Site/Home/" + balobj.UnitId;
                        if (!Request.Url.LocalPath.Contains(eng_urlids))
                        {
                            return Redirect("Site/Home/" + balobj.UnitId + "_" + TabId + '_' + Name.ToString().Replace(" ", "-"));
                        }
                    }
                }
                
                
                //if (result!=null)
                //{
                //    balobj.Action = "7";
                //    balobj.Code = DefaultUnitCode;

                //    DataTable dtName = await DLL.dal.GetUnitMaster(balobj);
                //    if(dtName!=null && dtName.Rows.Count>0)
                //    {
                //        Name = dtName.Rows[0][0].ToString();
                //    }

                //    string eng_urlids = "Site/Home/" + DefaultUnitCode;

                //    if (!Request.Url.LocalPath.Contains(eng_urlids))
                //    {

                //    }
                //}
                //else
                //{
                //    balobj.Action = "7";
                //    balobj.UnitId = DefaultUnitCode;
                //    DataTable dtName = await DLL.dal.GetUnitMaster(balobj);
                //    if(dtName!=null && dtName.Rows.Count>0)
                //    {
                //        unitName = dtName.Rows[0][0].ToString();
                //    }

                //    return Redirect("Site/Home/" + DefaultUnitCode + "_" + result + '_' + unitName.ToString().Replace(" ", "-"));
                //}
            }
            catch(Exception ex)
            {
                
            }

            return View();
        }
        public ActionResult Page()
        {
            return View();
        }
        public ActionResult ImageContentPage()
        {
            return View();
        }
        public ActionResult Layout1()
        {
            return View();
        }
        public ActionResult Layout2()
        {
            return View();
        }
        public ActionResult Layout3()
        {
            return View();
        }
        public ActionResult Layout4()
        {
            return View();
        }
        public ActionResult Layout5()
        {
            return View();
        }
        public ActionResult Layout6()
        {
            return View();
        }
        public ActionResult CenterContentWithBottomSlider()
        {
            return View();
        }
        public ActionResult TopRightSliderWithBottomSlider()
        {
            return View();
        }
        public ActionResult AboutUs()
        {
            return View();
        }
        public ActionResult admissions()
        {
            return View();
        }
        public ActionResult admissionsFeesStructure()
        {
            return View();
        }
        public ActionResult contactus()
        {
            return View();
        }
        public ActionResult events()
        {
            return View();
        }
        public ActionResult extraCoCurricularActivities()
        {
            return View();
        }
        public ActionResult fromchairmansdesk()
        {
            return View();
        }
        public ActionResult fromheadmistressdesk()
        {
            return View();
        }
        public ActionResult gallery()
        {
            return View();
        }
        public ActionResult legacy()
        {
            return View();
        }
        public ActionResult mission()
        {
            return View();
        }
        public ActionResult nursery()
        {
            return View();
        }
        public ActionResult ourapproach()
        {
            return View();
        }
        public ActionResult playgroup1()
        {
            return View();
        }
        public ActionResult playgroup2()
        {
            return View();
        }
        public ActionResult Preparatory()
        {
            return View();
        }
        public ActionResult SportsAndPerformingArts()
        {
            return View();
        }
        public ActionResult testimonials()
        {
            return View();
        }
        public ActionResult WhyChooseAllenKids()
        {
            return View();
        }
        public ActionResult Layout7()
        {
            return View();
        }
        public ActionResult AdmissionProcess()
        {
            return View();
        }
        public ActionResult SearchProcess()
        {
            return View();
        }
        public ActionResult MediaGallery()
        {
            return View();
        }
        public ActionResult DocumentAndInformation()
        {
            return View();
        }
        public ActionResult contactusnew()
        {
            return View();
        }
        public ActionResult AdmissionEnquiry()
        {
            return View();
        }
        public ActionResult AccordianLayout()
        {
            return View();
        }
        public ActionResult PhotoGallary()
        {
            return View();
        }
        public ActionResult PhotoGalleryContent()
        {
            return View();
        }
        public ActionResult VideoGallery()
        {
            return View();
        }
        public ActionResult PhotoCollectionPage()
        {
            return View();
        }
        public ActionResult VideoPage()
        {
            return View();
        }
        public ActionResult BannerDetailLayout()
        {
            return View();
        }
        public ActionResult LayoutBanner()
        {
            return View();
        }
        public async Task<ActionResult> NccHome()
        {
            try
            {
                balobj.Action = "10";
                StringBuilder sb = new StringBuilder();
                string str = Request.Url.Host;
                int port = Request.Url.Port;
                foreach (char c in str)
                {
                    if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_')
                    {
                        sb.Append(c);
                    }
                }
                if (port != 80)
                    balobj.URL = str + ":" + port.ToString();
                else
                    balobj.URL = str;
                DataTable defaultunit = await DLL.dal.GetUnitMaster(balobj);
                if (defaultunit != null && defaultunit.Rows.Count > 0)
                {
                    //var DunitValue= defaultunit.Rows[0][0].ToString();
                    string[] urlString = Request.Url.OriginalString.Split('_');
                    int urlLength = urlString.Length;
                    string DunitValue = urlString[urlLength - 1];
                    string UnitName = defaultunit.Rows[0][2].ToString();
                    if (!DunitValue.StartsWith(UnitName))
                    {
                        balobj.UnitId = defaultunit.Rows[0][0].ToString();
                        balobj.RelationshipId = Convert.ToInt32(defaultunit.Rows[0][1]);
                        Name = defaultunit.Rows[0][2].ToString();
                        balobj.Action = "6";


                    }
                    //balobj.UnitId = "30000002";
                    DataTable result = await DLL.dal.GetTabMaster(balobj);
                    if (result != null && result.Rows.Count > 0)
                    {
                        TabId = result.Rows[0][0].ToString();
                        string eng_urlids = balobj.UnitId;
                        if (!Request.Url.LocalPath.Contains(eng_urlids))
                        {
                            return Redirect(balobj.UnitId + "_" + TabId + '_' + Name.ToString().Replace(" ", "-"));
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return View();
        }
        public ActionResult Layout9()
        {
            return View();
        }

        public ActionResult LayoutZoomSlider()
        {
            return View();
        }

        public ActionResult MediaLayout()
        {
            return View();
        }
        public ActionResult ViewBook()
        {
            return View();
        }

        public ActionResult PreviewImage()
        {
            return View();
        }

        public ActionResult Layout10()
        {
            return View();
        }
    }
}