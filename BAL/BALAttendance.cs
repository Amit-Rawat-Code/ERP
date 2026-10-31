using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    [DataContract]
    public class EmpAttendance : EmployeeDetails
    {
        #region Leave Type Master
        [DataMember]
        public string LeaveTypeCode { get; set; }
        [DataMember]
        public string LeaveType { get; set; }
        [DataMember]
        public string TotalLeaves { get; set; }
        #endregion

        #region Abbreviation Master
        [DataMember]
        public string AbbreviationCode { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Abbreviation { get; set; }
        [DataMember]
        public string AbbrTypeId { get; set; }
        [DataMember]
        public string PrintSeq { get; set; }
        [DataMember]
        public string AbbrGroup { get; set; }
        //[DataMember]
        //public string ClassId { get; set; }
        //[DataMember]
        //public string SectionId { get; set; }
        //[DataMember]
        //public string BranchId { get; set; }
        //[DataMember]
        //public string StreamId { get; set; }

        //[DataMember]
        //public string SrNo { get; set; }
        [DataMember]
        public string AbbreviationWeight { get; set; }

        [DataMember]
        public string GroupAbbreviation { get; set; }
        [DataMember]
        public string DeductionDays { get; set; }

        [DataMember]
        public string Valuetype { get; set; }
        [DataMember]
        public string CalculationType { get; set; }
        #endregion

        [DataMember] public string Remarks { get; set; }
    }

    public class EmployeeAttendance: EmployeeDetails
    {
        #region Employee Attendance Master
        [DataMember]
        public string EmployeeAttendanceLists { get; set; }

        [DataMember]
        public string AttendanceDate { get; set; }

        [DataMember]
        public string AbbreviationCode { get; set; }
        [DataMember]
        public bool IsAttendanceLock { get; set; }

        #endregion
    }

    public class EmployeeLeave: EmployeeDetails
    {
        #region Employee Leave
        [DataMember]
        public string LeaveTypeCode { get; set; }
        [DataMember]
        public string LeaveApprovalStatusByDates { get; set; }

        [DataMember]
        public string LeaveFrom { get; set; }
        [DataMember]
        public string LeaveFor { get; set; }
        [DataMember]
        public string LeaveTo { get; set; }
        [DataMember]
        public string LeaveReason { get; set; }
        [DataMember]
        public string Remarks { get; set; }
        [DataMember]
        public string CommunicationPrefferedMode { get; set; }
        [DataMember]
        public string OnLeaveContactNo { get; set; }
        [DataMember]
        public string OnLeaveAddress { get; set; }
        [DataMember]
        public string IsLeaveRecieved { get; set; }
        [DataMember]
        public string IsApproved { get; set; }
        [DataMember]
        public string InAbsenceResponsibleEmployeeId { get; set; }
        [DataMember]
        public string ApprovedFrom { get; set; }
        [DataMember]
        public string ApprovedTo { get; set; }
        [DataMember]
        public string ApprovedByEmployeCode { get; set; }
        #endregion
    }

    public class LeaveApprovalByLevel : EmployeeDetails
    {
        #region Employee Leave
        [DataMember]
        public string DateOfApplicable { get; set; }

        [DataMember]
        public string TypeOfApproval { get; set; }
        [DataMember]
        public string FirstApprovalAuthority { get; set; }
        [DataMember]
        public string SeconedApprovalAuthority { get; set; }
        [DataMember]
        public string LeaveReason { get; set; }
        [DataMember]
        public string Remarks { get; set; }
        [DataMember]
        public string CommunicationPrefferedMode { get; set; }
        [DataMember]
        public string OnLeaveContactNo { get; set; }
        [DataMember]
        public string OnLeaveAddress { get; set; }
        [DataMember]
        public string IsLeaveRecieved { get; set; }
        [DataMember]
        public string IsApproved { get; set; }
        [DataMember]
        public string InAbsenceResponsibleEmployeeId { get; set; }
        [DataMember]
        public string ApprovedFrom { get; set; }
        [DataMember]
        public string ApprovedTo { get; set; }
        #endregion
    }
    public class BALEmployeeAttendanceDateWiseReport : Common
    {
        [DataMember]
        public string AbbrTypeId { get; set; }
        [DataMember]
        public string DepartmentId { get; set; }
        [DataMember]
        public string DesignationId { get; set; }
        [DataMember]
        public string EmployeeId { get; set; }

    }
    public class BALStudentAttendanceDateWiseReport : Common
    {
        [DataMember]
        public string AbbrTypeId { get; set; }
    }
    public class BALStudentEnquiryReport : Common
    {
   
    }
    public class BALEmployeeLeaveStatusReport : Common
    {
        [DataMember]
        public string DepartmentCode { get; set; }
        [DataMember]
        public string DesignationCode { get; set; }
    }

}
//     