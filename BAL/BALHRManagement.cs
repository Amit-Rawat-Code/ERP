using System.Runtime.Serialization;

namespace BAL
{
    [DataContract]
    public class BALHRManagement : Common
    {
        [DataMember]
        public string CriteriaName { get; set; }
        [DataMember]
        public string RoundName { get; set; }
        [DataMember]
        public string VacancyTransId { get; set; }
        [DataMember]
        public string JobPostingTransId { get; set; }
        [DataMember]
        public string TransId { get; set; }
        [DataMember]
        public string AppliedCandidateTransId { get; set; }
        [DataMember]
        public string RecommendedProfileId { get; set; }
        [DataMember]
        public string TotalExperienceInYears { get; set; }
        [DataMember]
        public string ActionOnCandidate { get; set; }
        [DataMember]
        public string Remarks { get; set; }
        [DataMember]
        public string IsShortListed { get; set; }
        [DataMember]
        public string IsForwarded { get; set; }
        [DataMember]
        public string ShortListedCandidateLists { get; set; }
        [DataMember]
        public string InterviewDateTime { get; set; }
        [DataMember]
        public bool WrittenTest { get; set; }
        [DataMember]
        public bool Interview { get; set; }
        [DataMember]
        public bool Demo { get; set; }
        [DataMember]
        public string ShortListedTransId { get; set; }
        [DataMember]
        public string SkillStatus { get; set; }
        [DataMember]
        public bool CTETStatus { get; set; }
        [DataMember]
        public string ExpStatus { get; set; }
        [DataMember]
        public bool DemoStatus { get; set; }
        [DataMember]
        public bool WrittenStatus { get; set; }
        [DataMember]
        public int MaxMarks { get; set; }
        [DataMember]
        public int ObtainedMarks { get; set; }
        [DataMember]
        public string SelectionStatus { get; set; }
        [DataMember]
        public string JoiningDate { get; set; }
        [DataMember]
        public string DocumentationDate { get; set; }
        [DataMember]
        public decimal JoiningCTC { get; set; }
        [DataMember]
        public string InterviewScheduleCandidateTransId { get; set; }
        [DataMember]
        public string SelectedCandidateTransId { get; set; }
        [DataMember]
        public string DocumentCodeList { get; set; }
        [DataMember]
        public string DocumentPathList { get; set; }
        [DataMember]
        public string CandidateOfferLetterEntryTransId { get; set; }
        [DataMember]
        public string CandidateAppointmentLetterEntryTransId { get; set; }
        [DataMember]
        public string EmployeeKramasterTransId { get; set; }
        [DataMember]
        public string KRADetailsList { get; set; }
        [DataMember]
        public string KRAMasterCodeLists { get; set; }
        [DataMember]
        public string RIDs { get; set; }
        [DataMember]
        public string CandidateName { get; set; }
        [DataMember]
        public string SchoolName { get; set; }
        [DataMember]
        public string JobTitle { get; set; }
        [DataMember]
        public string EmailId { get; set; }
        [DataMember]
        public string AppointmentLetterTemplateDetail { get; set; }
        
    }
}
