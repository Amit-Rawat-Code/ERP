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
        #region Almera Master
        public async Task<string> InsertUpdateDeleteAlmeraMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 6) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_AlmeraMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAlmeraMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AlmeraMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Rack Master
        public async Task<string> InsertUpdateDeleteRackMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 7) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@AlmeraCode", obj.AlmeraCode),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_RackMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetRackMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>

            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@AlmeraCode", obj.AlmeraCode),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_RackMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAlmeraList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AlmeraMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Bin Master
        public async Task<string> InsertUpdateDeleteBinMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 9) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            DataTable dtStd = new DataTable();
            DataTable dt = new DataTable();
            if (obj.Action == 1 || obj.Action == 2)
            {
                dt.Columns.AddRange(new[]{
                new DataColumn("SrNo", typeof(int)),
                new DataColumn("Bin", typeof(string)),
                new DataColumn("BinStart", typeof(string)),
                new DataColumn("BinEnd", typeof(string)),
                new DataColumn("Prefix", typeof(string)),
                new DataColumn("Counter", typeof(string)),
                new DataColumn("AlmeraCode", typeof(string)),
                new DataColumn("RackCode", typeof(string)),
                new DataColumn("IsActive", typeof(bool))}
                );
                int count = 1;
                if (obj.binmasterlist != null) 
                {
                    foreach (BinMaster bm in obj.binmasterlist)
                    {
                        if (bm.Bin != "")
                        {
                            string srno = count.ToString();
                            string Bin = bm.Bin;
                            string BinStart = obj.BinStart;
                            string BinEnd = obj.BinEnd;
                            string Prefix = obj.Prefix;
                            string Counter = obj.Counter;
                            string AlmeraCode = bm.AlmeraCode;
                            string RackCode = bm.RackCode;
                            bool IsActive = bm.IsActive;
                            dt.Rows.Add(srno, Bin, BinStart, BinEnd, Prefix, Counter, AlmeraCode, RackCode, IsActive);
                        }
                        count += 1;
                    }
                }                
            }
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@DatatableInXml",obj.ConvertDataTableToXml(dt)),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_BinMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBinMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@AlmeraCode", obj.AlmeraCode),
                new SqlParameter("@RackCode", obj.RackCode),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BinMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetRackList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BinMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> BindBinList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AlmeraCode", obj.AlmeraCode),
                new SqlParameter("@RackCode", obj.RackCode),
                new SqlParameter("@BinStart", obj.BinStart),
                new SqlParameter("@BinEnd", obj.BinEnd),
                new SqlParameter("@Prefix", obj.Prefix),
                new SqlParameter("@Counter", obj.Counter),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BinMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Author Master
        public async Task<string> InsertUpdateDeleteAuthorMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 5) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_AuthorMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAuthorMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AuthorMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Binding Master
        public async Task<string> InsertUpdateDeleteBindingTypeMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@Rate", obj.Rate),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_BindingTypeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBindingTypeMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BindingTypeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Book Accessories Master
        public async Task<string> InsertUpdateDeleteBookAccessoriesMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@Description", obj.Description),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_BookAcceMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookAccessoriesMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookAcceMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Publisher Master
        public async Task<string> InsertUpdateDeletePublisherMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 5) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@Address1",obj.Address),
                new SqlParameter("@CityId",obj.CityCode),
                new SqlParameter("@StateId",obj.StateCode),
                new SqlParameter("@CountryId",obj.CountryCode),
                new SqlParameter("@Pincode",obj.Pincode),
                new SqlParameter("@PhoneNo",obj.PhoneNo),
                new SqlParameter("@MobileNo",obj.MobileNo),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_PublisherMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetPublisherMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_PublisherMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Book Master
        public async Task<string> InsertUpdateDeleteBookMaster(BookMaster obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 11) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {   new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookName", obj.BooKName),
                new SqlParameter("@Edition", obj.Edition),
                new SqlParameter("@AuthorCode", obj.AuthorCode),
                new SqlParameter("@PublisherCode", obj.PublisherCode),
                new SqlParameter("@SubjectGroupCode", obj.SubjectGrpCode),
                new SqlParameter("@SubjectCode", obj.SubjectCode),
                new SqlParameter("@Topic", obj.Topic),
                new SqlParameter("@Category", obj.CategoryCode),
                new SqlParameter("@Series", obj.Series),
                new SqlParameter("@EditiionType", obj.EditionType),
                new SqlParameter("@PublisherYear", obj.PublisherYear),
                new SqlParameter("@NoOfPages", obj.NoOfPages),
                new SqlParameter("@NoOfCopies", obj.NoOfCopies),
                new SqlParameter("@Cost", obj.Cost),
                new SqlParameter("@BookAccCode", obj.BookAcceCode),
                new SqlParameter("@isebook", obj.isebook),
                new SqlParameter("@CoverPhotoPath", obj.CoverPhotoPath),
                new SqlParameter("@BookPDFPath", obj.BookPDFPath),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookMasterList(BookMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectLibList(BookMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@SubjectGroupCode", obj.SubjectGrpCode),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookAcceNameLibList(BookMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAuthorLibList(BookMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetPublisherLibList(BookMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCategoryLibList(BookMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetEditionTypeLibList(BookMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookMaster]", CommandType.StoredProcedure, param.ToArray()));

        }
        #endregion
        #region Subject Group Master
        public async Task<string> InsertUpdateDeleteLibSubjectGrpMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 5) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@Paper", obj.Paper),
                new SqlParameter("@PrintSeq", obj.PrintSeq),
                new SqlParameter("@BookMasterExcelData", obj.BookMasterExcelData),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_LibSubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLibSubjectGrpMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookMasterExcelData", obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_LibSubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Subject Master
        public async Task<string> InsertUpdateDeleteLibSubjectMaster(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 6) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Name", obj.Name),
                new SqlParameter("@ShortName", obj.ShortName),
                new SqlParameter("@SubjectGroupCode", obj.SubjectGrpCode),
                new SqlParameter("@PrintSeq", obj.PrintSeq),
                new SqlParameter("@BookMasterExcelData", obj.BookMasterExcelData),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_LibSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLibSubjectMasterList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@BookMasterExcelData", obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_LibSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectGrpLibList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_LibSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Book Entry
        public async Task<DataTable> GetVoucherTypeLib(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@V_Type", obj.V_Type),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookEntryHeader]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetVoucherNoLibList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@SubAction", obj.SubAction),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetVenderLib(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookEntryHeader]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookDetailLib(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookEntryHeader]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteBookEntry(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";
            DataTable dtStd = new DataTable();
            DataTable dt = new DataTable();
            //if (obj.Action == 1 || obj.Action == 2)
            //{
            //    dt.Columns.AddRange(new[]{
            //       new DataColumn("SrNo", typeof(int)),
            //       new DataColumn("BookCode", typeof(string)),
            //       new DataColumn("AuthorCode", typeof(string)),
            //       new DataColumn("PublisherCode", typeof(string)),
            //       new DataColumn("Edition", typeof(string)),
            //       new DataColumn("PublisherYear", typeof(string)),
            //       new DataColumn("Price", typeof(string)),
            //       new DataColumn("NoOfPages", typeof(string)),
            //       new DataColumn("NoOfCopy", typeof(string)),
            //       new DataColumn("BookAccCode", typeof(string))}
            //    );
            //    int count = 1;
            //    foreach (BookEntry be in obj.BookEntryList)
            //    {
            //        if (be.BookCode != "")
            //        {
            //            string SrNo = count.ToString();
            //            string BookCode = be.BookCode;
            //            string AuthorCode = be.AuthorCode;
            //            string PublisherCode = be.PublisherCode;
            //            string Edition = be.Edition;
            //            string PublisherYear = be.PublisherYear;
            //            string Price = be.Price;
            //            string NoOfPages = be.NoOfPages;
            //            string NoOfCopy = be.NoOfCopy;
            //            string BookAccCode = be.BookAccCode;
            //            dt.Rows.Add(SrNo, BookCode, AuthorCode, PublisherCode, Edition, PublisherYear, Price, NoOfPages, NoOfCopy, BookAccCode);
            //        }
            //        count += 1;
            //    }
            //}
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@VendorCode", obj.VendorCode),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@BillNo", obj.BillNo),
                new SqlParameter("@BillDate", obj.BillDate),
                new SqlParameter("@BookEntryList",obj.BookEntryList),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_LibBookEntryHeader]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookEntryList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookEntryHeader]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<DataSet> GetBookStockList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("trans.USP_LibBookStock", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteBookStock(BookStock obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@VenderCode", obj.VendorCode),
                new SqlParameter("@BillNo", obj.BillNo),
                new SqlParameter("@BillDate", obj.BillDate),
                new SqlParameter("@DatatableInJson",obj.DataInToJson),
                new SqlParameter("@ExcelData1",obj.BookStockExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_LibBookStock", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetBinLibList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RackCode",obj.RackCode),
                new SqlParameter("@AlmeraCode", obj.AlmeraCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBookStock", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBillDetailLib(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBookStock", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetBillNoList(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBookStock", CommandType.StoredProcedure, param.ToArray()));
        }

        #region Book Issue Entry
        public async Task<string> InsertUpdateDeleteBookIssueEntry(BookIssueEntry obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@MemberType", obj.MemberType),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@BookCode", obj.BookCode),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@EmployeeCode", obj.EmployeeCode),
                new SqlParameter("@AccessionNo", obj.AccessionNo),
                new SqlParameter("@BARID", obj.BARID),
                new SqlParameter("@Remark", obj.Remark),
                new SqlParameter("@BookIssueDays", obj.BookIssueDays),
                new SqlParameter("@ReturnDate", obj.ReturnDate),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_LibBookIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookIssueEntryList(BookIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAccessionIDLib(BookIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AccessionID",obj.AccessionNo),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentListLib(BookIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                //new SqlParameter("@ScholarNumber", obj.ScholarNo),
                new SqlParameter("@StudentId", obj.StudentId),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> SearchEmployees(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@DepartmentId", obj.DepartmentCode),
                new SqlParameter("@DesignationId", obj.DesignationCode),
                new SqlParameter("@EmployeeID", obj.EmployeeId),
                new SqlParameter("@EmployeeCode", obj.EmployeeCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_LibBookIssueEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Book Return Entry
        public async Task<string> InsertUpdateDeleteBookReturnEntry(BookReturnEntry obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@IssueTransID", obj.IssueTransId),
                new SqlParameter("@MemberType", obj.MemberType),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@BookCode", obj.BookCode),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@EmployeeCode", obj.EmployeeCode),
                new SqlParameter("@AccessionNo", obj.AccessionNo),
                new SqlParameter("@BARID", obj.BARID),
                new SqlParameter("@Remark", obj.Remark),
                new SqlParameter("@BookList", obj.BookList),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_LibBookReturnEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookReturnEntryList(BookReturnEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBookReturnEntry", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetAccessionIDIssueList(BookReturnEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AccessionNo", obj.AccessionNo),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBookReturnEntry", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Binding Issue Entry
        public async Task<string> InsertUpdateDeleteBindingIssueEntry(BindingIssueEntry obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";
            //DataTable dtBType = new DataTable();
            //DataTable dt = new DataTable();
            //if (obj.Action == 1 || obj.Action == 2)
            //{
            //    dt.Columns.AddRange(new[]{
            //    new DataColumn("SrNo", typeof(int)),
            //    new DataColumn("BookCode", typeof(string)),
            //    new DataColumn("AccessionNo", typeof(string)),
            //    new DataColumn("BindingTypeCode", typeof(string)),
            //    new DataColumn("Rate", typeof(string))}
            //    );
            //    int count = 1;
            //    foreach (BindingType bd in obj.BD)
            //    {
            //        if (bd.AccessionNo != "")
            //        {
            //            string srno = count.ToString();
            //            string BookCode = bd.BookCode;
            //            string AccessionNo = bd.AccessionNo;
            //            string BindingTypeCode = bd.BindingTypeCode;
            //            string Rate = bd.Rate;
            //            dt.Rows.Add(srno, BookCode, AccessionNo, BindingTypeCode, Rate);
            //        }
            //        count += 1;
            //    }
            //}

            //if (obj.Action == 1 || obj.Action == 2)
            //{
            //    dtBType.Columns.AddRange(new[]{
            //    new DataColumn("SrNo", typeof(int)),
            //    new DataColumn("BindingTypeCode", typeof(string)),
            //    new DataColumn("Rate", typeof(string)),
            //    new DataColumn("TotalQty", typeof(string)),
            //    new DataColumn("TotalAmt", typeof(string))}
            //    );
            //    int count = 1;
            //    foreach (BindingType bt in obj.bindingtype)
            //    {
            //        if (bt.Rate != null)
            //        {
            //            string srno = count.ToString();
            //            string BindingCode = bt.BindingTypeCode;
            //            string BindingRate = bt.Rate;
            //            string BindingQty = bt.TotalQty;
            //            string BindingTotalAmt = bt.TotalAmt;
            //            dtBType.Rows.Add(srno, BindingCode, BindingRate, BindingQty, BindingTotalAmt);
            //        }
            //        count += 1;
            //    }
            //}

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@BinderCode", obj.BinderCode),
                new SqlParameter("@BindingIssueEntryInJson", obj.BindingIssueEntryInJson),
                new SqlParameter("@BindingIssueDetailInJson", obj.BindingIssueDetailInJson),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_LibBindingIssueEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetBindingIssueEntryList(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("trans.USP_LibBindingIssueEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBinderList(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@BinderCode", obj.BinderCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBindingIssueEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAccessionIDList(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AccessionNo", obj.AccessionID),
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBindingIssueEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBindingTypeList(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBindingIssueEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEditAccessionIDList(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBindingIssueEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Binding Return Entry
        public async Task<string> InsertUpdateDeleteBindingReturnEntry(BindingIssueEntry obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";
            //DataTable dtBType = new DataTable();
            //DataTable dt = new DataTable();
            //if (obj.Action == 1 || obj.Action == 2)
            //{
            //    dt.Columns.AddRange(new[]{
            //    new DataColumn("SrNo", typeof(int)),
            //    new DataColumn("BookCode", typeof(string)),
            //    new DataColumn("AccessionNo", typeof(string)),
            //    new DataColumn("BindingTypeCode", typeof(string)),
            //    new DataColumn("Rate", typeof(string)),
            //    new DataColumn("Returns", typeof(string))}
            //    );
            //    int count = 1;
            //    foreach (BindingType bd in obj.BD)
            //    {
            //        if (bd.AccessionNo != "")
            //        {
            //            string srno = count.ToString();
            //            string BookCode = bd.BookCode;
            //            string AccessionNo = bd.AccessionNo;
            //            string BindingTypeCode = bd.BindingTypeCode;
            //            string Rate = bd.Rate;
            //            string ReturnStatus = bd.ReturnStatus;
            //            dt.Rows.Add(srno, BookCode, AccessionNo, BindingTypeCode, Rate, ReturnStatus);
            //        }
            //        count += 1;
            //    }
            //}

            //if (obj.Action == 1 || obj.Action == 2)
            //{
            //    dtBType.Columns.AddRange(new[]{
            //    new DataColumn("SrNo", typeof(int)),
            //    new DataColumn("BindingTypeCode", typeof(string)),
            //    new DataColumn("Rate", typeof(string)),
            //    new DataColumn("TotalQty", typeof(string)),
            //    new DataColumn("TotalAmt", typeof(string))}
            //    );
            //    int count = 1;
            //    foreach (BindingType bt in obj.bindingtype)
            //    {
            //        if (bt.Rate != null)
            //        {
            //            string srno = count.ToString();
            //            string BindingCode = bt.BindingTypeCode;
            //            string BindingRate = bt.Rate;
            //            string BindingQty = bt.TotalQty;
            //            string BindingTotalAmt = bt.TotalAmt;
            //            dtBType.Rows.Add(srno, BindingCode, BindingRate, BindingQty, BindingTotalAmt);
            //        }
            //        count += 1;
            //    }
            //}

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@IssueNo", obj.IssueNo),
                new SqlParameter("@BinderCode", obj.BinderCode),
                new SqlParameter("@BindingIssueEntryInJson", obj.BindingIssueEntryInJson),
                new SqlParameter("@BindingIssueDetailInJson", obj.BindingIssueDetailInJson),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_LibBindingReturnEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetBindingReturnEntryList(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("trans.USP_LibBindingReturnEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetIssueNoList(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@BinderCode", obj.BinderCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibBindingReturnEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetIssueNoDetails(BindingIssueEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("trans.USP_LibBindingReturnEntry", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Write Off Entry
        public async Task<string> InsertUpdateDeleteWriteOffEntry(WriteOffEntry obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@WriteoffDate", obj.WriteOffDate),
                new SqlParameter("@WriteOffType", obj.WriteType),
                new SqlParameter("@BookCode", obj.BookCode),
                new SqlParameter("@AccessionNo", obj.AccessionID),
                new SqlParameter("@BARID", obj.BARID),
                new SqlParameter("@Reason", obj.Resaon),
                new SqlParameter("@Type", obj.Type),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_LibWriteOffEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetWriteOffEntryList(WriteOffEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibWriteOffEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAccessionID(WriteOffEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AccessionNo", obj.AccessionID),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibWriteOffEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetWriteOffType(WriteOffEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),                
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LibWriteOffEntry", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Book Search
        public async Task<DataTable> GetBookSearchList(BookSearch obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@BOBookName", obj.BOBookName),
                new SqlParameter("@BSEdition", obj.BSEdition),
                new SqlParameter("@BSPublisherYear", obj.BSPublisherYear),
                new SqlParameter("@BAName", obj.BAName),
                new SqlParameter("@AUName", obj.AUName),
                new SqlParameter("@PMName", obj.PMName),
                new SqlParameter("@AMName", obj.AMName),
                new SqlParameter("@RMName", obj.RMName),
                new SqlParameter("@BMBin", obj.BMBin),
                new SqlParameter("@PrintCounter", obj.PrintCounter),
                new SqlParameter("@FromAccession", obj.FromAccession),
                new SqlParameter("@ToAccession", obj.ToAccession),
                new SqlParameter("@IssueNo", obj.IssueNo),
                new SqlParameter("@BSAccessionID", obj.BSAccessionID),
                new SqlParameter("@BSISBN", obj.BSISBN),
                new SqlParameter("@BSDDC", obj.BSDDC),
                new SqlParameter("@AccessionID", obj.AccessionID),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SubAction",obj.SubAction),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_LibBookSearch", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetIssueBookList(BookSearch obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@BOBookName", obj.BOBookName),
                new SqlParameter("@BSEdition", obj.BSEdition),
                new SqlParameter("@BSPublisherYear", obj.BSPublisherYear),
                new SqlParameter("@BAName", obj.BAName),
                new SqlParameter("@AUName", obj.AUName),
                new SqlParameter("@PMName", obj.PMName),
                new SqlParameter("@AMName", obj.AMName),
                new SqlParameter("@RMName", obj.RMName),
                new SqlParameter("@BMBin", obj.BMBin),
                new SqlParameter("@IssueNo", obj.IssueNo),
                new SqlParameter("@BSAccessionID", obj.BSAccessionID),
                new SqlParameter("@BSISBN", obj.BSISBN),
                new SqlParameter("@BSDDC", obj.BSDDC),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SubAction",obj.SubAction)
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_LibBookSearch", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetIssueBookDetail(BookSearch obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@BOBookName", obj.BOBookName),
                new SqlParameter("@BSEdition", obj.BSEdition),
                new SqlParameter("@BSPublisherYear", obj.BSPublisherYear),
                new SqlParameter("@BAName", obj.BAName),
                new SqlParameter("@AUName", obj.AUName),
                new SqlParameter("@PMName", obj.PMName),
                 new SqlParameter("@AMName", obj.AMName),
                new SqlParameter("@RMName", obj.RMName),
                new SqlParameter("@BMBin", obj.BMBin),
                new SqlParameter("@IssueNo", obj.IssueNo),
                new SqlParameter("@BSAccessionID", obj.BSAccessionID),
                new SqlParameter("@BSISBN", obj.BSISBN),
                new SqlParameter("@BSDDC", obj.BSDDC),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SubAction",obj.SubAction)
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_LibBookSearch", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Book Issue And Return Report
        public async Task<DataTable> GetBookIssueAndReturnReport(BookSearch obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@EmployeeCode", obj.EmployeeCode),
                new SqlParameter("@AccessionID", obj.AccessionID),
                new SqlParameter("@SubjectCode", obj.SubjectCode),
                new SqlParameter("@BookCode", obj.BookCode),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_LibBookIssueAndReturnReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Late Fine Master
        public async Task<string> InsertUpdateDeleteLateFineMaster(LateFine obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@GracePeriod", obj.GracePeriod),
                new SqlParameter("@FineDay", obj.FineDay),
                new SqlParameter("@FineAmt", obj.FineAmt),
                new SqlParameter("@MaximumIssueDays", obj.MaximumIssueDays),
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_LibLateFineMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLateFineMaster(LateFine obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_LibLateFineMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Accession Setting
        public async Task<string> InsertUpdateDeleteAccessionSetting(BALLibrary obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@Prefix", obj.Prefix),
                new SqlParameter("@Counter", obj.Counter),
                new SqlParameter("@StartNumber", obj.StartNumber),                 
                new SqlParameter("@IsActive", obj.IsActive),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_LibAccessionSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAccessionSetting(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@SnoStart", obj.BinStart),
                new SqlParameter("@SnoEnd", obj.BinEnd),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", ""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_LibAccessionSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<DataSet> GetBookStockListOpening(BALLibrary obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId", obj.TransId),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("trans.USP_LibBookStockOpening", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteBookStockOpening(BookStock obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3 && obj.Action != 9) return "0";
            if (string.IsNullOrEmpty(obj.TransId) && (obj.Action == 3)) return "Please Select Record";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID", obj.TransId),
                new SqlParameter("@V_Date", obj.V_Date),
                new SqlParameter("@VenderCode", obj.VendorCode),
                new SqlParameter("@BillNo", obj.BillNo),
                new SqlParameter("@BillDate", obj.BillDate),
                new SqlParameter("@DatatableInJson",obj.DataInToJson),
                new SqlParameter("@BookMasterExcelData",obj.BookMasterExcelData),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_LibBookStockOpening", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
