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
        #region UserType Master
        public async Task<DataTable> GetUserType(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_UserTypeMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region UserMaster
        public async Task<string> InsertUpdateDeleteUserMaster(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@UserName",obj.UserName),
                new SqlParameter("@Password",obj.Password),
                new SqlParameter("@ProfileName",obj.ProfileName),
                new SqlParameter("@ProfilePic",obj.ProfilePic),
                new SqlParameter("@EmailId",obj.EmailId),
                new SqlParameter("@MobileNo",obj.MobileNo),
                new SqlParameter("@UserTypeId",obj.UserTypeId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@EntitiesData",obj.EntitiesData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_UserMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetUserDetail(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@RelationshipIds",obj.EntitiesData),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UserTypeId",obj.UserTypeId), //filter
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_UserMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion


        #region ConnectionConnector
        public async Task<DataTable> GetConnectionConnector(BALConnectionConnector obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@brancurl",obj.BranchUrl),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_ConnectionConnector", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetWebsiteConnectionConnector(BALConnectionConnector obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@brancurl",obj.BranchUrl),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_Website_ConnectionConnector", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region UserAuthentication
        public async Task<DataTable> UserAuthentication(BALAuthentication obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@UserName",obj.UserName),
                new SqlParameter("@Password",obj.Password),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@SocietyCode",obj.SocietyCode),
                new SqlParameter("@SchoolCode",obj.SchoolCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@DisplayCode",obj.DisplayCode),
                new SqlParameter("@LastLoginWith",obj.LastLoginWith),
                new SqlParameter("@GSMID",obj.GSMID),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_LoginAuthentication", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region ConnectionConnector
        public async Task<DataTable> GetAllotedSession(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Action",obj.Action),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SwitchSchool", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAllotedFinancialYear(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Action",obj.Action),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SwitchSchool", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAllotedSchoolSessionWise(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Action",obj.Action),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SwitchSchool", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        //Student Role Assignment Page (Admission Tranaction)
        public async Task<DataTable> GetUserDetailForStudentRole(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@RelationshipIds",obj.EntitiesData),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UserTypeId",obj.UserTypeId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_StudentRolePage]", CommandType.StoredProcedure, param.ToArray()));
        }

        #region Get User Credentials Reports
        public async Task<DataTable> GetUserCredentialsReport(BALUserMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@ActiveStatus",obj.ActiveStatus),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_GetUserCredentialsReport", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<DataTable> GetUserNameRoleModuleWise(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_GetUserNameRoleModuleWise", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
