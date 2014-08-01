(function() {
  var Class6, Preloader;

  Class6 = (function() {
    function Class6() {
      console.log('__Class6__');
    }

    return Class6;

  })();

  Preloader = (function() {
    function Preloader() {
      var c6;
      console.log('__Preloader__');
      c6 = new Class6();
    }

    return Preloader;

  })();

  new Preloader();

}).call(this);
