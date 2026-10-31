using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL.DataTransfer
{
    public class AssessmentTransferRequest : Common
    {
        #region Assessment Transfer
        [DataMember]
        public string TableRefId { get; set; }
        [DataMember]
        public string TableSchema { get; set; }
        [DataMember]
        public string TableName { get; set; }
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string TransferMType { get; set; }
        [DataMember]
        public string FromRelationshipId { get; set; }
        [DataMember]
        public string FromClassCode { get; set; }
        [DataMember]
        public string FromSubjectCode { get; set; }
        [DataMember]
        public string ToClassCode { get; set; }
        [DataMember]
        public string ToSubjectCode { get; set; }
        [DataMember]
        public string TypeofAdmission { get; set; }
        [DataMember]
        public string ProStatus { get; set; }
        [DataMember]
        public List<MasterList> MasterList { get; set; } = new List<MasterList>();
       
    }
    #endregion
}
