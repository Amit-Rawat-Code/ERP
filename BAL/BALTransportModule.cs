using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    [DataContract]

    public class BalVehicleTypeMaster : Common
    {
        [DataMember]
        public string VehicleType { get; set; }
    }

    public class BalVehicleOwnerMaster : Common
    {
        [DataMember]
        public string VehicleOwnerName { get; set; }
        [DataMember]
        public string Contact { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public string VehicleCategory { get; set; }
    }

    public class BalVehicleMaster : Common
    {
        [DataMember]
        public string VehicleTypeCode { get; set; }
        [DataMember]
        public string VehicleUniqueID { get; set; }
        [DataMember]
        public string VehicleNumber { get; set; }
        [DataMember]
        public string VehicleRegDate { get; set; }
        [DataMember]
        public string VehicleCategory { get; set; }
        [DataMember]
        public string VehicleOwnerCode { get; set; }
        [DataMember]
        public string VehicleChasisNumber { get; set; }
        [DataMember]
        public string FitnessExpiryDate { get; set; }
        [DataMember]
        public string PermitExpiryDate { get; set; }
        [DataMember]
        public string InsuranceExpiryDate { get; set; }
        [DataMember]
        public string PollutionExpiryDate { get; set; }
        [DataMember]
        public string VehicleCapacity { get; set; }
        [DataMember]
        public string RouteCode { get; set; }
        [DataMember]
        public string Stoppage { get; set; }
    }

    public class BalVehicleStoppageMaster : Common
    {
        [DataMember]
        public string Stoppage { get; set; }
        [DataMember]
        public string Longitude { get; set; }
        [DataMember]
        public string Lattitude { get; set; }
        [DataMember]
        public string Radius { get; set; }
        [DataMember]
        public string RouteCode { get; set; }
    }

    public class BalVehicleRouteMaster:Common
    {
        [DataMember]
        public string RouteName { get; set; }
        [DataMember]
        public string RouteDistance { get; set; }
        [DataMember]
        public string Route_stopages { get; set; }
        [DataMember]
        public string StoppageCode { get; set; }
        [DataMember]
        public string RouteCode { get; set; }
    }
    public class BalTransportModule:Common
    {
        [DataMember]
        public string Contact { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public string VehicleTypeCode { get; set; }
        [DataMember]
        public string VehicleOwnerName { get; set; }
        [DataMember]
        public string VehicleOwnerCode { get; set; }
        [DataMember]
        public string VehicleVendor { get; set; }
        [DataMember]
        public string VehicleCode { get; set; }
        [DataMember]
        public string VehicleNumber { get; set; }
        [DataMember]
        public string VehicleRegDate { get; set; }
        [DataMember]
        public string FitnessExpiryDate { get; set; }
        [DataMember]
        public string PermitExpiryDate { get; set; }
        [DataMember]
        public string InsuranceExpiryDate { get; set; }
        [DataMember]
        public string PollutionExpiryDate { get; set; }

        [DataMember]
        public int VehicleCapacity { get; set; }

        [DataMember]
        public int VehicleChasisNumber { get; set; }

        [DataMember]
        public string Stoppage { get; set; }

        [DataMember]
        public string Longitude { get; set; }

        [DataMember]
        public string Lattitude { get; set; }

        [DataMember]
        public int Radius { get; set; }

        [DataMember]
        public string RouteName { get; set; }

        [DataMember]
        public string RouteDistance { get; set; }

        [DataMember]
        public string Route_stopages { get; set; }

        [DataMember]
        public string RouteCode { get; set; }
        [DataMember]
        public string FareCode { get; set; }
        [DataMember]
        public string FareAmount { get; set; }
        [DataMember]
        public string DistanceFrom { get; set; }
        [DataMember]
        public string DistanceTo { get; set; }

        [DataMember]
        public List<string> PhotoIdList { get; set; }

        [DataMember]
        public string AlbumIcon { get; set; }
        [DataMember]
        public string PhotoId { get; set; }
        [DataMember]
        public string DriverCode { get; set; }
        [DataMember]
        public string DriverName { get; set; }
        [DataMember]
        public string DLNumber { get; set; }
        [DataMember]
        public string Adhaar { get; set; }
        [DataMember]
        public string StoppageNames { get; set; }
        [DataMember]
        public string TransId { get; set; }
        [DataMember]
        public string ConsessionDisCode { get; set; }
        [DataMember]
        public string Route_Vehicle_Student_List { get; set; }
        [DataMember]
        public string StudentVehicleRouteMappingId { get; set; }
        [DataMember]
        public string Srno { get; set; }
        [DataMember]
        public string Father { get; set; }
        [DataMember]
        public string ApplicableDate { get; set; }
        [DataMember]
        public string DeactivationDate { get; set; }
        [DataMember]
        public string TripMode { get; set; }
        [DataMember]
        public string ConcessionHeadCode { get; set; }
        [DataMember]
        public string discAmount { get; set; }
        [DataMember]
        public string NetAmount { get; set; }
        [DataMember]
        public string AdmissionNo { get; set; }
    }
    public class VehicleReportList
    {
        [DataMember]
        public string VehicleNumber { get; set; }
        [DataMember]
        public List<StudentDetailsList> StudentDetails { get; set; }
        [DataMember]
        public string DriverName { get; set; }
        [DataMember]
        public string VehicleUID { get; set; }
        [DataMember]
        public string VehicleCapacity { get; set; }
        
    }
    public class StudentDetailsList
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
//VehicleCapacity