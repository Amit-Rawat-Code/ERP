using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

public sealed class SqlDBHelper
{
    public static readonly SqlDBHelper sqlDBHelper = new SqlDBHelper();
    public string msg;

    //For Development
    public const string CONNECTION_STRING = "Data Source=HP021-3;Initial Catalog=db_SEFERP;Integrated Security=True";
    //public const string CONNECTION_STRING = @"Data Source=DEVELOPMENT-SER\DEVELOPMENT; DATABASE=db_SEFERP; UID=sa;PASSWORD=admin@1234; Pooling=True;";
    //For EducareStaging
    //public const string CONNECTION_STRING = @"Data Source=3.7.170.215; DATABASE=db_EducareStaging; UID=EduCare_ID;PASSWORD=EduCare_AH#@!; Pooling=True;";

    //For EducaretESTING
    //public const string CONNECTION_STRING = @"Data Source=3.7.170.215; DATABASE=db_educare_test; UID=EduCare_ID;PASSWORD=EduCare_AH#@!; Pooling=True;";

    internal DataTable ExecuteSelectCommand(string CommandName, CommandType cmdType)
    {
        DataTable table = null;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;

                try
                {
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        table = new DataTable();
                        da.Fill(table);
                    }
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                }
            }
        }

        return table;
    }
    internal DataTable NewExecuteParamerizedSelectCommand(string CommandName, CommandType cmdType, SqlParameter[] param, string BranchCode)
    {        
        DataTable table = new DataTable();
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.Parameters.AddRange(param);
                cmd.CommandTimeout = 30000;

                try
                {
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(table);
                    }
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                }
            }
        }

        return table;
    }
    internal DataTable ExecuteParamerizedSelectCommand(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        DataTable table = new DataTable();

        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.Parameters.AddRange(param);
                cmd.CommandTimeout = 30000;

                try
                {
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(table);
                    }
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                }
            }
        }

        return table;
    }
    internal DataSet ExecuteParamerizedSelectCommand_UsingdataSet(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        DataSet ds = new DataSet();

        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.Parameters.AddRange(param);
                cmd.CommandTimeout = 30000;

                try
                {
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds);
                    }
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                }
            }
        }

        return ds;
    }
    internal DataTable ExecuteParamerizedSelectCommandForSchD(string CommandName, CommandType cmdType, SqlParameter[] param)
    { 
        DataTable table = new DataTable();

        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.Parameters.AddRange(param);
                cmd.CommandTimeout = 30000;

                try
                {
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    da.Fill(table);
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                }
            }
        }

        return table;
    }
    internal DataSet ExecuteParamerizedSelectCommandds(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        DataSet ds = new DataSet();

        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.Parameters.AddRange(param);
                cmd.CommandTimeout = 120;

                try
                {
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds);
                    }
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                }
            }
        }

        return ds;
    }
    // This function will be used to execute CRUD(CRUD) operation of parameterized commands
    internal string ExecuteNonQuery(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        string result = "";
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                param[param.Length - 1].Direction = ParameterDirection.Output;
                param[param.Length - 1].Size = 0x100;
                cmd.Parameters.AddRange(param);

                try
                {
                    cmd.ExecuteNonQuery();
                    result = cmd.Parameters["@result"].Value.ToString();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }

        return result;
    }

    internal string ExecuteNonQueryReturnString(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        string result = "0";
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                param[param.Length - 1].Direction = ParameterDirection.Output;
                param[param.Length - 1].Size = 0x1000;
                cmd.Parameters.AddRange(param);

                try
                {
                    cmd.ExecuteNonQuery();
                    result = cmd.Parameters["@result"].Value.ToString();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }

        return result;
    }

    internal List<string> ExecuteNonQueryReturnMultiString(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        string result1 = "0";
        string result2 = "0";
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                param[param.Length - 1].Direction = ParameterDirection.Output;
                param[param.Length - 1].Size = 0x1000;
                param[param.Length - 2].Direction = ParameterDirection.Output;
                param[param.Length - 2].Size = 0x1000;
                cmd.Parameters.AddRange(param);

                try
                {
                    cmd.ExecuteNonQuery();
                    result1 = cmd.Parameters["@result1"].Value.ToString();
                    result2 = cmd.Parameters["@result2"].Value.ToString();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }
        List<string> result = new List<string>();
        result.Add(result1);
        result.Add(result2);
        return result;
    }
    internal int ExecuteNonQueryReturnInt(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        int result = 0;
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                param[param.Length - 1].Direction = ParameterDirection.Output;
                param[param.Length - 1].Size = 0x100;
                cmd.Parameters.AddRange(param);

                try
                {
                    cmd.ExecuteNonQuery();
                    result = Convert.ToInt32(cmd.Parameters["@result"].Value.ToString());
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }

        return result;
    }
    internal void ExecuteNonQueryForSchD(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.Parameters.AddRange(param);

                try
                {
                    cmd.ExecuteNonQuery();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }
    }
    internal int ExecuteNonQueryReturnInt_UsingTimeOut(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        int result = 0;
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandTimeout = 60;
                cmd.CommandText = CommandName;
                param[param.Length - 1].Direction = ParameterDirection.Output;
                param[param.Length - 1].Size = 0x100;
                cmd.Parameters.AddRange(param);

                try
                {
                    cmd.ExecuteNonQuery();
                    result = Convert.ToInt32(cmd.Parameters["@result"].Value.ToString());
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }

        return result;
    }
    internal int ExecuteNonQueryParamIntTemp(string CommandName, CommandType cmdType, SqlParameter[] param, int parano)
    {
        int result = 0;
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                param[parano].Direction = ParameterDirection.Output;
                param[parano].Size = 0x100;
                cmd.Parameters.AddRange(param);
                try
                {
                    result = cmd.ExecuteNonQuery();
                    if (result == 1)
                    {
                        result = Convert.ToInt32(cmd.Parameters["@result"].Value.ToString());
                    }
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }

        return result;
    }
    internal int ExecuteScalar(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        int result = 0;
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.Parameters.AddRange(param);

                try
                {
                    result = Convert.ToInt32(cmd.ExecuteScalar());
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    msg = ex.Message;
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }

        return result;//(Convert.ToInt32(result) > 0);
    }
    internal string ExecuteNonQueryReturnScalar(string CommandName, CommandType cmdType, SqlParameter[] param)
    {
        string result = "";
        SqlTransaction trans;
        using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();

            }
            trans = con.BeginTransaction();
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.Transaction = trans;
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                param[param.Length - 1].Direction = ParameterDirection.Output;
                param[param.Length - 1].Size = 0x100;
                cmd.Parameters.AddRange(param);
                try
                {
                    cmd.ExecuteNonQuery();
                    result = cmd.Parameters["@result"].Value.ToString();
                    trans.Commit();
                }
                catch 
                {
                    trans.Rollback();
                }
                finally
                {
                    trans.Dispose();
                    con.Close();
                }
            }
        }
        return result;
    }
}