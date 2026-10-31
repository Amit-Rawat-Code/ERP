using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class BALFeeStructureGroup : Common
    {
        [DataMember]
        public string FeeStructureGroupName { get; set; }
        [DataMember]
        public string Abbreviation { get; set; }
        
    }
    public class BALFeeHead : Common
    {
        [DataMember]
        public string FeeHeadName { get; set; }
        [DataMember]
        public string Frequency { get; set; }
        [DataMember]
        public string DueFromMonth { get; set; }
        [DataMember]
        public string HeadType { get; set; }
        [DataMember]
        public string UnacruedLedgerCode { get; set; }
        [DataMember]
        public string CorpusLedgerCode { get; set; }
        [DataMember]
        public string DepositCode { get; set; }
        [DataMember]
        public string ConcessionLedgerCode { get; set; }
        [DataMember]
        public string AccountNumber { get; set; }
        [DataMember]
        public string IsFeeRefundable { get; set; }
        [DataMember]
        public string IsMonthlyBreakupReq { get; set; }
        [DataMember]
        public string IsShowInCertificate { get; set; }
    }
    public class BALClassFeeStructure : Common
    {
        [DataMember]
        public string FeeHeadCode { get; set; }
        [DataMember]
        public string NetAmt { get; set; }
        [DataMember]
        public string FeeStructureGroupCode { get; set; }
        //[DataMember]
        //public string StreamCode { get; set; }
        [DataMember]
        public string FeeStructureData { get; set; }
    }
    public class BALConcession: Common
    {
        [DataMember]
        public string ConcessionHeadName { get; set; }
        
    }
    public class BALConcessionFeeHeadMap : Common
    {
        [DataMember]
        public string ConsessionFeeHeadMapData { get; set; }
        [DataMember]
        public string ConcessionHeadCode { get; set; }
    }
    public class BALInstallmentMaster : Common
    {
        [DataMember]
        public string InstallmentName { get; set; }
        [DataMember]
        public string DueOn { get; set; }
        [DataMember]
        public string LastDate { get; set; }
    }
    public class BALInstallmentMappingMaster : Common
    {
        [DataMember]
        public string MonthList { get; set; }
        [DataMember]
        public string FeeStructure { get; set; }
        [DataMember]
        public string InstallmentCode { get; set; }
        [DataMember]
        public string FeeStructureGroupCode { get; set; }
        

    }

    public class BALConcessionOnFeeStructure : Common
    {
        [DataMember]
        public string InstallmentList { get; set; }
        [DataMember]
        public string ConcessionheadCode { get; set; }
        [DataMember]
        public string FeeStructureGroupCode { get; set; }


    }

    public class BALFeeDeposit : Common
    {
        [DataMember]
        public string PaymentOrderId { get; set; }
        [DataMember]
        public string ClearingDate { get; set; }
        [DataMember]
        public string BankRefNo { get; set; }
        [DataMember]
        public string InstallmentCode { get; set; }
        [DataMember]
        public string InstallmentList { get; set; }
        [DataMember]
        public string ConcessionList { get; set; }
        [DataMember]
        public string SundryList { get; set; }
        [DataMember]
        public string ConcessionheadCode { get; set; }
        [DataMember]
        public string FeeStructureGroupCode { get; set; }
        [DataMember]
        public string BillNo { get; set; }
        [DataMember]
        public string BillDate { get; set; }
        [DataMember]
        public string ChqDate { get; set; }
        [DataMember]
        public string AdvCF { get; set; }
        [DataMember]
        public string ChqNo { get; set; }
        [DataMember]
        public string BankACCode { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string EntryMode { get; set; }
        [DataMember]
        public string FeeStructures { get; set; }
        [DataMember]
        public string FeeCancelTransId { get; set; }
        [DataMember]
        public string IsFromMerit { get; set; }
        [DataMember]
        public string PayMode { get; set; }
        [DataMember]
        public string TotalRect { get; set; }
        [DataMember]
        public string AdjBroughtForward { get; set; }
        [DataMember]
        public string CarriedForward { get; set; }
        [DataMember]
        public string ChequeBounceAmt { get; set; }
        [DataMember]
        public bool ApplyConOnPaybleAmount { get; set; }
        [DataMember]
        public string AdjustAmount { get; set; }
        [DataMember]
        public string ClngDate { get; set; }
        [DataMember]
        public string ConcessionCategoryId { get; set; }
        [DataMember]
        public string ConFrom { get; set; }
    }
    public class StudentFeeDetails
    {
        [DataMember]
        public List<FeeInstallment> FeeInstallment { get; set; } = new List<FeeInstallment>();
        [DataMember]
        public DataTable FeeStructure { get; set; } = new DataTable();
        [DataMember]
        public DataTable FeeDues { get; set; } = new DataTable();
        [DataMember]
        public DataTable FeeDepositHistory { get; set; } = new DataTable();
        //[DataMember]
        //public DataTable Table4 { get; set; } = new DataTable();
        //[DataMember]
        //public DataTable Table5 { get; set; } = new DataTable();
    }
    public class FeeInstallment
    {
        [DataMember]
        public bool Chk { get; set; }
        [DataMember]
        public string SrNo { get; set; }
        [DataMember]
        public string StudentCode { get; set; }
        [DataMember]
        public string InstallmentCode { get; set; }
        [DataMember]
        public string InstallmentName { get; set; }
        [DataMember]
        public string DueStatus { get; set; }
        [DataMember]
        public string DueDate { get; set; }
        [DataMember]
        public string PayableAmt{ get; set; }
        [DataMember]
        public string Paid { get; set; }
        [DataMember]
        public string NetPayable { get; set; }
        [DataMember]
        public List<FeeHeadDetails> FeeHeadDetails { get; set; }
        
    }
    public class FeeHeadDetails
    {
        [DataMember]
        public string FeeHeadCode { get; set; }
        [DataMember]
        public string FeeHeadName { get; set; }
        [DataMember]
        public string HeadType { get; set; }
        [DataMember]
        public string Month { get; set; }
        [DataMember]
        public string Frequency { get; set; }
        [DataMember]
        public string Amount { get; set; }
        [DataMember]
        public string ConcessionAmt { get; set; }
        [DataMember]
        public string PayableAmt { get; set; }
        [DataMember]
        public string Paid { get; set; }
        [DataMember]
        public string PaidStatus { get; set; }
        [DataMember]
        public string NetPayable { get; set; }
    }
    public class FeesDetails : Common
    {
        [DataMember]
       
        public string TransId { get; set; }
        [DataMember]
        public string DueMonth { get; set; }
        [DataMember]
        public string ClassId { get; set; }
        [DataMember]
        public string SectionId { get; set; }
        [DataMember]
        public string BranchId { get; set; }
        [DataMember]
        public string StreamId { get; set; }
        [DataMember]
        public string FeeType { get; set; }
        [DataMember]
        public string FeeCode { get; set; }
        [DataMember]
        public string StudentName { get; set; }
        [DataMember]
        public string AdmissionNo { get; set; }
        [DataMember]
        public string RollNo { get; set; }
        [DataMember]
        public string Mode { get; set; }
        [DataMember]
        public string LastDate { get; set; }
        [DataMember]
        public string AllInstallmentCode { get; set; }
        [DataMember]
        public string AllStdentCode { get; set; }
        [DataMember]
        public string ConFrom { get; set; }
        
    }



    public class BALFeeDueVoucher : Common
    {
        [DataMember]
        public string ClassList { get; set; }
        [DataMember]
        public string InstallmentCode { get; set; }
        [DataMember]
        public string DueOn { get; set; }
        
    }

    public class FeesReceiptCancellation : Common
    {
        [DataMember]
        public string ReceiptCancelId { get; set; }
        [DataMember]
        public string ReceiptCancellationList { get; set; }

    }
    public class FeesAttachments
    {
        [DataMember]
        public string FilePath { get; set; }
        [DataMember]
        public string FileName { get; set; }
    }
}

