using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALMaster_Transfer
    {
        #region Financial Year Master Transfer With AcademicSession
        Task<string> InsertMasterTransferWithAcademic(BAL.DataTransfer.MasterTransferRequest obj);
        Task<DataTable> GetMasterTableListForAcademic(BAL.DataTransfer.MasterTransferRequest obj);
        #endregion

        #region Financial Year Master Transfer Without RelationhipId
        Task<string> InsertMasterTransferWithoutRelationhipId(BAL.DataTransfer.MasterTransferRequest obj);
        Task<DataTable> GetMasterTableListForwithoutRelationshipId(BAL.DataTransfer.MasterTransferRequest obj);
        #endregion
    }
}
//InsertMasterTransferWithoutrelationship