using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        // public static readonly DLL dal = new DLL();

        #region Group Master
        public async Task<string> InsertUpdateDeleteGroupMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@GroupId",obj.GroupId),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@GroupName",obj.GroupName),
                new SqlParameter("@GroupAddress",obj.GroupAddress),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_GroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetGroupMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Society Master
        public async Task<string> InsertUpdateDeleteSocietyMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@SocietyId",obj.SocietyId),
                new SqlParameter("@SocietyCode",obj.SocietyCode),
                new SqlParameter("@SocietyName",obj.SocietyName),
                new SqlParameter("@SocietyAddress",obj.SocietyAddress),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@GroupId",obj.GroupId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_SocietyMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSocietyMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@GroupId",obj.GroupId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_SocietyMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region School Master
        public async Task<string> InsertUpdateDeleteSchoolMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
            {   new SqlParameter("@SocietyId",obj.SocietyId),
                new SqlParameter("@SchoolId",obj.SchoolId),
                new SqlParameter("@SchoolCode",obj.SchoolCode),
                new SqlParameter("@SchoolName",obj.SchoolName),
                new SqlParameter("@SchoolAddress",obj.SchoolAddress),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@IsHO",obj.IsHO),
                new SqlParameter("@IsSchool", obj.IsSchool),
                new SqlParameter("@IsCollege",obj.IsCollege),
                new SqlParameter("@IsSociety", obj.IsSociety),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_SchoolMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSchoolMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SocietyId",obj.SocietyId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_SchoolMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Branch Master
        public async Task<string> InsertUpdateDeleteBranchMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@BranchId",obj.BranchId),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@BranchName",obj.BranchName),
                new SqlParameter("@BranchAddress",obj.BranchAddress),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@DisplayCode",obj.DisplayCode),
                new SqlParameter("@BranchLogo",obj.BranchLogo),
                new SqlParameter("@BackgroundImage",obj.BackgroundImage),
                new SqlParameter("@BranchUrl",obj.BranchUrl),
                new SqlParameter("@SchoolId",obj.SchoolId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_BranchMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetBranchMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SchoolId",obj.SchoolId),
                new SqlParameter("@CreatedBy",obj.UserId),
                new SqlParameter("@SessionId",obj.SessionId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_BranchMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Role Master
        public async Task<DataTable> GetUserLevel(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_UserLevelMaster", CommandType.StoredProcedure, param.ToArray()));
        }



        public async Task<string> InsertUpdateDeleteRoleMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@RoleId",obj.RoleId),
                new SqlParameter("@RoleName",obj.RoleName),
                new SqlParameter("@UserLevel",obj.UserLevel),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("USP_RoleMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRoleMaster(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_RoleMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion


        #region Role Options
        public async Task<DataTable> GetRoles(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RoleId",obj.RoleId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_RoleMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetModules(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@UserId",obj.UserId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetModule", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetMobileModules(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@UserId",obj.UserId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetMobileModule", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubMenues(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ModuleId",obj.ModuleId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetSubMenu", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region  Social Media Post Creation

        public async Task<string> InsertUpdateDeleteSocialMediaPost(BALPostingForSocialMedia ob)
        {
            var param = new List<SqlParameter>
        {
            new SqlParameter("@TransID",ob.TransID),
            new SqlParameter("@RelationshipId",ob.RelationshipId),
            new SqlParameter("@ImageUrl",ob.ImageUrl),
            new SqlParameter("@Action",ob.Action),
            new SqlParameter("@CreatedBy",ob.CreatedBy),
             new SqlParameter("@FyId",ob.FYId),
            new SqlParameter("@SessionId",ob.SessionId),
            new SqlParameter("@PlatformData",ob.PlatformData),
            new SqlParameter("@UserId",ob.UserId),
            new SqlParameter("@Title",ob.Title),
            new SqlParameter("@Description",ob.Description),            
            //new SqlParameter("",ob.GeneratedLink),
            new SqlParameter("@DateOfActivation",ob.DateOfActivation),
            new SqlParameter("@DateOfDeactivation",ob.DateOfDeactivation),
            new SqlParameter("@NameofPost",ob.NameofEvent),
            new SqlParameter("@DateofCreation",ob.PublishDate),
            new SqlParameter("@UpdatedBy",ob.UpdatedBy),
            new SqlParameter("@Result", "")

        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_SocialMediaPost_Header]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSocialMediaPost(BALPostingForSocialMedia obj)
        {

            SqlParameter[] Para = new SqlParameter[]
       {
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
               new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_SocialMediaPost_Header]", CommandType.StoredProcedure, Para.ToArray()));

        }

        public async Task<DataTable> GetSocialMediaPostLink(BALPostingForSocialMedia obj)
        {

            SqlParameter[] Para = new SqlParameter[]
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@TransID", obj.TransID),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@IsChk",obj.IsChk),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_SocialMediaPost_Header]", CommandType.StoredProcedure, Para.ToArray()));

        }

        public async Task<DataTable> GetSocialMediaData(BALPostingForSocialMedia obj)
        {

            SqlParameter[] Para = new SqlParameter[]
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
               new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_SocialMediaPost_Header]", CommandType.StoredProcedure, Para.ToArray()));

        }


        #endregion

        #region Get All Banks Name
        public async Task<DataTable> GetBanks(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("STP_GetBank", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
       
        #region Get Excel Format No
        public async Task<DataTable> GetExcelFormatNo(BALAccount obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@BankCode",obj.BankCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ExcelFormatNo",obj.ExcelFormatNo)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetExcelBankFormatNo_ByBank", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Ticket Generate
        public async Task<DataTable> GetMenu(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ModuleId",obj.ModuleId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetMenu", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubMenu(BALMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@MenuId",obj.MenuId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetSubMenu", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}
//GetSocialMediaPostLink(BALPostingForSocialMedia obj