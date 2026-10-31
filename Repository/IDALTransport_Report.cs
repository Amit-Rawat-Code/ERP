using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALTransport_Report
    {
        #region Vehicle Report
        Task<DataTable> GetVehicleReport(BalTransportModule obj);
        #endregion

        #region Vehicle Report Count
        Task<DataTable> GetVehicleReportCount(BalTransportModule obj);
        #endregion
    }
}
