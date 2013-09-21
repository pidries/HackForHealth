
angular.module('QUES', ['restangular']).
  config(function(RestangularProvider) {

    // Now let's configure the response extractor for each request
    RestangularProvider.setBaseUrl('http://localhost:8080/conductor/1');
    RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
      // This is a get for a list
      var newResponse;
      if (operation === "getList") {
        // Here we're returning an Array which has one special property metadata with our extra information
        if (response.data) {
	        newResponse = response.data.items;
	    }
        //newResponse.metadata = response.data.meta;
      } else {
        // This is an element
        newResponse = response.data;
      }
      return newResponse;
    });
});


angular.module("QUES").controller("QuestList", function($scope, Restangular) {

	var assignedQuestionnaires = {};
	
	 Restangular.all('assignments?patientNumber=1002840').getList()
        .then(function(assignments) {
			angular.forEach(assignments, function(assignment){
				assignedQuestionnaires[assignment.itemData.definition.id] = assignment.itemData.id;
			});
			
			Restangular.all('questionnaires?patientNumber=1002840').getList()
 		       .then(function(definitions) {
        		    $scope.quests = definitions;
		            angular.forEach($scope.quests, function(quest){
        			if(assignedQuestionnaires[quest.itemData.id]){
			        	quest.checked = true;
			        	quest.assignmentId = assignedQuestionnaires[quest.itemData.id];
			        }
		        });
	        }, function (response) {
    	        console.log("Error met statuscode: ", response.status);
	        });
			
        }, function (response) {
            console.log("Error met statuscode: ", response.status);
        });
   
});
