using System.Runtime.Serialization;

namespace BAL
{
    public class Notifications : Common
    {
        [DataMember]
        public string Message { get; set; }
        [DataMember]
        public string NotificationDate { get; set; }
        [DataMember]
        public string InTime { get; set; }
        [DataMember]
        public string OutTime { get; set; }
        [DataMember]
        public string EmployeeRemarks { get; set; }
        [DataMember]
        public string IsApproved { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public string AllEmployeeApprovalList { get; set; }
        [DataMember]
        public string AttendanceTransId { get; set; }
    }

    public class TimeTableNotification : Common
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string DStatus { get; set; }
    }
}
