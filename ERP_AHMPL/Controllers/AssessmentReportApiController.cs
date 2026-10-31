using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AssessmentReportApiController : ApiController
    {
        #region Assessment Report       
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetChapterStatusForReport(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetChapterStatusForReport(obj);
            return dt;
        }
        #endregion
    }
}
