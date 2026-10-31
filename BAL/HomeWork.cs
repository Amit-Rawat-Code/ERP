using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace BAL
{
    public class HomeWork : Common
    {
        [DataMember]
        public string userId { get; set; }
        [DataMember]
        public string loginTypeId { get; set; }
        [DataMember]
        public string TransId { get; set; }
        [DataMember]
        public string VoucherNo { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public string HomeWorkDate { get; set; }
        [DataMember]
        public string ShowDate { get; set; }
        [DataMember]
        public string HomeworkFor { get; set; }
        [DataMember]
        public string HomeworkDetails { get; set; }
        [DataMember]
        public string SubCategoryHomework { get; set; }
        [DataMember]
        public string ShowTime { get; set; }
        [DataMember]
        public string HideDate { get; set; }
        [DataMember]
        public string HideTime { get; set; }
        [DataMember]
        public string TopicName { get; set; }
        [DataMember]
        public string Active { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Attachment { get; set; }
        [DataMember]
        public string Attachment2 { get; set; }
        [DataMember]
        public string Attachment3 { get; set; }
        [DataMember]
        public string Attachment4 { get; set; }
        [DataMember]
        public string Attachment5 { get; set; }
        [DataMember]
        public string Attachment6 { get; set; }
        [DataMember]
        public string Attachment7 { get; set; }
        [DataMember]
        public string Attachment8 { get; set; }
        [DataMember]
        public string Attachment9 { get; set; }
        [DataMember]
        public string Attachment10 { get; set; }
        [DataMember]
        public string StudentsCode { get; set; }
        [DataMember]
        public string EmployeeId { get; set; }
        [DataMember]
        public string IsSubmitted { get; set; }
        [DataMember]
        public string SendNotification { get; set; }
        public string FlagForMobile { get; set; }
        [DataMember]
        public string IscheckedbyTeacher { get; set; }
        [DataMember]
        public string VedioPath { get; set; }
        [DataMember]
        public string IsApproved { get; set; }
        [DataMember]
        public string IsSubmissionRequired { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public List<AttachmentList> AttachmentList { get; set; }
        [DataMember]
        public string StudentCodeList { get; set; }
        [DataMember]
        public List<string> Attachments { get; set; }
        [DataMember]
        public string IsAllSubject { get; set; }
        [DataMember]
        public string VideoEndDate { get; set; }
        [DataMember]
        public string VideoPath { get; set; }
        [DataMember]
        public string HomeworkTopic { get; set; }
        [DataMember]
        public string IsApprovedBy { get; set; }
        [DataMember]
        public string ApprovalDate { get; set; }
        [DataMember]
        public string EndDate { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string AttachmentPath { get; set; }
        [DataMember]
        public string AttachmentType { get; set; }
        [DataMember]
        public string SubmissionRequired { get; set; }
        [DataMember]
        public string IsRead { get; set; }
    }

    public class AttachmentList
    {
        public string Attachment { get; set; }
        public string Name { get; set; }
    }

}
