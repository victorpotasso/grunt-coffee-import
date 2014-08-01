#import lib.Class2
#import lib.Class3
#import lib2.Class5

class Main
	constructor:()->
		console.log('__Main__')
		c3 = new Class3()
		c5 = new Class5()
		c2 = new Class2()
new Main()
