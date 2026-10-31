using BAL;
using DAL;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class AdministratorApiController : ApiController
    {
        #region Account Ledger
        [HttpPost]
        public async Task<DataTable> UrlAccessPermission(UrlAccessPermission obj)
        {
            DataTable dt = await DLL.dal.GetUrlAccessPermission(obj);
            return dt;
        }
        #endregion
        
      
    }
}