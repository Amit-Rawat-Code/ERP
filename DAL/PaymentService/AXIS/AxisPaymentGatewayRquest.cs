using BAL.PaymentGateway.AXIS;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL.PaymentService.AXIS
{
    public class AxisPaymentGatewayRquest: IAxisPaymentGatewayRquest
    {
        public async Task<string> InsertAxisPaymentGatewayRequestAsync(AxisPaymentRequestDetail paymentRequestDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@StudentFeeDetails",paymentRequestDetail.StudentFeeDetails),
                new SqlParameter("@StudentCode",paymentRequestDetail.StudentCode),
                new SqlParameter("@OrderId",paymentRequestDetail.OrderId),
                new SqlParameter("@PaymentGatewayId",paymentRequestDetail.PaymentGatewayId),
                new SqlParameter("@Type",paymentRequestDetail.Type),
                new SqlParameter("@RelationshipId",paymentRequestDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentRequestDetail.SessionId),
                new SqlParameter("@FYId",paymentRequestDetail.FYId),
                new SqlParameter("@CreatedBy",paymentRequestDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentRequestDetail.UpdatedBy),
                new SqlParameter("@Action", paymentRequestDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_PaymentRequest", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> RegistrationFormInsertAxisPaymentGatewayRequestAsync(AxisPaymentRequestDetail paymentRequestDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@StudentFeeDetails",paymentRequestDetail.StudentFeeDetails),
                new SqlParameter("@StudentCode",paymentRequestDetail.StudentCode),
                new SqlParameter("@OrderId",paymentRequestDetail.OrderId),
                new SqlParameter("@PaymentGatewayId",paymentRequestDetail.PaymentGatewayId),
                new SqlParameter("@Type",paymentRequestDetail.Type),
                new SqlParameter("@RelationshipId",paymentRequestDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentRequestDetail.SessionId),
                new SqlParameter("@FYId",paymentRequestDetail.FYId),
                new SqlParameter("@CreatedBy",paymentRequestDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentRequestDetail.UpdatedBy),
                new SqlParameter("@Amount",paymentRequestDetail.Amount),
                new SqlParameter("@Action", paymentRequestDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_PaymentRequest_RegistrationSale]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
