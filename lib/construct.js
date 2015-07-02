(function () {
	'use strict';

	/*
	 * An enhanced version of the typeof operator, allowing us to discriminates object types.
	 *
	 * This idea wasborrowed from a blog post from javascriptweblog.wordpress.com:
	 * https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	 *
	 * @param obj- the object which type will be returned
	 * @return the object 'class' as a string
	 */
	function toType(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}

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
		var args = Array.prototype.slice.call(arguments, 1);

		// if only one argument was passed, and it is an 'arguments' object
		if (args.length === 1) {
			if (toType(args[0]) === 'arguments') {
				args = args[0];
			}
		}
		return new F(args);
	}

	module.exports = construct;
}());
