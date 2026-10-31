using BAL;
using DAL;
using Repository;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class DataTransferApiController : ApiController
    {
        readonly IDALMaster_Transfer _DALData_Transfer;
        public DataTransferApiController (IDALMaster_Transfer DALData_Transfer)
        {
            this._DALData_Transfer = DALData_Transfer;
        }
       
        #region Financial Year Master Transfer With AcademicSession

        [System.Web.Http.HttpPost]
        public async Task<string> InsertMasterTransferWithAcademic(BAL.DataTransfer.MasterTransferRequest obj)
        {
            string result = await _DALData_Transfer.InsertMasterTransferWithAcademic(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetMasterTableListForAcademic(BAL.DataTransfer.MasterTransferRequest obj)
        {
            DataTable dt = await _DALData_Transfer.GetMasterTableListForAcademic(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion
        #region Financial Year Master Transfer Without Relationship

        [System.Web.Http.HttpPost]
        public async Task<string> InsertMasterTransferWithoutRelationhipId(BAL.DataTransfer.MasterTransferRequest obj)
        {
            string result = await _DALData_Transfer.InsertMasterTransferWithoutRelationhipId(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetMasterTableListForwithoutRelationshipId(BAL.DataTransfer.MasterTransferRequest obj)
        {
            DataTable dt = await _DALData_Transfer.GetMasterTableListForwithoutRelationshipId(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion
    }
}
