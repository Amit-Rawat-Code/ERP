using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALTicket_Master
    {
        #region TicketType Master
        Task<string> InsertUpdateDeleteTicketTypeMaster(BALTicket obj);
        Task<DataTable> GetTicketTypeMaster(BALTicket obj);

        #endregion

        #region TicketStatus Master
        Task<string> InsertUpdateDeleteTicketStatusMaster(BALTicket obj);
        Task<DataTable> GetTicketStatusMaster(BALTicket obj);

        #endregion
    }
}