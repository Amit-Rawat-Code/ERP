using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Data.SqlTypes;
using BAL;

namespace DAL
{
    public partial class DLL
    {
        #region Main Group Master
        public async Task<DataTable> GetMainGroup(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@MainGroupCode", obj.MainGroupCode),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),


            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_MainGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Nature Master
        public async Task<DataTable> GetNature(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_CommonDDLs", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Ledger Group Master
        public async Task<string> InsertUpdateDeleteLedgerGroup(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@GroupCode", obj.GroupCode),
              new SqlParameter("@GroupName", obj.GroupName),
              new SqlParameter("@UnderGroupCode", obj.UnderGroupCode),
              new SqlParameter("@MainGroupCode", obj.MainGroupCode),
              new SqlParameter("@GroupLevelCode", obj.GroupLevelCode),
              new SqlParameter("@PrintSequence", obj.PrintSequence),
              new SqlParameter("@SysGroup", obj.SysGroup),
              new SqlParameter("@Nature", obj.Nature),
              new SqlParameter("@OpnType", obj.OpnType),
              new SqlParameter("@IsActive",obj.IsActive),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_AcGroup", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLedgerGroup(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),

             new SqlParameter("@Nature", obj.Nature),
             new SqlParameter("@GroupCode", obj.GroupCode),
             new SqlParameter("@UnderGroupCode", obj.UnderGroupCode),
             new SqlParameter("@MainGroupCode", obj.MainGroupCode),
             new SqlParameter("@GroupLevelCode", obj.GroupLevelCode),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AcGroup]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Ledger Master
        public async Task<string> InsertUpdateDeleteLedger(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@IsGlobalLedger", obj.IsGlobalLedger),
              new SqlParameter("@SubCode", obj.SubCode),
              new SqlParameter("@Action",obj.Action),

              new SqlParameter("@Name", obj.LedgerName),
              new SqlParameter("@AliasName", obj.AliasName),
              new SqlParameter("@LedgerCode", obj.LedgerCode),

              new SqlParameter("@GroupCode", obj.GroupCode),
              new SqlParameter("@Nature", obj.Nature),
              new SqlParameter("@OpeningBal", obj.OpeningBal),
              new SqlParameter("@OpnType", obj.OpnType),

              new SqlParameter("@Add1", obj.Address1),
              new SqlParameter("@Add2", obj.Address2),
              new SqlParameter("@Add3", obj.Address3),
              new SqlParameter("@CountryCode", obj.CountryId),

              new SqlParameter("@StateCode", obj.StateId),
              new SqlParameter("@CityCode", obj.CityId),
              new SqlParameter("@Pincode", obj.Pincode),

              new SqlParameter("@EmailId", obj.EmailId),
              new SqlParameter("@PhoneNo", obj.PhoneNo),
              new SqlParameter("@MobileNo", obj.MobileNo),

              new SqlParameter("@ChqeuePrintName", obj.ChqeuePrintName),
              new SqlParameter("@IsActive", obj.IsActive),
              new SqlParameter("@IsStopPayment", obj.IsStopPayment),

              new SqlParameter("@TDSYN", obj.TDSYN),
              new SqlParameter("@PANNo ", obj.PANNo),
              new SqlParameter("@TDSACCode", obj.TDSAC),
              new SqlParameter("@DeducteeType", obj.DeducteeType),
              new SqlParameter("@TDSNature", obj.TDSNature),
              new SqlParameter("@DeducteeStatus", obj.DeducteeStatus),
              new SqlParameter("@TDSPercentage", obj.TDSPercentage),
              new SqlParameter("@TDSSection", obj.TDSSection),

              new SqlParameter("@ExciseNo", obj.ExciseNo),
              new SqlParameter("@Range", obj.Range),
              new SqlParameter("@Division", obj.Division),
              new SqlParameter("@Commisionrate", obj.Commisionrate),

              new SqlParameter("@BankName", obj.BankName),
              new SqlParameter("@BankBranchName", obj.BankBranchName),
              new SqlParameter("@AccountNo", obj.AccountNo),
              new SqlParameter("@IFSCCode", obj.IFSCCode),

              new SqlParameter("@TransporterCode", obj.TransporterCode),
              new SqlParameter("@CreditDays", obj.CreditDays),
              new SqlParameter("@LimitAmt ", obj.LimitAmt),
              new SqlParameter("@MfgNo", obj.MfgNo),
              new SqlParameter("@SecurityLedger", obj.SecurityLedger),



              new SqlParameter("@TinNo", obj.TinNo),
              new SqlParameter("@TAN", obj.TAN),
              new SqlParameter("@Commodity ", obj.Commodity),
              new SqlParameter("@TariffItem", obj.TariffItem),
              new SqlParameter("@SubHeading", obj.SubHeading),
              new SqlParameter("@CSTNo", obj.CSTNo),
              new SqlParameter("@AnnexureYN", obj.AnnexureYN),
              new SqlParameter("@AnnexureName", obj.AnnexureName),
              new SqlParameter("@FBTReq ", obj.FBTReq),
              new SqlParameter("@RateOfFBT", obj.RateOfFBT),
              new SqlParameter("@DepriciationRate", obj.DepriciationRate),
              new SqlParameter("@C_Authorities", obj.C_Authorities),
              new SqlParameter("@C_Designation", obj.C_Designation),
              new SqlParameter("@C_Sector_Circle", obj.C_Sector_Circle),
              new SqlParameter("@Comment", obj.Comment),
              new SqlParameter("@PerRatio ", obj.PerRatio),
              new SqlParameter("@Department", obj.Department),
              new SqlParameter("@PFather ", obj.PFather),
              new SqlParameter("@Interest", obj.Interest),
              new SqlParameter("@BrokerPer", obj.BrokerPer),

              new SqlParameter("@TransID", obj.TransID),
              new SqlParameter("@MaxTransID ", obj.MaxTransID),
              new SqlParameter("@SrNo", obj.SrNo),
              new SqlParameter("@V_Type", obj.V_Type),
              new SqlParameter("@DrAmt", obj.DrAmt),
              new SqlParameter("@CrAmt", obj.CrAmt),
              new SqlParameter("@VoucherConfirm", obj.VoucherConfirm),
              new SqlParameter("@PVDate", obj.PVDate),
              new SqlParameter("@CVDate", obj.CVDate),
              new SqlParameter("@PVNo", obj.PVNo),
              new SqlParameter("@CVNo", obj.CVNo),
              new SqlParameter("@OpeningData", obj.OpeningData),
              new SqlParameter("@SchoolList", obj.SchoolList),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),

              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@result",""),

            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SubGroup]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLedger(BALAccount obj)

        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@Nature", obj.Nature),
             new SqlParameter("@LedgerCode", obj.LedgerCode),
             new SqlParameter("@IsGlobalLedger", obj.IsGlobalLedger),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),


            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SubGroup]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetGlobalLedgerSchools(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@SubCode", obj.SubCode),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SubGroup]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> Get_GlobalLedgerinTempLedgerMaster(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_Get_GlobalLedgerinTempLedgerMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region TDS Section
        public async Task<string> InsertUpdateDeleteTDSSection(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {

              new SqlParameter("@Action",obj.Action),

              new SqlParameter("@SectionCode", obj.SectionCode),
              new SqlParameter("@SectionName", obj.SectionName),
              new SqlParameter("@ChallanCode", obj.ChallanCode),

              new SqlParameter("@IsActive",obj.IsActive),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),

              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@result",""),




            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_TDSSectionMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTDSSections(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@SectionCode", obj.SectionCode),

             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),


            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_TDSSectionMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region TDSDeductee
        public async Task<string> InsertUpdateDeleteTDSDeductee(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {

              new SqlParameter("@Action",obj.Action),

              new SqlParameter("@DeducteeCode", obj.DeducteeCode),
              new SqlParameter("@DeducteeName", obj.DeducteeName),
              new SqlParameter("@Nature", obj.Nature),
              new SqlParameter("@ResStatus", obj.ResStatus),
              new SqlParameter("@DedStatus", obj.DedStatus),


              new SqlParameter("@IsActive",obj.IsActive),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),

              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@result",""),

            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_TDSDeducteeTypeMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTDSDeductees(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@DeducteeCode", obj.DeducteeCode),

             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_TDSDeducteeTypeMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region TDS Category
        public async Task<string> InsertUpdateDeleteTDSCategory(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {

              new SqlParameter("@Action",obj.Action),

              new SqlParameter("@CategoryCode", obj.CategoryCode),
              new SqlParameter("@CategoryName", obj.CategoryName),
              new SqlParameter("@SectionCode", obj.SectionCode),

              new SqlParameter("@CompanyPer", obj.CompanyPer),
              new SqlParameter("@IndPer", obj.IndPer),
              new SqlParameter("@LimitFY", obj.LimitFY),
              new SqlParameter("@LimitST", obj.LimitST),

              new SqlParameter("@IsActive",obj.IsActive),

               new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),

              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@result",""),




            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_TDSCategoryMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTDSCategorys(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@CategoryCode", obj.CategoryCode),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),


            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_TDSCategoryMast]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region LedgerPosting
        public async Task<DataTable> GetVoucherKeys(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@RelationshipId",obj.RelationshipId),

             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@VoucherType",obj.VoucherType),
             new SqlParameter("@VConfirm",obj.VoucherConfirm),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[VoucherKeys]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRuningBalance(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@RelationshipId",obj.RelationshipId),

             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@LedgerCode",obj.LedgerCode),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_RuningBalance]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<List<string>> InsertUpdateDeleteVoucherLedger(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@TransID",obj.TransID),
              new SqlParameter("@V_Type",obj.VoucherType),
              new SqlParameter("@PVNo",obj.PVNo),
              new SqlParameter("@PVDate",obj.PVDate),
              new SqlParameter("@CVNo",obj.CVNo),
              new SqlParameter("@CVDate",obj.CVDate),
              new SqlParameter("@SubCode",obj.SubCode),
              new SqlParameter("@ContraSubCode",obj.ContraSubCode),
              new SqlParameter("@EntryNarr",obj.EntryNarr),
              new SqlParameter("@VoucherNarr",obj.VoucherNarr),
              new SqlParameter("@VoucherConfirm",obj.VoucherConfirm),
              new SqlParameter("@VoucherData",obj.VoucherData),
              new SqlParameter("@ChequeDate",obj.ChequeDate),
              new SqlParameter("@ChequeNo",obj.ChequeNo),
              new SqlParameter("@TransferMode",obj.TransferMode),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@ExcelDataTransID",obj.ExcelDataTransID),
              new SqlParameter("@LedgerDataTransID",obj.LedgerDataTransID),
              new SqlParameter("@SrNo",obj.SrNo),
              new SqlParameter("@result1",""),
              new SqlParameter("@result2",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnMultiString("[trans].[USP_InsertUpdateDeleteVoucherLedger]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetLedgerVoucher(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@V_Type",obj.VoucherType),
             new SqlParameter("@SubCode",obj.SubCode),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@PVNo",obj.PVNo),
             new SqlParameter("@PVDate",Convert.ToDateTime(obj.PVDate).ToString("yyyy-MM-dd")),
             new SqlParameter("@CVNo",obj.CVNo),
             new SqlParameter("@CVDate",Convert.ToDateTime(obj.CVDate).ToString("yyyy-MM-dd")),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InsertUpdateDeleteVoucherLedger]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Search and Update Laser  Opening
        public async Task<string> UpdateLedgerOpening(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@TransID",obj.TransID),
              new SqlParameter("@V_Type",obj.VoucherType),
              new SqlParameter("@PVNo",obj.PVNo),
              new SqlParameter("@PVDate",obj.PVDate),
              new SqlParameter("@CVNo",obj.CVNo),
              new SqlParameter("@CVDate",obj.CVDate),
              new SqlParameter("@SubCode",obj.SubCode),
              new SqlParameter("@ContraSubCode",obj.ContraSubCode),
              new SqlParameter("@MainGroupCode",obj.MainGroupCode),
              new SqlParameter("@VoucherNarr",obj.VoucherNarr),
              new SqlParameter("@VoucherConfirm",obj.VoucherConfirm),
              new SqlParameter("@LedgerFilteredList",obj.LedgerFilteredList),
              new SqlParameter("@ChequeDate",obj.ChequeDate),
              new SqlParameter("@ChequeNo",obj.ChequeNo),
              new SqlParameter("@TransferMode",obj.TransferMode),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@ExcelDataTransID",obj.ExcelDataTransID),
              new SqlParameter("@SrNo",obj.SrNo),
              new SqlParameter("@result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_LaserOpening]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetLedgerOpening(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@GroupCode",obj.GroupCode),
             new SqlParameter("@Nature",obj.Nature),
             new SqlParameter("@SubCode",obj.SubCode),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@V_Type",obj.VoucherType),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@PVNo",obj.PVNo),
             new SqlParameter("@CodeList",obj.LedgerFilteredList),
             new SqlParameter("@ClassCode",obj.ClassCode),
             new SqlParameter("@PVDate",Convert.ToDateTime(obj.PVDate).ToString("yyyy-MM-dd")),
             new SqlParameter("@CVNo",obj.CVNo),
             new SqlParameter("@CVDate",Convert.ToDateTime(obj.CVDate).ToString("yyyy-MM-dd")),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LaserOpening]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Reporting
        public async Task<DataTable> GetLedgerReport(BALAccount obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@SubCode",obj.SubCode),
                new SqlParameter("@EntryNarration",obj.EntryNarration),
                new SqlParameter("@VoucherNarration",obj.VoucherNarration),
                new SqlParameter("@TransMode",""),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Rpt.LedgerReport", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataTable> GetAccountName(BALAccount obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {   new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

                new SqlParameter("@FYId",obj.FYId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Rpt.LedgerReport", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataTable> GetMultipleLedgerReport(BALAccount obj)
        {
            StringBuilder str = new StringBuilder();
            str.Append("");
            if (obj.CodeList != null)
            {
                if (obj.CodeList.Count > 0)
                {
                    var d = obj.CodeList.Count;
                    string seprator = "";
                    for (int i = 0; i < obj.CodeList.Count; i++)
                    {
                        str.Append(seprator);
                        str.Append(obj.CodeList[i]);
                        seprator = ",";
                    }
                }
            }

            if (string.IsNullOrEmpty(obj.Code))
            {
                obj.Code = str.ToString();
            }
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@SubCode",obj.Code),
                new SqlParameter("@EntryNarration",obj.EntryNarration),
                new SqlParameter("@VoucherNarration",obj.VoucherNarration),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@TransMode",obj.TransMode),

                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Rpt.LedgerReport", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataTable> GetTrialReport(BALAccount obj)
        {
            StringBuilder str = new StringBuilder();
            str.Append("");
            if (obj.CodeList != null)
            {
                if (obj.CodeList.Count > 0)
                {
                    var d = obj.CodeList.Count;
                    string seprator = "";
                    for (int i = 0; i < obj.CodeList.Count; i++)
                    {
                        str.Append(seprator);
                        str.Append(obj.CodeList[i]);
                        seprator = ",";
                    }
                }
            }

            if (string.IsNullOrEmpty(obj.Code))
            {
                obj.Code = str.ToString();
            }
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@fromDate",obj.FromDate),
                new SqlParameter("@toDate",obj.ToDate),
                new SqlParameter("@OpeningMode",obj.OpeningMode),
                new SqlParameter("@TransMode",obj.TransMode),
                new SqlParameter("@GroupCode",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

                new SqlParameter("@fyid",obj.FYId),
                new SqlParameter("@Action",obj.Action),
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.TrialReport", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        public async Task<DataTable> IncomeExpenditure(BALAccount obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@fromDate",obj.FromDate),
                new SqlParameter("@toDate",obj.ToDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

                new SqlParameter("@fyid",obj.FYId),
                new SqlParameter("@Action",obj.Action),
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Rpt.Usp_IncomeExpenditure", CommandType.StoredProcedure, param.ToArray()));
            return dt;
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

        #region VoucherNarration 
        public async Task<string> InsertUpdateDeleteVoucherNarration(BALAccount obj)
        {
            StringBuilder voucherlist = new StringBuilder();
            string seprator = ",";
            string bigseprator = "";
            if (obj.VoucherList.Count == 0) return "0";
            if (obj.VoucherList.Count > 0)
            {
                if (obj.VoucherList != null)
                {
                    for (int i = 0; i < obj.VoucherList.Count; i++)
                    {
                        voucherlist.Append(bigseprator);
                        voucherlist.Append(obj.VoucherList[i].VoucherId);
                        voucherlist.Append(seprator);
                    }
                    bigseprator = "";
                }
            }


            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@NarrationId",obj.NarrationId),
              new SqlParameter("@Narration",obj.Narration),
              new SqlParameter("@VoucherIds", voucherlist.ToString()),

              new SqlParameter("@IsActive",obj.IsActive),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),

              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_VoucherNarrationMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetVoucherNarrations(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@NarrationId",obj.NarrationId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),

             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_VoucherNarrationMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region HOSO Ledger Mapping
        public async Task<DataTable> GetHOSOLedger(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@IsHQ",obj.IsHQ),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_HOSOLedgerMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteHOSOLedgerMapping(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@HOSOMapingData",obj.HOSOMapingData),
                new SqlParameter("@Result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_HOSOLedgerMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Bank Reconciliation
        public async Task<string> InsertUpdateDeleteBankReconciliation(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@TransID",obj.TransID),
              new SqlParameter("@Date",obj.Date),
              new SqlParameter("@BankSubCode",obj.BankCode),
              new SqlParameter("@ExcelFormatNo",obj.ExcelFormatNo),
              new SqlParameter("@FromDate",obj.FromDate),
              new SqlParameter("@ToDate",obj.ToDate),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@Keys",obj.Keys),
              new SqlParameter("@ExcelData",obj.ExcelData),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@LedgerDataTransID",obj.LedgerDataTransID),
              new SqlParameter("@SrNo",obj.SrNo),
              new SqlParameter("@LedgerSrNo",obj.LedgerSrNo),
              new SqlParameter("@TransactionNo",obj.TransactionNo),
              new SqlParameter("@Result",""),


            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[STP_UploadExcel_BankReconciliation]", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetBankReconciliation(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@TransID",obj.TransID),
              new SqlParameter("@VType",obj.VType),
              new SqlParameter("@Date",obj.Date),
              new SqlParameter("@BankSubCode",obj.BankCode),
              new SqlParameter("@ExcelFormatNo",obj.ExcelFormatNo),
              new SqlParameter("@FromDate",obj.FromDate),
              new SqlParameter("@ToDate",obj.ToDate),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@Keys",obj.Keys),
              new SqlParameter("@ExcelData",obj.ExcelData),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@LedgerDataTransID",obj.LedgerDataTransID),
              new SqlParameter("@SrNo",obj.SrNo),
              new SqlParameter("@LedgerSrNo",obj.LedgerSrNo),
              new SqlParameter("@Result",""),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[STP_UploadExcel_BankReconciliation]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Ledger Master Temp
        public async Task<string> InsertUpdateDeleteLedger_Temp(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@SubCode", obj.SubCode),
              new SqlParameter("@GblSubCode", obj.GblSubCode),
              new SqlParameter("@Action",obj.Action),

              new SqlParameter("@Name", obj.LedgerName),
              new SqlParameter("@AliasName", obj.AliasName),

              new SqlParameter("@GroupCode", obj.GroupCode),
              new SqlParameter("@Nature", obj.Nature),

              new SqlParameter("@Add1", obj.Address1),
              new SqlParameter("@Add2", obj.Address2),
              new SqlParameter("@Add3", obj.Address3),
              new SqlParameter("@CountryCode", obj.CountryId),

              new SqlParameter("@StateCode", obj.StateId),
              new SqlParameter("@CityCode", obj.CityId),
              new SqlParameter("@Pincode", obj.Pincode),

              new SqlParameter("@EmailId", obj.EmailId),
              new SqlParameter("@PhoneNo", obj.PhoneNo),
              new SqlParameter("@MobileNo", obj.MobileNo),

              new SqlParameter("@ChqeuePrintName", obj.ChqeuePrintName),
              new SqlParameter("@IsActive", obj.IsActive),
              new SqlParameter("@IsStopPayment", obj.IsStopPayment),

              new SqlParameter("@TDSYN", obj.TDSYN),
              new SqlParameter("@PANNo ", obj.PANNo),
              new SqlParameter("@TDSACCode", obj.TDSAC),
              new SqlParameter("@DeducteeType", obj.DeducteeType),
              new SqlParameter("@TDSNature", obj.TDSNature),
              new SqlParameter("@DeducteeStatus", obj.DeducteeStatus),
              new SqlParameter("@TDSPercentage", obj.TDSPercentage),
              new SqlParameter("@TDSSection", obj.TDSSection),

              new SqlParameter("@ExciseNo", obj.ExciseNo),
              new SqlParameter("@Range", obj.Range),
              new SqlParameter("@Division", obj.Division),
              new SqlParameter("@Commisionrate", obj.Commisionrate),

              new SqlParameter("@BankName", obj.BankName),
              new SqlParameter("@BankBranchName", obj.BankBranchName),
              new SqlParameter("@AccountNo", obj.AccountNo),
              new SqlParameter("@IFSCCode", obj.IFSCCode),

              new SqlParameter("@TransporterCode", obj.TransporterCode),
              new SqlParameter("@CreditDays", obj.CreditDays),
              new SqlParameter("@LimitAmt ", obj.LimitAmt),
              new SqlParameter("@MfgNo", obj.MfgNo),
              new SqlParameter("@SecurityLedger", obj.SecurityLedger),



              new SqlParameter("@TinNo", obj.TinNo),
              new SqlParameter("@TAN", obj.TAN),
              new SqlParameter("@Commodity ", obj.Commodity),
              new SqlParameter("@TariffItem", obj.TariffItem),
              new SqlParameter("@SubHeading", obj.SubHeading),
              new SqlParameter("@CSTNo", obj.CSTNo),
              new SqlParameter("@AnnexureYN", obj.AnnexureYN),
              new SqlParameter("@AnnexureName", obj.AnnexureName),
              new SqlParameter("@FBTReq ", obj.FBTReq),
              new SqlParameter("@RateOfFBT", obj.RateOfFBT),
              new SqlParameter("@DepriciationRate", obj.DepriciationRate),
              new SqlParameter("@C_Authorities", obj.C_Authorities),
              new SqlParameter("@C_Designation", obj.C_Designation),
              new SqlParameter("@C_Sector_Circle", obj.C_Sector_Circle),
              new SqlParameter("@Comment", obj.Comment),
              new SqlParameter("@PerRatio ", obj.PerRatio),
              new SqlParameter("@Department", obj.Department),
              new SqlParameter("@PFather ", obj.PFather),
              new SqlParameter("@Interest", obj.Interest),
              new SqlParameter("@BrokerPer", obj.BrokerPer),

              new SqlParameter("@TransID", obj.TransID),
              new SqlParameter("@MaxTransID ", obj.MaxTransID),
              new SqlParameter("@SrNo", obj.SrNo),
              new SqlParameter("@V_Type", obj.V_Type),
              new SqlParameter("@DrAmt", obj.DrAmt),
              new SqlParameter("@CrAmt", obj.CrAmt),
              new SqlParameter("@VoucherConfirm", obj.VoucherConfirm),
              new SqlParameter("@PVDate", obj.PVDate),
              new SqlParameter("@CVDate", obj.CVDate),
              new SqlParameter("@PVNo", obj.PVNo),
              new SqlParameter("@CVNo", obj.CVNo),

              new SqlParameter("@LedgerRequestList", obj.LedgerRequestList),

              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),

              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@result",""),

            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SubGroup_Temp]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLedger_Temp(BALAccount obj)

        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@Nature", obj.Nature),

             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@SchoolList",obj.SchoolList)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SubGroup_Temp]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Cash Deposit In Bank
        public async Task<string> UpdateCashDepositInBank(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),              
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@PVDate",obj.PVDate),
              new SqlParameter("@LedgerDataTransID",obj.LedgerDataTransID),
              new SqlParameter("@result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_UpdateCashDepositInBank]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCashDepositInBankLedgerEntry(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@BankSubCode",obj.BankSubCode),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetCashDepositInBankLedger]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #region Ledger Wise Details
        public async Task<DataTable> GetLedgerWiseDetails(BALAccount obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@SubCode",obj.SubCode),
                new SqlParameter("@EntryNarration",obj.EntryNarration),
                new SqlParameter("@VoucherNarration",obj.VoucherNarration),
                new SqlParameter("@TransMode",""),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Rpt.DisplayLedgerWiseDetails", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        #endregion

        public async Task<List<string>> InsertUpdateDeleteAdmissionVoucherLedger(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@TransID",obj.TransID),
              new SqlParameter("@V_Type",obj.VoucherType),
              new SqlParameter("@PVNo",obj.PVNo),
              new SqlParameter("@PVDate",obj.PVDate),
              new SqlParameter("@CVNo",obj.CVNo),
              new SqlParameter("@CVDate",obj.CVDate),
              new SqlParameter("@SubCode",obj.SubCode),
              new SqlParameter("@ContraSubCode",obj.ContraSubCode),
              new SqlParameter("@EntryNarr",obj.EntryNarr),
              new SqlParameter("@VoucherNarr",obj.VoucherNarr),
              new SqlParameter("@VoucherConfirm",obj.VoucherConfirm),
              new SqlParameter("@VoucherData",obj.VoucherData),
              new SqlParameter("@ChequeDate",obj.ChequeDate),
              new SqlParameter("@ChequeNo",obj.ChequeNo),
              new SqlParameter("@TransferMode",obj.TransferMode),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@ExcelDataTransID",obj.ExcelDataTransID),
              new SqlParameter("@LedgerDataTransID",obj.LedgerDataTransID),
              new SqlParameter("@SrNo",obj.SrNo),
              new SqlParameter("@result1",""),
              new SqlParameter("@result2",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnMultiString("[trans].[USP_InsertUpdateDeleteAdmissionVoucherLedger]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetAdmissionLedgerVoucher(BALAccount obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@V_Type",obj.VoucherType),
             new SqlParameter("@TransID",obj.TransID),
             new SqlParameter("@PVNo",obj.PVNo),
             new SqlParameter("@PVDate",Convert.ToDateTime(obj.PVDate).ToString("yyyy-MM-dd")),
             new SqlParameter("@CVNo",obj.CVNo),
             new SqlParameter("@CVDate",Convert.ToDateTime(obj.CVDate).ToString("yyyy-MM-dd")),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InsertUpdateDeleteAdmissionVoucherLedger]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertChecquePrintDetails(ChecquePrintDetails obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@TransID",obj.TransID),
              new SqlParameter("@BeneficiaryName",obj.BeneficiaryName),
              new SqlParameter("@ChequePrintAmount",obj.ChequePrintAmount),
              new SqlParameter("@ChequePrintDate",obj.ChequePrintDate),
              new SqlParameter("@ACPayee",obj.ACPayee),
              new SqlParameter("@Bank",obj.Bank),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_ChecquePrintDetails", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCashBookLedgerReport(BALAccount obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@VoucherNarration",obj.VoucherNarration),
                new SqlParameter("@SubCode",obj.SubCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Rpt.USP_CashBookReport", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
    }
}
