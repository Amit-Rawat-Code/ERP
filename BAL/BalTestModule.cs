using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace BAL
{
    class BalTestModule
    {

    }    

    public class RearrangeTestTablePeriod : Common
    {
        [DataMember]
        public string EmployeeCode { get; set; }
        [DataMember]
        public string SubjectIdWithEmpCode { get; set; }
        [DataMember]
        public string WeekDayName { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string TitleName { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string GotInput { get; set; }
    }
}
