using System.Runtime.Serialization;

namespace BAL
{
    [DataContract]
    public class EmployeeDetails:Common
    {
        #region Employee Genral and Family Details 
        [DataMember]
        public string FullName { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string MiddelName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string DateofBirth { get; set; }
        [DataMember]
        public string Gender { get; set; }
        [DataMember]
        public string FatherName { get; set; }
        [DataMember]
        public string MotherName { get; set; }
        [DataMember]
        public string SpouseName { get; set; }
        [DataMember]
        public string MeritalStatus { get; set; }
        [DataMember]
        public string EmergenceyContactNo { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string ContactNo { get; set; }
        [DataMember]
        public string AadhaarNo { get; set; }
        [DataMember]
        public string PanCardNo { get; set; }
        [DataMember]
        public string DateofAnniversary { get; set; }
        [DataMember]
        public string PassportNo { get; set; }
        [DataMember]
        public string DateOfResignation { get; set; }
        [DataMember]
        public string PresentAddress { get; set; }
        [DataMember]
        public string PermanentAddress { get; set; }
        [DataMember]
        public string Height { get; set; }
        [DataMember]
        public string Weight { get; set; }
        [DataMember]
        public string BloodGroup { get; set; }
        [DataMember]
        public string IdentificationMark { get; set; }
        [DataMember]
        public string Hobbies { get; set; }
        [DataMember]
        public string LanguagesKnown { get; set; }
        [DataMember]
        public string EmployeePhotoPath { get; set; }
        [DataMember]
        public string DesignationType { get; set; }
        [DataMember]
        public string SubjectList { get; set; }
        [DataMember]
        public string QualificationList { get; set; }
        [DataMember]
        public string ApproxCTCFrom { get; set; }
        [DataMember]
        public string ApproxCTCTo { get; set; }
        [DataMember]
        public string AgeLimitFrom { get; set; }
        [DataMember]
        public string AgeLimitTo { get; set; }
        [DataMember]
        public string RequisitionNo { get; set; }
        [DataMember]
        public string ApprovalStatus { get; set; }
        [DataMember]
        public string PositionFilledDate { get; set; }
        [DataMember]
        public string NoOfVacancies { get; set; }
        [DataMember]
        public string OtherQualificationList { get; set; }
        [DataMember]
        public string JobTitle { get; set; }
        [DataMember]
        public string EmploymentType { get; set; }
        [DataMember]
        public string RequiredExperienceFrom { get; set; }
        [DataMember]
        public string RequiredExperienceTo { get; set; }

        [DataMember]
        public string JobDescription { get; set; }
        [DataMember]
        public string PublishVacancyDate { get; set; }
        [DataMember]
        public string PublishVacancyTillDate { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string JobPostingMedium { get; set; }
        [DataMember]
        public string AssociatedBranchCodesLists { get; set; }
        #endregion

        #region Employee official Details
        [DataMember]
        public string LeaveAllotedDate { get; set; }
        [DataMember]
        public string ExceptEmployeeCode { get; set; }
        [DataMember]
        public string EmployeeId { get; set; }
        [DataMember]
        public string RegistrationId { get; set; }
        [DataMember]
        public string JoiningDate { get; set; }
        [DataMember]
        public string FileNo { get; set; }
        [DataMember]
        public string DepartmentCode { get; set; }
        [DataMember]        
        public string DesignationCode { get; set; }
        [DataMember]        
        public string GradeCode { get; set; }
        [DataMember]       
        public string MachineId { get; set; }
        [DataMember]
        public string Reference { get; set; }

        [DataMember]
        public string ReferenceDesignation { get; set; }
        [DataMember]
        public string ReferenceContactNo { get; set; }
        [DataMember]
        public string ReferenceEmail { get; set; }
        [DataMember]
        public string IsResigned { get; set; }
        [DataMember]
        public string ResignationDate { get; set; }
        [DataMember]
        public string ResignationRemak { get; set; }
        [DataMember]
        public string EmpAllocation { get; set; }
        [DataMember]
        public string EmpType { get; set; }
        [DataMember]
        public string SpecializationList { get; set; }
        [DataMember]
        public string KRAList { get; set; }

        [DataMember]
        public string BiometricEmpDetails { get; set; }
        #endregion

        #region Foreign Key Value
        [DataMember]
        public string Department { get; set; }
        [DataMember]
        public string Designation { get; set; }
        [DataMember]
        public string Grade { get; set; }

        [DataMember]
        public string LeaveTypeMasterList { get; set; }

        [DataMember]
        public string JobType { get; set; }

        #endregion
    }

    public class Department:Common
    {
        [DataMember]
        public string DepartmentName { get; set; }
    }
   
    public class Designation:Common
    {
        [DataMember]
        public string DesignationName { get; set; }
        [DataMember]
        public string DesignationType { get; set; }
    }

    public class Grade:Common
    {
        [DataMember]
        public string GradeName { get; set; }
    }
    public class EmployeeBirthDayReminder : Common
    {
        [DataMember]
        public string DOBOF { get; set; }
    }
    public class KRA : Common
    {
        [DataMember]
        public string KRACode { get; set; }
        [DataMember]
        public string KRAName { get; set; }
        [DataMember]
        public string KRADetailsList { get; set; }
    }
}
