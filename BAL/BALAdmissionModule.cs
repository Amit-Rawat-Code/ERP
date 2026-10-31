using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
namespace BAL
{
    public class BALBatch : Common
    {
        [DataMember]
        public string BatchDetailCode { get; set; }

        [DataMember]
        public string BatchesData { get; set; }

        [DataMember]
        public string StudentData { get; set; }

    }
    public class BALCreateBatch : BALBatch
    {   [DataMember]
        public int NoOfRegdStudent { get; set; }
        [DataMember]
        public int NoOfStudentPerBatch { get; set; }
        [DataMember]
        public int TotalBatches { get; set; }
        [DataMember]
        public int OrderBy { get; set; }
    }

    public class BALBatchSlotTime : BALBatch
    {
        [DataMember]
        public string IsWrittenExam { get; set; }
        [DataMember]
        public string SlotDate { get; set; }
        [DataMember]
        public string SlotTime { get; set; }
        [DataMember]
        public int BatchDuration { get; set; }
        [DataMember]
        public int BatchInterval { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string DocumentsData { get; set; }
    }

    public class BALSendSMSEmailSchedule : BALBatch
    { 
        [DataMember]
        public string CommunicationVia { get; set; }
    }
    public class BALBatchTransaction : BALBatch
    {
        [DataMember]
        public int MeritCode { get; set; }
        [DataMember]
        public int CutOffFrom { get; set; }
        [DataMember]
        public int CutOffTo { get; set; }

    }
  
    public class BALEntryMarksEntryTransaction : BALBatch
    {
        [DataMember]
        public string ObtainedMarks { get; set; }
        [DataMember]
        public string MaxMarks { get; set; }
        [DataMember]
        public string EntranceMarksList { get; set; }
        [DataMember]
        public string TotalMarks { get; set; }
        [DataMember]
        public string SubjectMarksEntry { get; set; }

    }

    public  class BALAddmission : Common
    {
        //Student
        [DataMember] public string StudentID { get; set; }

        [DataMember] public string FirstName { get; set; }
        [DataMember] public string MiddleName { get; set; }
        [DataMember] public string LastName { get; set; }
        [DataMember] public string DOB { get; set; }
        [DataMember] public string Gender { get; set; }
        [DataMember] public string StudentEmail { get; set; }

        [DataMember] public string BloodGroup { get; set; }
        [DataMember] public string DateOfAdmission { get; set; }
        [DataMember] public string IsTransport { get; set; }

        //Local Guardian
        [DataMember] public string GuardianName { get; set; }
        [DataMember] public string GuardianMobile { get; set; }
      
        //Father
        [DataMember] public string FatherName { get; set; }
        [DataMember] public string FatherOccupationCode { get; set; }
        [DataMember] public string FatherMobile { get; set; }

        //Mother
        [DataMember] public string MotherName { get; set; }
        [DataMember] public string MotherMobile { get; set; }

        [DataMember] public string FeeStructureGroupCode { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
    }

    public class BALSchoolAddmission: BALAddmission
    {
        [DataMember] public string StudentAdmissionNoLists { get; set; }
        [DataMember] public string AdmissionNo { get; set; }
        [DataMember] public string AdmissionSourceType { get; set; }
        [DataMember] public string BoardCode { get; set; }
      
        //---Student General Details
        [DataMember] public string PlaceOfBirth { get; set; }
        [DataMember] public string AgeOnDate { get; set; }
   
        [DataMember] public string AadharCardNo { get; set; }
        [DataMember] public string DateOfJoining { get; set; }

        [DataMember] public string IsEws { get; set; }
        [DataMember] public string IsSibling { get; set; }
        [DataMember] public string SiblingStudentList { get; set; }
        [DataMember] public string IsTC { get; set; }

        //---Student Other Details
        [DataMember] public string StudentContact { get; set; }
        //[DataMember] public string StreamCode { get; set; }
        [DataMember] public string SubjectList { get; set; }
        [DataMember] public string MedicalHistory { get; set; }
        [DataMember] public string Allergies { get; set; }
        [DataMember] public string OtherMedicalInfo { get; set; }
        [DataMember] public string Medium { get; set; }
        [DataMember] public string FamilyDoctorPhone { get; set; }
        [DataMember] public string FamilyDoctorAddress { get; set; }
        [DataMember] public string DistanceFromHome { get; set; }
        [DataMember] public string IsOnlyChild { get; set; }
        [DataMember] public string GeneralDescription { get; set; }
        [DataMember] public string DesignationCode { get; set; }

        //---Student Previous School Details
        [DataMember] public string SchoolName { get; set; }
        [DataMember] public string PreviousCity { get; set; }
        [DataMember] public string PreviousClass { get; set; }
        [DataMember] public string PreviousYear { get; set; }
        [DataMember] public string PreviousBoard { get; set; }
        [DataMember] public string Percentage { get; set; }

