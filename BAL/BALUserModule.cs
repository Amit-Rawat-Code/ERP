using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class BALUserMaster:Common
    {
        [DataMember]
        public string ProfileName { get; set; }
        [DataMember]
        public string ProfilePic { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string  Password { get; set; }
        [DataMember]
        public string MobileNo { get; set; }
        [DataMember]
        public string EmailId { get; set; }
        [DataMember]
        public int? UserTypeId { get; set; }
        [DataMember]
        public string SessionsData { get; set; }
        [DataMember]
        public string EntitiesData { get; set; }
        [DataMember]
        public int ActiveStatus { get; set; }
    }

    public class BALConnectionConnector
    {
        [DataMember]
        public string BranchUrl { get; set; }
    }

    public class BALAuthentication:Common
    {
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string Password { get; set; }

        [DataMember]
        public string GSMID { get; set; }
        [DataMember]
        public string LastLoginWith { get; set; }

    }
}
