using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALTransport_Trans
    {
        #region Vehicle Route Mapping
        Task<string> InsertUpdateDeleteVehicleRouteMapping(BalTransportModule obj);
        Task<DataTable> GetVehicleRouteMapping(BalTransportModule obj);
        #endregion

        #region Vehiccle Student route mapping
        Task<string> InsertUpdateDeleteStudentRouteVehicleMapping(BalTransportModule obj);
        Task<DataTable> GetStudentRouteVehicleMapping(BalTransportModule obj);
        Task<DataTable> GetStudentsForTransport(BalTransportModule obj);
        #endregion
    }
}
