	angular.module("tunrApp")
	.controller("ManagerIndexController", ManagerIndexController)
	.controller("ManagerShowController", ManagerShowController)
	.controller("ManagerNewController", ManagerNewController)
	.controller("ManagerEditController", ManagerEditController);

ManagerIndexController.$inject = ["$http"];
function ManagerIndexController($http) {
	var vm = this;
	vm.deleteManager = deleteManager;

	function getAllManagers() {
		$http.get('/api/managers')
			.then(function(response) {
				vm.allManagers = response.data;
			});		
	}

	function deleteManager(manager) {
		$http.delete('/api/managers/'+manager.id)
			.then(function(response) {
				var managerIndex = vm.allManagers.indexOf(manager);
				vm.allManagers.splice(managerIndex, 1);
			});
	}

	getAllManagers();
}

ManagerShowController.$inject = ["$http", "$routeParams"];
function ManagerShowController($http, $routeParams) {
	var vm = this;

	function getOneManager() {
		console.log($routeParams.id);
		$http.get('/api/managers/'+$routeParams.id)
		.then(function(res){
			console.log(res);
			vm.oneManager = res.data
		});
	}
	getOneManager();

}


ManagerNewController.$inject = ["$http", "$location"];
function ManagerNewController($http, $location) {
    var vm = this;
    vm.saveManger = saveManager;

    function saveManager() {
        console.log(vm.newManager);
        $http.post('/api/managers/', vm.newManager)
            .then(function(res) {
                var manager = res.data;
                $location.path("/managers/" + manager.id);
            });        
    }
}


ManagerEditController.$inject = ["$http", "$routeParams", "$location"];
function ManagerEditController($http, $routeParams, $location) {
    var vm = this;
    vm.updateManager = updateManager;

    function getManager() {
        console.log($routeParams.id);
        $http.get('/api/managers/'+$routeParams.id)
            .then(function(res) {
                console.log(res);
                vm.updatedManager = res.data;
            });            
    }

    function updateManager() {
        $http.put('/api/managers/'+$routeParams.id, vm.updatedManager)
            .then(function(res) {
                var manager = res.data;
                $location.path("/managers/" + manager.id);
            });            
    }

    getManager();
}
