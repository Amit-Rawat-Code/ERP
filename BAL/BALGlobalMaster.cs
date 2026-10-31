using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{ 
    [DataContract]
    public class BALGlobalMaster : Common
    {
        /* City Area Master Properties Define */
        [DataMember]
        public string CountryName { get; set; }
        [DataMember]
        public string StateName { get; set; }
        [DataMember] 
        public string CityName { get; set; }
        
        [DataMember] 
        public string CourseName { get; set; }
        [DataMember]
        public string CourseCode { get; set; }
        [DataMember]
        public string ClassName { get; set; }
        [DataMember]
        public string BranchName { get; set; }
        [DataMember]
        public string StreamName { get; set; }
        [DataMember]
        public string SectionName { get; set; }
        [DataMember]
        public string CourseBranchName { get; set; }
        [DataMember]
        public string SubjectGroupName { get; set; }
        [DataMember]
        public string SubjectGroupCode { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public string Abbreviation { get; set; }
        [DataMember]
        public string ColorCode { get; set; }
        [DataMember]
        public string Semester { get; set; }
        [DataMember]
        public string URL { get; set; }
    }

    
    public class BALGblClassMaster : Common
    {
        //[DataMember]
        //public string ClassCode { get; set; }
        [DataMember]
        public string ClassName { get; set; }
        [DataMember]
        public string CourseCode { get; set; }
    }
    public class BALGblSectionMaster : Common
    {
        [DataMember]
        public string ClassName { get; set; }
    }
    public class BALGblBranchMaster : Common
    {
        [DataMember]
        public string BranchName { get; set; }
    }
    public class BALGblStreamMaster : Common
    {
        //[DataMember]
        //public string StreamCode { get; set; }
        [DataMember]
        public string StreamName { get; set; }
    }
    public class BALGblCollegeCourseMaster : Common
    {
        [DataMember]
        public string CollegeCourseCode { get; set; }
        [DataMember]
        public string CollegeCourseName { get; set; }
        //[DataMember]
        //public string CourseCode { get; set; }
    }
    public class BALGblCollegeBranchMaster : Common
    {
        [DataMember]
        public string CollegeCourseCode { get; set; }
        [DataMember]
        public string CollegeBranchCode { get; set; }
        [DataMember]
        public string CollegeBranchName { get; set; }
    }

    public class BALDocumentMaster : Common
    {
        public string DocumentText { get; set; }
    }

    public class BALSessionMaster : Common
    {
        [DataMember]
        public string _SessionId { get; set; }
        [DataMember]
        public string SessionText { get; set; }
        [DataMember]
        public string SessionStartDate { get; set; }
        [DataMember]
        public string SessionEndDate { get; set; }
        [DataMember]
        public bool IsAdmActiveSession { get; set; }

    }
    public class BALFinancialYearMaster : Common
    {
        [DataMember]
        public string AcademicSessionID { get; set; }
        [DataMember]
        public string FinancialYearId { get; set; }
        [DataMember]
        public string FinancialYearName { get; set; }
    }
    public class ReportHeader : Common
    {
        [DataMember]
        public string ReportHeaderId { get; set; }
        [DataMember]
        public string ReportCategoryName { get; set; }
        [DataMember]
        public string HeaderHtml { get; set; }

    }

    public class UrlAccessPermission : Common
    {
        [DataMember]
        public string URL { get; set; }
        [DataMember]
        public string LoginId { get; set; }
    }
}
