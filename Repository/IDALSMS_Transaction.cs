using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALSMS_Transaction
    {
        #region Compose Sms
        Task<DataTable> InsertUpdateDeleteComposeSms(BALComposeSms compose_sms);
        Task<DataTable> GetComposeSms(BALComposeSms compose_sms);
        Task<DataTable> GetSendCredentials(BALComposeSms compose_sms);
        Task<DataTable> InsertSendSMSCredentials(BALComposeSms compose_sms);
        Task<string> CheckBalanceSMS(int? relationshipid);
        #endregion
    }
}
