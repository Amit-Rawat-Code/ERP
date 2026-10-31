using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class BALNavigationMenu:Common
    {
        [DataMember]
        public string SubMenuesList { get; set; }
        [DataMember]
        public string NavMenuList { get; set; }
        [DataMember]
        public string RoleId { get; set; }
        [DataMember]
        public string ModuleId { get; set; }
        [DataMember]
        public string MenuId { get; set; }
        [DataMember]
        public string SubMenuId { get; set; }
        [DataMember]
        public string RoleList { get; set; }  
        [DataMember]
        public string SchoolRelationShipId { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string PreRoleId { get; set; }
        [DataMember]
        public string PreAssignRoleDate { get; set; }
        [DataMember]
        public string CurrentDate { get; set; }
        [DataMember]
        public string UserList { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public int CountDaysOfSelection { get; set; }
        [DataMember]
        public string TaskDescription { get; set; }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string StudentAttendanceDate { get; set; }
        [DataMember]
        public string UserTypeId { get; set; }
        [DataMember]
        public string EmployeeType { get; set; }
        [DataMember]
        public string AttendanceType { get; set; }
    }
}
