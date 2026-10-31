using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALTicket_Dash
    {
        #region Dashboard Level1
        Task<DataTable> DashBoardLevel1(BALTicket obj);
        #endregion

        #region Dashboard Level2
        Task<DataTable> DashBoardLevel2(BALTicket obj);      
        #endregion
    }
}

