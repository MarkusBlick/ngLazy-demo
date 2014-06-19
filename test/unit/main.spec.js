describe('ngLazy Demo App', function(){

  beforeEach(module('ngLazyDemoApp'));
  describe('Data Service', function(){

    beforeEach(inject(['$q','dataService', '$timeout', '$rootScope', function(q, ds, to, rs){
      dataService = ds;
      $timeout = to;
      $rootScope = rs;
      $q = q;
    }]))    
    
    it('should have a dataService', inject(function(dataService){
       expect(dataService).not.toBe("undefined");
    }));

    it('should have a dataService with a getList method', inject(function(dataService){
       expect(typeof dataService.getList).toBe("function");
    }));
    
  })

  describe('Main Controller', function(){
    beforeEach(module('ngLazy'));
    beforeEach(inject(['$rootScope','$controller', function($rootScope, $controller){
      $scope = $rootScope.$new();
      $controller('MainCtrl', {$scope : $scope});
    }]));
    
    it('should have a Main Controller with a scope', function(){
      expect($scope).not.toBe(null);
    });

    // xit('should have a scope with keys for every lazy-load attribute', function(){
    //   expect($factory.lazyLoader).toBe(null);
    // });

  })

})