(function () {
	'use strict';

	/*
	 * Calls a constructor with an arbitrary number of arguments.
	 * 
	 * This idea was borrowed from a StackOverflow answer:
	 * http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible/1608546#1608546
	 *
	 * And from this MDN doc:
	 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/function/apply
	 *
	 * @param constructor- Constructor to call
	 * @param arguments- any number of arguments
	 * @return A 'new' instance of the constructor with the arguments passed
	 */
	function construct(constructor) {
		function F(args) {
			return constructor.apply(this, args);
		}

		F.prototype = constructor.prototype;

		// since arguments isn't a first-class array, we'll use a shim
		// Big thanks to Felix Geisendörfer for the idea: 
		// http://debuggable.com/posts/turning-javascript-s-arguments-object-into-an-array:4ac50ef8-3bd0-4a2d-8c2e-535ccbdd56cb
		return new F(Array.prototype.slice.call(arguments, 1));
	}

	module.exports = construct;
}());
