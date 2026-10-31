using System.Runtime.Serialization;
namespace BAL.DataTransfer
{
    public class LedgerTransferRequest : Common
    {
        [DataMember]
        public string TransferLedgerList { get; set; }
        [DataMember]
        public int ToSessionId { get; set; }
        [DataMember]
        public int ToFYId { get; set; }
    }
}
