using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALTransport_Master : IDALTransport_Master
    {
        #region Vehicle Type Master
        public async Task<string> InsertUpdateDeleteVehicleTypeMaster(BalVehicleTypeMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@VehicleType",obj.VehicleType),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_VehicleType]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetVehicleTypeMaster(BalVehicleTypeMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                //new SqlParameter("@Code",obj.VehicleTypeCode),
                //new SqlParameter("@VehicleType",obj.VehicleType),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_VehicleType]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Vehicle Type Master
        public async Task<string> InsertUpdateDeleteVehicleOwnerMaster(BalVehicleOwnerMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@VehicleOwnerName",obj.VehicleOwnerName),
                new SqlParameter("@Contact",obj.Contact),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@VehicleCategory",obj.VehicleCategory),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_VehicleOwner]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetVehicleOwnerMaster(BalVehicleOwnerMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@VehicleCategory",obj.VehicleCategory),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_VehicleOwner]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Vehicle Master
        public async Task<string> InsertUpdateDeleteVehicleMaster(BalVehicleMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@VehicleTypeCode",obj.VehicleTypeCode),
                new SqlParameter("@VehicleUniqueID",obj.VehicleUniqueID),
                new SqlParameter("@VehicleNumber",obj.VehicleNumber),
                new SqlParameter("@VehicleRegDate",obj.VehicleRegDate),
                new SqlParameter("@VehicleCategory",obj.VehicleCategory),
                new SqlParameter("@VehicleOwnerCode",obj.VehicleOwnerCode),
                new SqlParameter("@VehicleChasisNumber",obj.VehicleChasisNumber),
                new SqlParameter("@FitnessExpiryDate",obj.FitnessExpiryDate),
                new SqlParameter("@PermitExpiryDate",obj.PermitExpiryDate),
                new SqlParameter("@InsuranceExpiryDate",obj.InsuranceExpiryDate),
                new SqlParameter("@PollutionExpiryDate",obj.PollutionExpiryDate),
                new SqlParameter("@VehicleCapacity",obj.VehicleCapacity),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_VehicleMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetVehicleMaster(BalVehicleMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RouteCode",obj.RouteCode),
                new SqlParameter("@Stoppage",obj.Stoppage),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@VehicleCategory",obj.VehicleCategory),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_VehicleMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Stoppage Master
        public async Task<string> InsertUpdateDeleteVehicleStoppageMaster(BalVehicleStoppageMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Stoppage",obj.Stoppage),
                new SqlParameter("@Longitude",obj.Longitude),
                new SqlParameter("@Lattitude",obj.Lattitude),
                new SqlParameter("@Radius",obj.Radius),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_VehicleStoppageMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetVehicleStoppageMaster(BalVehicleStoppageMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RouteCode",obj.RouteCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_VehicleStoppageMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Route Master
        public async Task<string> InsertUpdateDeleteVehicleRouteMaster(BalVehicleRouteMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RouteName",obj.RouteName),
                new SqlParameter("@RouteDistance",obj.RouteDistance),
                new SqlParameter("@Route_stopages",obj.Route_stopages),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_RouteMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetVehicleRouteMaster(BalVehicleRouteMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StoppageCode",obj.StoppageCode),
                new SqlParameter("@RouteCode",obj.RouteCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_RouteMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Vehicle Fare Master
        public async Task<string> InsertUpdateDeleteVehicleFareMaster(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
            {
                //new SqlParameter("@Stoppage",obj.Stoppage),
                new SqlParameter("@FareCode",obj.FareCode),
                new SqlParameter("@FareAmount",obj.FareAmount),
                new SqlParameter("@DistanceFrom",obj.DistanceFrom),
                new SqlParameter("@DistanceTo",obj.DistanceTo),
                //new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_FareMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetVehicleFareMaster(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RouteId",obj.RouteCode),
                new SqlParameter("@StoppageCode",obj.Stoppage),
                new SqlParameter("@TripMode",obj.TripMode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FareMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Driver Detail Master
        public async Task<string> InsertUpdateDeleteDriverDetailMaster(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
            {
                //new SqlParameter("@Stoppage",obj.Stoppage),
                new SqlParameter("@DriverCode",obj.DriverCode),
                new SqlParameter("@DriverName",obj.DriverName),
                new SqlParameter("@Contact",obj.Contact),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@DLNumber",obj.DLNumber),
                new SqlParameter("@Adhaar",obj.Adhaar),
                new SqlParameter("@PhotoId",obj.PhotoId),
                //new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_DriverDetailMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetDriverDetailMaster(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@DriverCode",obj.DriverCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_DriverDetailMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region ClassWise SectionWise StudentName
        public async Task<DataTable> GetClassWiseSectionWiseStudentName(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_VehicleRouteMapping_Header]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion
    }
}
