#import lib.ext.Class7
#import lib2.Class6

class Preloader
	constructor:()->
		console.log('__Preloader__')
		c6 = new Class6()
		c7 = new Class7()
new Preloader()
