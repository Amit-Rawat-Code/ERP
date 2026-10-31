using System.Runtime.Serialization;

namespace BAL
{
    [DataContract]
    public class StudentAttendance:Common
    {   [DataMember]
        public string Attendance { get; set; }
        [DataMember]
        public string AttendanceDate { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string OrderBy { get; set; }
        [DataMember]
        public string AcademicSessionID { get; set; }
        [DataMember]
        public int WorkingDaysCount { get; set; }
        [DataMember]
        public string StudentAttendanceEntryLists { get; set; }
        [DataMember]
        public string ExamCode { get; set; }
    }

    
}
