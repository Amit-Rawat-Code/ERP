using BAL.PaymentGateway.HDFC;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL.PaymentService.HDFC
{
    public class HDFCPaymentGatewayResponse : IHDFCPaymentGatewayResponse
    {
        public async Task<string> InsertHDFCPaymentGatewayResponseAsync(HDFCPaymentResponseDetail paymentResponseDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@OrderId",paymentResponseDetail.OrderId),
                new SqlParameter("@BankRefId",paymentResponseDetail.BankRefId),
                new SqlParameter("@ResponseDateTime",paymentResponseDetail.ResponseDateTime),
                new SqlParameter("@Amount",paymentResponseDetail.Amount),
                new SqlParameter("@OrderStatus",paymentResponseDetail.OrderStatus),
                new SqlParameter("@GatewayOrderStatus",paymentResponseDetail.GatewayOrderStatus),
                new SqlParameter("@RelationshipId",paymentResponseDetail.RelationshipId),
                new SqlParameter("@PaymentGatewayId",paymentResponseDetail.PaymentGatewayId),
                new SqlParameter("@SessionId",paymentResponseDetail.SessionId),
                new SqlParameter("@FYId",paymentResponseDetail.FYId),
                new SqlParameter("@CreatedBy",paymentResponseDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentResponseDetail.UpdatedBy),
                new SqlParameter("@Action", paymentResponseDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_PaymentResponse", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertHDFCPaymentGatewayResponseOnlyAsync(HDFCPaymentResponseDetail paymentResponseDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@OrderId",paymentResponseDetail.OrderId),
                new SqlParameter("@BankRefId",paymentResponseDetail.BankRefId),
                new SqlParameter("@ResponseDateTime",paymentResponseDetail.ResponseDateTime),
                new SqlParameter("@Amount",paymentResponseDetail.Amount),
                new SqlParameter("@GatewayOrderStatus",paymentResponseDetail.GatewayOrderStatus),
                new SqlParameter("@RelationshipId",paymentResponseDetail.RelationshipId),
                new SqlParameter("@PaymentGatewayId",paymentResponseDetail.PaymentGatewayId),
                new SqlParameter("@SessionId",paymentResponseDetail.SessionId),
                new SqlParameter("@FYId",paymentResponseDetail.FYId),
                new SqlParameter("@CreatedBy",paymentResponseDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentResponseDetail.UpdatedBy),
                new SqlParameter("@Action", paymentResponseDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_InsertPaymentResponseOnly", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> SetAsfailurePaymentAsync(HDFCPaymentResponseDetail paymentResponseDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@OrderId",paymentResponseDetail.OrderId),
                new SqlParameter("@OrderStatus",paymentResponseDetail.OrderStatus),
                new SqlParameter("@RelationshipId",paymentResponseDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentResponseDetail.SessionId),
                new SqlParameter("@FYId",paymentResponseDetail.FYId),
                new SqlParameter("@CreatedBy",paymentResponseDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentResponseDetail.UpdatedBy),
                new SqlParameter("@Action", paymentResponseDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_DeclinePaymentRequest", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> GenerateFeeReceiptAsync(HDFCPaymentResponseDetail paymentResponseDetail)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@OrderId",paymentResponseDetail.OrderId),
                new SqlParameter("@BankRefId",paymentResponseDetail.BankRefId),
                new SqlParameter("@ResponseDateTime",paymentResponseDetail.ResponseDateTime),
                new SqlParameter("@Amount",paymentResponseDetail.Amount),
                new SqlParameter("@OrderStatus",paymentResponseDetail.OrderStatus),
                new SqlParameter("@RelationshipId",paymentResponseDetail.RelationshipId),
                new SqlParameter("@SessionId",paymentResponseDetail.SessionId),
                new SqlParameter("@FYId",paymentResponseDetail.FYId),
                new SqlParameter("@CreatedBy",paymentResponseDetail.CreatedBy),
                new SqlParameter("@UpdatedBy",paymentResponseDetail.UpdatedBy),
                new SqlParameter("@Action", paymentResponseDetail.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_GenerateOnlineFeeReceipt", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}
