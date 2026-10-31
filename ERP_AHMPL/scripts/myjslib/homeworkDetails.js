app.homeworkDetailsController = function ($scope, $element, myService)
{ 
    $('#ddlSection').change(function () {
        $('#ddlHomeworkTopic').html('');
        $scope.HomeworkTopic()
  
    });
    $('#ddlClass').change(function () { 
        $scope.BindEmpSection()
  
    }); 
    $('#ddlHomeworkTopic').change(function () { 
        $scope.Homeworkfor();
    });

    $scope.Homeworkfor = function () {
        debugger;
        var collectionobj = {};
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.TopicName = $('#ddlHomeworkTopic').val(); 
        collectionobj.SectionId = $scope.BindSection; 
        collectionobj.EmployeeCode = $scope.Code;
        collectionobj.ClassId = $scope.BindClass;
        var getData = myService.methode('POST', "../Homework/GetHomeworkfor", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) { 
            $.each(response.data, function (i, val)
            {
                $scope.tblhideHomeworkDetails = false;
                    $scope.AllHomeWork = response.data;
             }); 
           
        });
    }
 $scope.HomeworkTopic = function ()
 {
     debugger;
     var collectionobj = {};
   
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId; 
        collectionobj.SectionId = $('#ddlSection').val();;
        collectionobj.EmployeeCode = $scope.Code;
        collectionobj.ClassId = $('#ddlClass').val();
        var getData = myService.methode('POST', "../Homework/HomeworkTopic", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $('#ddlHomeworkTopic').append('<option value="0" >Select Homeworks</option>')
            $.each(response.data, function (i, val)
            { 
                $('#ddlHomeworkTopic').append('<option >' + val.TopicName + '</option>')
            });

        }); 
 }


 $scope.SubmittedHomework = function (TransId, VoucherNo, IsSubmitted, StudentCode)
 {
     debugger;
     var collectionobj = {};
     collectionobj.schoolCode = schoolCode;
     collectionobj.schoolCode = schoolCode;
     collectionobj.branchCode = branchCode;
     collectionobj.sessionId = sessionId;
     collectionobj.fyId = fyId;
     collectionobj.StudentCode = StudentCode;
     collectionobj.TransId = TransId;
     if (IsSubmitted == 'Not Submitted Yet')
     {
         IsSubmitted=1
     }
     else { IsSubmitted = 0 } 
     collectionobj.IsSubmitted = IsSubmitted;
     collectionobj.VoucherNo = VoucherNo; 
     collectionobj.TopicName = $('#ddlHomeworkTopic').val(); 
     collectionobj.EmployeeCode = $scope.Code;
     var getData = myService.methode('POST', "../Homework/SubmittedHomework", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) {
         if(JSON.stringify(response.data==2))
         {
             showMsgBox('999', 'Success', 'Changes has been done', 'success', 'btn-success')
             //showMsgBox("Changes has been done");  
             $scope.Homeworkfor();
         }
     }); 
 }
 $scope.SendNotification = function (TransId, VoucherNo, SendNotification, StudentCode) {
     debugger;
     var collectionobj = {};
     collectionobj.schoolCode = schoolCode;
     collectionobj.schoolCode = schoolCode;
     collectionobj.branchCode = branchCode;
     collectionobj.sessionId = sessionId;
     collectionobj.fyId = fyId;
     collectionobj.StudentCode = StudentCode;
     collectionobj.TransId = TransId; 
     collectionobj.SendNotification = SendNotification + 1;
     collectionobj.VoucherNo = VoucherNo;
     collectionobj.TopicName = $('#ddlHomeworkTopic').val();
     collectionobj.EmployeeCode = $scope.Code;
     var getData = myService.methode('POST', "../Homework/SendNotification", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) {
         if (JSON.stringify(response.data == 2))
         {
             showMsgBox('999', 'Success', 'Notification Send!', 'success', 'btn-success')
             //showMsgBox("Notification Send!");
             $scope.Homeworkfor();
         }
     });
 }
 $scope.BindEmpClass = function () {
     $scope.tblhideHomeworkDetails = true;
     var collectionobj = {};
     collectionobj.SessionId = sessionId;
     collectionobj.FYId = fyId;
     collectionobj.SchoolCode = schoolCode;
     collectionobj.BranchCode = branchCode;
     collectionobj.EmployeeCode = $scope.Code;
     var getData = myService.methode('POST', "../Homework/GetEmployeeClass", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) { 
         $scope.classRec = response.data;
     });
 } 
 $scope.BindEmpSection = function ()
 {
     debugger;
     var collectionobj = {};
     collectionobj.SessionId = sessionId;
     collectionobj.FYId = fyId;
     collectionobj.SchoolCode = schoolCode;
     collectionobj.BranchCode = branchCode;
     collectionobj.ClassId = $('#ddlClass').val();
     collectionobj.EmployeeCode = $scope.Code;
     var getData = myService.methode('POST', "../Homework/GetEmployeeSection", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) {
         $scope.SecRec = response.data;
     });
 }

 $scope.BindDetails = function ()
 {
     debugger;
     var getData = myService.methode('POST', '../DashBoard/GetUserDetails', '{userid:' + JSON.stringify(userid) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + '}');
     getData.then(function (response) {
         debugger;  
         $scope.Code = response.data[0].Code; 
         sessionStorage.setItem("code", $scope.Code);
         $scope.BindEmpClass();
     });
 }



 
}
