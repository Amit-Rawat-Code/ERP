using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    [DataContract]
    public class BALAccount : Common
    {
        [DataMember]
        public string IsGlobalLedger { get; set; }
       
        [DataMember]
        public string UnderGroupCode { get; set; } [DataMember]
        public string MainGroupCode { get; set; } [DataMember]
        public string GroupLevelCode { get; set; } [DataMember]
        public string SubCode { get; set; } [DataMember]
        public string GblSubCode { get; set; } [DataMember] 
        public string TransporterCode { get; set; } [DataMember]
        public string MaxTransID { get; set; } [DataMember]
        public string LedgerSrNo { get; set; }[DataMember]
        public string V_Type { get; set; } [DataMember]
        public decimal? DrAmt { get; set; } [DataMember]
        public decimal? CrAmt { get; set; } [DataMember]
        public string ContraSubCode { get; set; } [DataMember]       
        public string LedgerRequestList { get; set; } [DataMember]
        public string VoucherConfirm { get; set; } [DataMember]
        public string PVDate { get; set; } [DataMember]
        public string CVDate { get; set; } [DataMember]
        public string CVNo { get; set; } [DataMember]
        public string ChequeNo { get; set; } [DataMember]
        public string TransactionNo { get; set; } [DataMember]
        public string TransferMode { get; set; } [DataMember]
        public string ChequeDate { get; set; } [DataMember]
        public string LedgerCode { get; set; } [DataMember]
        public string OpeningMode { get; set; } [DataMember]
        public string GroupName { get; set; } [DataMember]
        public string SysGroup { get; set; } [DataMember]
        public string Nature { get; set; } [DataMember]
        public string LedgerName { get; set; } [DataMember]
        public decimal? OpeningBal { get; set; } [DataMember]
        public int? CreditDays { get; set; } [DataMember]
        public string OpnType { get; set; } [DataMember]
        public string TinNo { get; set; } [DataMember]
        public string TDSYN { get; set; } [DataMember]
        public string TAN { get; set; } [DataMember]
        public string Range { get; set; } [DataMember]
        public string Division { get; set; } [DataMember]
        public string Commisionrate { get; set; } [DataMember]
        public string Commodity { get; set; } [DataMember]
        public string TariffItem { get; set; } [DataMember]
        public string SubHeading { get; set; } [DataMember]
        public string CSTNo { get; set; } [DataMember]
        public string PANNo { get; set; } [DataMember]
        public string TDSNo { get; set; } [DataMember]
        public string AnnexureYN { get; set; } [DataMember]
        public string AnnexureName { get; set; } [DataMember]
        public string FBTReq { get; set; } [DataMember]
        public string RateOfFBT { get; set; } [DataMember]
        public string DepriciationRate { get; set; } [DataMember]
        public string C_Authorities { get; set; } [DataMember]
        public string C_Designation { get; set; } [DataMember]
        public string C_Sector_Circle { get; set; } [DataMember]
        public decimal? LimitAmt { get; set; } [DataMember]
        public string Comment { get; set; } [DataMember]
        public decimal? PerRatio { get; set; } [DataMember]
        public string ChqeuePrintName { get; set; } [DataMember]
        public string IsStopPayment { get; set; } [DataMember]
        public string TDSAC { get; set; } [DataMember]
        public string DeducteeType { get; set; } [DataMember]
        public string TDSNature { get; set; } [DataMember]
        public string DeducteeStatus { get; set; } [DataMember]
        public string TDSPercentage { get; set; } [DataMember]
        public string TDSSection { get; set; } [DataMember]
        public string ExciseNo { get; set; } [DataMember]
        public string BankName { get; set; } [DataMember]
        public string BankBranchName { get; set; } [DataMember]
        public string AccountNo { get; set; } [DataMember]
        public string IFSCCode { get; set; } [DataMember]
        public string NatureCode { get; set; } [DataMember]
        public string SecurityLedger { get; set; } [DataMember]
        public string Department { get; set; } [DataMember]
        public string DrugNo { get; set; } [DataMember]
        public string MfgNo { get; set; } [DataMember]
        public decimal? Interest { get; set; } [DataMember]
        public string PFather { get; set; } [DataMember]
        public decimal? BrokerPer { get; set; } [DataMember]
        public string SectionName { get; set; } [DataMember]
        public string ChallanCode { get; set; } [DataMember]
        public string DeducteeCode { get; set; } [DataMember]
        public string DeducteeName { get; set; } [DataMember]
        public string ResStatus { get; set; } [DataMember]
        public string DedStatus { get; set; } [DataMember]
        public string CategoryCode { get; set; } [DataMember]
        public string CategoryName { get; set; } [DataMember]
        public decimal? CompanyPer { get; set; } [DataMember]
        public decimal? IndPer { get; set; } [DataMember]
        public decimal? LimitFY { get; set; } [DataMember]
        public decimal? LimitST { get; set; } [DataMember]
        public string OpeningData { get; set; } [DataMember]
        public int? PrintSequence { get; set; } [DataMember]
        public string AliasName { get; set; } [DataMember]
        public string Address1 { get; set; } [DataMember]
        public string Address2 { get; set; } [DataMember]
        public string Address3 { get; set; } [DataMember]
        public string Pincode { get; set; } [DataMember]
        public string PhoneNo { get; set; } [DataMember]
        public string MobileNo { get; set; } [DataMember]
        public string EmailId { get; set; } [DataMember]
        public string FaxNo { get; set; } [DataMember]
        public string Website { get; set; } [DataMember]
        public string CountryId { get; set; } [DataMember]
        public string StateId { get; set; } [DataMember]
        public string CityId { get; set; } [DataMember]
        public string EntryNarration { get; set; } [DataMember]
        public string VoucherNarration { get; set; } [DataMember]
        public List<string> CodeList { get; set; } [DataMember]
        public string TransMode { get; set; } [DataMember]
        public string EntryNarr { get; set; } [DataMember]
        public string VoucherNarr { get; set; } [DataMember]
        public string VoucherData { get; set; } [DataMember]
        public string LedgerFilteredList { get; set; } [DataMember]
        public string VoucherType { get; set; } [DataMember]
        public List<VoucherList> VoucherList { get; set; } [DataMember]
        public string NarrationId { get; set; } [DataMember]
        public string Narration { get; set; }
        public int? IsHQ { get; set; }
        public string HOSite { get; set; }
        public string SOSite { get; set; }
        public string HOSOMapingData { get; set; }
        [DataMember]
        public string Date { get; set; }
        [DataMember]
        public string BankSubCode { get; set; }
        [DataMember]
        public string ExcelFormatNo { get; set; }
        [DataMember]
        public string LedgerDataTransID { get; set; }
        [DataMember]
        public string BankCode { get; set; }
        [DataMember]
        public string ExcelData { get; set; }
        [DataMember]
        public string Keys { get; set; }
    }
    public class VoucherList
    {
        [DataMember]
        public string VoucherId { get; set; } 
    }
    public class ChecquePrintDetails : Common
    {
        [DataMember]
        public string BeneficiaryName { get; set; }
        [DataMember]
        public string ChequePrintAmount { get; set; }
        [DataMember]
        public string ChequePrintDate { get; set; }
        [DataMember]
        public string ACPayee { get; set; }
        [DataMember]
        public string Bank { get; set; }
    }
}
