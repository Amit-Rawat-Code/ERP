using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region DepartmentMaster
        public async Task<string> InsertUpdateDeleteDepartmentMaster(Department obj)
        {
            if (string.IsNullOrEmpty(obj.DepartmentName) && obj.Action != 3) return "0";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@DepartmentName",obj.DepartmentName),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("gblmaster.USP_DepartmentMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDepartmentMaster(Department obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_DepartmentMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region DesignationMaster
        public async Task<string> InsertUpdateDeleteDesignationMaster(Designation obj)
        {
            if (string.IsNullOrEmpty(obj.DesignationName) && obj.Action != 3) return "0";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@DesignationName",obj.DesignationName),
                new SqlParameter("@DesignationType",obj.DesignationType),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("gblmaster.USP_DesignationMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDesignationMaster(Designation obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",4),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_DesignationMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region GradeMaster
        public async Task<string> InsertUpdateDeleteGradeMaster(Grade obj)
        {
            if (string.IsNullOrEmpty(obj.GradeName) && obj.Action != 3) return "0";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@GradeName",obj.GradeName),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("gblmaster.USP_GradeMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetGradeMaster(Grade obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",4),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_GradeMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Set/Get Employee Data
        public async Task<string> InsertUpdateDeleteEmployeeRegistration(EmployeeDetails obj)
        {
            try
            {
                var param = new List<SqlParameter>
                {
                    #region  //---------Add Employee's Official Details------------------------

                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@EmployeeId",obj.EmployeeId),

                    new SqlParameter("@JoiningDate",obj.JoiningDate),
                    new SqlParameter("@FileNo",obj.FileNo),
                    new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                    new SqlParameter("@DesignationCode",obj.DesignationCode),

                    new SqlParameter("@GradeCode",obj.GradeCode),
                    new SqlParameter("@MachineId",obj.MachineId),

                    new SqlParameter("@Reference",obj.Reference),
                    new SqlParameter("@ReferenceDesignation",obj.ReferenceDesignation),
                    new SqlParameter("@ReferenceContactNo",obj.ReferenceContactNo),
                    new SqlParameter("@ReferenceEmail",obj.ReferenceEmail),

                    new SqlParameter("@IsActive",obj.IsActive),

                    new SqlParameter("@IsResigned",obj.IsResigned),
                    new SqlParameter("@ResignationDate",obj.ResignationDate),
                    new SqlParameter("@ResignationRemak",obj.ResignationRemak),

                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@JobType",obj.JobType),
                    #endregion
                    #region  //---------Add employee's Genral Details------------------------
                    new SqlParameter("@FirstName",obj.FirstName),
                    new SqlParameter("@MiddelName",obj.MiddelName),
                    new SqlParameter("@LastName",obj.LastName),
                    new SqlParameter("@DisplayName",obj.DisplayName),
                    new SqlParameter("@DateofBirth",obj.DateofBirth),
                    new SqlParameter("@Gender",obj.Gender),

                    new SqlParameter("@FatherName",obj.FatherName),
                    new SqlParameter("@MotherName",obj.MotherName),
                    new SqlParameter("@SpouseName",obj.SpouseName),

                    new SqlParameter("@MeritalStatus",obj.MeritalStatus),
                    new SqlParameter("@EmergenceyContactNo",obj.EmergenceyContactNo),
                    new SqlParameter("@Email",obj.Email),
                    new SqlParameter("@ContactNo",obj.ContactNo),
                    new SqlParameter("@AadhaarNo",obj.AadhaarNo),
                    new SqlParameter("@PanCardNo",obj.PanCardNo),

                    new SqlParameter("@DateofAnniversary",obj.DateofAnniversary),
                    new SqlParameter("@PassportNo",obj.PassportNo),
                    new SqlParameter("@DateOfResignation",obj.DateOfResignation),
                    new SqlParameter("@PresentAddress",obj.PresentAddress),
                    new SqlParameter("@PermanentAddress",obj.PermanentAddress),

                    new SqlParameter("@Religion",obj.Religion),
                    new SqlParameter("@Nationality",obj.Nationality),
                    new SqlParameter("@Category",obj.Category),
                    new SqlParameter("@Caste",obj.Caste),

                    new SqlParameter("@Height",obj.Height),
                    new SqlParameter("@Weight",obj.Weight),
                    new SqlParameter("@BloodGroup",obj.BloodGroup),
                    new SqlParameter("@IdentificationMark",obj.IdentificationMark),

                    new SqlParameter("@Hobbies",obj.Hobbies),
                    new SqlParameter("@LanguagesKnown",obj.LanguagesKnown),

                    new SqlParameter("@EmployeePhotoPath",obj.EmployeePhotoPath),
                    new SqlParameter("@Action",obj.Action),

                    new SqlParameter("@LeaveTypeMasterList",obj.LeaveTypeMasterList),

                     new SqlParameter("@EmpAllocation",obj.EmpAllocation),
                     new SqlParameter("@EmpType",obj.EmpType),
                     new SqlParameter("@SpecializationSubject",obj.SpecializationList),
                     new SqlParameter("@EmpKRA",obj.KRAList),
                     new SqlParameter("@LeaveAllotedDate",obj.LeaveAllotedDate),
                    new SqlParameter("@Result","")
                     
                        #endregion
                };
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_EmployeeRegistration", CommandType.StoredProcedure, param.ToArray()));
            }
            catch
            { return "0"; }
        }
        public async Task<DataSet> GetEmployeeList(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@UserTypeId",obj.EmploymentType),
                new SqlParameter("@ExceptEmployeeCode",string.IsNullOrEmpty(obj.ExceptEmployeeCode)?null:obj.ExceptEmployeeCode),
                new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                new SqlParameter("@DesignationType",obj.DesignationType),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@IsResigned",obj.IsResigned)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("mast.USP_EmployeeRegistration", CommandType.StoredProcedure, param.ToArray()), CancellationToken.None, TaskCreationOptions.LongRunning, TaskScheduler.Default);
        }

        #endregion

        #region HO BioMetric Registration Master
        public async Task<string> InsertUpdateDeleteHOBioMetricRegistrationMaster(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@BiometricEmpDetails",obj.BiometricEmpDetails),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("gblmaster.USP_HOEmployee", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetHOBioMetricRegistrationMaster(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_HOEmployee", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Manpower Requisition
        public async Task<string> InsertUpdateDeleteManpowerRequisition(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SubjectDetails",obj.SubjectList),
                new SqlParameter("@QualificationDetails",obj.QualificationList),
                new SqlParameter("@OtherQualificationList",obj.OtherQualificationList),
                new SqlParameter("@RequisitionNo",obj.RequisitionNo),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@EmployeeTypeCode",obj.EmpType),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                new SqlParameter("@DesignationCode",obj.DesignationCode),
                new SqlParameter("@GradeCode",obj.GradeCode),
                new SqlParameter("@Gender",obj.Gender),
                new SqlParameter("@ApproxCTCFrom",obj.ApproxCTCFrom),
                new SqlParameter("@ApproxCTCTo",obj.ApproxCTCTo),
                new SqlParameter("@AgeLimitFrom",obj.AgeLimitFrom),
                new SqlParameter("@AgeLimitTo",obj.AgeLimitTo),
                new SqlParameter("@JobType",obj.JobType),
                new SqlParameter("@ApprovalStatus",obj.ApprovalStatus),
                new SqlParameter("@PositionFilledDate",obj.PositionFilledDate),
                new SqlParameter("@NoOfVacancies",obj.NoOfVacancies),
                new SqlParameter("@RequiredExperienceFrom",obj.RequiredExperienceFrom),
                new SqlParameter("@RequiredExperienceTo",obj.RequiredExperienceTo),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_ManpowerRequisition]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetManpowerRequisition(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_ManpowerRequisition]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Job Posting
        public async Task<string> InsertUpdateDeleteJobPosting(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@OtherQualificationList",obj.OtherQualificationList),
                new SqlParameter("@QualificationList",obj.QualificationList),
                new SqlParameter("@RequisitionNo",obj.RequisitionNo),
                new SqlParameter("@AssociatedBranchCode",obj.BranchCode),
                new SqlParameter("@AssociatedBranchCodesLists",obj.AssociatedBranchCodesLists),
                new SqlParameter("@EmpType",obj.EmpType),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@DepartmentCode",obj.DepartmentCode),
                new SqlParameter("@JobTitle",obj.JobTitle),
                new SqlParameter("@EmploymentType",obj.EmploymentType),
                new SqlParameter("@RequiredExperienceFrom",obj.RequiredExperienceFrom),
                new SqlParameter("@RequiredExperienceTo",obj.RequiredExperienceTo),
                new SqlParameter("@ApproxCTCFrom",obj.ApproxCTCFrom),
                new SqlParameter("@ApproxCTCTo",obj.ApproxCTCTo),
                new SqlParameter("@AgeLimitFrom",obj.AgeLimitFrom),
                new SqlParameter("@AgeLimitTo",obj.AgeLimitTo),
                new SqlParameter("@JobDescription",obj.JobDescription),
                new SqlParameter("@Status",obj.Status),
                new SqlParameter("@PublishVacancyDate",obj.PublishVacancyDate),
                new SqlParameter("@PublishVacancyTillDate",obj.PublishVacancyTillDate),
                new SqlParameter("@NoOfVacancies",obj.NoOfVacancies),
                new SqlParameter("@JobPostingMedium",obj.JobPostingMedium),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_JobPosting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetJobPosting(EmployeeDetails obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RequisitionNo",obj.RequisitionNo),
                new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_JobPosting]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region NEW KRA Master
        public async Task<string> InsertUpdateDeleteNEWKRAMaster(KRA obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@KRAName",obj.KRAName),
                new SqlParameter("@KRADetail",obj.KRADetailsList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteKRAMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetKRA(KRA obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetKRAMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        //public async Task<DataSet> GetEmployeeList(string employeeCode, string action,string sessionId, string isResigned, string schoolcode = "-1", string branchcode = "-1")
        //{
        //    var param = new List<SqlParameter>
        //    {
        //        new SqlParameter("@Action",action),
        //        new SqlParameter("@EmployeeCode",employeeCode),
        //        new SqlParameter("@SchoolCode",schoolcode),
        //        new SqlParameter("@BranchCode",branchcode),
        //        new SqlParameter("@SessionId",sessionId),
        //        new SqlParameter("@IsResigned",isResigned)
        //    };

        //    return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand_UsingdataSet("Emp.USP_EmployeeRegistration", CommandType.StoredProcedure, param.ToArray()), CancellationToken.None, TaskCreationOptions.LongRunning, TaskScheduler.Default);
        //}




        //#endregion

        //public async Task<DataTable> GetEmployeeCount(BranchAuthorization obj)
        //{
        //    var param = new List<SqlParameter>
        //    {
        //        new SqlParameter("@SchoolCode",obj.SchoolCode),
        //        new SqlParameter("@BranchCode",obj.BranchCode),
        //        new SqlParameter("@SessionId",obj.SessionId),
        //        new SqlParameter("@Action",obj.Action)
        //    };

        //    return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Emp.USP_GetEmployeeList", CommandType.StoredProcedure, param.ToArray()));
        //}

        //public async Task<DataTable> EmployeeBirthDayReminderAdminPanel(EmployeeBirthDayReminder obj)
        //{
        //    var param = new List<SqlParameter>
        //    {
        //        new SqlParameter("@DOBOF",obj.DOBOF),
        //        new SqlParameter("@SchoolCode",obj.SchoolCode),
        //        new SqlParameter("@BranchCode",obj.BranchCode),
        //        new SqlParameter("@SessionId",obj.SessionId)

        //    };

        //    return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Emp.USP_EmployeeBirthDayReminder", CommandType.StoredProcedure, param.ToArray()));
        //}
    }
}
