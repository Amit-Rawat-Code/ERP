using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALTicket_Trans
    {
        #region Ticket Generate        
        Task<string> InsertUpdateDeleteTicketGenerate(BALTicket obj);
        Task<DataTable> GetTicketGenerate(BALTicket obj);

        #endregion

        #region Ticket Response
        Task<string> InsertUpdateDeleteTicketResponse(BALTicket obj);
        Task<DataTable> GetTicketResponse(BALTicket obj);
        #endregion

        Task<string> UpdateFinalTicketStatus(BALTicket obj);        
    }
}

