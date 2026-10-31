app.VerifyHomeworkDetailsController = function ($scope, $element, $filter, myService)
{ 
    $('#ddlSection').change(function () {
        $scope.HomeworkTopic()
  
    });

   
    $scope.ddlClass_Change = function (Class) {
        $scope.BindEmpSection();
    }
   

    $('#ddlHomeworkTopic').change(function () { 
        $scope.Homeworkfor();
    });

    $scope.Homeworkfor = function () {
   
        var collectionobj = {};
        collectionobj.Action = "23";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.TopicName = $('#ddlHomeworkTopic').val(); 
        collectionobj.SectionCode = $scope.BindSection; 
        collectionobj.EmployeeCode = userid;
        collectionobj.ClassCode = $scope.BindClass;
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetHomeworkfor", collectionobj); 
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

     var collectionobj = {};
        collectionobj.Action = "9";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.SectionCode = $('#ddlSection').val();
        collectionobj.ClassCode = $('#ddlClass').val();
        collectionobj.EmployeeCode = userid;

     var getData = myService.methode('POST', '../Api/HomeworkApi/GetHomeWorkTopic', collectionobj);
        getData.then(function (response) {
          
         $scope.HWTopic = response.data;

        }); 
 }


    $scope.SubmittedHomework = function (TransId, PVNo, IsSubmitted, StudentCode)
 {
     debugger
     var collectionobj = {};
     collectionobj.RelationshipId = relationshipId;
     collectionobj.sessionId = sessionId;
     collectionobj.fyId = fyId;
     collectionobj.StudentCode = StudentCode;
     collectionobj.TransID = TransId;
     if (IsSubmitted == 'Not Submitted')
     {
         IsSubmitted=1
     }
     else { IsSubmitted = 0 } 
     collectionobj.IsSubmitted = IsSubmitted;
     collectionobj.PVNo = PVNo; 
     collectionobj.TopicName = $('#ddlHomeworkTopic').val(); 
     collectionobj.EmployeeCode = $scope.Code;
     var getData = myService.methode('POST', "../Api/HomeworkApi/SubmittedHomework", collectionobj);
     getData.then(function (response) {
         if(response.data==2)
         {
             showMsgBox('999', 'Success', 'Changes has been done', 'success', 'btn-success')
             //showMsgBox("Changes has been done");  
             
             $scope.Homeworkfor();
            
         }
     }); 
    }
    
    $scope.disabled = function (obj) {
   
        //var IsSubmitted = obj.IsSubmitted; 
        if (obj.IsSubmitted == 'Submitted') {
            
            $('#IsSubmit').off("click").attr('cursor', 'not-allowed');
            e.preventDefault();
        }
    }

    $scope.BindEmpClass = function () {
     
     var collectionobj = {};
        collectionobj.Action = "19";
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.EmployeeCode =userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetEmployeeClass", collectionobj);
        getData.then(function (response) {
           
         $scope.classRec = response.data;
     });
    } 

    $scope.BindEmpClass = function () {
     
        var collectionobj = {};
        collectionobj.Action = "19";
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.EmployeeCode = userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetEmployeeClass", collectionobj);
        getData.then(function (response) {
            
            $scope.classRec = response.data;
        });
    }
    $scope.BindEmpSection = function ()
 {
    
     var collectionobj = {};
     collectionobj.Action = "20";
     collectionobj.SessionId = sessionId;
     collectionobj.RelationshipId = relationshipId;
     collectionobj.ClassCode = $('#ddlClass').val();
     collectionobj.EmployeeCode = userid;
     var getData = myService.methode('POST', "../Api/HomeworkApi/GetEmployeeSection", collectionobj);
     getData.then(function (response) {
        
         $scope.SecRec = response.data;
     });
    }
 
}
