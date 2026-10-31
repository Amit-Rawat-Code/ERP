using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BAL;
using System.Data;

namespace DAL
{
    public partial class DLL
    {
        #region Fee Structure Group Master
        public async Task<string> InsertUpdateDeleteFeeStructureGroupMaster(BALFeeStructureGroup obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FeeStructureGroupName",obj.FeeStructureGroupName),
                new SqlParameter("@Abbreviation",obj.Abbreviation),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_FeeStructureGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetFeeStructureGroupMaster(BALFeeStructureGroup obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FeeStructureGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Fee Head Master
        public async Task<string> InsertUpdateDeleteFeeHeadMaster(BALFeeHead obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FeeHeadName",obj.FeeHeadName),
                new SqlParameter("@FrequencyName",obj.Frequency),
                new SqlParameter("@DueFromMonth",obj.DueFromMonth),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@HeadType",obj.HeadType),
                new SqlParameter("@UnacruedLedgerCode",obj.UnacruedLedgerCode),
                new SqlParameter("@CorpusLedgerCode",obj.CorpusLedgerCode),
                new SqlParameter("@DepositACCode",obj.DepositCode),
                new SqlParameter("@ConcessionLedgerCode",obj.ConcessionLedgerCode),
                new SqlParameter("@ACNumber",obj.AccountNumber),
                new SqlParameter("@IsFeeRefundable",obj.IsFeeRefundable),
                new SqlParameter("@IsMonthlyBreakupReq",obj.IsMonthlyBreakupReq),
                new SqlParameter("@IsShowCertificate",obj.IsShowInCertificate),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_FeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetFeeHeadMaster(BALFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetMonths(BALFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFrequency(BALFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetUnacruedLedgerAc(BALFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCorpusLedgerAc(BALFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDepositAc(BALFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Class Fee Structure Master
        public async Task<string> InsertUpdateDeleteClassFeeStructureMaster(BALClassFeeStructure obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@ClassFeeStructureMaster_Detail",obj.FeeStructureData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ClassFeeStructureMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetClassFeeStructureMaster(BALClassFeeStructure obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[mast].[USP_ClassFeeStructureMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFeeHeadDetail(BALClassFeeStructure obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ClassFeeStructureMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFeeStructureGroupDetail(BALClassFeeStructure obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ClassFeeStructureMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDueMonthList(BALClassFeeStructure obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FeeHeadCode",obj.FeeHeadCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ClassFeeStructureMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Concession Head Master
        public async Task<string> InsertUpdateDeleteConcessionHeadMaster(BALConcession obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ConcessionHeadName",obj.ConcessionHeadName),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ConcessionHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetConcessionHeadMaster(BALConcession obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ConcessionHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Concession Fee Head Mapping Master
        public async Task<string> InsertUpdateDeleteConcessionFeeHeadMapMaster(BALConcessionFeeHeadMap obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ConcessionHeadCode",obj.ConcessionHeadCode),
                new SqlParameter("@ConsessionFeeHeadMapData",obj.ConsessionFeeHeadMapData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ConcessionFeeHeadMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetConcessionFeeHeadMapMaster(BALConcessionFeeHeadMap obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ConcessionFeeHeadMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetConcessionHead(BALConcessionFeeHeadMap obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ConcessionFeeHeadMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetExistsConcessionHead(BALConcessionFeeHeadMap obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@ConcessionHeadCode",obj.ConcessionHeadCode),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("mast.USP_ConcessionFeeHeadMapping", CommandType.StoredProcedure, param.ToArray()));
        }


        #endregion

        #region Installment Master
        public async Task<string> InsertUpdateDeleteInstallmentMaster(BALInstallmentMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@InstallmentName",obj.InstallmentName),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@DueOn",obj.FromDate),
                new SqlParameter("@LastDate",obj.ToDate),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InstallmentMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetInstallmentMaster(BALInstallmentMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InstallmentMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Installment Mapping

        public async Task<string> InsertUpdateDeleteInstallmentMappingMaster(BALInstallmentMappingMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@InstallmentCode",obj.InstallmentCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@MonthList",obj.MonthList),
                new SqlParameter("@FeeStructure",obj.FeeStructure),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InstallmentMapping]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetInstallmentMappingMaster(BALInstallmentMappingMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InstallmentMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetFeeStructureOnInstallmentMapping(BALInstallmentMappingMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@MonthList",obj.MonthList),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[mast].[USP_InstallmentMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Concession On Fee Structure

        public async Task<string> InsertUpdateDeleteConcessionOnFeeStructure(BALConcessionOnFeeStructure obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ConcessionHeadCode",obj.ConcessionheadCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@InstallmentList",obj.InstallmentList),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ConcessionOnFeeStructure]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetConcessionOnFeeStructureMaster(BALConcessionOnFeeStructure obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ConcessionOnFeeStructure]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        public async Task<DataTable> GetNewAdmissionStudents(BALFeeDeposit obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_AdmFeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetClassWiseFeeStructure(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@InstallmentList",obj.InstallmentList),
                new SqlParameter("@ConcessionList",obj.ConcessionList),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_AdmFeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteAdmFeeDeposit(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@V_Date",obj.VDate),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@StudentId",obj.StudentId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@BillNo",obj.BillNo),
                new SqlParameter("@BillDate",obj.BillDate),
                new SqlParameter("@ChqNo",obj.ChqNo),
                new SqlParameter("@ChqDate",obj.ChqDate),
                new SqlParameter("@BankACCode",obj.BankACCode),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@EntryMode",obj.EntryMode),
                new SqlParameter("@PayMode",obj.PayMode),
                new SqlParameter("@FeeStructures",obj.FeeStructures),
                new SqlParameter("@ConcessionList",obj.ConcessionList),
                new SqlParameter("@FeeCancelTransId",obj.FeeCancelTransId),
                new SqlParameter("@IsFromMerit",obj.IsFromMerit),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_AdmFeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetAdmFeeDeposit(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[Usp_AdmFeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetStudentWiseFeeStructure(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@InstallmentList",obj.InstallmentList),
                new SqlParameter("@ConcessionList",obj.ConcessionList),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[Usp_FeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteFeeDeposit(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@PaymentOrderId",obj.PaymentOrderId),
                new SqlParameter("@BankRefNo",obj.BankRefNo),
                new SqlParameter("@ClearingDate",obj.ClearingDate),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@V_Date",obj.VDate),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@StudentId",obj.StudentId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@BillNo",obj.BillNo),
                new SqlParameter("@BillDate",obj.BillDate),
                new SqlParameter("@ChqNo",obj.ChqNo),
                new SqlParameter("@ChqDate",obj.ChqDate),
                new SqlParameter("@BankACCode",obj.BankACCode),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@EntryMode",obj.EntryMode),
                new SqlParameter("@PayMode",obj.PayMode),
                new SqlParameter("@FeeStructures",obj.FeeStructures),
                new SqlParameter("@ConcessionList",obj.ConcessionList),
                new SqlParameter("@SundryList",obj.SundryList),
                new SqlParameter("@FeeCancelTransId",obj.FeeCancelTransId),
                new SqlParameter("@IsFromMerit",obj.IsFromMerit),
                new SqlParameter("@TotalRect",obj.TotalRect),
                new SqlParameter("@AdjBroughtForward",obj.AdjBroughtForward),
                new SqlParameter("@CarriedForward",obj.CarriedForward),
                new SqlParameter("@ChequeBounceAmt",obj.ChequeBounceAmt),
                new SqlParameter("@AdjustmentAmount",obj.AdjustAmount),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@ExcelDataTransID",obj.ExcelDataTransID),
                new SqlParameter("@SrNo",obj.SrNo),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_FeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetFeeDeposit(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[Usp_FeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteStudentConcessionDetails(BALFeeDeposit obj)
        {

            var param = new List<SqlParameter>
            {
                new SqlParameter("@InstallmentList",obj.InstallmentList),
                new SqlParameter("@AppliedConcessionheadList",obj.ConcessionList),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@ApplyConOnPaybleAmount",obj.ApplyConOnPaybleAmount),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_StudentConcessionFeeStructureDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetStudentConcessionDetails(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@InstallmentList",obj.InstallmentList),
                new SqlParameter("@InstallmentCode",obj.InstallmentCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[mast].[USP_StudentConcessionFeeStructureDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteFeeDueVoucher(BALFeeDueVoucher obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_FeeDueVoucher]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFeeDueVoucher(BALFeeDueVoucher obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_FeeDueVoucher]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDueInstallment(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_FeeDeposit]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetFeeDefaulterNoticeReport(FeesDetails objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@ClassCode",objBM.ClassCode),
                new SqlParameter("@SectionCode",objBM.SectionCode),
                new SqlParameter("@Mode",objBM.Mode),
                new SqlParameter("@BranchCode",objBM.BranchCode),
                new SqlParameter("@StudentCode",objBM.StudentCode),
                new SqlParameter("@AdmissionNo",objBM.AdmissionNo),
                new SqlParameter("@RollNo",objBM.RollNo),
                new SqlParameter("@FromDate",objBM.FromDate),
                new SqlParameter("@ToDate",objBM.ToDate),
                new SqlParameter("@RelationshipId",objBM.RelationshipId),
                new SqlParameter("@Sessionid",objBM.SessionId),
                new SqlParameter("@AcademicSessionId",objBM.AcademicSessionId),
                new SqlParameter("@AllInstallmentCode",objBM.AllInstallmentCode),
                new SqlParameter("@AllStdentCode",objBM.AllStdentCode)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[rpt].[USP_MonthlyFeeCollectionReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> SearchStudentsForFeeDetails(FeesDetails objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@ClassCode",objBM.ClassCode),
                new SqlParameter("@SectionCode",objBM.SectionCode),
                new SqlParameter("@BranchCode",objBM.BranchCode),
                new SqlParameter("@RelationshipId",objBM.RelationshipId),
                new SqlParameter("@Sessionid",objBM.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_StudentDetailForFees]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> PendingFeeRegisterReport(FeesDetails objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@IsActive",objBM.IsActive),
                new SqlParameter("@FromDate",objBM.FromDate),
                new SqlParameter("@AdmissionNo",objBM.AdmissionNo),
                new SqlParameter("@StudentCode",objBM.StudentCode),
                new SqlParameter("@SectionList",objBM.SectionList),
                new SqlParameter("@RelationshipId",objBM.RelationshipId),
                new SqlParameter("@Sessionid",objBM.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_PendingFeeRegisterReport", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFeeReceipt(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RcptNo",obj.PVNo),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Sessionid",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.Usp_FeeReceipt", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFeeReceiptDetails(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Sessionid",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.Usp_FeeReceipt", CommandType.StoredProcedure, param.ToArray()));
        }

        #region FeesReceiptCancellation
        public async Task<string> InsertUpdateDeleteFeesReceiptCancellation(FeesReceiptCancellation obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@ReceiptCancellationList",obj.ReceiptCancellationList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_FeesReceiptCancellation", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFeesReceiptCancellation(FeesReceiptCancellation obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_FeesReceiptCancellation", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        public async Task<DataSet> GetStudentForFeeAdjustment(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@InstallmentList",obj.InstallmentList),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Sessionid",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("mast.USP_StudentFeeAdjustment", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteStudentFeeAdjustment(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@InstallmentList",obj.InstallmentList),
                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_StudentFeeAdjustment]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> FeeConcessionChartReport(FeesDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SectionList",obj.SectionList),
                //new SqlParameter("@SectionCode",obj.SectionCode),
                //new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@Sessionid",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("rpt.USP_FeeConcessionChartReport", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertImages(FeesDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@FilePath",obj.FileJson),
                new SqlParameter("@ConFrom",obj.ConFrom),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_StudentConcessionFeeStructureDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetConcessionDocs(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@ConFrom",obj.ConFrom),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@ConcessionCategoryId",obj.ConcessionCategoryId),// New Line
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_StudentConcessionFeeStructureDetails", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteTransportFeeDueVoucher(BALFeeDueVoucher obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_TransportFeeDueVoucher]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTransportFeeDueVoucher(BALFeeDueVoucher obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_TransportFeeDueVoucher]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> InstallmentMappingReport(BALInstallmentMappingMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@InstallmentCode",obj.InstallmentCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_InstallmentMappingReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFeeDepositDetailsFromStudentFeeStructureForm(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[StudentFeeStructure]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> PendingFeeRegisterReportInstallmentWise(FeesDetails objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@IsActive",objBM.ActiveParital),
                new SqlParameter("@FromDate",objBM.FromDate),
                new SqlParameter("@AdmissionNo",objBM.AdmissionNo),
                new SqlParameter("@StudentCode",objBM.StudentCode),
                new SqlParameter("@SectionList",objBM.SectionList),
                new SqlParameter("@RelationshipId",objBM.RelationshipId),
                new SqlParameter("@Sessionid",objBM.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_PendingFeeRegisterReportInstallmentWise", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> PendingFeeRegisterReportInstallmentFeeHeadWise(FeesDetails objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@IsActive",objBM.ActiveParital),
                new SqlParameter("@FromDate",objBM.FromDate),
                new SqlParameter("@AdmissionNo",objBM.AdmissionNo),
                new SqlParameter("@StudentCode",objBM.StudentCode),
                new SqlParameter("@SectionList",objBM.SectionList),
                new SqlParameter("@RelationshipId",objBM.RelationshipId),
                new SqlParameter("@Sessionid",objBM.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_PendingFeeRegisterReportInstallmentFeeHeadWise", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> StudentFeeCheckList(BALFeeDueVoucher objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@IsActive",objBM.ActiveParital),
                new SqlParameter("@ClassList",objBM.ClassList),
                new SqlParameter("@StudentCode",objBM.StudentCode),
                new SqlParameter("@RelationshipId",objBM.RelationshipId),
                new SqlParameter("@Sessionid",objBM.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_StudentFeeCheckList", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> FetchBankRefNos(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_FetchBankRefNos]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> FetchLateFine(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@V_Date",obj.VDate),
                new SqlParameter("@InstallmentList",obj.InstallmentList)                
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LateFineDue]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteLateFeeDue(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@DataList",obj.InstallmentList),
                new SqlParameter("@V_Date",obj.VDate),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_LateFineDue]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> RunLateFineDueatLogin(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_RunLateFineDueatLogin", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLateFinePostedStudents(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@InstallmentList",obj.InstallmentList)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_StudentWiseLateFineConcession]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteStudentWiseLateFineConcession(BALFeeDeposit obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@PostedLateFineListInstallmentWise",obj.ConcessionList),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_StudentWiseLateFineConcession", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