        //---Student Guardian Details
      
        [DataMember] public string GuardianOccupationCode { get; set; }
        [DataMember] public string GuardianDesignationCode { get; set; }
        [DataMember] public string GuardianResidenceAddress { get; set; }
        [DataMember] public string GuardianOfficeAddress { get; set; }
        [DataMember] public string GuardianEmail { get; set; }
        [DataMember] public string GuardianAlternateEmail { get; set; }
        [DataMember] public string GuardianDOB { get; set; }
   
        [DataMember] public string GuardianPhone { get; set; }
        [DataMember] public string GuardianCompanyName { get; set; }
        [DataMember] public string GuardianBusinessDetails { get; set; }
        [DataMember] public string GuardianQualification { get; set; }
        [DataMember] public string GuardianServiceIn { get; set; }
        [DataMember] public string GuardianOfficephone { get; set; }
        [DataMember] public string GuardianOfficeMobile { get; set; }
        [DataMember] public string GuardianOfficeExtension { get; set; }
        [DataMember] public string GuardianOfficeEmail { get; set; }
        [DataMember] public string GuardianOfficeWebsite { get; set; }
        [DataMember] public string GuardianIncome { get; set; }
        [DataMember] public string GuardianIsSingleParent { get; set; }

        //---Student Parent Details
        //--Father Column
       
        [DataMember] public string FatherDesignationCode { get; set; }
        [DataMember] public string FatherResidenceAddress { get; set; }
        [DataMember] public string FatherOfficePhone { get; set; }
        [DataMember] public string FatherOfficeAddress { get; set; }
        [DataMember] public string FatherEmail { get; set; }
        [DataMember] public string FatherDOB { get; set; }
        [DataMember] public string FatherPhone { get; set; }
        [DataMember] public string FatherAnnualIncome { get; set; }
        [DataMember] public string FatherCompanyName { get; set; }
        [DataMember] public string FatherBusinessDetails { get; set; }
        [DataMember] public string FatherQualification { get; set; }
        [DataMember] public string FatherServiceIn { get; set; }

        [DataMember] public string FStateCode { get; set; }
        [DataMember] public string FCityCode { get; set; }
        [DataMember] public string FCityAreaCode { get; set; }
        [DataMember] public string FSubArea { get; set; }
        [DataMember] public string FPinCode { get; set; }

        //---Mother Column

        [DataMember] public string MotherOccupationCode { get; set; }
        [DataMember] public string MotherDesignationCode { get; set; }
        [DataMember] public string MotherResidenceAddress { get; set; }
        [DataMember] public string MotherPhone { get; set; }
        [DataMember] public string MotherOfficeAddress { get; set; }
        [DataMember] public string MotherEmail { get; set; }
        [DataMember] public string AnniversaryDate { get; set; }
        [DataMember] public string MotherDOB { get; set; }
        [DataMember] public string MotherAnnualIncome { get; set; }
        [DataMember] public string MotherCompanyName { get; set; }
        [DataMember] public string MotherBusinessDetails { get; set; }
        [DataMember] public string MotherQualification { get; set; }
        [DataMember] public string MotherServiceIn { get; set; }
        [DataMember] public string MotherOfficePhone { get; set; }

        [DataMember] public string MStateCode { get; set; }
        [DataMember] public string MCityCode { get; set; }
        [DataMember] public string MCityAreaCode { get; set; }
        [DataMember] public string MSubArea { get; set; }
        [DataMember] public string MPinCode { get; set; }

        [DataMember] public string CommAddress { get; set; }

        //Transfer Certificate
        [DataMember] public string AnyDues { get; set; }
        [DataMember] public string AnyOtherActivity { get; set; }
        [DataMember] public string LastPresentDate { get; set; }
        [DataMember] public string NoOfDays { get; set; }
        [DataMember] public string NoOfDaysPresent { get; set; }
        [DataMember] public string CertificateIssusDate { get; set; }
        [DataMember] public string ReasonOfLeaving { get; set; }
        [DataMember] public string GeneralConduct { get; set; }
        [DataMember] public string Remark { get; set; }
        [DataMember] public string StudentResult { get; set; }
        [DataMember] public string AdmissionClassCode { get; set; }
        [DataMember] public string PreviousClass_YN { get; set; }
        [DataMember] public string LastStudyClass { get; set; }
        [DataMember] public string SubjectName { get; set; }
        [DataMember] public string AcademicSessionID { get; set; }
        [DataMember] public string PreviousSchoolDetail { get; set; }
        //Transfer Certificate
        [DataMember] public string previewimage { get; set; }
        [DataMember] public string IsHostel { get; set; }
        
    }

