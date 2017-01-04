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
			console.log(res.data);
			vm.oneManager = res.data
		});
	}
	getOneManager();

}


ManagerNewController.$inject = ["$http", "$location"];
function ManagerNewController($http, $location) {
    var vm = this;
    vm.saveManager = saveManager;
console.log('ManagerNewController')
    function saveManager() {
        console.log(vm.saveManager);
        $http.post('/api/managers/', vm.saveManager)
            .then(function(res) {
                var manager = res.body.data;
                $location.path("/managers/" + manager.id);
                res.json(manager);
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
    console.log('manager.js', vm.updateManager)
    function updateManager() {
        $http.put('/api/managers/'+$routeParams.id, vm.updatedManager)
            .then(function(res) {
                var manager = res.data;
                $location.path("/managers/" + manager.id);
                    console.log('manager.js -- in http.then', manager)

            });            
    }

    getManager();
}
