using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    [DataContract]
    public class BALSMSSubject : Common
    {
        [DataMember]
        public string SmsSubjectName { get; set; }
    }
    public class BALSMSTemplate:Common
    {
        [DataMember]
        public string SmsSubjectCode { get; set; }
        [DataMember]
        public string SmsTemplateName { get; set; }
        [DataMember]
        public string SmsTemplateID { get; set; }
        [DataMember]
        public string SmsTemplateDetail { get; set; }
        [DataMember]
        public string UserType { get; set; }
    }
    public class BALComposeSms : Common
    {
        [DataMember]
        public string SmsSubjectCode { get; set; }
        [DataMember]
        public string SmsTemplateCode { get; set; }
        [DataMember]
        public string Language { get; set; }
        [DataMember]
        public string TextMsg { get; set; }
        [DataMember]
        public string CopytoSenderListofEmployee { get; set; }
        [DataMember]
        public string UserType { get; set; }
        [DataMember]
        public string ListofSelectedClass { get; set; }
        [DataMember]
        public string RoleId { get; set; }
        [DataMember]
        public string ListofSelectedEmployee { get; set; }
        [DataMember]
        public string ListofSelectedStudents { get; set; }
        [DataMember]
        public string TemplateDetails { get; set; }

        [DataMember]
        public string ListofSelectedStudentsOrStaff { get; set; }
        [DataMember]
        public string FeesDueOnTillDate { get; set; }
    }
}
