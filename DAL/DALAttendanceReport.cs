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
        #region Student Attendance Report Class and Date Wise Count
        public async Task<DataTable> GetStudentAttendanceClassDateWiseList(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@Year",obj.Year),
                new SqlParameter("@Month",obj.Month),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@AttendanceDate",obj.AttendanceDate),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),

            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_StudentAttendanceClassDateWise", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Employee Attendance Report Class and Date Wise Count
        public async Task<DataTable> GetEmployeeAttendanceCountDateWise(EmployeeAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@AttendanceDate",obj.@AttendanceDate),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@EmploymentType",obj.EmploymentType),
                new SqlParameter("@RelationshipId",obj.RelationshipId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[EmployeeAttendanceDateWiseCount]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}
