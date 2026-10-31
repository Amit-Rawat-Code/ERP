using System.Runtime.Serialization;

namespace BAL
{
    public class BALAssessment:Common
    {
        [DataMember]
        public string ConceptData { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public string BookName { get; set; }
        [DataMember]
        public string Publication { get; set; }
        [DataMember]
        public string Year1{ get; set; }
        [DataMember]
        public string ChapterData { get; set; }
        [DataMember]
        public string ConceptChapterMappingData { get; set; }
        [DataMember]
        public string EntryDate { get; set; }
        [DataMember]
        public string ChapterTopicMappingData { get; set; }
        [DataMember]
        public string TopicSubTopicMappingData { get; set; }   
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string ExamName { get; set; }
        [DataMember]
        public string ExamCode { get; set; }
        [DataMember]        
        public string ClassList { get; set; }
        [DataMember]
        public string MarkingSchemeMasterData { get; set; }
        [DataMember]
        public string AcademicSessionID { get; set; }
        [DataMember]
        public string BookList { get; set; }
                
        [DataMember]
        public string ChapterCode { get; set; }
        [DataMember]
        public string StatusDate { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string ExamDescription { get; set; }
    }
}
