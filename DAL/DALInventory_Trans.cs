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
    public class DALInventory_Trans: IDALInventory_Trans
    {
        #region Item Wise Rate Details
        public Task<string> InsertUpdateDeleteItemWiseRateDetails(ItemWiseRateDetails obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@TransId",obj.TransId),
                 new SqlParameter("@IWR_Date", obj.IWR_Date),
                 new SqlParameter("@ItemCategoryCode", obj.ItemCategoryCode),
                 new SqlParameter("@ItemNameCode", obj.ItemNameCode),
                 new SqlParameter("@ModelCode", obj.ModelCode),
                 new SqlParameter("@PreferredVender", obj.PreferredVender),
                 new SqlParameter("@VenderAddress", obj.VenderAddress),
                 new SqlParameter("@StateCode", obj.StateCode),
                 new SqlParameter("@CityCode", obj.CityCode),
                 new SqlParameter("@Pincode", obj.Pincode),
                 new SqlParameter("@MobileNo", obj.MobileNo),
                 new SqlParameter("@EmailId", obj.EmailId),
                 new SqlParameter("@PaymentTerms", obj.PaymentTerms),
                 new SqlParameter("@UnitPrice", obj.UnitPrice),
                 new SqlParameter("@GstRate", obj.GstRate),
                 new SqlParameter("@TotalAmount", obj.TotalAmount),
                 new SqlParameter("@Remark", obj.Remark),
                 new SqlParameter("@IsActive", obj.IsActive),
                 new SqlParameter("@RelationshipId", obj.RelationshipId),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InventoryItemWiseRateDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetItemWiseRateDetails(ItemWiseRateDetails obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InventoryItemWiseRateDetails]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        public async Task<DataTable> VoucherMasterList(BALAccount obj)
        {
            var param = new List<SqlParameter>
        {
        new SqlParameter("@Flag",obj.Action),
        new SqlParameter("@RelationshipId",obj.RelationshipId),
        new SqlParameter("@SessionId",obj.SessionId),
        new SqlParameter("@FYId",obj.FYId),
        new SqlParameter("@VoucherType",obj.VoucherType),
        new SqlParameter("@Nature",obj.NatureCode),

        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_VoucherMaster]", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetLedgerData(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@Nature", obj.Nature),
             new SqlParameter("@LedgerCode", obj.LedgerCode),
              new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SubGroup]", CommandType.StoredProcedure, param.ToArray()));
        }

        public Task<string> InsertUpdateDeleteMaterialInwardEntry(BMaterial obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@GRN_Detail",obj.GRN_Detail),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@V_Type",obj.V_Type),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@V_Date",obj.V_Date),
                new SqlParameter("@SupplierCode",obj.SupplierCode),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@CityCode",obj.CityName),
                new SqlParameter("@GSTN",obj.GSTN),
                new SqlParameter("@CancelYN",obj.CancelYN),
                new SqlParameter("@ChallanNo",obj.ChallanNo),
                new SqlParameter("@ChallanDate",obj.ChallanDate),
                new SqlParameter("@TranspoterCode ",obj.TransporterCode),
                new SqlParameter("@GRNo ",obj.GRNo),
                new SqlParameter("@GRDate ",obj.GRDate),
                new SqlParameter("@VehicleNo  ",obj.VehicleNo),
                new SqlParameter("@GrossWt",obj.GrossWt),
                new SqlParameter("@TareWt",obj.TareWt),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@NetAmt",obj.NetAmt),
                new SqlParameter("@BillValue",obj.BillValue),
                new SqlParameter("@ApprovalDate",obj.ApprovalDate),
                //new SqlParameter("@SaudaTransId", obj.SaudaTransId),
                //new SqlParameter("@Vatav", obj.Vatav),
                //new SqlParameter("@Days", obj.Days),
                //new SqlParameter("@DueDate", obj.DueDate),
                //new SqlParameter("@Rava", obj.Rava),
                //new SqlParameter("@Nas", obj.Nas),
                //new SqlParameter("@Total", obj.Total),
                //new SqlParameter("@FreightAmt", obj.FreightAmt),
                //new SqlParameter("@Loading", obj.Loading),
                //new SqlParameter("@ConRatePerBag",obj.ConRatePerBag),
                //new SqlParameter("@ConTotalAmount",obj.ConTotalAmount),
                //new SqlParameter("@ContractorCode",obj.ContractorCode),
                //new SqlParameter("@ExpenseCode",obj.ExpenseCode),
                
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_MaterialInwardEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetMaterialInwardEntry(BMaterial obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@TransId",obj.TransID),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),
           
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[Usp_MaterialInwardEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public Task<string> InsertUpdateDeleteIndentEntry(Indent obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Indent_Detail",obj.Indent_Detail),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@V_Type",obj.V_Type),
                new SqlParameter("@PVNo",obj.IndentNo),
                new SqlParameter("@V_Date",obj.IndentDate),
                //new SqlParameter("@IndentNo",obj.IndentNo),
                //new SqlParameter("@IndentDate",obj.IndentDate),
                new SqlParameter("@IndentRefNo",obj.IndentRefNo),
                new SqlParameter("@IndentRefDate",obj.IndentRefDate),
                new SqlParameter("@Indenter",obj.Indenter),
                new SqlParameter("@DepartMent",obj.DepartMent),
               
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[Trans].[USP_IndentEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetIndentEntryData(Indent obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[USP_IndentEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEmployeewiseDepartments(Indent obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@EmployeeCode", obj.EmployeeCode),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_DepartmentMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetStockDetialByItemCode(Indent obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@ItemCode",obj.ItemCode),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@FYId",obj.FYId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[USP_IndentEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public Task<string> InsertUpdateDeleteIndentApproval(IndentApproval obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@IndentApproval_Det",obj.IndentApproval_Det),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@V_Type",obj.V_Type),
                new SqlParameter("@PVNo",obj.ApprovalNo),
                new SqlParameter("@V_Date",obj.ApprovalDate),
                new SqlParameter("@DepartMent",obj.DepartMent),
                new SqlParameter("@Indenter",obj.Indenter),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[Trans].[USP_IndentApproval]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetIndentEntryDetailforApproval(Indent obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
             new SqlParameter("@EmployeeCode", obj.EmployeeCode),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@TransId",obj.TransID),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[USP_IndentApproval]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetIndentVoucher(Indent obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[USP_IndentApproval]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetPurchaseBillEntry(PurchaseBill obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_GetPurchasBill]", CommandType.StoredProcedure, param.ToArray()));
        }
        public Task<string> InsertUpdateDeletePurchaseBillEntry(PurchaseBill obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Purchase_Detail",obj.Purchase_Detail),
                new SqlParameter("@AllItemExpenses",obj.AllItemExpenses),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@V_Type",obj.V_Type),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@V_Date",obj.V_Date),
                new SqlParameter("@SupplierCode",obj.SupplierCode),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@MobileNo",obj.MobileNo),
                new SqlParameter("@PinCode",obj.PinCode),
                new SqlParameter("@GSTN",obj.GSTN),
                new SqlParameter("@CancelYN",obj.CancelYN),
                new SqlParameter("@PurchaseBillNo",obj.PurchaseBillNo),
                new SqlParameter("@PurchaseBillDate",obj.PurchaseBillDate),
                new SqlParameter("@EwayBillNo",obj.EwayBillNo),
                new SqlParameter("@EwayBillDate",obj.EwayBillDate),
                new SqlParameter("@GrossAmount",obj.GrossAmount),
                new SqlParameter("@NetQty",obj.NetQty),
                new SqlParameter("@Remark", obj.Remark),
                new SqlParameter("@IsInward",obj.IsInward),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeletePurchaseBill]", CommandType.StoredProcedure, param.ToArray()));
        }
        
        public async Task<DataTable> GetNetAmount(PurchaseBill obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@TaxHeadCode",obj.TaxHeadCode),
             new SqlParameter("@TaxPercentage",obj.TaxPercentage),
             new SqlParameter("@TaxAmount", obj.TaxAmount),
             
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetItemTaxHead]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetPurchaseOrderEntry(PurchaseOrder obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetPurchaseOrder]", CommandType.StoredProcedure, param.ToArray()));
        }
        public Task<string> InsertUpdateDeletePurchaseOrderEntry(PurchaseOrder obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@PurchaseOrderList",obj.PurchaseOrderList),
                new SqlParameter("@AllItemExpenses",obj.AllItemExpenses),
                new SqlParameter("@V_Type",obj.V_Type),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@V_Date",obj.V_Date),
                new SqlParameter("@SupplierCode",obj.SupplierCode),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@MobileNo",obj.MobileNo),
                new SqlParameter("@PinCode",obj.PinCode),
                new SqlParameter("@GSTN",obj.GSTN),
                new SqlParameter("@CancelYN",obj.CancelYN),
                new SqlParameter("@POClose",obj.POClose),
                new SqlParameter("@GrossAmount",obj.GrossAmount),
                new SqlParameter("@Subject",obj.Subject),
                new SqlParameter("@HeaderTitleA",obj.HeaderTitleA),
                new SqlParameter("@HeaderTitleB",obj.HeaderTitleB),
                new SqlParameter("@HeaderA",obj.HeaderA),
                new SqlParameter("@HeaderB",obj.HeaderB),
                new SqlParameter("@CPerson",obj.CPerson),
                new SqlParameter("@DelAddress",obj.DelAddress),
                new SqlParameter("@Cond1",obj.Cond1),
                new SqlParameter("@Cond2",obj.Cond2),
                new SqlParameter("@Cond3",obj.Cond3),
                new SqlParameter("@Cond4",obj.Cond4),
                new SqlParameter("@Cond5",obj.Cond5),
                new SqlParameter("@Cond6",obj.Cond6),
                new SqlParameter("@Cond7",obj.Cond7),
                new SqlParameter("@Cond8",obj.Cond8),
                new SqlParameter("@Cond9",obj.Cond9),
                new SqlParameter("@Cond10",obj.Cond10),
                new SqlParameter("@Cond11",obj.Cond11),
                new SqlParameter("@Cond12",obj.Cond12),
                new SqlParameter("@IsInward",obj.IsInward),
                new SqlParameter("@ToRef",obj.ToRef),
                new SqlParameter("@LetterBody",obj.LetterBody),
                new SqlParameter("@DueDate",obj.DueDate),
                new SqlParameter("@PayTermRemarks",obj.PayTermRemarks),
                new SqlParameter("@PayTermDays",obj.PayTermDays),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@NetQty",obj.NetQty),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeletePurchaseOrder]", CommandType.StoredProcedure, param.ToArray()));
        }
        public Task<string> InsertUpdateDeleteIssueEntry(IssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Issue_Detail",obj.Issue_Detail),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@V_Type",obj.V_Type),
                new SqlParameter("@PVNo",obj.IssueNo),
                new SqlParameter("@V_Date",obj.IssueDate),
                new SqlParameter("@SlipNo",obj.SlipNo),
                new SqlParameter("@Indenter",obj.RecBy),
                new SqlParameter("@IssueRefBy",obj.IssueRefBy),
                new SqlParameter("@NetAmount",obj.NetAmount),
                new SqlParameter("@NetQty",obj.NetQty),
                new SqlParameter("@DepartMent",obj.DepartMent),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[Trans].[USP_InsertUpdateDeleteIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetIssueEntry(IssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[USP_GetIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStockDetialByUsingCode(IssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@ItemCode",obj.ItemCode),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[USP_GetIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public Task<string> InsertUpdateDeleteOpeningStock(OpeningStock obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Opening_Detail",obj.Opening_Detail),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@DateofOpening",obj.DateofOpening),
                new SqlParameter("@V_Type",obj.V_Type),
                new SqlParameter("@NetAmt",obj.NetAmount),
                new SqlParameter("@NetQty",obj.NetQty),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result",""),
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[Trans].[USP_InsertUpdateDeleteOpeningStock]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetOpeningStock(OpeningStock obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@V_Type", obj.V_Type),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@FYId",obj.FYId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[Trans].[USP_GetOpeningStock]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
