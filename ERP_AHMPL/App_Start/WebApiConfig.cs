using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Unity.AspNet.WebApi;

namespace SEF
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();

            config.DependencyResolver = new UnityDependencyResolver(UnityConfig.Container);
            // jsonFormatter.UseDataContractJsonSerializer = true;
        }
    }
}