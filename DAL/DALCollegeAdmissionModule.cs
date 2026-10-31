using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
    public partial class DLL
    {
        #region College Admission Form Details
        public async Task<DataTable> GetStudentDetails(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@AdmissionSourceType",obj.AdmissionSourceType),
                new SqlParameter("@SearchBox",obj.SearchBox),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@MotherName",obj.MotherName),
                new SqlParameter("@FatherMobileNo",obj.FatherMobile),
                new SqlParameter("@AddOther",obj.AnyOther),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SelectedForBranch",obj.BranchCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeAdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteCollegeAdmissionFormDetails(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>

               {    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@StudentID",obj.StudentID),

                    new SqlParameter("@EnquiryTypeCode",obj.EnquiryTypeCode),
                    new SqlParameter("@EnquirySearch",obj.EnquirySearch),
                    new SqlParameter("@EnquiryTransId",obj.EnquiryTransId),

                    new SqlParameter("@RegistrationFormNo",obj.RegNo),
                    new SqlParameter("@AdmissionFormNo",obj.AdmissionFormNo),
                    new SqlParameter("@DateOfAdmission",Convert.ToDateTime(obj.DateOfAdmission).ToString("yyyy-MM-dd")),
                    new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                    new SqlParameter("@CourseCode",obj.CourseCode),
                    new SqlParameter("@SemesterCode",obj.SemesterCode),
                    new SqlParameter("@AdmissionMode",obj.AdmissionMode),
                    new SqlParameter("@LaternalEntry",obj.LaternalEntry),
                    new SqlParameter("@AdmissionThrough",obj.AdmissionThrough),
                    new SqlParameter("@EnquirySourceCode",obj.EnquirySourceCode),
                    new SqlParameter("@ReferenceOf",obj.ReferenceOf),
                    new SqlParameter("@BranchPreference1",obj.BranchPreference1),
                    new SqlParameter("@BranchPreference2",obj.BranchPreference2),
                    new SqlParameter("@BranchPreference3",obj.BranchPreference3),
                    new SqlParameter("@BranchPreference4",obj.BranchPreference4),
                    new SqlParameter("@BranchPreference5",obj.BranchPreference5),
                    new SqlParameter("@BranchPreference6",obj.BranchPreference6),
                    new SqlParameter("@Initials",obj.Initials),
                    new SqlParameter("@Gender",obj.Gender),
                    new SqlParameter("@IsPhyDisable",obj.IsPhyDisable),
                    new SqlParameter("@DisabilityDetails",obj.DisabilityDetails),
                    new SqlParameter("@BloodGroup",obj.BloodGroup),

                    new SqlParameter("@StudentFirstName",obj.FirstName),
                    new SqlParameter("@StudentMiddleName",obj.MiddleName),
                    new SqlParameter("@StudentLastName",obj.LastName),
                    new SqlParameter("@StudentMobileNo",obj.StudentMobileNo),
                    new SqlParameter("@StudentEmailid",obj.StudentEmail),
                    new SqlParameter("@Hostel",obj.Hostel),
                    new SqlParameter("@Transport",obj.Transport),
                    new SqlParameter("@EducationLoan",obj.EducationLoan),
                    new SqlParameter("@EducationLoanLocation",obj.EducationLoanLocation),
                    new SqlParameter("@StudentPhoto",obj.StudentPhoto),
                    new SqlParameter("@StudentSign",obj.StudentSign),
                    new SqlParameter("@Curr_Address1",obj.Curr_Address1),
                    new SqlParameter("@Curr_Address2",obj.Curr_Address2),
                    new SqlParameter("@Curr_Address3",obj.Curr_Address3),
                    new SqlParameter("@Curr_CountryCode",obj.Curr_CountryCode),
                    new SqlParameter("@Curr_StateCode",obj.Curr_StateCode),
                    new SqlParameter("@Curr_CityCode",obj.Curr_CityCode),
                    new SqlParameter("@Curr_PinCode",obj.Curr_PinCode),
                    new SqlParameter("@IsAddressSame",obj.IsAddressSame),
                    new SqlParameter("@Per_Address1",obj.Per_Address1),
                    new SqlParameter("@Per_Address2",obj.Per_Address2),
                    new SqlParameter("@Per_Address3",obj.Per_Address3),
                    new SqlParameter("@Per_CountryCode",obj.Per_CountryCode),
                    new SqlParameter("@Per_StateCode",obj.Per_StateCode),
                    new SqlParameter("@Per_CityCode",obj.Per_CityCode),
                    new SqlParameter("@Per_PinCode",obj.Per_PinCode),
                    new SqlParameter("@Religion",obj.Religion),
                    new SqlParameter("@DOB",obj.DOB),
                    new SqlParameter("@StudentAlternativeMobileNo",obj.StudentAlternativeMobileNo),
                    new SqlParameter("@StudentAlternativeEmailid",obj.StudentAlternativeEmailid),

                    new SqlParameter("@IsVerified",obj.IsVerified),

                    new SqlParameter("@FatherName",obj.FatherName),
                    new SqlParameter("@FatherMobileNo",obj.FatherMobile),
                    new SqlParameter("@FatherOccupation",obj.FatherOccupation),
                    new SqlParameter("@FatherPhoto",obj.FatherPhoto),
                    new SqlParameter("@FatherSign",obj.FatherSign),

                    new SqlParameter("@MotherMobileNo",obj.MotherMobile),
                    new SqlParameter("@MotherName",obj.MotherName),
                    new SqlParameter("@MotherPhoto",obj.MotherPhoto),
                    new SqlParameter("@MotherSign",obj.MotherSign),

                    new SqlParameter("@GrandFatherName",obj.GrandFatherName),

                    new SqlParameter("@LocalGuardianName",obj.GuardianName),
                    new SqlParameter("@LocalGuardianMobileNo",obj.GuardianMobile),
                    new SqlParameter("@LocalGuardianPhoto",obj.LocalGuardianPhoto),
                    new SqlParameter("@LocalGuardianSign",obj.LocalGuardianSign),

                    new SqlParameter("@AdmissionCode",obj.AdmissionCode),

                    new SqlParameter("@CasteCategory",obj.CasteCategory),
                    new SqlParameter("@SubCasteCategory",obj.SubCasteCategory),
                    new SqlParameter("@CasteCertificateNo",obj.CasteCertificateNo),
                    new SqlParameter("@CasteDateOfIssue",obj.CasteDateOfIssue),

                    new SqlParameter("@DomicileCertificateNo",obj.DomicileCertificateNo),
                    new SqlParameter("@DomicileDateOfIssue",obj.DomicileDateOfIssue),
                    new SqlParameter("@IncomeCertificateNo",obj.IncomeCertificateNo),
                    new SqlParameter("@IncomeDateOfIssue",obj.IncomeDateOfIssue),

                    new SqlParameter("@TransferCertificateNo",obj.TransferCertificateNo),
                    new SqlParameter("@TransferDateOfIssue",obj.TransferDateOfIssue),
                    new SqlParameter("@AADHAARNo",obj.AADHAARNo),
                    new SqlParameter("@AnnualIncome",obj.AnnualIncome),

                    new SqlParameter("@BankName",obj.BankName),
                    new SqlParameter("@BranchName",obj.BranchName),
                    new SqlParameter("@AccountNo",obj.AccountNo),
                    new SqlParameter("@IFSCCode",obj.IFSCCode),
                    new SqlParameter("@InstructionMedium",obj.InstructionMedium),
                    new SqlParameter("@EducationalQualification",obj.EducationalQualification),

                    new SqlParameter("@QualifyingExam",obj.QualifyingExam),
                    new SqlParameter("@Status",obj.Status),
                    new SqlParameter("@Rollno",obj.Rollno),
                    new SqlParameter("@MarksObtained",obj.MarksObtained),
                    new SqlParameter("@MaxMarks",obj.MaxMarks),

                    new SqlParameter("@MathsObtMarks",obj.MathsObtMarks),
                    new SqlParameter("@MathsMaxMarks",obj.MathsMaxMarks),
                    new SqlParameter("@PhysicsObtMarks",obj.PhysicsObtMarks),
                    new SqlParameter("@PhysicsMaxMarks",obj.PhysicsMaxMarks),
                    new SqlParameter("@CheObtMarks",obj.CheObtMarks),
                    new SqlParameter("@CheMaxMarks",obj.CheMaxMarks),
                    new SqlParameter("@CsObtMarks",obj.CsObtMarks),
                    new SqlParameter("@CsMaxMarks",obj.CsMaxMarks),
                    new SqlParameter("@BioObtMarks",obj.BioObtMarks),
                    new SqlParameter("@BioMaxMarks",obj.BioMaxMarks),
                    new SqlParameter("@EngObtMarks",obj.EngObtMarks),
                    new SqlParameter("@EngMaxMarks",obj.EngMaxMarks),
                    new SqlParameter("@Aggregate",obj.Aggregate),
                    new SqlParameter("@Percentage",obj.Percentage),
                    new SqlParameter("@Remarks",obj.Remarks),

                    new SqlParameter("@SiblingList",obj.SiblingList),

                    new SqlParameter("@MedicalFitnessCertifiCate",obj.MedicalFitnessCertifiCate),
                    new SqlParameter("@PremedicalDetail",obj.PremedicalDetail),
                    new SqlParameter("@ContactPersonName",obj.ContactPersonName),
                    new SqlParameter("@MobileNo",obj.MobileNo),
                    new SqlParameter("@SelectedForBranch",obj.SelectedForBranch),

                    new SqlParameter("@CompetitiveExamList",obj.CompetitiveExamList),

                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@Result",""),


                };

            //return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeStudentAdmissionDetails]", CommandType.StoredProcedure, param.ToArray()));
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeAdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetCollegeAdmissionFormDetailList(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@StudentID",obj.StudentId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeAdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion


        #region College Document Details
        public async Task<DataTable> GetCollegeDocumentDetail(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@DocumentCode",obj.DocumentCode),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@CourseName",obj.CourseName),
                new SqlParameter("@RollNo",obj.RollNo),
                new SqlParameter("@Gender",obj.Gender),
                new SqlParameter("@CasteCategory",obj.CasteCategory),
                new SqlParameter("@ContactNo",obj.MobileNo),
                new SqlParameter("@YearlyIncoome",obj.AnnualIncome),
                new SqlParameter("@IsSamajKalyan",obj.IsSamajKalyan),
                new SqlParameter("@PRGenObc",obj.PRGenObc),
                new SqlParameter("@FeeWaiveOff",obj.FeeWaiveOff),
                new SqlParameter("@Domicile",obj.DomicileCertificateNo),
                new SqlParameter("@DocumentPath",obj.DocumentPath),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeDocumentDetails]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteCollegeDocumentDetail(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@DocumentCode",obj.DocumentCode),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@CourseName",obj.CourseName),
                new SqlParameter("@RollNo",obj.RollNo),
                new SqlParameter("@Gender",obj.Gender),
                new SqlParameter("@CasteCategory",obj.CasteCategory),
                new SqlParameter("@ContactNo",obj.MobileNo),
                new SqlParameter("@YearlyIncoome",obj.AnnualIncome),
                new SqlParameter("@IsSamajKalyan",obj.IsSamajKalyan),
                new SqlParameter("@PRGenObc",obj.PRGenObc),
                new SqlParameter("@FeeWaiveOff",obj.FeeWaiveOff),
                new SqlParameter("@Domicile",obj.DomicileCertificateNo),
                new SqlParameter("@DocumentsPath",obj.DocumentsPath),
                new SqlParameter("@DocumentPath",obj.DocumentPath),
                new SqlParameter("@SubAction",obj.SubAction),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeDocumentDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region College Admission Report
        public async Task<DataTable> GetCollegeAdmissionReport(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SelectedForBranch",obj.SelectedForBranch),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@AdmissionThrough",obj.AdmissionThrough),
                new SqlParameter("@EnquirySourceCode",obj.EnquirySourceCode),
                new SqlParameter("@ReferenceList",obj.ReferenceList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Action",obj.Action),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_CollegeAdmissionFormReport]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetCollegeAdmissionReportList(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SelectedForBranch",obj.SelectedForBranch),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Action",obj.Action),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[rpt].[USP_CollegeAdmissionFormReport]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
    }
}