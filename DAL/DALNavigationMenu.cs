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
        public async Task<string> InsertUpdateDeleteNavigationMenuForRole(BALNavigationMenu obj)
      {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@RoleId",obj.RoleId),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@NavMenuList",obj.SubMenuesList),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_RoleOptionMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetNavigationMenuForRole(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@RoleId",obj.RoleId),
                new SqlParameter("@relationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("dbo.USP_RoleOptionMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteUserRoleAssignments(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@UserList",obj.UserList),
                new SqlParameter("@RoleList",obj.RoleList),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),   
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@Result", "")
             };
          

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_UserRolesMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetUserRoleAssignments(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@UserTypeId",obj.UserTypeId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SchoolRelationShipId",obj.SchoolRelationShipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("dbo.USP_UserRolesMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteUserPermission(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@NavMenuList",obj.NavMenuList),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
             };


            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_UserMenuPermission", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetUserPermission(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("USP_UserMenuPermission", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteUserPermissionSchoolWise(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@NavMenuList",obj.NavMenuList),
                new SqlParameter("@SchoolRelationShipId",obj.SchoolRelationShipId),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
             };


            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("gblmaster.Usp_MenuPermissionSchoolWise", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetUserPermissionSchoolWise(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@SchoolRelationShipId",obj.SchoolRelationShipId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.Usp_MenuPermissionSchoolWise", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteBackDateEntryPermission(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@NavMenuList",obj.SubMenuesList),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@SchoolId",obj.SchoolRelationShipId),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
             };


            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_BackDateEntryPermission", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetBackDateEntryPermission(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@SchoolId",obj.SchoolRelationShipId),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_BackDateEntryPermission", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetNevigations(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_Nevigation", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetMobileNevigations(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_MobileNevigation", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteMobileRoleAssignments(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@RoleList",obj.RoleList),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
             };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_UserRolesMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetMobileUserRole(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
               new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[USP_MobileRoleMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        // Update Student Role Assignment Page (Admission Tranaction)
        public async Task<string> UpdateUserRoleAssignmentForStudentRole(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@UserName",obj.UserName),
                new SqlParameter("@PreRoleId",obj.PreRoleId),
                new SqlParameter("@PreAssignRoleDate",obj.PreAssignRoleDate),

                new SqlParameter("@CurrentDate",obj.CurrentDate),
                new SqlParameter("@RoleId",obj.RoleId),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@Remark",obj.Remark),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_StudentRolePage]", CommandType.StoredProcedure, param.ToArray()));
        }
        #region  DashBoard Level 2
        public async Task<DataSet> GetDashBoardLevel2(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@CountDaysOfSelection",obj.CountDaysOfSelection),
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StudentAttendanceDate",obj.StudentAttendanceDate),
                new SqlParameter("@EmployeeType",obj.EmployeeType),
                new SqlParameter("@AttendanceType",obj.AttendanceType),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("USP_DashBoardLevel2", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertDeleteToDoTask(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Id",obj.Id),
                new SqlParameter("@TaskDescription",obj.TaskDescription),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_InsertDeleteToDoTask", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetDashBoardFeeOutStanding(BALNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@RelationShipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("USP_GetStudentFeeOutStanding_ForPrincipalDashBoard", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}
