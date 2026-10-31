using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
namespace BAL
{
    public class BALSubjectGroupMaster : Common
    {
        [DataMember]
        public string SubjectGroupName { get; set; }
    }
    public class BALSubjectMaster : Common
    {
        [DataMember]
        public string SubjectName { get; set; }
        [DataMember]
        public string SubjectGroupCode { get; set; }
        [DataMember]
        public string IsPractical { get; set; }
        [DataMember]
        public string ColorCode { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public string Abbreviation { get; set; }


    }
    public class BALClassWiseSubjectMaster : Common
    {
        [DataMember]
        public string SectionData { get; set; }
        [DataMember]
        public string SubjectGroupData { get; set; }
    }

    public class BALTeacherSetting : Common
    {
        [DataMember]
        public string TeacherData { get; set; }
    }
    public class BALClassSetting : Common
    {
        [DataMember]
        public string ClassData { get; set; }
    }

    public class BALShiftMaster : Common
    {
        [DataMember]
        public string Shift { get; set; }
        [DataMember]
        public string FromTime { get; set; }
        [DataMember]
        public string ToTime { get; set; }
    }

    public class BALShiftClassMapping : Common
    {
        [DataMember]
        public string ClassData { get; set; }
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string StudentData { get; set; }
    }
    public class BALShiftPeriodMapping : Common
    {
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string PeriodData { get; set; }
    }
    public class BALDefineClassTeacher : Common
    {
        [DataMember]
        public string ClassTeacherData { get; set; }
    }

    public class BALClassSubjectWithTeacher : Common
    {
        [DataMember]
        public string ClassSubjectTeacherData { get; set; }
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string WeekDayName { get; set; }
    }
    public class BALClassWiseSubjectPriority : Common
    {
        [DataMember]
        public string SubjectPriorityData { get; set; }
    }
    public class BALConsecutiveSubjectPeriod : Common
    {
        [DataMember]
        public string ConsecutiveSubjectData { get; set; }
    }
    public class BALRelativeOptionalSubject : Common
    {
        [DataMember]
        public string RelativeSubjectData { get; set; }
        [DataMember]
        public string RelativeSubjectCode { get; set; }
    }
    public class BALTeacherBreak : Common
    {
        [DataMember]
        public string SearchText { get; set; }
        [DataMember]
        public string TeacherBreakData { get; set; }
    }
    public class BALSubjectDaysMaster : Common    
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string SubjectDaysList { get; set; }
    }
    public class BALGenTimeTable : Common
    {
        [DataMember]
        public string SubjectIdWithEmpCode { get; set; }
        [DataMember]
        public string TimeTableDateWiseId { get; set; } 
        [DataMember]
        public string WeekDayName { get; set; }
        [DataMember]
        public string PeriodId { get; set; }
        [DataMember]
        public string ShiftId { get; set; }
        [DataMember]
        public string TitleName { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string cellData { get; set; }       
    }

    public class RearrangeTimeTablePeriod : Common
    {
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
        public string CellData { get; set; }
        //public List<PeriodWeekDayEmployeeSubject> cellData { get; set; }
    }

    public class PeriodMaster : Common
    {
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string PeriodName { get; set; }
        [DataMember]
        public string PeriodDuration { get; set; }
        [DataMember]
        public string PeriodOrder { get; set; }
    }
    public class BALReplaceTeacher : Common
    {
        [DataMember]
        public string SubtitutionDateRange { get; set; }
        [DataMember]
        public bool SWithSameSubject { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public string CourseCode { get; set; }
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string ReplaceTeacherData { get; set; }
        [DataMember]
        public string ReplaceFromEmployeeCode { get; set; }
        [DataMember]
        public string ReplaceToEmployeeCode { get; set; }
        [DataMember]
        public string Type { get; set; }        
    }
    public class BALAllotNewTeacher : Common
    {
        [DataMember]
        public string AllotNewTeacherData { get; set; }
        [DataMember]
        public string OldEmployeeCode { get; set; }
        [DataMember]
        public string NewEmployeeCode { get; set; }
        [DataMember]
        public string ShiftCode { get; set; }
        
    }
    public abstract class DayItems
    {
        [DataMember]
        public string PeriodName { get; set; }

        [DataMember]
        public string PeriodType { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string FromTime { get; set; }
        [DataMember]
        public string ToTime { get; set; }
        [DataMember]
        public string Class { get; set; }
        [DataMember]
        public string ClassCode { get; set; }
        [DataMember]
        public string SectionCode { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public int PeriodCount { get; set; }
        [DataMember]
        public string EmployeeCode { get; set; }

    }
    public class MonDay : DayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class TuesDay : DayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class WednesDay : DayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class ThursDay : DayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class FriDay : DayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class SaturDay : DayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class SunDay : DayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class TimeTableSummary : Common
    {
        [DataMember]
        public string ClassId { get; set; }

    }
    public class DayWiseTimeTable
    {
        [DataMember]
        public List<MonDay> Monday { get; set; }
        [DataMember]
        public List<TuesDay> Tuesday { get; set; }
        [DataMember]
        public List<WednesDay> Wednesday { get; set; }
        [DataMember]
        public List<ThursDay> Thursday { get; set; }
        [DataMember]
        public List<FriDay> Friday { get; set; }
        [DataMember]
        public List<SaturDay> Saturday { get; set; }
        [DataMember]
        public List<SunDay> Sunday { get; set; }
    }

    public class BalResourceType : Common
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string ResourceName { get; set; }
        [DataMember]
        public string ResourceType { get; set; }
        [DataMember]
        public string ResourceShortName { get; set; }
        [DataMember]
        public bool IsTeacherRequired { get; set; }
        [DataMember]
        public string DayPeriod { get; set; }        
        [DataMember]
        public string WeekDays { get; set; }
    }

    public class BalOnlinePeriodLink:Common
    {
        [DataMember]
        public string TransId { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember] 
        public string ClassDate { get; set; }
        [DataMember]
        public string ClassTime { get; set; }
        [DataMember]
        public string DayName { get; set; }
        [DataMember]
        public string UrlLink { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string OLClassTransId { get; set; }
        [DataMember]
        public bool IsOpenlink { get; set; }
    }
}
