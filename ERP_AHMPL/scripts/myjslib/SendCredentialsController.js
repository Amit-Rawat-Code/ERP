app.SendCredentialsController = function ($scope, $element, $filter, myService)
{
    $scope.displayMemberData = true;
    $scope.chkRowAll = function ()
    {
        for (var index = 0; index < $scope.MemberLists.length; index++)
        {
            $scope.MemberLists[index].chkAllow = $scope.chkAll;
        }
    }
    $scope.getCursorPointer = function (text)
    {
        var curPos = document.getElementById("txtSMSTemplateDetail").selectionStart;      
        let x = $("#txtSMSTemplateDetail").val();
        let text_to_insert = text;
        var jk = x.slice(0, curPos) + text_to_insert;
        $("#txtSMSTemplateDetail").val(x.slice(0, curPos) + text_to_insert + x.slice(curPos));
        $scope.SMSTemplateDetail = x.slice(0, curPos) + text_to_insert + x.slice(curPos);
        var len = jk.length;
        if (document.getElementById("txtSMSTemplateDetail").setSelectionRange)
        {
            document.getElementById("txtSMSTemplateDetail").focus();
            document.getElementById("txtSMSTemplateDetail").setSelectionRange(len, len);
        }
    }
    $scope.chkUncheck = function ()
    {
        $scope.flag = true;
        for (var index = 0; index < $scope.MemberLists.length; index++)
        {
            if ($scope.MemberLists[index].chkAllow == false) {
                $scope.flag = false;
                break;
            }
        }
        $scope.chkAll = $scope.flag;
    }
    $scope.DisplayClassSection = function ()
    {
        if ($scope.UserType == 'Student')
        {
            $scope.ShowOnlyOnStudent = false;
        }
        else
        {
            $scope.ShowOnlyOnStudent = true;
        }
    };

    $scope.DisplayClassSection();

    $scope.getValue = function (text)
    {
        $scope.getCursorPointer(text);       
    }

    $scope.GetSubjectByUserType = function ()
    {
        $scope.displayMemberData = true;
        $scope.SMSTemplateDetail = "";
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.UserType = $scope.UserType;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/SMSTransactionApi/GetSendCredentials', collectionobj);
        getData.then(function (response)
        {
            $scope.SMSSubjectList = response.data;
        });
    };
    $scope.GetSMSTemplateName = function ()
    {
        $scope.displayMemberData = true;
        $scope.SMSTemplateDetail = "";
        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.UserType = $scope.UserType;
        collectionobj.SmsSubjectCode = $scope.SmsSubject;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/SMSTransactionApi/GetSendCredentials', collectionobj);
        getData.then(function (response)
        {
            $scope.SMSTemplateNameList = response.data;
        });
    };
    $scope.GetSMSTemplateDetail = function ()
    {
        $scope.displayMemberData = true;
        $scope.SMSTemplateDetail = "";
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.UserType = $scope.UserType;
        collectionobj.SmsSubjectCode = $scope.SmsSubject;
        collectionobj.SmsTemplateCode = $scope.SMSTemplateName;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/SMSTransactionApi/GetSendCredentials', collectionobj);
        getData.then(function (response)
        {
            $scope.SMSTemplateDetail = response.data[0].SmsTemplateDetail;
        });
    };
    $scope.GetAllStudentForSendCredential = function ()
    {
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.Action = "4";
            collectionobj.UserType = $scope.UserType;
            if ($scope.UserType == 'Student')
            {
                if (($filter('filter')($scope.Sections, { 'chk': true }, true)).length > 0)
                {
                    var SectionCode = JSON.stringify($scope.ReturnArray($scope.Sections, "Code", ',', 'chk', true));
                    collectionobj.ListofSelectedClass = SectionCode;
                }
                else
                {
                    showMsgBox("Select At Least One Class Section.");
                    return;
                }
            }
            else
            {
                collectionobj.ListofSelectedClass = '';
            }
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', '../Api/SMSTransactionApi/GetSendCredentials', collectionobj);
            getData.then(function (response)
            {
                if (response.data.length > 0)
                {
                    $scope.MemberLists = response.data;
                    $scope.displayMemberData = false;
                    $.each(response.data, function (i, val)
                    {
                        $scope.DuplicateSMSTemplateDetail = $scope.SMSTemplateDetail;
                        var isContainsName = $scope.SMSTemplateDetail.indexOf('{{SchoolCode}}') > -1;
                        var isContainsUserName = $scope.SMSTemplateDetail.indexOf('{{UserName}}') > -1;
                        var isContainsPassword = $scope.SMSTemplateDetail.indexOf('{{Password}}') > -1;
                        if (isContainsName == true)
                        {
                            $scope.DuplicateSMSTemplateDetail = $scope.DuplicateSMSTemplateDetail.replace("{{SchoolCode}}", "School Code: " + val.SchoolCode);
                        }
                        if (isContainsUserName == true)
                        {
                            $scope.DuplicateSMSTemplateDetail = $scope.DuplicateSMSTemplateDetail.replace("{{UserName}}", "User Name: " + val.UserName);
                        }
                        if (isContainsPassword == true)
                        {
                            $scope.DuplicateSMSTemplateDetail = $scope.DuplicateSMSTemplateDetail.replace("{{Password}}", "Password: " + val.Password);
                        }
                        $scope.MemberLists[i].SMSTemplateDetail = $scope.DuplicateSMSTemplateDetail;
                    });
                }
                else
                {
                    $scope.displayMemberData = true;
                    showMsgBox("No Records Found.");
                }
            });
        }
    };

    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            if (($filter('filter')($scope.MemberLists, { 'chkAllow': true }, true)).length > 0)
            {
                var collectionobj = {};
                collectionobj.UserType = $scope.UserType;
                collectionobj.SmsSubjectCode = $scope.SmsSubject;
                collectionobj.ListofSelectedClass = JSON.stringify($filter('filter')($scope.Sections, { 'chk': true }));
                collectionobj.SmsTemplateCode = $scope.SMSTemplateName;
                collectionobj.ListofSelectedStudentsOrStaff = JSON.stringify($filter('filter')($scope.MemberLists, { 'chkAllow': true }));
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.CreatedBy = userid;
                collectionobj.Action = "1";

                var getData = myService.methode('POST', '../Api/SMSTransactionApi/InsertSendSMSCredentials', collectionobj);
                getData.then(function (response)
                {
                    if (Number(response.data.Sms_Result) > 0)
                    {
                        if (response.data.Result == "1")
                        {
                            showMsgBox('999', "Send", "SMS Sent Successfully.", 'success', 'btn-success');
                            $scope.ClearControl(1);
                        }
                    }
                    else {
                        showMsgBox(response.data.Sms_Result);
                    }
                });
            }
            else
            {
                showMsgBox("Select Atleast One Member For Send Credentials.");
            }
        }
    };

}