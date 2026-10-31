using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALTransport_Master
    {
        #region Vehicle Type Master
        Task<string> InsertUpdateDeleteVehicleTypeMaster(BalVehicleTypeMaster obj);
        Task<DataTable> GetVehicleTypeMaster(BalVehicleTypeMaster obj);
        #endregion

        #region Vehicle Type Master
        Task<string> InsertUpdateDeleteVehicleOwnerMaster(BalVehicleOwnerMaster obj);
        Task<DataTable> GetVehicleOwnerMaster(BalVehicleOwnerMaster obj);
        #endregion

        #region Vehicle Master
        Task<string> InsertUpdateDeleteVehicleMaster(BalVehicleMaster obj);
        Task<DataTable> GetVehicleMaster(BalVehicleMaster obj);
        #endregion

        #region Stoppage Master
        Task<string> InsertUpdateDeleteVehicleStoppageMaster(BalVehicleStoppageMaster obj);
        Task<DataTable> GetVehicleStoppageMaster(BalVehicleStoppageMaster obj);
        #endregion

        #region Route Master
        Task<string> InsertUpdateDeleteVehicleRouteMaster(BalVehicleRouteMaster obj);
        Task<DataTable> GetVehicleRouteMaster(BalVehicleRouteMaster obj);
        #endregion

        #region Vehicle Fare Master
        Task<string> InsertUpdateDeleteVehicleFareMaster(BalTransportModule obj);
        Task<DataTable> GetVehicleFareMaster(BalTransportModule obj);
        #endregion

        #region Driver Detail Master
        Task<string> InsertUpdateDeleteDriverDetailMaster(BalTransportModule obj);
        Task<DataTable> GetDriverDetailMaster(BalTransportModule obj);
        #endregion

        #region ClassWise SectionWise StudentName
        Task<DataTable> GetClassWiseSectionWiseStudentName(BalTransportModule obj);
        #endregion
    }
}
