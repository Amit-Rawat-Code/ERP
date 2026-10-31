using BAL.PaymentGateway.ICICI;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DAL.PaymentService.ICICI
{
    public class ICICIPaymentGatewayResponse: IICICIPaymentGatewayResponse
    {
        public string GenerateSHA512String(string inputString)
        {
            SHA512 sha512 = SHA512Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha512.ComputeHash(bytes);
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i <= hash.Length - 1; i++)
            {
                stringBuilder.Append(hash[i].ToString("x2"));
            }
            return stringBuilder.ToString();
        }
        public async Task<string> InsertICICIPaymentGatewayResponseAsync(ICICIPaymentResponseDetail paymentResponseDetail)
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

        public async Task<string> InsertICICIPaymentGatewayResponseOnlyAsync(ICICIPaymentResponseDetail paymentResponseDetail)
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

        public async Task<string> SetAsfailurePaymentAsync(ICICIPaymentResponseDetail paymentResponseDetail)
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

        public async Task<string> GenerateFeeReceiptAsync(ICICIPaymentResponseDetail paymentResponseDetail)
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
