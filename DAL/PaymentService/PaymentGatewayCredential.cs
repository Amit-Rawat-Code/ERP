using Newtonsoft.Json;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace BAL.PaymentGateway
{
    public class PaymentGatewayCredential : IPaymentGatewayCredential
    {
        public List<GatewayCredentials> GetPaymentGateWay(PaymentGateway paymentGateway)
        {
            List<GatewayCredentials> gatewayCredentials = null;
            DataTable dt = GetGateWayCredential(paymentGateway);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    if (dr["JSON"] != null && dr["JSON"].ToString() != "")
                    {
                        gatewayCredentials = JsonConvert.DeserializeObject<List<GatewayCredentials>>(dr["JSON"].ToString());
                    }
                }
            }

            return gatewayCredentials;
        }
        public DataTable GetGateWayCredential(PaymentGateway paymentGateway)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@RelationshipId",paymentGateway.RelationshipId),
                new SqlParameter("@Type",paymentGateway.Type),
                new SqlParameter("@APIType",paymentGateway.APIType)
             };
            return SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_PaymentGatewayDetails]", CommandType.StoredProcedure, param.ToArray());
        }
    }
}
