(function() {
  var Class6, Class7, Preloader;

  Class6 = (function() {
    function Class6() {
      console.log('__Class6__');
    }

    return Class6;

  })();

  Class7 = (function() {
    function Class7() {
      console.log('__Class7__');
    }

    return Class7;

  })();

  Preloader = (function() {
    function Preloader() {
      var c6, c7;
      console.log('__Preloader__');
      c6 = new Class6();
      c7 = new Class7();
    }

    return Preloader;

  })();

  new Preloader();

}).call(this);
