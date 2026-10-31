using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;


namespace BAL.DataTransfer
{
    public class MasterTransferRequest:Common
    {
        [DataMember]
        public string TableRefId { get; set; }
        [DataMember]
        public string TableSchema { get; set; }
        [DataMember]
        public string TableName { get; set; }
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string FromFYId { get; set; }
        [DataMember]
        public int FromSessionId { get; set; }
        [DataMember]
        public string FromClassId { get; set; }
        [DataMember]
        public string FromSectionId { get; set; }
        [DataMember]
        public string ClassId { get; set; }
        [DataMember]
        public string SectionId { get; set; }
        [DataMember]
        public string TypeofAdmission { get; set; }
        [DataMember]
        public string ProStatus { get; set; }
        [DataMember]
        public List<MasterList> MasterList { get; set; } = new List<MasterList>();
    }
    public class MasterList
    {
        public string TableName { get; set; }

    }    
}
