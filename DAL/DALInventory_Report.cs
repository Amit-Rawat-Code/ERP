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
    public class DALInventory_Report: IDALInventory_Report
    {
        #region
        public async Task<DataTable> GetInventoryReport(InventoryReport obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ItemNameCode",obj.ItemNameCode),
                new SqlParameter("@ItemGroupCode",obj.ItemGroupCode),
                new SqlParameter("@ItemCategoryCode",obj.ItemCategoryCode),
                new SqlParameter("@ItemModelCode",obj.ItemModelCode),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_InventoryReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Purchase Bill Register
        public async Task<DataTable> GetPurchaseBillReport(InventoryReport obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@SupplierCode",obj.SupplierCode),
                new SqlParameter("@VoucherType",obj.VoucherType),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_PurchaseBillReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region ItemWise Material Report
        public async Task<DataTable> GetItemWiseMaterialReport(InventoryReport obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@SupplierCode",obj.SupplierCode),
                new SqlParameter("@ItemCode",obj.ItemCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_ItemwiseMaterialReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Opening Stock Register Report
        public async Task<DataTable> GetSupplierWiseMaterialReport(InventoryReport obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@SupplierCode",obj.SupplierCode),
                new SqlParameter("@ItemCode",obj.ItemCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_ItemwiseMaterialReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Groups and Categories Stockwise
        public async Task<DataTable> GetItemGroupsAndCategories(InventoryReport obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@VoucherType",obj.VoucherType),
                new SqlParameter("@ItemGroupCode",obj.ItemGroupCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_OpeningStockRegisterReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Opening Stock Register Report
        public async Task<DataTable> GetOpeningStockRegisterReport(InventoryReport obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ItemCategoryCode",obj.ItemCategoryCode),
                new SqlParameter("@ItemGroupCode",obj.ItemGroupCode),
                new SqlParameter("@VoucherType",obj.VoucherType),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_OpeningStockRegisterReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Closing Stock Register Report
        public async Task<DataTable> GetClosingStockRegisterReport(InventoryReport obj)
        {

            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@ItemCategoryCode",obj.ItemCategoryCode),
                new SqlParameter("@ItemGroupCode",obj.ItemGroupCode),
                new SqlParameter("@VoucherType",obj.VoucherType),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_ClosingStockRegisterReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Stock Register Report
        public async Task<DataTable> GetStockRegisterReport(InventoryReport obj)
        {

            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@ItemCategoryCode",obj.ItemCategoryCode),
                new SqlParameter("@ItemGroupCode",obj.ItemGroupCode),
                new SqlParameter("@VoucherType",obj.VoucherType),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_StockRegisterReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}
