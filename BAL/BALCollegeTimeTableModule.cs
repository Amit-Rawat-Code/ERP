using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
namespace BAL
{
    public class BALCollegeSubjectGroupMaster : Common
    {
        [DataMember]
        public string SubjectGroupName { get; set; }
    }
    public class BALCollegeSubjectMaster : Common
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
    public class BALCollegeCourseWiseSubjectMaster : Common
    {
        [DataMember]
        public string SemesterData { get; set; }
        [DataMember]
        public string SubjectGroupData { get; set; }
        [DataMember]
        public string CourseCode { get; set; }
        [DataMember]
        public string SemesterCode { get; set; }
    }

    public class BALCollegeTeacherSetting : Common
    {
        [DataMember]
        public string TeacherData { get; set; }
    }
    public class BALCollegeCourseSetting : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string CourseData { get; set; }
    }

    public class BALCollegeShiftMaster : Common
    {
        [DataMember]
        public string Shift { get; set; }
        [DataMember]
        public string FromTime { get; set; }
        [DataMember]
        public string ToTime { get; set; }
    }

    public class BALCollegeShiftCourseMapping : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string CourseData { get; set; }
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string StudentData { get; set; }
    }
    public class BALCollegeShiftPeriodMapping : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string PeriodData { get; set; }
    }
    public class BALCollegeDefineCourseTeacher : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string CourseTeacherData { get; set; }
    }

    public class BALCollegeCourseSubjectWithTeacher : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string CourseSubjectTeacherData { get; set; }
        [DataMember]
        public string ShiftCode { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string WeekDayName { get; set; }
    }
    public class BALCollegeCourseWiseSubjectPriority : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string SubjectPriorityData { get; set; }
    }
    public class BALCollegeConsecutiveSubjectPeriod : Common
    {
        [DataMember]
        public string ConsecutiveSubjectData { get; set; }
    }
    public class BALCollegeRelativeOptionalSubject : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string RelativeSubjectData { get; set; }
        [DataMember]
        public string RelativeSubjectCode { get; set; }
    }
    public class BALCollegeTeacherBreak : Common
    {
        [DataMember]
        public string SearchText { get; set; }
        [DataMember]
        public string TeacherBreakData { get; set; }
    }
    public class BALCollegeSubjectDaysMaster : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string SubjectDaysList { get; set; }
    }
    public class BALCollegeGenTimeTable : Common
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

    public class RearrangeCollegeTimeTablePeriod : BALCollegeCourseWiseSubjectMaster
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

    public class CollegePeriodMaster : Common
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
    public class BALCollegeReplaceTeacher : Common
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
    public class BALCollegeAllotNewTeacher : Common
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
    public abstract class CollegeDayItems
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
        public string Course { get; set; }
        [DataMember]
        public string CourseCode { get; set; }
        [DataMember]
        public string BranchCode { get; set; }
        [DataMember]
        public string SemesterCode { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public int PeriodCount { get; set; }
        [DataMember]
        public string EmployeeCode { get; set; }

    }
    public class CollegeMonDay : CollegeDayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class CollegeTuesDay : CollegeDayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class CollegeWednesDay : CollegeDayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class CollegeThursDay : CollegeDayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class CollegeFriDay : CollegeDayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class CollegeSaturDay : CollegeDayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class CollegeSunDay : CollegeDayItems
    {
        [DataMember]
        public string EmployeeName { get; set; }
        [DataMember]
        public string SubjectName { get; set; }
    }
    public class CollegeTimeTableSummary : Common
    {
        [DataMember]
        public string CourseId { get; set; }

    }
    public class CollegeDayWiseTimeTable
    {
        [DataMember]
        public List<CollegeMonDay> Monday { get; set; }
        [DataMember]
        public List<CollegeTuesDay> Tuesday { get; set; }
        [DataMember]
        public List<CollegeWednesDay> Wednesday { get; set; }
        [DataMember]
        public List<CollegeThursDay> Thursday { get; set; }
        [DataMember]
        public List<CollegeFriDay> Friday { get; set; }
        [DataMember]
        public List<CollegeSaturDay> Saturday { get; set; }
        [DataMember]
        public List<CollegeSunDay> Sunday { get; set; }
    }

    public class BalCollegeResourceType : Common
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

    public class BalCollegeOnlinePeriodLink : BALCollegeCourseWiseSubjectMaster
    {
        [DataMember]
        public string TransId { get; set; }
        [DataMember]
        public string PeriodCode { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember] 
        public string CourseDate { get; set; }
        [DataMember]
        public string CourseTime { get; set; }
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
