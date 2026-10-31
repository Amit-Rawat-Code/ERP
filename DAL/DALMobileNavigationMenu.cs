using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BAL;


namespace DAL
{
    public partial class DLL
    {
        public async Task<DataSet> GetMobileNavigationMenuForRole(BALMobileNavigationMenu obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[dbo].[USP_MobileRoleOptionMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteMobileNavigationMenuForRole(BALMobileNavigationMenu obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[dbo].[USP_MobileRoleOptionMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        
        public async Task<DataTable> GetUserMobileRolePermission(BALMobileNavigationMenu obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ModuleId",obj.ModuleId),
                new SqlParameter("@RelationshipId",obj.RelationshipId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_UserMobileMenuPermission]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteUserMobilePermission(BALMobileNavigationMenu obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[dbo].[USP_UserMobileMenuPermission]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
