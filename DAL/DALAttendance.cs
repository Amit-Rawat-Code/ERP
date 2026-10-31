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
        #region Leave Master     
        public async Task<string> InsertUpdateDeleteLeaveTypeMaster(EmpAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@AbbrTypeId",obj.AbbrTypeId),
                new SqlParameter("@TotalLeaves",obj.TotalLeaves),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@CalculationType",obj.CalculationType),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_LeaveTypeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetLeaveTypeMaster(EmpAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_LeaveTypeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Master Abbreviation     
        public async Task<string> InsertUpdateDeleteAbbreviationMaster(EmpAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Name",obj.Name),
                new SqlParameter("@Abbreviation",obj.Abbreviation),
                new SqlParameter("@AbbrTypeId",obj.AbbrTypeId),
                new SqlParameter("@LeaveWeight",obj.AbbreviationWeight),
                new SqlParameter("@GroupOfDay",obj.GroupAbbreviation),
                new SqlParameter("@Deduction",obj.DeductionDays),
                new SqlParameter("@ValueType",obj.Valuetype),
                new SqlParameter("@Remarks",obj.Remarks),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_AbbreviationMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAbbreviationMaster(EmpAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId)

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AbbreviationMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Employee Attendance Leave Master    
        public async Task<string> InsertUpdateDeleteEmployeeLeaveApplication(EmployeeLeave obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@LeaveTypeCode",obj.LeaveTypeCode),
                new SqlParameter("@DesignationCode",obj.DesignationCode),
                new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                new SqlParameter("@VoucherDate",obj.VDate),
                new SqlParameter("@LeaveFrom",obj.LeaveFrom),
                new SqlParameter("@LeaveTo",obj.LeaveTo),
                new SqlParameter("@LeaveReason",obj.LeaveReason),
                new SqlParameter("@Remarks",obj.Remarks),
                new SqlParameter("@LeaveFor",obj.LeaveFor),
                new SqlParameter("@CommunicationPrefferedMode",obj.CommunicationPrefferedMode),
                new SqlParameter("@OnLeaveContactNo",obj.OnLeaveContactNo),
                new SqlParameter("@OnLeaveAddress",obj.OnLeaveAddress),
                new SqlParameter("@IsLeaveRecieved",obj.IsLeaveRecieved),
                new SqlParameter("@IsApproved",obj.IsApproved),
                new SqlParameter("@InAbsenceResponsibleEmployeeId",obj.InAbsenceResponsibleEmployeeId),
                new SqlParameter("@ApprovedFrom", obj.ApprovedFrom),
                new SqlParameter("@ApprovedTo",obj.ApprovedTo),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@ApprovedBy",obj.ApprovedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ApprovedByEmployeCode",obj.ApprovedByEmployeCode),
                new SqlParameter("@LeaveApprovalStatusByDates",obj.LeaveApprovalStatusByDates),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_EmployeeLeaveApplication", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> EmployeeAttendanceLeaveMasterList(EmployeeLeave obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@ApprovedFrom", (obj.ApprovedFrom == null) ? null : Convert.ToDateTime(obj.ApprovedFrom).ToString("yyyy-MM-dd")),
                new SqlParameter("@ApprovedTo",(obj.ApprovedTo == null) ? null : Convert.ToDateTime(obj.ApprovedTo).ToString("yyyy-MM-dd")),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@LeaveFrom",obj.LeaveFrom),
                new SqlParameter("@LeaveTo",obj.LeaveTo),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_EmployeeLeaveApplication", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Employee Attendance Date Wise  
        public async Task<string> InsertUpdateDeleteEmployeeAttendanceDateWise(EmployeeAttendance obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@EmployeeAttendanceLists",obj.EmployeeAttendanceLists),
                    new SqlParameter("@AttendanceDate",obj.AttendanceDate),
                    new SqlParameter("@AbbreviationCode",obj.AbbreviationCode),
                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@TransId",obj.TransID),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@IsAttendanceLock",obj.IsAttendanceLock),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_EmployeeAttendanceDateWise", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> EmployeeAttendanceDateWiseList(EmployeeAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@EmployeeCode",obj.Code),
                new SqlParameter("@Month",obj.Month),
                new SqlParameter("@Year",obj.Year),
                new SqlParameter("@AttendanceDate",obj.VDate),
                new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_EmployeeAttendanceDateWise", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> EmployeeAttendanceForReport(EmpAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@LeaveGroup",obj.AbbrTypeId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                new SqlParameter("@DesignationCode",obj.DepartmentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),

            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_EmployeeAttendanceDateWise", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Leave Approval By Level   
        public async Task<string> InsertUpdateDeleteLeaveApprovalByLevel(LeaveApprovalByLevel obj)
        {
            var param = new List<SqlParameter>
                {
                   new SqlParameter("@TransId",obj.TransID),
                   new SqlParameter("@DateOfApplicable",obj.DateOfApplicable),
                   new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                   new SqlParameter("@TypeOfApproval",obj.TypeOfApproval),
                   new SqlParameter("@FirstApprovalAuthority",obj.FirstApprovalAuthority),
                   new SqlParameter("@SeconedApprovalAuthority",obj.SeconedApprovalAuthority),
                   new SqlParameter("@RelationshipId",obj.RelationshipId),
                   new SqlParameter("@FYId",obj.FYId),
                   new SqlParameter("@SessionId",obj.SessionId),
                   new SqlParameter("@CreatedBy",obj.CreatedBy),
                   new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                   new SqlParameter("@Action",obj.Action),
                   new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_LeaveApprovalByLevel", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetLevelApprovalByLevel(LeaveApprovalByLevel obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_LeaveApprovalByLevel", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Student Attendance Date Wise  
        public async Task<string> InsertEditStudentAttendanceDateWise(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@InsertStudentAttendance",obj.StudentList),
                    new SqlParameter("@AttendanceDate",obj.AttendanceDate),
                    new SqlParameter("@TransId",obj.TransID),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@StreamCode",obj.StreamCode),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@Action",obj.Action),                    
                    //new SqlParameter("@Mode",obj.Mode),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_StudentAttendanceDateWise", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetStudentAttendanceDateWiseList(StudentAttendance obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_StudentAttendanceDateWise", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Student Attendance Subject Wise  
        public async Task<string> InsertEditStudentAttendanceSubjectWise(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@InsertStudentAttendance",obj.StudentList),
                    new SqlParameter("@AttendanceDate",obj.AttendanceDate),
                    new SqlParameter("@TransId",obj.TransID),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@SubjectCode",obj.Subject),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@StreamCode",obj.StreamCode),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@PeriodCode",obj.PeriodCode),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_StudentAttendanceSubjectWise", CommandType.StoredProcedure, param.ToArray()));

        }
        public async Task<DataTable> GetStudentAttendanceSubjectWiseList(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@SubjectCode",obj.Subject),
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_StudentAttendanceSubjectWise", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Employee Attendance Report
        public async Task<DataTable> GetEmployeeAttandanceDateWiseReport(BALEmployeeAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@LeaveGroup",obj.AbbrTypeId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_EmployeeAttendanceDateWiseReport]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetEmployeeAttandanceMonthWiseReport(BALEmployeeAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@DepartmentCode",obj.DepartmentId),
                new SqlParameter("@DesignationCode",obj.DesignationId),
                new SqlParameter("@EmployeeCode",obj.EmployeeId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_EmployeeAttendanceDateWiseReport]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetEmployeeAttandanceMonthlyReport(BALEmployeeAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@DepartmentCode",obj.DepartmentId),
                new SqlParameter("@DesignationCode",obj.DesignationId),
                new SqlParameter("@EmployeeCode",obj.EmployeeId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_EmployeeAttendanceMonthlyReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEmployeeAttandanceMonthlyInAndOut(BALEmployeeAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@DepartmentCode",obj.DepartmentId),
                new SqlParameter("@EmployeeCode",obj.EmployeeId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_EmployeeAttendanceMonthlyInOut]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetPunchLogEmployeeAttandance(BALEmployeeAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),   
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_PunchLog_EmployeeAttendance]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Student Attendance Report
        public async Task<DataTable> GetStudentAttandanceDateWiseReport(BALStudentAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@LeaveGroup",obj.AbbrTypeId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_StudentAttendanceDateWise]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetStudentEnquiryReport(BALStudentEnquiryReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@Enquiry",obj.Category),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_StudentEnquiryStatics]", CommandType.StoredProcedure, param.ToArray()));
        }


        #endregion

        #region Employee Leave Status
        public async Task<DataTable> GetEmployeeLeaveStatus(BALEmployeeLeaveStatusReport obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                new SqlParameter("@DesignationCode",obj.DesignationCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_EmployeeLeaveStatus]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region BioMatric Thums Details
        public async Task<string> InsertUpdateDeleteThumbs(LeaveApprovalByLevel obj)
        {
            var param = new List<SqlParameter>
                {
                   new SqlParameter("@TransId",obj.TransID),
                   new SqlParameter("@EmployeeCode",obj.EmployeeCode),                   
                   new SqlParameter("@Action",2),
                   new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[dbo].[USP_GetScreenAttendanceDisplay]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEmployeeDetailsThumbs(LeaveApprovalByLevel obj)
        {
            var param = new List<SqlParameter>
            {
                   new SqlParameter("@TransId",obj.TransID),
                   new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                   new SqlParameter("@Action",1),
                   new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_GetScreenAttendanceDisplay]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<DataTable> GetStudentAttandanceMonthlyReport(BALStudentAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_StudentAttendanceMonthlyReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentDataForRollNumber(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@OrderBy",obj.OrderBy),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AssignStudentRollNumber]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteStudentRollNumber(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@StudentList",obj.StudentList),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_AssignStudentRollNumber]", CommandType.StoredProcedure, param.ToArray()));

        }

        #region Student Exam Attendance Entry 
        public async Task<DataTable> GetStudentAttendanceEntryList(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@TermGroupCode",obj.GroupCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@WorkingDaysCount",obj.WorkingDaysCount),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GET_StudentAttendanceEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteStudentAttendanceEntry(StudentAttendance obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@TransId",obj.TransID),
                    new SqlParameter("@VDate",obj.VDate),
                    new SqlParameter("@VType",obj.VType),
                    new SqlParameter("@PVNo",obj.PVNo),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@TermGroupCode",obj.GroupCode),
                    new SqlParameter("@ExamCode",obj.ExamCode),
                    new SqlParameter("@FromDate",obj.FromDate),
                    new SqlParameter("@ToDate",obj.ToDate),
                    new SqlParameter("@WorkingDaysCount",obj.WorkingDaysCount),
                    new SqlParameter("@StudentAttendanceEntryLists",obj.StudentAttendanceEntryLists),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteStudentAttendanceEntry]", CommandType.StoredProcedure, param.ToArray()));

        }
        #endregion

        #region HO Employee In And Out Report
        public async Task<DataTable> GetHOEmployeeInAndOut(BALEmployeeAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@DepartmentCode",obj.DepartmentId),
                new SqlParameter("@EmployeeCode",obj.EmployeeId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_HO_EmployeeInOut]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Get All Website Carrier Enquiry Details
        public async Task<DataTable> GetAllWebsiteCarrierEnquiryDetails(BALEmployeeAttendanceDateWiseReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetWebsiteCarrierEnquires", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
    }
}