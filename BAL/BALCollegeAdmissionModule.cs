using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
namespace BAL
{
    public class BALCollegeAddmission : Common
    {
        [DataMember] public string EnquiryTypeCode { get; set; }
        [DataMember] public string EnquirySearch { get; set; }
        [DataMember] public string EnquiryTransId { get; set; }
        [DataMember] public string RegistrationFormNo { get; set; }
        [DataMember] public string AdmissionFormNo { get; set; }
        [DataMember] public string CourseCode { get; set; }
        [DataMember] public string SemesterCode { get; set; }
        [DataMember] public string AdmissionMode { get; set; }
        [DataMember] public bool LaternalEntry { get; set; }
        [DataMember] public string AdmissionThrough { get; set; }
        [DataMember] public string EnquirySourceCode { get; set; }
        [DataMember] public string ReferenceOf { get; set; }
        [DataMember] public string BranchPreference1 { get; set; }
        [DataMember] public string BranchPreference2 { get; set; }
        [DataMember] public string BranchPreference3 { get; set; }
        [DataMember] public string BranchPreference4 { get; set; }
        [DataMember] public string BranchPreference5 { get; set; }
        [DataMember] public string BranchPreference6 { get; set; }
        [DataMember] public string Initials { get; set; }
        [DataMember] public bool IsPhyDisable { get; set; }
        [DataMember] public string DisabilityDetails { get; set; }



        //Student
        [DataMember] public string StudentMobileNo { get; set; }
        [DataMember] public bool Hostel { get; set; }
        [DataMember] public bool Transport { get; set; }
        [DataMember] public bool EducationLoan { get; set; }
        [DataMember] public string EducationLoanLocation { get; set; }


        [DataMember] public string Curr_Address1 { get; set; }
        [DataMember] public string Curr_Address2 { get; set; }
        [DataMember] public string Curr_Address3 { get; set; }
        [DataMember] public string Curr_CountryCode { get; set; }
        [DataMember] public string Curr_StateCode { get; set; }
        [DataMember] public string Curr_CityCode { get; set; }
        [DataMember] public string Curr_PinCode { get; set; }
        [DataMember] public bool IsAddressSame { get; set; }
        [DataMember] public string Per_Address1 { get; set; }
        [DataMember] public string Per_Address2 { get; set; }
        [DataMember] public string Per_Address3 { get; set; }
        [DataMember] public string Per_CountryCode { get; set; }
        [DataMember] public string Per_StateCode { get; set; }
        [DataMember] public string Per_CityCode { get; set; }
        [DataMember] public string Per_PinCode { get; set; }
        [DataMember] public string StudentAlternativeMobileNo { get; set; }
        [DataMember] public string StudentAlternativeEmailid { get; set; }

        [DataMember] public bool IsVerified { get; set; }

        [DataMember] public string FatherOccupation { get; set; }

        [DataMember] public string GrandFatherName { get; set; }

        [DataMember] public string StudentPhoto { get; set; }
        [DataMember] public string StudentSign { get; set; }
        [DataMember] public string FatherPhoto { get; set; }
        [DataMember] public string FatherSign { get; set; }
        [DataMember] public string MotherPhoto { get; set; }
        [DataMember] public string MotherSign { get; set; }
        [DataMember] public string LocalGuardianPhoto { get; set; }
        [DataMember] public string LocalGuardianSign { get; set; }

        [DataMember] public string uploadedfiles { get; set; }



        [DataMember] public string AdmissionCode { get; set; }
        [DataMember] public string CasteCategory { get; set; }
        [DataMember] public string SubCasteCategory { get; set; }
        [DataMember] public string CasteCertificateNo { get; set; }
        [DataMember] public string CasteDateOfIssue { get; set; }
        [DataMember] public string DomicileCertificateNo { get; set; }
        [DataMember] public string DomicileDateOfIssue { get; set; }
        [DataMember] public string IncomeCertificateNo { get; set; }
        [DataMember] public string IncomeDateOfIssue { get; set; }
        [DataMember] public string TransferCertificateNo { get; set; }
        [DataMember] public string TransferDateOfIssue { get; set; }
        [DataMember] public string AADHAARNo { get; set; }

        [DataMember] public string AnnualIncome { get; set; }
        [DataMember] public string BankName { get; set; }
        [DataMember] public string BranchName { get; set; }
        [DataMember] public string AccountNo { get; set; }

        [DataMember] public string IFSCCode { get; set; }
        [DataMember] public string InstructionMedium { get; set; }
        [DataMember] public string EducationalQualification { get; set; }

        [DataMember]
        public string QualifyingExam { get; set; }
        [DataMember] public string Status { get; set; }
        [DataMember] public string Rollno { get; set; }
        [DataMember] public string MarksObtained { get; set; }
        [DataMember] public string MaxMarks { get; set; }

        [DataMember] public string MathsObtMarks { get; set; }
        [DataMember] public string MathsMaxMarks { get; set; }
        [DataMember] public string PhysicsObtMarks { get; set; }
        [DataMember] public string PhysicsMaxMarks { get; set; }
        [DataMember] public string CheObtMarks { get; set; }
        [DataMember] public string CheMaxMarks { get; set; }
        [DataMember] public string CsObtMarks { get; set; }
        [DataMember] public string CsMaxMarks { get; set; }
        [DataMember] public string BioObtMarks { get; set; }
        [DataMember] public string BioMaxMarks { get; set; }
        [DataMember] public string EngObtMarks { get; set; }
        [DataMember] public string EngMaxMarks { get; set; }
        [DataMember] public string Aggregate { get; set; }
        [DataMember] public string Percentage { get; set; }
        [DataMember] public string Remarks { get; set; }

        [DataMember] public string SiblingList { get; set; }

        [DataMember] public string MedicalFitnessCertifiCate { get; set; }
        [DataMember] public string PremedicalDetail { get; set; }
        [DataMember] public string ContactPersonName { get; set; }
        [DataMember] public string MobileNo { get; set; }

        [DataMember] public string CompetitiveExamList { get; set; }
        [DataMember] public string DocumentCode { get; set; }
        [DataMember] public string CourseName { get; set; }
        [DataMember] public string RollNo { get; set; }
        [DataMember] public bool IsSamajKalyan { get; set; }
        [DataMember] public bool PRGenObc { get; set; }
        [DataMember] public bool FeeWaiveOff { get; set; }
        [DataMember] public string DocumentPath { get; set; }
        [DataMember] public string DocumentsPath { get; set; }
        [DataMember] public int index { get; set; }
        [DataMember] public string SubAction { get; set; }
        [DataMember] public string StudentID { get; set; }
        [DataMember] public string DateOfAdmission { get; set; }
        [DataMember] public string Gender { get; set; }
        [DataMember] public string BloodGroup { get; set; }
        [DataMember] public string MiddleName { get; set; }
        [DataMember] public string LastName { get; set; }
        [DataMember] public string StudentEmail { get; set; }
        [DataMember] public string FatherName { get; set; }
        [DataMember] public string FatherMobile { get; set; }
        [DataMember] public string MotherMobile { get; set; }
        [DataMember] public string MotherName { get; set; }
        [DataMember] public string GuardianName { get; set; }
        [DataMember] public string GuardianMobile { get; set; }
        [DataMember] public string DOB { get; set; }
        [DataMember] public string FirstName { get; set; }
        [DataMember] public string SelectedForBranch { get; set; }
        [DataMember] public string ReferenceList { get; set; }
        [DataMember] public string AdmissionSourceType { get; set; }
    }
}

      