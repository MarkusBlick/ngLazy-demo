describe("ngLazy-demo", function(){
  browser.driver.manage().window().maximize();
  browser.get('/#');
  browser.ignoreSynchronization = true;

  describe("index", function () {

    it("should display the correct title", function(){
      expect(browser.getTitle()).toBe('ngLazy-Demo');
    });

    it("should have a lazy-load element", function(){
      expect(element(by.css('lazy-load')).isPresent()).toBe(true);
    });

  })
  var range;
  describe("lazy-load directive", function(){
    it ("should immediately display a spinner", function(){
      expect(element(by.css('.ng-hide')).isPresent()).toBe(false);
    });

    it("should have a spinner-color that matches the configuration", function(){
      var color;
      var loadingWidget = browser.findElement(by.css('.loading-widget'));
      loadingWidget.getAttribute('style').then(function(color){
        // ugly way of getting the color string from the directive
        color = (((color
                .split('border-color:')[1])
                .split(';')[0])
                .split('transparent ')[1]).trim()
                .split(' rgb')[0];
        var spinnerElement = browser.findElement(by.model('spinnerColor'));
        spinnerElement.getAttribute('value').then(function(val){
          expect(color).toEqual(val);
        })
      })
    })

    it("should have as many ng-repeated items as the scope indicates", function(){
      var rangeElement = browser.findElement(by.model('range'));
      rangeElement.getAttribute('value').then(function(val){
        browser.sleep(4000);
        range = parseInt(val);
        var repeats = element.all(by.css('.ng-binding')).count();
        expect(repeats).toEqual(range);
      });
    });

    it("should have an element in the DOM that represents the bottom of the list", function(){
      expect(element(by.css('#lazy-bottom')).isPresent()).toBe(true);
    });

    it("should add elements to the DOM when it scrolls to the bottom of the list", function(){
      browser.executeScript('window.scrollTo(0,' + 600 + ');').then(function(){
        browser.sleep(2000);
        expect(element.all(by.css('.ng-binding')).count()).toEqual(range * 2);
      })
    })
  });
})