    //public class BALCollegeAddmission : BALAddmission
    //{
    //    [DataMember] public string EnquiryTypeCode { get; set; }
    //    [DataMember] public string EnquirySearch { get; set; }
    //    [DataMember] public string EnquiryTransId { get; set; }
    //    [DataMember] public string RegistrationFormNo { get; set; }
    //    [DataMember] public string AdmissionFormNo { get; set; }
    //    [DataMember] public string CourseCode { get; set; }
    //    [DataMember] public string SemesterCode { get; set; }
    //    [DataMember] public string AdmissionMode { get; set; }
    //    [DataMember] public bool LaternalEntry { get; set; }
    //    [DataMember] public string AdmissionThrough { get; set; }
    //    [DataMember] public string EnquirySourceCode { get; set; }
    //    [DataMember] public string ReferenceOf { get; set; }
    //    [DataMember] public string BranchPreference1 { get; set; }
    //    [DataMember] public string BranchPreference2 { get; set; }
    //    [DataMember] public string BranchPreference3 { get; set; }
    //    [DataMember] public string BranchPreference4 { get; set; }
    //    [DataMember] public string BranchPreference5 { get; set; }
    //    [DataMember] public string BranchPreference6 { get; set; }
    //    [DataMember] public string Initials { get; set; }
    //    [DataMember] public bool IsPhyDisable { get; set; }
    //    [DataMember] public string DisabilityDetails { get; set; }

       

    //    //Student
    //    [DataMember] public string StudentMobileNo { get; set; }
    //    [DataMember] public bool Hostel { get; set; }
    //    [DataMember] public bool Transport { get; set; }
    //    [DataMember] public bool EducationLoan { get; set; }
    //    [DataMember] public string EducationLoanLocation { get; set; }

       
    //    [DataMember] public string Curr_Address1 { get; set; }
    //    [DataMember] public string Curr_Address2 { get; set; }
    //    [DataMember] public string Curr_Address3 { get; set; }
    //    [DataMember] public string Curr_CountryCode { get; set; }
    //    [DataMember] public string Curr_StateCode { get; set; }
    //    [DataMember] public string Curr_CityCode { get; set; }
    //    [DataMember] public string Curr_PinCode { get; set; }
    //    [DataMember] public bool IsAddressSame { get; set; }
    //    [DataMember] public string Per_Address1 { get; set; }
    //    [DataMember] public string Per_Address2 { get; set; }
    //    [DataMember] public string Per_Address3 { get; set; }
    //    [DataMember] public string Per_CountryCode { get; set; }
    //    [DataMember] public string Per_StateCode { get; set; }
    //    [DataMember] public string Per_CityCode { get; set; }
    //    [DataMember] public string Per_PinCode { get; set; }
    //    [DataMember] public string StudentAlternativeMobileNo { get; set; }
    //    [DataMember] public string StudentAlternativeEmailid { get; set; }

    //    [DataMember] public bool IsVerified { get; set; }

    //    [DataMember] public string FatherOccupation { get; set; }

    //    [DataMember] public string GrandFatherName { get; set; }

    //    [DataMember] public string StudentPhoto { get; set; }
    //    [DataMember] public string StudentSign { get; set; }
    //    [DataMember] public string FatherPhoto { get; set; }
    //    [DataMember] public string FatherSign { get; set; }
    //    [DataMember] public string MotherPhoto { get; set; }
    //    [DataMember] public string MotherSign { get; set; }
    //    [DataMember] public string LocalGuardianPhoto { get; set; }
    //    [DataMember] public string LocalGuardianSign { get; set; }

    //    [DataMember] public string uploadedfiles { get; set; }



    //    [DataMember] public string AdmissionCode { get; set; }
    //    [DataMember] public string CasteCategory { get; set; }
    //    [DataMember] public string SubCasteCategory { get; set; }
    //    [DataMember] public string CasteCertificateNo { get; set; }
    //    [DataMember] public string CasteDateOfIssue { get; set; }
    //    [DataMember] public string DomicileCertificateNo { get; set; }
    //    [DataMember] public string DomicileDateOfIssue { get; set; }
    //    [DataMember] public string IncomeCertificateNo { get; set; }
    //    [DataMember] public string IncomeDateOfIssue { get; set; }
    //    [DataMember] public string TransferCertificateNo { get; set; }
    //    [DataMember] public string TransferDateOfIssue { get; set; }
    //    [DataMember] public string AADHAARNo { get; set; }

    //    [DataMember] public string AnnualIncome { get; set; }
    //    [DataMember] public string BankName { get; set; }
    //    [DataMember] public string BranchName { get; set; }
    //    [DataMember] public string AccountNo { get; set; }

    //    [DataMember] public string IFSCCode { get; set; }
    //    [DataMember] public string InstructionMedium { get; set; }
    //    [DataMember] public string EducationalQualification { get; set; }
    //}
}

      