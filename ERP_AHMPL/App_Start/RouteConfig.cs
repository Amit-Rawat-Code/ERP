using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace SEF
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Login", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                        name: "SocialMediaPost",
                        url: "Enquiry/GetEnquiry/{id}/{Sr}/{Code}",
                        new { controller = "EnquiryTransaction", action = "EnquiryFormForSocialMediaWebsite", id = UrlParameter.Optional, Sr = UrlParameter.Optional, Code = UrlParameter.Optional }
);
        }
    }
}
