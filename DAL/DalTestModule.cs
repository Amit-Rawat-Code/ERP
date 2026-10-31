using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Data;
using System.Data.SqlClient;
using BAL;

namespace DAL
{
    public partial class DLL
    {
        public async Task<string> InsertUpdateDeleteTestTable(RearrangeTestTablePeriod obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
            // if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@GotInput",obj.GotInput),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@Result","")
                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_TestTable", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetTestTableManualList(RearrangeTestTablePeriod obj)
        {
            var param = new List<SqlParameter>
                    {
                        new SqlParameter("@Action",obj.Action),
                        new SqlParameter("@Code",obj.Code),
                        new SqlParameter("@RelationshipId",obj.RelationshipId),
                        new SqlParameter("@SessionId",obj.SessionId),
                        new SqlParameter("@ClassCode",obj.ClassCode),
                        new SqlParameter("@SectionCode",obj.SectionCode),
                        new SqlParameter("@BranchCode",obj.BranchCode)
                    };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("dbo.USP_TestTable", CommandType.StoredProcedure, param.ToArray()));
        }
    }    
}
