using System.Runtime.Serialization;

namespace BAL
{
   public class BALTicket:Common
    {
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string TicketTypeName { get; set; }
        [DataMember]
        public string TicketStatusName { get; set; }      
        [DataMember]
        public string TicketTypeID { get; set; }
        [DataMember]
        public string ModuleID { get; set; }
        [DataMember]
        public string MenuID { get; set; }
        [DataMember]
        public string SubMenuID { get; set; }
        [DataMember]
        public string TicketDescription { get; set; }      
        [DataMember]
        public string TransID_RaisedTicket { get; set; }
        [DataMember]
        public string TicketNo_RaisedTicket { get; set; }
        [DataMember]
        public string TicketDate_RaisedTicket { get; set; }
        [DataMember]
        public string TicketTypeID_RaisedTicket { get; set; }
        [DataMember]
        public string RelationshipId_RaisedTicket { get; set; }
        [DataMember]
        public string CreatedBy_RaisedTicket { get; set; }
        [DataMember]
        public string TicketStatusID { get; set; }
        [DataMember]
        public string ResponseDescription { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string FinalStatus { get; set; }
        [DataMember]
        public string FinalRemark { get; set; }
        [DataMember]
        public string FileName { get; set; }
    }

    public class TicketAttachments
    {
        [DataMember]
        public string FilePath { get; set; }
        [DataMember]
        public string FileName { get; set; }
        [DataMember]
        public string Srno { get; set; }
    }
}
