using System.Runtime.Serialization;
namespace BAL
{
    public class StudentTransferRequest : Common
    {
        [DataMember]
        public string FromClassCode { get; set; }
        [DataMember]
        public string FromSectionCode { get; set; }        
        [DataMember]
        public string PromoteStudentLists { get; set; }
        [DataMember]
        public int ToSessionId { get; set; }
        [DataMember]
        public int ToFYId { get; set; }
    }
}
