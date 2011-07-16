Tl;dr
=====

`npm install construct`

	construct(constructor, arg1, arg2, arg3);

	// OR

	construct(constructor, arguments);

	// OR

	construct(constructor, [arg1, arg2, arg3]);

Intro
=====

Construct provides a way to create a new instance of an object with an arbitrary number of arguments.

Work-arounds tend to be clumsy, and/or clutter up code.  This module aims to be a cure-all for obscure object creations.

Install
-------

Construct can be installed via NPM:

`npm install construct`

Or as an ender module:

`ender add construct`

Problem
=======

Say you have a library that takes a constructor as an argument that you will construct later.

Everything is hunky-dory until you want to pass it some arguments. So you specify a few arguments manually, and it works, for a while.

But one day, your library gets popular. People start requesting additional numbers of parameters, and your parameter parsing ends up getting longer than your actual code.

Construct to the rescue
-----------------------

With construct, you just pass it your constructor and the arguments. Construct doesn't look at the arguments and passes them exactly as you passed them in to the constructor, then hands you back a new instance.

This is a REAL new instance, meaning prototypes work as expected, and instanceof works too.

How is it done?
---------------

Look at the code. There's only three real lines of code:

	function construct(constructor) {
		function F(args) {
			return constructor.apply(this, args);
		}

		F.prototype = constructor.prototype;

		return new F(Array.prototype.slice.call(arguments, 1));
	}

Since we can't call apply when using new, and new constructor(arguments) will require us to change the constructor, we have to be clever.

In order to achieve this, we'll chain the constructor to a new constructor. Calling Function.apply(this, arguments) calls che Function with the current context's prototype.

That's where `F.prototype` comes into play. We'll assign the constructor's prototype to F's prototype before we construct it.

`Array.prototype.slice.call(arguments, 1)`

This one's a little confusing at first glance to people not familiar with it. Array.slice basically loops through the array using the length property and array indexing (`[]`). This means that any object with a length property can be turned into an array by lying to the slice method, and that's exactly what we're doing.

`constructor.apply(this, args);`

Now we can use the same idea with apply. Since we called F with `new`, the `this` context is now a newly constructed object. Callyng apply with this context will chain these two functions together, but since F has constructor's prototype, constructor thinks that it just got called normally with manually passed in parameters.

Cool huh?
