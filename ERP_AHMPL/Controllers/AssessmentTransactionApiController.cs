using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AssessmentTransactionApiController : ApiController
    {
        #region APIs For Mobile App Or Assessment Transaction

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteChapterStatus(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteChapterStatus(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetChapterStatus(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetChapterStatus(obj);
            return dt;
        }
        #endregion
    }
}
