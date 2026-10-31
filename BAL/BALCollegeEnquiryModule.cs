using System.Collections.Generic;
using System.Runtime.Remoting.Contexts;
using System.Runtime.Serialization;

namespace BAL
{
    [DataContract]
    public class BALCollegeEnquiryModule : Common
    {

        [DataMember]
        public string CityAreaName { get; set; }
     
        [DataMember]
        public string AreaCode { get; set; }

        // This Properties for Enquiry Type Master
        [DataMember]
        public string EnquiryType { get; set; }
        [DataMember]
        public string ModeofEnquiry { get; set; }

        // This Properties for Enquiry Source Master
        [DataMember]
        public string EnquirySource { get; set; }

        // This Properties for Enquiry Type Master
        [DataMember]
        public string EnquiryCategory { get; set; }
    }

    public class BALCollegeMaster : Common
    {
        [DataMember]
        public string GroupId { get; set; }
        [DataMember]
        public string SocietyId { get; set; }
        [DataMember]
        public string SchoolId { get; set; }
        [DataMember]
        public string SchoolName { get; set; }
        [DataMember]
        public string SchoolAddress { get; set; }        
        [DataMember]
        public string IsHO { get; set; }
        [DataMember]
        public string IsSchool { get; set; }
        [DataMember]
        public string IsCollege { get; set; }
        [DataMember]
        public string IsSociety { get; set; }
        [DataMember]
        public string GroupAddress { get; set; }

        [DataMember]
        public string GroupName { get; set; }
        [DataMember]
        public string SocietyName { get; set; }
        [DataMember]
        public string SocietyAddress { get; set; }

        [DataMember]
        public string BranchId { get; set; }
        [DataMember]
        public string BranchName { get; set; }
        [DataMember]
        public string BranchAddress { get; set; }

        [DataMember]
        public string RoleId { get; set; }
        [DataMember]
        public string RoleName { get; set; }
        [DataMember]
        public string UserLevel { get; set; }
        [DataMember]
        public string ModuleId { get; set; }
        [DataMember]
        public string BranchLogo { get; set; }
        [DataMember]
        public string BackgroundImage { get; set; }
        [DataMember]
        public string BranchUrl { get; set; }
        [DataMember]
        public string MenuId { get; set; }



    }
    public class BALCollegeEnquiryForm : Common
    {
        [DataMember]
        public string EnquiryFor { get; set; }
        [DataMember]
        public string EnquiryTypeCode { get; set; }
        [DataMember]
        public string EnquiryTypeCode2 { get; set; }
        [DataMember]
        public string EnquirySourceCode { get; set; }
        [DataMember]
        public string Iam { get; set; }      
        //[DataMember]
        //public string ClassCode { get; set; }
        //[DataMember]
        //public string StreamCode { get; set; }
        [DataMember]
        public string CollegeCourseCode { get; set; }
        [DataMember]
        public string CollegeBranchCode { get; set; }
        [DataMember]
        public string VisitorName { get; set; }
        [DataMember]
        public string FatherName { get; set; }
        [DataMember]
        public string MotherName { get; set; }
        [DataMember]
        public string StudentFirstName { get; set; }
        [DataMember]
        public string StudentMiddleName { get; set; }
        [DataMember]
        public string StudentLastName { get; set; }
        [DataMember]
        public string Gender { get; set; }
        [DataMember]
        public string CategoryCode { get; set; }
        [DataMember]
        public string StudentdEmail { get; set; }
        [DataMember]
        public string ParentEmail { get; set; }
        [DataMember]
        public string StudentContact { get; set; }
        [DataMember]
        public string FatherContact { get; set; }
        [DataMember]
        public string MotherContact { get; set; }
        [DataMember]
        public string VisitorContact { get; set; }
        [DataMember]
        public string PrimaryNo { get; set; }
        [DataMember]
        public string WhatsAppNo { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public string CityAreaCode { get; set; }
        [DataMember]
        public string SubArea { get; set; }
        [DataMember]
        public string PinCode { get; set; }
        [DataMember]
        public string CurrentPreviousSchool { get; set; }
        [DataMember]
        public string Occupation { get; set; }
        [DataMember]
        public string Reference { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string FollowUpRemark { get; set; }
        [DataMember]
        public string NextFollowupDate { get; set; }
        [DataMember]
        public string FollowupCategory { get; set; }
        [DataMember]
        public string TransferEnquiryTransID { get; set; }
        [DataMember]
        public string TransferEnquiryTo { get; set; }
        [DataMember]
        public string TransferEnquiryDate { get; set; }
        [DataMember]
        public string TransferSchoolId { get; set; }
        [DataMember]
        public string StatusCode { get; set; }
        [DataMember]
        public string NameofExam { get; set; }
        [DataMember]
        public string Rank { get; set; }            
        [DataMember]
        public string LastQualifiedExaminationList  { get; set; }
        [DataMember]
        public string Level { get; set; }
        [DataMember]
        public string AssignedUserData { get; set; }
        [DataMember]
        public string HostalRequired { get; set; }
        [DataMember]
        public string SocialMediaTransId { get; set; }
        [DataMember]
        public int? SessionIdForEnquiry { get; set; }
        [DataMember]
        public int? SessionIdForFollowup { get; set; }

    }

    #region Class Define for Enquiry Report
    public class BALCollegeEnquiryReport : Common
    {
    }
    #endregion

    public class BALCollegePostingForSocialMedia : Common
    {
        [DataMember]
        public string NameofEvent { get; set; }
        [DataMember]
        public string PublishDate { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string ImageAttachment { get; set; }
        [DataMember]
        public string LinkGenerateFor { get; set; }
        [DataMember]
        public string GeneratedLink { get; set; }
        [DataMember]
        public string DateOfActivation { get; set; }
        [DataMember]
        public string DateOfDeactivation { get; set; }
        [DataMember]
        public string ImageUrl { get; set; }
        [DataMember]
        public string IsDeleted { get; set; }
        [DataMember]
        public List<string> ImageList { get; set; }

        [DataMember]
        public string ImageIcon { get; set; }

        [DataMember]
        public string ImageId { get; set; }
        [DataMember]
        public string PostCode { get; set; }
        [DataMember]
        public bool IsChk { get; set; }
        [DataMember]
        public string PlatformData { get; set; }
    }
}
