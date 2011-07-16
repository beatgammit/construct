(function () {
	'use strict';

	var construct = require('../lib/construct'),
		temp,
		out;

	function Foo(bar, baz) {
		this.bar = bar;
		this.baz = baz;
	}

	Foo.prototype.foobar = function () {
		return [this.bar, this.baz].join(' ');
	};

	temp = construct(Foo, 'Hello', 'World');

	if (typeof temp.foobar !== 'function') {
		console.error('FAIL: prototype not applied, foobar is of type', typeof temp.foobar);
		process.exit(1);
	}

	if (temp.bar !== 'Hello' || temp.baz !== 'World') {
		console.error('FAIL: internal properties not set correctly; bar:', temp.bar, '; baz:', temp.baz);
		process.exit(1);
	}

	out = temp.foobar();
	
	if (out !== 'Hello World') {
		console.error('FAIL: output not correct:', out);
		process.exit(1);
	}

	if (!(temp instanceof Foo)) {
		console.error('FAIL: created object not an instance of constructor');
		process.exit(1);
	}

	console.log('All tests passed!');
}());
