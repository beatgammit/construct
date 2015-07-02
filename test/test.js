(function () {
	'use strict';

	var construct = require('../lib/construct'),
		test,
		out;

	function Foo(bar, baz) {
		this.bar = bar;
		this.baz = baz;
	}

	Foo.prototype.foobar = function () {
		return [this.bar, this.baz].join(' ');
	};

	test = function (temp, desc) {

		if (typeof temp.foobar !== 'function') {
			console.error('FAIL', desc, ': prototype not applied, foobar is of type', typeof temp.foobar);
			process.exit(1);
		}

		if (temp.bar !== 'Hello' || temp.baz !== 'World') {
			console.error('FAIL', desc, ': internal properties not set correctly; bar:', temp.bar, '; baz:', temp.baz);
			process.exit(1);
		}

		out = temp.foobar();
		
		if (out !== 'Hello World') {
			console.error('FAIL', desc, ': output not correct:', out);
			process.exit(1);
		}

		if (!(temp instanceof Foo)) {
			console.error('FAIL', desc, ': created object not an instance of constructor');
			process.exit(1);
		}
	};

	// Testing the two possible cases :
	// - construct(constructor, arg1, arg2, arg3) : more than one additional argument or arg1 isnt an 'arguments' object
	// - construct(constructor, arguments) : only one additional argument and arg1 is an 'arguments' object
	test(construct(Foo, 'Hello', 'World'), 'construct(constructor, arg1, arg2, arg3)');
	test((function () {
		return construct(Foo, arguments);
	})('Hello', 'World'), 'construct(constructor, arguments)');

	// We can't discriminate between '[arg1, arg2, arg3]' and 'arg1, arg2, arg3'
	// Thus [arg1, arg2, arg3] will always be considered as arg1, arg2, arg3 (arg1 beeing an array and arg2, arg3 non-existant in this case.
	// test(construct(Foo, ['Hello', 'World']), 'construct(constructor, [arg1, arg2, arg3])');
	console.log('All tests passed!');
}());
