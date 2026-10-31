using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class RegistrationMasterApiController : ApiController
    {
        

        #region RegistrationFeeHeadMaster
        [HttpPost]
        public async Task<string> InsertUpdateDeleteRegistrationFeeHeadMaster(BALRegistrationFeeHead obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteRegistrationFeeHeadMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetRegistrationFeeHead(BALRegistrationFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetRegistrationFeeHead(obj);

            return dt;
        }

        #endregion


        #region RegistrationReceiveMaster
        [HttpPost]
        public async Task<string> InsertUpdateDeleteRegistrationReceiveMaster(BALRegistrationReceive obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteRegistrationReceiveMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetRegistrationReceive(BALRegistrationReceive obj)
        {
            DataTable dt = await DLL.dal.GetRegistrationReceive(obj);

            return dt;
        }

        #endregion
    }
}
