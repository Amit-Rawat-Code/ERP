using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class BALMobileNavigationMenu:Common
    {
        [DataMember]
        public string NavMenuList { get; set; }
        [DataMember]
        public string RoleId { get; set; }
        [DataMember]
        public string ModuleId { get; set; }
        [DataMember]
        public string SubMenuesList { get; set; }
    }

    public class MobileNavigationMenu
    {
        [DataMember]
        public string Menu { get; set; }
        [DataMember]
        public List<SubMenuesList> SubMenu { get; set; }
        [DataMember]
        public int DisplayOrder { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
    }

    public class SubMenuesList
    {
        [DataMember]
        public string SubMenuName { get; set; }
        [DataMember]
        public bool IsAdd { get; set; }
        [DataMember]
        public bool IsEdit { get; set; }
        [DataMember]
        public bool IsDelete { get; set; }
        [DataMember]
        public bool IsPrint { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
        [DataMember]
        public int DisplayOrder { get; set; }

    }
}
