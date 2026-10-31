using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALTransport_Trans : IDALTransport_Trans
    {
        #region Vehicle Route Mapping
        public async Task<string> InsertUpdateDeleteVehicleRouteMapping(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransId),
                new SqlParameter("@RouteCode",obj.RouteCode),
                new SqlParameter("@DriverCode",obj.DriverCode),
                new SqlParameter("@VehicleNumber",obj.VehicleNumber),
                new SqlParameter("@Contact",obj.Contact),
                //new SqlParameter("@Contact",obj.Contact),
                new SqlParameter("@Route_stopages",obj.StoppageNames),
                //new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_VehicleRouteMapping_Header]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetVehicleRouteMapping(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                //new SqlParameter("@DriverCode",obj.DriverCode),
                new SqlParameter("@RouteCode",obj.RouteCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_VehicleRouteMapping_Header]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Vehiccle Student route mapping
        public async Task<string> InsertUpdateDeleteStudentRouteVehicleMapping(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@StudentVehicleRouteMappingId",obj.StudentVehicleRouteMappingId),
                new SqlParameter("@Srno",obj.Srno),
                new SqlParameter("@VehicleCode",obj.VehicleCode),
                new SqlParameter("@RouteCode",obj.RouteCode),
                new SqlParameter("@StoppageCode",obj.Stoppage),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@AdmissionNo",obj.AdmissionNo),
                new SqlParameter("@Father",obj.Father),
                new SqlParameter("@ApplicableDate",obj.ApplicableDate),
                new SqlParameter("@TripMode",obj.TripMode),
                new SqlParameter("@ConcessionHeadCode",obj.ConcessionHeadCode),
                new SqlParameter("@discAmount",obj.discAmount),
                new SqlParameter("@FareAmount",obj.FareAmount),
                new SqlParameter("@NetAmount",obj.NetAmount),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@DeactivationDate",obj.DeactivationDate),
                new SqlParameter("@VehicleCapacity",obj.VehicleCapacity),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_VehicleStudentRouteMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentRouteVehicleMapping(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@VehicleCode",obj.VehicleCode),
                new SqlParameter("@TransID",obj.TransId),
                new SqlParameter("@StoppageCode",obj.Stoppage),
                new SqlParameter("@RouteCode",obj.RouteCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_VehicleStudentRouteMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentsForTransport(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[Usp_VehicleStudentRouteMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> FetchStudentTransportFeeStructure(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].UDF_StudentTransportFeeStructure", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        public async Task<string> DeactivateTransport(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@Date",obj.VDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_DeactivateTransport]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
