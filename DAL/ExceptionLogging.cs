
using BAL;

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web;

/// <summary>
/// Summary description for ExceptionLogging
/// </summary>
public static class ExceptionLogging
{
    public async static void SendErrorToText(string errormessage,string functionname)
    {
        string Errormsg, FunctioName;

        var line = Environment.NewLine + Environment.NewLine;

        Errormsg = errormessage;
        FunctioName = functionname;
        try
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@ErrorFun", FunctioName),
                new SqlParameter("@ErrorMsg", Errormsg)
            };

            await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryForSchD("USP_ErrorLog", CommandType.StoredProcedure, param.ToArray()));

        }

        catch (Exception e)
        {
            SendErrorToText(e.Message, "SendErrorToText");
        }
    }
}

