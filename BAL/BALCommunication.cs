using System.Runtime.Serialization;

namespace BAL
{
    public class Communication : Common
    {
        [DataMember]
        public string ActivityType { get; set; }
        [DataMember]
        public string CalendarFor { get; set; }
        [DataMember]
        public string EventStartDate { get; set; }
        [DataMember]
        public string EventEndDate { get; set; }
        [DataMember]
        public string Eventname { get; set; }
        [DataMember]
        public string ActivityName { get; set; }
        [DataMember]
        public string EmployeeType { get; set; }
        [DataMember]
        public string StudentType { get; set; }
        [DataMember]
        public string UserTypeID { get; set; }
    }
}
