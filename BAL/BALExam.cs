using System.Runtime.Serialization;

namespace BAL
{
    public class BALExam : Common
    {
        [DataMember]
        public string ExamGroupName { get; set; }
        [DataMember]
        public string ExamStructureHead { get; set; }
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string ExamData { get; set; }
        [DataMember]
        public string ExamGroupCode { get; set; }
        [DataMember]
        public string ComponentName { get; set; }
        [DataMember]
        public string SkillTypeName { get; set; }
        [DataMember]
        public string SkillTypeCode { get; set; }
        [DataMember]
        public string SkillGroupName { get; set; }
        [DataMember]
        public string SkillGroupCode { get; set; }
        [DataMember]
        public string SkillName { get; set; }
        [DataMember]
        public string SkillCode { get; set; }
        [DataMember]
        public string GradeType { get; set; }
        [DataMember]
        public string GradeName { get; set; }
        [DataMember]
        public string GradeDescription { get; set; }
        [DataMember]
        public string LowerLimit { get; set; }
        [DataMember]
        public string UpperLimit { get; set; }
        [DataMember]
        public string GradeFor { get; set; }
        [DataMember]
        public string SubjectSkillData { get; set; }
        [DataMember]
        public string ExamCode { get; set; }
        [DataMember]
        public string ComponentCode { get; set; }
        [DataMember]
        public string CoSkillData { get; set; }
        [DataMember]
        public string ClassList { get; set; }
        [DataMember]
        public string SkillList { get; set; }
        [DataMember]
        public string TypeChar { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string RemarkPoints { get; set; }
        [DataMember]
        public string Keyword { get; set; }
        [DataMember]
        public string KeywordDescription { get; set; }
        [DataMember]
        public string PrincipalName { get; set; }
        [DataMember]
        public string ImagefileUrl { get; set; }
        [DataMember]
        public string AlbumIcon { get; set; }
        [DataMember]
        public string SignatureImagePath { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public string EntryType { get; set; }
        [DataMember]
        public string MaxMarks { get; set; }
        [DataMember]
        public string PassingMarks { get; set; }
        [DataMember]
        public string ReportCardMark { get; set; }
        [DataMember]
        public string DisplayTypeCode { get; set; }
        [DataMember]
        public string StudentLists { get; set; }
       [DataMember]
        public string ReportFormat { get; set; }
        [DataMember]
        public string ExamSubHeadName { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string ExamCodeList { get; set; }
        [DataMember]
        public string SubHeadCodeList { get; set; }
        [DataMember]
        public string AnnualWeigthage { get; set; }
        [DataMember]
        public string TotalMarks { get; set; }
        [DataMember]
        public string RemarkType { get; set; }
        [DataMember]
        public string SubjectList { get; set; }
        [DataMember]
        public string IsWritten { get; set; }
        [DataMember]
        public string ExamWeigthageList { get; set; }
        [DataMember]
        public string Caption { get; set; }
        [DataMember]
        public string PrintDate { get; set; }
        [DataMember]
        public string ReportCategoryHeaderDetails { get; set; }
        [DataMember]
        public int ReportCategoryId { get; set; }
        [DataMember]
        public int HeaderId { get; set; }
    }
}
