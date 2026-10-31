using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
namespace SEF.Controllers
{
    public class StudentTransferApiController : ApiController
    {
        #region Student Transfer
        [HttpPost]
        public async Task<string> InsertUpdateDeleteStudentTransfer(StudentTransferRequest obj)
        {
            string result = await DLL.dal.InsertStudentTransfer(obj);
            return result;
        }
       
        [HttpPost]
        public async Task<DataTable> GetStudentListForPromotion(StudentTransferRequest obj)
        {
            DataTable dt = await DLL.dal.GetStudentListForPromotion(obj);
            return dt;
        }
        #endregion
        #region Get FY ID
        [HttpPost]
        public async Task<DataTable> GetFinancialYear(BALUserMaster obj)
        {
            DataTable dt = await DLL.dal.GetAllotedFinancialYear(obj);
            return dt;
        }

        #endregion
    }
}