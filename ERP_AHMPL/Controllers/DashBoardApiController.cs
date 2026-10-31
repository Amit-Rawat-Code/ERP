using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class DashBoardApiController : ApiController
    {
        [HttpPost]
        public async Task<DataSet> GetEnquiryDashBoard(BALEnquiryForm obj)
        {
            DataSet ds = await DLL.dal.GetDashBoardLevel1(obj);
            return ds;
        }
        [HttpPost]
        public async Task<DataTable> GetLavelWiseUser(BALEnquiryForm obj)
        {
            DataTable dt = await DLL.dal.GetLavelWiseUser(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> UpdateUserIdOfEnquiry(BALEnquiryForm obj)
        {
            string result = await DLL.dal.UpdateUserIdOfEnquiry(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetNevigations(BALNavigationMenu obj)
        {
            DataTable dt = await DLL.dal.GetNevigations(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetMobileNevigations(BALNavigationMenu obj)
        {
            DataTable dt = await DLL.dal.GetMobileNevigations(obj);
            return dt;
        }
    }
}