using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        public async Task<DataTable> GetCountry(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@CountryCode",obj.CountryCode)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_CountryMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetState(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@CountryCode",obj.CountryCode),
                new SqlParameter("@StateCode",obj.StateCode)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_StateMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCity(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@CityCode",obj.CityCode)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_CityMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEnquiryCategory(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_EnquiryCategory", CommandType.StoredProcedure, param.ToArray()));
        }
        //This is Group Id DDL from Group Master Table Created By: Ravindra Tiwari  --Date : 9-March-2021
        public async Task<DataTable> GetGroup(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_GroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSociety(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SocietyMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSchool(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SchoolMaster", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetModuleRoleWise(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RoleId",obj.RoleId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SchoolMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetUsersModuleWise(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@ModuleId",obj.ModuleId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SchoolMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCategories(BALRegistrationFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action)
             
             };
            //return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_CategoryMaster", CommandType.StoredProcedure, param.ToArray()));
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_CommonDDLs", CommandType.StoredProcedure, param.ToArray()));
            
        }

        public async Task<DataTable> GetBoards(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_BoardMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetPayModes(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_PayModeMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetUserSchoolBranch(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@UserId",obj.UserId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_UserMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetNationality(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_NationalityMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetMotherTongue(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_MotherTongueMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetDocuments(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_DocumentMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetMerites(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_MeritListMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDDLs(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_CommonDDLs]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDesignationType(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
              new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_DesignationType", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAllClassWithSection(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("MAST.GetAllClassWithSection", CommandType.StoredProcedure, param.ToArray()));
        }
    }
    
}
