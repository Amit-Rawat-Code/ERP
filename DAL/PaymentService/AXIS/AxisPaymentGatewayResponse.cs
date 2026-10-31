using BAL.PaymentGateway.AXIS;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL.PaymentService.AXIS
{
    public class AxisPaymentGatewayResponse: IAxisPaymentGatewayResponse
    {
        public async Task<string> InsertAxisPaymentGatewayResponseAsync(AxisPaymentResponseDetail paymentResponseDetail)
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

        public async Task<string> InsertAxisPaymentGatewayResponseOnlyAsync(AxisPaymentResponseDetail paymentResponseDetail)
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

        public async Task<string> SetAsfailurePaymentAsync(AxisPaymentResponseDetail paymentResponseDetail)
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

        public async Task<string> GenerateFeeReceiptAsync(AxisPaymentResponseDetail paymentResponseDetail)
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
