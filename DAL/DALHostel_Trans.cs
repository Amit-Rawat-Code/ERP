using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALHostel_Trans : IDALHostel_Trans
    {
        public async Task<DataTable> FetchStudentsForHostel(BalHostelMaster obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[Usp_HostelStudentMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> FetchHostelFeeStructure(BalHostelMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FetchHostelFeeStructure]", CommandType.StoredProcedure, param.ToArray()));
        }        
        public async Task<string> InsertUpdateDeleteHostelStudentMapping(BalHostelMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@StudentHostelData",obj.StudentList),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.[Usp_HostelStudentMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentHostelMapping(BalHostelMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[Usp_HostelStudentMapping]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteHostelFeeDueVoucher(BALFeeDueVoucher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@InstallmentCode",obj.InstallmentCode),
                new SqlParameter("@DueOn",obj.DueOn),
                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@ClassList",obj.ClassList),
                new SqlParameter("@SectionList",obj.SectionList),
                new SqlParameter("@IsActive",obj.ActiveParital),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_HostelFeeDueVoucher]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetHostelFeeDueVoucher(BALFeeDueVoucher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@InstallmentCode",obj.InstallmentCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@ClassList",obj.ClassList),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@IsActive",obj.ActiveParital),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_HostelFeeDueVoucher]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
