describe('ngLazy Demo App', function(){

  beforeEach(module('ngLazyDemoApp'));

  describe('lazyLoader Factory', function(){
    beforeEach(module('ngLazy'));
    beforeEach(inject(['$rootScope','$controller','$injector', function($rootScope, $controller, $injector){
      lazyLoader = $injector.get('lazyLoader');
      $scope = $rootScope.$new();
    }]));
    
    it('should have a lazyLoader Factory', function(){
      expect(lazyLoader).not.toBe(undefined);
    });
    it('the lazyLoader Factory should have the proper methods', function(){
      expect(lazyLoader.configure).not.toBe(undefined);
      expect(lazyLoader.getData).not.toBe(undefined);
      expect(lazyLoader.load).not.toBe(undefined);
    });
  });
  
  describe('Directive', function(){
    beforeEach(module('ngLazy'));

    var element, $scope, list, bottom, elementScope;

    beforeEach(inject(['$rootScope','$compile', function($rootScope, $compile){
      $scope = $rootScope.$new();
      $scope.data = {};
      $scope.data.list = [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5"
      ];
      element = angular.element(
      '<lazy-load' +
        ' lazy-data="data"' +
        ' lazy-data-service="dataService"' +
        ' lazy-fetch-method="getList"' + 
        ' lazy-range=" {{ range }}"' +
        ' lazy-data-collection-key="list"' +
        ' lazy-data-keys="[\'list\']"' + 
        ' lazy-start-delay="{{ startDelay }}"' + 
        ' lazy-append-delay="{{ appendDelay }}"' +
        ' lazy-spinner-color="{{ spinnerColor }}">' +
      '<div ng-repeat="item in data.list">' +
        '<h4>{{ item }}</h4>' +
      '</div>' +
      '</lazy-load>');

      $scope.$apply();
      $compile(element)($scope);

      elementScope = element.isolateScope();
    }]));
    
    it('should not break ng-repeat', function(){
      $scope.$digest();
      list = element.find('h4');
      expect(list.length).toBe(5);      
    })

    it('should have a div with id=\'bottom\'', function(){
      bottom = element.find('div')[3];
      expect(bottom.id).toBe('lazy-bottom');
    })

    it('when repeated items are rendered, the bottom div should follow the last item', function(){
      $scope.$digest();
      bottom = element.find('div')[8];
      expect(bottom.id).toBe('lazy-bottom');
    })

    it('should have a scope with keys for every lazy-load attribute', function(){
      expect(elementScope.lazyData).not.toBe(undefined);
      expect(elementScope.lazyDataCollectionKey).not.toBe(undefined);
      expect(elementScope.lazyDataKeys).not.toBe(undefined);
      expect(elementScope.lazyFetchMethod).not.toBe(undefined);
      expect(elementScope.lazyRange).not.toBe(undefined);
      expect(elementScope.lazySpinnerColor).not.toBe(undefined);
      expect(elementScope.lazyAppendDelay).not.toBe(undefined);
      expect(elementScope.lazyStartDelay).not.toBe(undefined);
      expect(elementScope.lazyDataService).toBe('dataService');
    });

  })

})