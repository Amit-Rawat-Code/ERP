using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
   public interface IDALExam_Master
    {
        #region Exam Group Master
        Task<string> InsertUpdateDeleteExamGroupMaster(BALExam obj);
        Task<DataTable> GetExamGroupMaster(BALExam obj);
        #endregion

        #region Exam Group To Exam
        Task<string> InsertUpdateDeleteExamGroupToExamMaster(BALExam obj);
        Task<DataTable> GetExamStructureHead(BALExam obj);
        #endregion

        #region Exam structure Head
        Task<string> InsertUpdateDeleteExamStructureHead(BALExam obj);
        Task<DataTable> GetExamGroupToExamMaster(BALExam obj);
        #endregion

        #region Report Card Component Master
        Task<string> InsertUpdateDeleteReportCardComponentMaster(BALExam obj);
        Task<DataTable> GetReportCardComponentMaster(BALExam obj);
        #endregion

        #region Skill Type Master
        Task<string> InsertUpdateDeleteSkillTypeMaster(BALExam obj);
        Task<DataTable> GetSkillTypeMaster(BALExam obj);
        #endregion

        #region Skill Group Master
        Task<string> InsertUpdateDeleteSkillGroupMaster(BALExam obj);
        Task<DataTable> GetSkillGroupMaster(BALExam obj);
        #endregion

        #region Skill Name Master
        Task<string> InsertUpdateDeleteSkillNameMaster(BALExam obj);
        Task<DataTable> GetSkillNameMaster(BALExam obj);
        #endregion

        #region Skill Grade Master
        Task<string> InsertUpdateDeleteSkillGradeMaster(BALExam obj);
        Task<DataTable> GetSkillGradeMaster(BALExam obj);
        #endregion

        #region Scholastic Group Skill Mapping
        Task<string> InsertUpdateDeleteSGroupSkillMapping(BALExam obj);
        Task<DataTable> GetSGroupSkillMapping(BALExam obj);
        #endregion

        #region CoScholastic Group Skill Mapping
        Task<string> InsertUpdateDeleteCoSGroupSkillMapping(BALExam obj);
        Task<DataTable> GetCoSGroupSkillMapping(BALExam obj);
        #endregion

        #region Teacher Assign Marks Entry For Skills
        Task<string> InsertUpdateDeleteTeacherAssignMarksEntrySKills(BALExam obj);
        Task<DataTable> GetTeacherAssignMarksEntrySKills(BALExam obj);
        #endregion

        #region Teacher Assign Marks Entry For CoSkills
        Task<string> InsertUpdateDeleteTeacherAssignMarksEntryCoSKills(BALExam obj);
        Task<DataTable> GetTeacherAssignMarksEntryCoSKills(BALExam obj);
        #endregion

        #region  Report Card Printing     
        Task<DataTable> GetReportCard(BALExam obj);
        #endregion

        #region Define Remark
        Task<string> InsertUpdateDeleteDefineRemark(BALExam obj);
        Task<DataTable> GetDefineRemark(BALExam obj);
        #endregion

        #region Define Keyword
        Task<string> InsertUpdateDeleteDefineKeyword(BALExam obj);
        Task<DataTable> GetDefineKeyword(BALExam obj);
        #endregion
        #region Upload Principal Signature
        Task<string> InsertUpdateDeleteUploadPrincipalSignature(BALExam obj);
        Task<DataTable> GetPrincipalSignature(BALExam obj);
        #endregion
        #region Upload Class Teacher Signature
        Task<DataTable> GetEmployeeCodeUsingClassScetion(BALExam obj);
        Task<string> InsertUpdateDeleteUploadClassTeacherSignature(BALExam obj);
        Task<DataTable> GetClassTeacherSignature(BALExam obj);
        #endregion
        #region Define Exam Subject Wise
        Task<DataTable> GetSubjectCodeUsingClassSection(BALExam obj);
        Task<DataTable> GetExamByExamGroup(BALExam obj);
        Task<string> InsertUpdateDeleteDefineExamSubjectWise(BALExam obj);
        Task<DataTable> GetDefineExamSubjectWise(BALExam obj);
        #endregion
    }
}
