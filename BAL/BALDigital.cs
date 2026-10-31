using System.Collections.Generic;
using System.Runtime.Remoting.Contexts;
using System.Runtime.Serialization;
using System.Web;

namespace BAL
{
    [DataContract]
    public class BALDigital : Common 
    {
        [DataMember]
        public string SendBy { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string RoleId { get; set; }
        [DataMember]
        public string Message { get; set; }
        [DataMember] 
        public string CreateNoticeFor { get; set; }
        [DataMember]
        public string CreateNotice { get; set; }
        [DataMember]
        public string CreateCircularFor { get; set; }
        [DataMember]
        public string CreateCircular { get; set; }

        [DataMember]
        public string NoticeFor { get; set; }
        [DataMember]
        public string CircularFor { get; set; }
        [DataMember]
        public string IndividualsList { get; set; }
        [DataMember]
        public string NoticeHeadline { get; set; }
        [DataMember]
        public string CircularHeadline { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]

        public string Attachment { get; set; }

        [DataMember]
        public string AttachmentPath { get; set; }
        [DataMember]
        public string AttachmentType { get; set; }
        [DataMember]
        public string ShowDate { get; set; }
        [DataMember]
        public string EndDate { get; set; }
        [DataMember]
        public string ClassSectionList { get; set; }
        [DataMember]
        public string MessageFor { get; set; }
        [DataMember]
        public string MessageTitle { get; set; }
        [DataMember] 
        public string WantToRevertMessage { get; set; }
        [DataMember]
        public string SlotDefinedFor {get; set;}
        [DataMember]
        public string SlotVenue {get;  set;}
        [DataMember]
        public string SlotForDayTime { get; set; }
        [DataMember]
        public string DigitalDiaryList { get; set; }
        [DataMember]
        public string DigitalDiaryTransID { get; set; }
        [DataMember]
        public string RevertMessageReply { get; set; }
        [DataMember]
        public string CircularDate { get; set; }
        [DataMember]
        public string ComplainTo { get; set; }
        [DataMember]
        public string ReceivedBy { get; set; }
        [DataMember]
        public string SenderId { get; set; }
        [DataMember]
        public string ReceiverId { get; set; }
        [DataMember]
        public string SubmissionRequired { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string HomeworkDate { get; set; }
        [DataMember]
        public string VideoEndDate { get; set; }
        [DataMember]
        public string VideoPath { get; set; }
        [DataMember]
        public string HomeworkTopic { get; set; }
        [DataMember]
        public bool IsApproved { get; set; }
        [DataMember]
        public string IsApprovedBy { get; set; }
        [DataMember]
        public string ApprovalDate { get; set; }
        [DataMember] public string UserType { get; set; }



    }
    
}