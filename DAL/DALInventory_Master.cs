using BAL;
using Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALInventory_Master: IDALInventory_Master
    {

        #region Unit Master
       public Task<string> InsertUpdateDeleteUnitMaster(Unit obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@Code",obj.Code),
                 new SqlParameter("@Name", obj.Name),
                 new SqlParameter("@ShortName", obj.ShortName),
                 new SqlParameter("@DisplayOrder", obj.DisplayOrder),
                 new SqlParameter("@IsActive", obj.IsActive),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InventoryUnitMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetUnitMaster(Unit obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@Code", obj.Code),
                 new SqlParameter("@FYId",obj.FYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InventoryUnitMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Item Group Master
        public async Task<string> InsertUpdateDeleteItemGroupMaster(Unit obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@Code",obj.Code),
                 new SqlParameter("@Name", obj.Name),
                 new SqlParameter("@IsActive", obj.IsActive),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InventoryItemGroupMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetItemGroupMaster(Unit obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InventoryItemGroupMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Item Category Master
        public async Task<string> InsertUpdateDeleteItemCategoryMaster(ItemGroup obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@Code",obj.Code),
                 new SqlParameter("@CategoryName", obj.CategoryName),
                 new SqlParameter("@ItemGroupCode", obj.ItemGroupCode),
                 new SqlParameter("@IsActive", obj.IsActive),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InventoryItemCategoryMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetItemCategoryMaster(ItemGroup obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ItemGroupCode",obj.ItemGroupCode),
                new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId)

                
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InventoryItemCategoryMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Item Master

        public async Task<string> InsertUpdateDeleteItemMaster(Inventory obj)
        {

            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code", obj.Code),
                
                new SqlParameter("@ItemName", obj.ItemName),
                new SqlParameter("@ItemCode", obj.ItemCode),
                new SqlParameter("@ItemCategoryCode", obj.ItemCategoryCode),
                new SqlParameter("@ItemGroupCode", obj.ItemGroupCode),
                new SqlParameter("@BaseUnitCode", obj.BaseUnitCode),
                new SqlParameter("@MaxQty",obj.MaxQty),
                new SqlParameter("@MinQty",obj.MinQty),
                new SqlParameter("@ItemType", obj.ItemType),
                new SqlParameter("@VATComCode", obj.VATComCode),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InventoryItemMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetItemMaster(Inventory obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@ItemGroupCode", obj.ItemGroupCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@ItemCategoryCode",obj.ItemCategoryCode)
                
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InventoryItemMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Commodity Master
        public async Task<string> InsertUpdateDeleteCommodityMaster(HSNCode obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@Code",obj.Code),
                 new SqlParameter("@HSNName", obj.HSNName),
                 new SqlParameter("@CommodityCode", obj.CommodityCode),
                 new SqlParameter("@GSTPercentage", obj.GSTPercentage),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@IsActive", obj.IsActive),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InventoryCommodityMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCommodityMaster(HSNCode obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InventoryCommodityMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Item Category Master
        public async Task<string> InsertUpdateDeleteModelMaster(Model obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@Code",obj.Code),
                 new SqlParameter("@ModelName", obj.ModelName),
                 new SqlParameter("@IsActive", obj.IsActive),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InventoryModelMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetModelMaster(Model obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InventoryModelMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Tax Head Master
        public Task<string> InsertUpdateDeleteTaxesHeadMaster(TaxHead obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@Code",obj.Code),
                 new SqlParameter("@HeadName", obj.HeadName),
                 new SqlParameter("@CalculationType", obj.CalculationType),
                 new SqlParameter("@PostingAccountType", obj.PostingAccountType),
                 new SqlParameter("@AccountHeadType", obj.AccountHeadType),
                 new SqlParameter("@HeadType", obj.HeadType),
                 new SqlParameter("@DisplayOrder", obj.DisplayOrder),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteInventoryHeadTaxMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTaxesHeadMaster(TaxHead obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@PostingAccountType", obj.PostingAccountType),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@FYId",obj.FYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetInventoryHeadTaxMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
    }
}
