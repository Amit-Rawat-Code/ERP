using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    [DataContract]
    public class BStock :Common
    {


    }
    public class Unit: Common
    {
        [DataMember] public string Name { get; set; }
        [DataMember] public string ShortName { get; set; }

    }

    public class ItemGroup : Common
    {
        [DataMember] public string CategoryName { get; set; }
        [DataMember] public string ItemGroupCode { get; set; }
    }
    public class Material : Common
    {
        
        [DataMember] public string GRN_Detail { get; set; }
        [DataMember] public string Sauda_Detail { get; set; }
        [DataMember] public string PaymentAdvice_Detail { get; set; }
        [DataMember] public string StoreCode { get; set; }

    }

    public class HSNCode :Common
    {
        [DataMember] public string CommodityCode { get; set; }
        [DataMember] public string HSNName { get; set; }
        [DataMember] public string GSTPercentage { get; set; }
    }
    public class Inventory : Common
    {
        [DataMember] public string CommodityCode { get; set; }
        [DataMember] public string ItemName { get; set; }
        [DataMember] public string ItemCode { get; set; }
        [DataMember] public string ItemCategoryCode { get; set; }
        [DataMember] public string ItemGroupCode { get; set; }
        [DataMember] public string BaseUnitCode { get; set; }
        [DataMember] public string MaxQty { get; set; }
        [DataMember] public string MinQty { get; set; }
        [DataMember] public string ItemType { get; set; }
        [DataMember] public string VATComCode { get; set; }
    }
    public class Model : Common
    {
        [DataMember] public string ModelName { get; set; }
    }

    public class ItemWiseRateDetails: Common
    {
        [DataMember] public string TransId { get; set; }
        [DataMember] public string IWR_Date { get; set; }
        [DataMember] public string ItemCategoryCode { get; set; }
        [DataMember] public string ItemNameCode { get; set; }
        [DataMember] public string ModelCode { get; set; }
        [DataMember] public string PreferredVender { get; set; }
        [DataMember] public string VenderAddress { get; set; }
        [DataMember] public string Pincode { get; set; }
        [DataMember] public string MobileNo { get; set; }
        [DataMember] public string EmailId { get; set; }
        [DataMember] public string PaymentTerms { get; set; }
        [DataMember] public string UnitPrice { get; set; }
        [DataMember] public string GstRate { get; set; }
        [DataMember] public string TotalAmount { get; set; }
        [DataMember] public string Remark { get; set; }
    }
    public class InventoryReport : Common
    {
      
        [DataMember] public string ItemCategoryCode { get; set; }
        [DataMember] public string ItemNameCode { get; set; }
        [DataMember] public string ItemModelCode { get; set; }
        [DataMember] public string ItemGroupCode { get; set; }
        [DataMember] public string SupplierCode { get; set; }
        [DataMember] public string VoucherType { get; set; }
        [DataMember] public string ItemCode { get; set; }


    }

    public class BMaterial : Common
    {
        [DataMember] public string V_Date { get; set; }
        [DataMember] public string SupplierCode { get; set; }
        [DataMember] public string Address { get; set; }
        [DataMember] public string CityName { get; set; }
        [DataMember] public string GRN_Detail { get; set; }
        //public string CityCode { get; set; }
        [DataMember] public string GSTN { get; set; }
        [DataMember] public string CancelYN { get; set; }
        [DataMember] public string ChallanNo { get; set; }
        [DataMember] public string ChallanDate { get; set; }
        [DataMember] public string TransporterCode { get; set; }
        [DataMember] public string GRNo { get; set; }
        [DataMember] public string GRDate { get; set; }
        [DataMember] public string VehicleNo { get; set; }
        [DataMember] public string GrossWt { get; set; }
        [DataMember] public string TareWt { get; set; }
        [DataMember] public string Remark { get; set; }
        [DataMember] public string BillValue { get; set; }
        [DataMember] public string NetAmt { get; set; }
        [DataMember] public string ApprovalDate { get; set; }
        [DataMember] public string LotNos { get; set; }
        [DataMember] public string SaudaNos { get; set; }

        [DataMember] public string Vatav { get; set; }
        [DataMember] public string Days { get; set; }
        [DataMember] public string DueDate { get; set; }
        [DataMember] public string Rava { get; set; }
        [DataMember] public string Nas { get; set; }
        [DataMember] public string Total { get; set; }
        [DataMember] public string SaudaTransId { get; set; }
        [DataMember] public string FreightAmt { get; set; }
        [DataMember] public string Loading { get; set; }
        [DataMember] public string DefaultExpAccountStructure { get; set; }
        [DataMember] public string ConRatePerBag { get; set; }
        [DataMember] public string ConTotalAmount { get; set; }
        [DataMember] public string ContractorCode { get; set; }
        [DataMember] public string ExpenseCode { get; set; }
        [DataMember] public string SaudaDetailData { get; set; }
        [DataMember] public string V_Type { get; set; }
        [DataMember] public string TransId { get; set; }

    }
    public class Indent:Common
    {
        [DataMember] public string IndentNo { get; set; }
        [DataMember] public string IndentDate { get; set; }
        [DataMember] public string IndentRefNo { get; set; }
        [DataMember] public string IndentRefDate { get; set; }
        [DataMember] public string Indenter { get; set; }
        [DataMember] public string DepartMent { get; set; }
        [DataMember] public string Indent_Detail { get; set; }
        [DataMember] public string V_Date { get; set; }
        [DataMember] public string V_Type { get; set; }
        [DataMember] public string TransId { get; set; }
        [DataMember] public string ItemCode { get; set; }
    }

    public class IndentApproval : Common
    {
        [DataMember] public string IndentApproval_Det { get; set; }
        [DataMember] public string ApprovalNo { get; set; }
        [DataMember] public string ApprovalDate { get; set; }
        [DataMember] public string V_Date { get; set; }
        [DataMember] public string V_Type { get; set; }
        [DataMember] public string ItemCode { get; set; }
        [DataMember] public string IndentNo { get; set; }
        [DataMember] public string IndentDate { get; set; }
        [DataMember] public string IndentRefNo { get; set; }
        [DataMember] public string IndentRefDate { get; set; }
        [DataMember] public string Indenter { get; set; }

        [DataMember] public string DepartMent { get; set; }
    }
    public class PurchaseBill:Common
    {
        [DataMember] public string Purchase_Detail { get; set; }
        [DataMember] public string V_Date { get; set; }
        [DataMember] public string V_Type { get; set; }
        [DataMember] public string SupplierCode { get; set; }
        [DataMember] public string Address { get; set; }
        [DataMember] public string MobileNo { get; set; }
        [DataMember] public string PinCode { get; set; }
        [DataMember] public string PurchaseBillNo { get; set; }
        [DataMember] public string PurchaseBillDate { get; set; }
        [DataMember] public string BillValue { get; set; }
        [DataMember] public string NetAmt { get; set; }
        [DataMember] public string NetQty { get; set; }
        [DataMember] public string Remark { get; set; }
        [DataMember] public string EwayBillNo { get; set; }
        [DataMember] public string EwayBillDate { get; set; }
        [DataMember] public string GrossAmount { get; set; }
        [DataMember] public string GSTN { get; set; }
        [DataMember] public string CancelYN { get; set; }
        [DataMember] public string TaxHeadCode { get; set; }
        [DataMember] public string TaxPercentage { get; set; }
        [DataMember] public string TaxAmount { get; set; }
        [DataMember] public string IsInward { get; set; }
        [DataMember] public string AllItemExpenses { get; set; }
    }
    public class TaxHead : Common
    {
        [DataMember] public string HeadName { get; set; }
        [DataMember] public string CalculationType { get; set; }
        [DataMember] public string PostingAccountType { get; set; }
        [DataMember] public string HeadType { get; set; }

        [DataMember] public string AccountHeadType { get; set; }

    }
    public class PurchaseOrder : Common
    {
        [DataMember] public string PurchaseOrderList { get; set; }
        [DataMember] public string V_Date { get; set; }
        [DataMember] public string V_Type { get; set; }
        [DataMember] public string SupplierCode { get; set; }
        [DataMember] public string Address { get; set; }
        [DataMember] public string MobileNo { get; set; }
        [DataMember] public string PinCode { get; set; }
        [DataMember] public string BillValue { get; set; }
        [DataMember] public string NetAmt { get; set; }
        [DataMember] public string NetQty { get; set; }
        [DataMember] public string Remark { get; set; }
        [DataMember] public string GrossAmount { get; set; }
        [DataMember] public string GSTN { get; set; }
        [DataMember] public string CancelYN { get; set; }
        [DataMember] public string TaxHeadCode { get; set; }
        [DataMember] public string TaxPercentage { get; set; }
        [DataMember] public string TaxAmount { get; set; }
        [DataMember] public string HeaderTitleA { get; set; }
        [DataMember] public string HeaderTitleB { get; set; }
        [DataMember] public string HeaderA { get; set; }
        [DataMember] public string HeaderB { get; set; }
        [DataMember] public string Cond1 { get; set; }
        [DataMember] public string Cond2 { get; set; }
        [DataMember] public string Cond3 { get; set; }
        [DataMember] public string Cond4 { get; set; }
        [DataMember] public string Cond5 { get; set; }
        [DataMember] public string Cond6 { get; set; }
        [DataMember] public string Cond7 { get; set; }
        [DataMember] public string Cond8 { get; set; }
        [DataMember] public string Cond9 { get; set; }
        [DataMember] public string Cond10 { get; set; }
        [DataMember] public string Cond11 { get; set; }
        [DataMember] public string Cond12 { get; set; }
        [DataMember] public string IsInward { get; set; }
        [DataMember] public string CPerson { get; set; }
        [DataMember] public string DelAddress { get; set; }
        [DataMember] public string ToRef { get; set; }
        [DataMember] public string LetterBody { get; set; }
        [DataMember] public string DueDate { get; set; }
        [DataMember] public string PayTermRemarks { get; set; }
        [DataMember] public string PayTermDays { get; set; }
        [DataMember] public string POClose { get; set; }
        [DataMember] public string AllItemExpenses { get; set; }
    }
    public class IssueEntry : Common
    {
        [DataMember] public string IssueNo { get; set; }
        [DataMember] public string IssueDate { get; set; }
        [DataMember] public string SlipNo { get; set; }
        [DataMember] public string RecBy { get; set; }
        [DataMember] public string IssueRefBy { get; set; }
        [DataMember] public string NetAmount { get; set; }
        [DataMember] public string NetQty { get; set; }
        [DataMember] public string DepartMent { get; set; }
        [DataMember] public string Issue_Detail { get; set; }
        [DataMember] public string V_Date { get; set; }
        [DataMember] public string V_Type { get; set; }
        [DataMember] public string ItemCode { get; set; }
    }

    public class OpeningStock : Common
    {
        [DataMember] public string IssueNo { get; set; }
        [DataMember] public string IssueDate { get; set; }
        [DataMember] public string SlipNo { get; set; }
        [DataMember] public string RecBy { get; set; }
        [DataMember] public string IssueRefBy { get; set; }
        [DataMember] public string NetAmount { get; set; }
        [DataMember] public string NetQty { get; set; }
        [DataMember] public string DepartMent { get; set; }
        [DataMember] public string Opening_Detail { get; set; }
        [DataMember] public string DateofOpening { get; set; }
        [DataMember] public string V_Type { get; set; }
        [DataMember] public string ItemCode { get; set; }
    }

    public enum enumGRN_Detail
    {
        SrNo, ItemCode, BaseUnitCode, BillQty, QtyInBags, RecQtyUnitWise, RecQty, Rate, Amount, ExcessQty,
        StoreCode, LotNo, AcceptQty, RejectQty, ApplicationCode, BatchNo, Color, ExpDate, ItemMake, MfgDate,
        ModelCode, Packing, ProdCode, Size
    }

    public enum enumSauda_Detail
    {
        SrNo, ItemCode, UnitCode, StoreCode, LotNo, QtyInBags, QtyPerBagInKG_Net, Rate, Amount
        //, TaxPer, Vatav, Days, Rava, Nas, Total
    }




    public enum enumPartyWiseMaterialEntry
    {
        GENo, Date, Lot, Bg, Net, NtWt, GrWt, GrNetWt, RT, PctRt, AMT, Pct, LoadingAmt, Total, VatPer, VatAmt, GrTotal, CommissionAmt, FreightAmt, TransId
    }
    public enum enumPaymentAdvice_Detail
    {
        SrNo, SaudaNo, Saudadate, ItemCode, LotNo, Vatav, QtyInBags, QtyPerBagInKG_Net, Rate, DueAmount, PaidAmount, PaybleAmount, BalancePaid
    }
 
    
    
}
