(function() {
  var Class1, Class2, Class3, Class4, Class5, Main,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Class5 = (function() {
    function Class5() {
      console.log('__Class5__');
    }

    return Class5;

  })();

  Class4 = (function() {
    function Class4() {
      console.log('__Class4__');
    }

    return Class4;

  })();

  Class3 = (function(_super) {
    __extends(Class3, _super);

    function Class3() {
      Class3.__super__.constructor.call(this);
      console.log('__Class3__');
    }

    return Class3;

  })(Class4);

  Class1 = (function(_super) {
    __extends(Class1, _super);

    function Class1() {
      Class1.__super__.constructor.call(this);
      console.log('__lib-Class1__');
    }

    return Class1;

  })(Class3);

  Class2 = (function(_super) {
    __extends(Class2, _super);

    function Class2() {
      Class2.__super__.constructor.call(this);
      console.log('__Class2__');
    }

    return Class2;

  })(Class1);

  Main = (function() {
    function Main() {
      var c2, c3, c5;
      console.log('__Main__');
      c3 = new Class3();
      c5 = new Class5();
      c2 = new Class2();
    }

    return Main;

  })();

  new Main();

}).call(this);
