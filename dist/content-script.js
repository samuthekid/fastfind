(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/findandreplacedomtext/src/findAndReplaceDOMText.js":
/*!*************************************************************************!*\
  !*** ./node_modules/findandreplacedomtext/src/findAndReplaceDOMText.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * findAndReplaceDOMText v 0.4.6
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */
 (function (root, factory) {
     if ( true && module.exports) {
         // Node/CommonJS
         module.exports = factory();
     } else if (true) {
         // AMD. Register as an anonymous module.
         !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
     } else {}
 }(this, function factory() {

	var PORTION_MODE_RETAIN = 'retain';
	var PORTION_MODE_FIRST = 'first';

	var doc = document;
	var hasOwn = {}.hasOwnProperty;

	function escapeRegExp(s) {
		return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}

	function exposed() {
		// Try deprecated arg signature first:
		return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
	}

	function deprecated(regex, node, replacement, captureGroup, elFilter) {
		if ((node && !node.nodeType) && arguments.length <= 2) {
			return false;
		}
		var isReplacementFunction = typeof replacement == 'function';

		if (isReplacementFunction) {
			replacement = (function(original) {
				return function(portion, match) {
					return original(portion.text, match.startIndex);
				};
			}(replacement));
		}

		// Awkward support for deprecated argument signature (<0.4.0)
		var instance = findAndReplaceDOMText(node, {

			find: regex,

			wrap: isReplacementFunction ? null : replacement,
			replace: isReplacementFunction ? replacement : '$' + (captureGroup || '&'),

			prepMatch: function(m, mi) {

				// Support captureGroup (a deprecated feature)

				if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';

				if (captureGroup > 0) {
					var cg = m[captureGroup];
					m.index += m[0].indexOf(cg);
					m[0] = cg;
				}

				m.endIndex = m.index + m[0].length;
				m.startIndex = m.index;
				m.index = mi;

				return m;
			},
			filterElements: elFilter
		});

		exposed.revert = function() {
			return instance.revert();
		};

		return true;
	}

	/**
	 * findAndReplaceDOMText
	 *
	 * Locates matches and replaces with replacementNode
	 *
	 * @param {Node} node Element or Text node to search within
	 * @param {RegExp} options.find The regular expression to match
	 * @param {String|Element} [options.wrap] A NodeName, or a Node to clone
	 * @param {String} [options.wrapClass] A classname to append to the wrapping element
	 * @param {String|Function} [options.replace='$&'] What to replace each match with
	 * @param {Function} [options.filterElements] A Function to be called to check whether to
	 *	process an element. (returning true = process element,
	 *	returning false = avoid element)
	 */
	function findAndReplaceDOMText(node, options) {
		return new Finder(node, options);
	}

	exposed.NON_PROSE_ELEMENTS = {
		br:1, hr:1,
		// Media / Source elements:
		script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
		// Input elements
		input:1, textarea:1, select:1, option:1, optgroup: 1, button:1
	};

	exposed.NON_CONTIGUOUS_PROSE_ELEMENTS = {

		// Elements that will not contain prose or block elements where we don't
		// want prose to be matches across element borders:

		// Block Elements
		address:1, article:1, aside:1, blockquote:1, dd:1, div:1,
		dl:1, fieldset:1, figcaption:1, figure:1, footer:1, form:1, h1:1, h2:1, h3:1,
		h4:1, h5:1, h6:1, header:1, hgroup:1, hr:1, main:1, nav:1, noscript:1, ol:1,
		output:1, p:1, pre:1, section:1, ul:1,
		// Other misc. elements that are not part of continuous inline prose:
		br:1, li: 1, summary: 1, dt:1, details:1, rp:1, rt:1, rtc:1,
		// Media / Source elements:
		script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
		// Input elements
		input:1, textarea:1, select:1, option:1, optgroup:1, button:1,
		// Table related elements:
		table:1, tbody:1, thead:1, th:1, tr:1, td:1, caption:1, col:1, tfoot:1, colgroup:1

	};

	exposed.NON_INLINE_PROSE = function(el) {
		return hasOwn.call(exposed.NON_CONTIGUOUS_PROSE_ELEMENTS, el.nodeName.toLowerCase());
	};

	// Presets accessed via `options.preset` when calling findAndReplaceDOMText():
	exposed.PRESETS = {
		prose: {
			forceContext: exposed.NON_INLINE_PROSE,
			filterElements: function(el) {
				return !hasOwn.call(exposed.NON_PROSE_ELEMENTS, el.nodeName.toLowerCase());
			}
		}
	};

	exposed.Finder = Finder;

	/**
	 * Finder -- encapsulates logic to find and replace.
	 */
	function Finder(node, options) {

		var preset = options.preset && exposed.PRESETS[options.preset];

		options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

		if (preset) {
			for (var i in preset) {
				if (hasOwn.call(preset, i) && !hasOwn.call(options, i)) {
					options[i] = preset[i];
				}
			}
		}

		this.node = node;
		this.options = options;

		// Enable match-preparation method to be passed as option:
		this.prepMatch = options.prepMatch || this.prepMatch;

		this.reverts = [];

		this.matches = this.search();

		if (this.matches.length) {
			this.processMatches();
		}

	}

	Finder.prototype = {

		/**
		 * Searches for all matches that comply with the instance's 'match' option
		 */
		search: function() {

			var match;
			var matchIndex = 0;
			var offset = 0;
			var regex = this.options.find;
			var textAggregation = this.getAggregateText();
			var matches = [];
			var self = this;

			regex = typeof regex === 'string' ? RegExp(escapeRegExp(regex), 'g') : regex;

			matchAggregation(textAggregation);

			function matchAggregation(textAggregation) {
				for (var i = 0, l = textAggregation.length; i < l; ++i) {

					var text = textAggregation[i];

					if (typeof text !== 'string') {
						// Deal with nested contexts: (recursive)
						matchAggregation(text);
						continue;
					}

					if (regex.global) {
						while (match = regex.exec(text)) {
							matches.push(self.prepMatch(match, matchIndex++, offset));
						}
					} else {
						if (match = text.match(regex)) {
							matches.push(self.prepMatch(match, 0, offset));
						}
					}

					offset += text.length;
				}
			}

			return matches;

		},

		/**
		 * Prepares a single match with useful meta info:
		 */
		prepMatch: function(match, matchIndex, characterOffset) {

			if (!match[0]) {
				throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
			}

			match.endIndex = characterOffset + match.index + match[0].length;
			match.startIndex = characterOffset + match.index;
			match.index = matchIndex;

			return match;
		},

		/**
		 * Gets aggregate text within subject node
		 */
		getAggregateText: function() {

			var elementFilter = this.options.filterElements;
			var forceContext = this.options.forceContext;

			return getText(this.node);

			/**
			 * Gets aggregate text of a node without resorting
			 * to broken innerText/textContent
			 */
			function getText(node) {

				if (node.nodeType === Node.TEXT_NODE) {
					return [node.data];
				}

				if (elementFilter && !elementFilter(node)) {
					return [];
				}

				var txt = [''];
				var i = 0;

				if (node = node.firstChild) do {

					if (node.nodeType === Node.TEXT_NODE) {
						txt[i] += node.data;
						continue;
					}

					var innerText = getText(node);

					if (
						forceContext &&
						node.nodeType === Node.ELEMENT_NODE &&
						(forceContext === true || forceContext(node))
					) {
						txt[++i] = innerText;
						txt[++i] = '';
					} else {
						if (typeof innerText[0] === 'string') {
							// Bridge nested text-node data so that they're
							// not considered their own contexts:
							// I.e. ['some', ['thing']] -> ['something']
							txt[i] += innerText.shift();
						}
						if (innerText.length) {
							txt[++i] = innerText;
							txt[++i] = '';
						}
					}
				} while (node = node.nextSibling);

				return txt;

			}

		},

		/**
		 * Steps through the target node, looking for matches, and
		 * calling replaceFn when a match is found.
		 */
		processMatches: function() {

			var matches = this.matches;
			var node = this.node;
			var elementFilter = this.options.filterElements;

			var startPortion,
				endPortion,
				innerPortions = [],
				curNode = node,
				match = matches.shift(),
				atIndex = 0, // i.e. nodeAtIndex
				matchIndex = 0,
				portionIndex = 0,
				doAvoidNode,
				nodeStack = [node];

			out: while (true) {

				if (curNode.nodeType === Node.TEXT_NODE) {

					if (!endPortion && curNode.length + atIndex >= match.endIndex) {
						// We've found the ending
						// (Note that, in the case of a single portion, it'll be an
						// endPortion, not a startPortion.)
						endPortion = {
							node: curNode,
							index: portionIndex++,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),

							// If it's the first match (atIndex==0) we should just return 0
							indexInMatch: atIndex === 0 ? 0 : atIndex - match.startIndex,

							indexInNode: match.startIndex - atIndex,
							endIndexInNode: match.endIndex - atIndex,
							isEnd: true
						};

					} else if (startPortion) {
						// Intersecting node
						innerPortions.push({
							node: curNode,
							index: portionIndex++,
							text: curNode.data,
							indexInMatch: atIndex - match.startIndex,
							indexInNode: 0 // always zero for inner-portions
						});
					}

					if (!startPortion && curNode.length + atIndex > match.startIndex) {
						// We've found the match start
						startPortion = {
							node: curNode,
							index: portionIndex++,
							indexInMatch: 0,
							indexInNode: match.startIndex - atIndex,
							endIndexInNode: match.endIndex - atIndex,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex)
						};
					}

					atIndex += curNode.data.length;

				}

				doAvoidNode = curNode.nodeType === Node.ELEMENT_NODE && elementFilter && !elementFilter(curNode);

				if (startPortion && endPortion) {

					curNode = this.replaceMatch(match, startPortion, innerPortions, endPortion);

					// processMatches has to return the node that replaced the endNode
					// and then we step back so we can continue from the end of the
					// match:

					atIndex -= (endPortion.node.data.length - endPortion.endIndexInNode);

					startPortion = null;
					endPortion = null;
					innerPortions = [];
					match = matches.shift();
					portionIndex = 0;
					matchIndex++;

					if (!match) {
						break; // no more matches
					}

				} else if (
					!doAvoidNode &&
					(curNode.firstChild || curNode.nextSibling)
				) {
					// Move down or forward:
					if (curNode.firstChild) {
						nodeStack.push(curNode);
						curNode = curNode.firstChild;
					} else {
						curNode = curNode.nextSibling;
					}
					continue;
				}

				// Move forward or up:
				while (true) {
					if (curNode.nextSibling) {
						curNode = curNode.nextSibling;
						break;
					}
					curNode = nodeStack.pop();
					if (curNode === node) {
						break out;
					}
				}

			}

		},

		/**
		 * Reverts ... TODO
		 */
		revert: function() {
			// Reversion occurs backwards so as to avoid nodes subsequently
			// replaced during the matching phase (a forward process):
			for (var l = this.reverts.length; l--;) {
				this.reverts[l]();
			}
			this.reverts = [];
		},

		prepareReplacementString: function(string, portion, match) {
			var portionMode = this.options.portionMode;
			if (
				portionMode === PORTION_MODE_FIRST &&
				portion.indexInMatch > 0
			) {
				return '';
			}
			string = string.replace(/\$(\d+|&|`|')/g, function($0, t) {
				var replacement;
				switch(t) {
					case '&':
						replacement = match[0];
						break;
					case '`':
						replacement = match.input.substring(0, match.startIndex);
						break;
					case '\'':
						replacement = match.input.substring(match.endIndex);
						break;
					default:
						replacement = match[+t] || '';
				}
				return replacement;
			});

			if (portionMode === PORTION_MODE_FIRST) {
				return string;
			}

			if (portion.isEnd) {
				return string.substring(portion.indexInMatch);
			}

			return string.substring(portion.indexInMatch, portion.indexInMatch + portion.text.length);
		},

		getPortionReplacementNode: function(portion, match) {

			var replacement = this.options.replace || '$&';
			var wrapper = this.options.wrap;
			var wrapperClass = this.options.wrapClass;

			if (wrapper && wrapper.nodeType) {
				// Wrapper has been provided as a stencil-node for us to clone:
				var clone = doc.createElement('div');
				clone.innerHTML = wrapper.outerHTML || new XMLSerializer().serializeToString(wrapper);
				wrapper = clone.firstChild;
			}

			if (typeof replacement == 'function') {
				replacement = replacement(portion, match);
				if (replacement && replacement.nodeType) {
					return replacement;
				}
				return doc.createTextNode(String(replacement));
			}

			var el = typeof wrapper == 'string' ? doc.createElement(wrapper) : wrapper;

 			if (el && wrapperClass) {
				el.className = wrapperClass;
			}

			replacement = doc.createTextNode(
				this.prepareReplacementString(
					replacement, portion, match
				)
			);

			if (!replacement.data) {
				return replacement;
			}

			if (!el) {
				return replacement;
			}

			el.appendChild(replacement);

			return el;
		},

		replaceMatch: function(match, startPortion, innerPortions, endPortion) {

			var matchStartNode = startPortion.node;
			var matchEndNode = endPortion.node;

			var precedingTextNode;
			var followingTextNode;

			if (matchStartNode === matchEndNode) {

				var node = matchStartNode;

				if (startPortion.indexInNode > 0) {
					// Add `before` text node (before the match)
					precedingTextNode = doc.createTextNode(node.data.substring(0, startPortion.indexInNode));
					node.parentNode.insertBefore(precedingTextNode, node);
				}

				// Create the replacement node:
				var newNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				node.parentNode.insertBefore(newNode, node);

				if (endPortion.endIndexInNode < node.length) { // ?????
					// Add `after` text node (after the match)
					followingTextNode = doc.createTextNode(node.data.substring(endPortion.endIndexInNode));
					node.parentNode.insertBefore(followingTextNode, node);
				}

				node.parentNode.removeChild(node);

				this.reverts.push(function() {
					if (precedingTextNode === newNode.previousSibling) {
						precedingTextNode.parentNode.removeChild(precedingTextNode);
					}
					if (followingTextNode === newNode.nextSibling) {
						followingTextNode.parentNode.removeChild(followingTextNode);
					}
					newNode.parentNode.replaceChild(node, newNode);
				});

				return newNode;

			} else {
				// Replace matchStartNode -> [innerMatchNodes...] -> matchEndNode (in that order)


				precedingTextNode = doc.createTextNode(
					matchStartNode.data.substring(0, startPortion.indexInNode)
				);

				followingTextNode = doc.createTextNode(
					matchEndNode.data.substring(endPortion.endIndexInNode)
				);

				var firstNode = this.getPortionReplacementNode(
					startPortion,
					match
				);

				var innerNodes = [];

				for (var i = 0, l = innerPortions.length; i < l; ++i) {
					var portion = innerPortions[i];
					var innerNode = this.getPortionReplacementNode(
						portion,
						match
					);
					portion.node.parentNode.replaceChild(innerNode, portion.node);
					this.reverts.push((function(portion, innerNode) {
						return function() {
							innerNode.parentNode.replaceChild(portion.node, innerNode);
						};
					}(portion, innerNode)));
					innerNodes.push(innerNode);
				}

				var lastNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				matchStartNode.parentNode.insertBefore(precedingTextNode, matchStartNode);
				matchStartNode.parentNode.insertBefore(firstNode, matchStartNode);
				matchStartNode.parentNode.removeChild(matchStartNode);

				matchEndNode.parentNode.insertBefore(lastNode, matchEndNode);
				matchEndNode.parentNode.insertBefore(followingTextNode, matchEndNode);
				matchEndNode.parentNode.removeChild(matchEndNode);

				this.reverts.push(function() {
					precedingTextNode.parentNode.removeChild(precedingTextNode);
					firstNode.parentNode.replaceChild(matchStartNode, firstNode);
					followingTextNode.parentNode.removeChild(followingTextNode);
					lastNode.parentNode.replaceChild(matchEndNode, lastNode);
				});

				return lastNode;
			}
		}

	};

	return exposed;

}));


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/throttle.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/throttle.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(/*! ./debounce */ "./node_modules/lodash/debounce.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const findAndReplaceDOMText = __webpack_require__(/*! findandreplacedomtext */ "./node_modules/findandreplacedomtext/src/findAndReplaceDOMText.js");
const throttle = __webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js");
const style_1 = __webpack_require__(/*! ./style */ "./src/style.ts");
const getPageHeight = () => {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
};
// TODO:
// - only animate ffelem AFTER scroll is over
// - html text "breaks" after removing elements
// - typing is missing in some places
const DEBUG_ON = true;
const AUTO_PIN_MAP = true;
let viewPortDelta = 20;
let currentColor = 0;
let pageHeight = getPageHeight();
let windowHeight = window.innerHeight;
let settings = {
    mainKey: 'f',
    unselectAllKey: 'd',
    nextElementKey: 'r',
    previousElementKey: 'e',
    nextInstanceKey: 't',
    previousInstanceKey: 'w',
    showRotatingArrow: false,
    showSideMap: true,
    keepElementCentered: false,
    matchCaseSensitive: true,
    smoothScrolling: true,
};
let selections = [];
let repeatLogo = document.createElement('img');
let repeatLogoWrapper = document.createElement('div');
let selectionsMapWrapper = document.createElement('div');
let selectionsMapPin = document.createElement('div');
let selectionsMapScroll = document.createElement('div');
let mapPin = document.createElement('img');
const initFF = () => {
    const style = document.createElement('style');
    style.innerHTML = style_1.ffStyle;
    repeatLogo.setAttribute('src', chrome.extension.getURL('assets/repeat.png'));
    repeatLogo.className = 'repeatLogo';
    repeatLogoWrapper.className = 'repeatLogoWrapper';
    selectionsMapWrapper.className = 'selectionsMapWrapper';
    selectionsMapPin.className = 'selectionsMapPin';
    selectionsMapPin.onclick = () => requestAnimationFrame(() => {
        selectionsMapPin.classList.toggle('fixed');
        selectionsMapWrapper.classList.toggle('fixed');
    });
    if (AUTO_PIN_MAP) {
        selectionsMapPin.classList.toggle('fixed');
        selectionsMapWrapper.classList.toggle('fixed');
    }
    selectionsMapScroll.className = "selectionsMapScroll";
    mapPin.setAttribute('src', chrome.extension.getURL('assets/pin.png'));
    mapPin.className = 'mapPin';
    requestAnimationFrame(() => {
        document.head.appendChild(style);
        repeatLogoWrapper.appendChild(repeatLogo);
        document.body.appendChild(repeatLogoWrapper);
        document.body.appendChild(selectionsMapWrapper);
        selectionsMapWrapper.appendChild(selectionsMapPin);
        selectionsMapPin.appendChild(mapPin);
        selectionsMapWrapper.appendChild(selectionsMapScroll);
    });
    windowHeight = window.innerHeight;
    window.addEventListener('resize', throttle(() => {
        let newPageHeight = getPageHeight();
        let newWindowHeight = window.innerHeight;
        if (newPageHeight != pageHeight ||
            newWindowHeight != windowHeight) {
            windowHeight = newWindowHeight;
            pageHeight = newPageHeight;
            redrawMinimapScroll(true);
            redrawMapIndicators();
        }
    }, 200));
    window.addEventListener('scroll', () => redrawMinimapScroll(false));
    document.body.addEventListener('keydown', onKeyDown);
};
const redrawMinimapScroll = (rescale) => {
    if (!selections.length && !rescale)
        return;
    requestAnimationFrame(() => {
        pageHeight = getPageHeight();
        const minHeight = 15;
        const scrollHeight = (window.innerHeight / pageHeight) * window.innerHeight;
        const finalHeight = parseFloat(Math.max(scrollHeight, minHeight).toFixed(3));
        if (rescale)
            selectionsMapScroll.style.height = `${finalHeight}px`;
        const scrollToTop = (document.documentElement.scrollTop || document.body.scrollTop || 0);
        let scrollDistance = scrollToTop / pageHeight * 100 - 0.04;
        if (scrollHeight < minHeight) {
            scrollDistance -= 0.3;
        }
        selectionsMapScroll.style.transform =
            `translateY(${scrollDistance.toFixed(3)}vh)`;
    });
};
const onKeyDown = (e) => {
    if (e.target.contentEditable === 'true' ||
        e.target.tagName.toLowerCase() === 'input' ||
        e.target.tagName.toLowerCase() === 'textarea' ||
        e.metaKey)
        return false;
    const selection = window.getSelection();
    const text = selection.toString();
    if (e.key === settings.mainKey ||
        (e.key === settings.mainKey.toUpperCase() && !e.shiftKey)) {
        if (text && text.length) {
            // No support for multi-line for now...
            if (!text.trim().length ||
                (text.indexOf('\n') != text.length - 1 && text.indexOf('\n') != -1))
                return;
            const exists = selections.find(selection => selection.sanitizedText === text);
            if (!exists) {
                createElement(text, selection);
            }
            else {
                removeSelectedOrLastElement();
            }
        }
        else {
            removeSelectedOrLastElement();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.key === settings.unselectAllKey && selections.length ||
        (e.key === settings.unselectAllKey.toUpperCase() && !e.shiftKey)) {
        removeAllElements();
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.key === settings.nextElementKey && selections.length ||
        (e.key === settings.nextElementKey.toUpperCase() && !e.shiftKey)) {
        cycleThroughElements(1);
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.key === settings.previousElementKey && selections.length ||
        (e.key === settings.previousElementKey.toUpperCase() && !e.shiftKey)) {
        cycleThroughElements(-1);
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.key === settings.nextInstanceKey && selections.length ||
        (e.key === settings.nextInstanceKey.toUpperCase() && !e.shiftKey)) {
        cycleThroughInstances(1);
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.key === settings.previousInstanceKey && selections.length ||
        (e.key === settings.previousInstanceKey.toUpperCase() && !e.shiftKey)) {
        cycleThroughInstances(-1);
        e.preventDefault();
        e.stopPropagation();
    }
};
const cycleThroughInstances = (direction) => {
    const { instance, element } = getSelectedStructures();
    if (!instance || !element)
        return false;
    let nextIndex = selections.indexOf(instance) + direction;
    if (nextIndex >= selections.length) {
        nextIndex = 0;
        // settings.showRotatingArrow && rotateLogo();
    }
    else if (nextIndex < 0) {
        nextIndex = selections.length - 1;
        // settings.showRotatingArrow && rotateLogo();
    }
    const nextActive = selections[nextIndex];
    const selectedElement = nextActive.elements.find(elem => elem.active);
    selectElement(nextActive, selectedElement, true);
};
const cycleThroughElements = (direction) => {
    const { instance, element } = getSelectedStructures();
    if (!instance || !element)
        return false;
    const { elements } = instance;
    let nextIndex = elements.indexOf(element) + direction;
    if (nextIndex >= elements.length) {
        nextIndex = 0;
        settings.showRotatingArrow && rotateLogo();
    }
    else if (nextIndex < 0) {
        nextIndex = elements.length - 1;
        settings.showRotatingArrow && rotateLogo();
    }
    const nextActive = elements[nextIndex];
    selectElement(instance, nextActive, true);
};
const getSelectedStructures = () => {
    let instance = selections.find(instance => instance.active) || null;
    let element = instance
        ? instance.elements.find(element => element.active)
        : null;
    return { element, instance };
};
const unselectElement = () => {
    selections.forEach(selection => {
        if (selection.active) {
            selection.active = false;
            requestAnimationFrame(() => {
                selection.mapWrapper.classList.remove('selected');
            });
            selection.elements.forEach(elem => {
                if (elem.active) {
                    requestAnimationFrame(() => {
                        elem.portions.forEach(p => p.classList.remove('selected'));
                        elem.mapIndicator.classList.remove('selected');
                    });
                }
                else {
                    requestAnimationFrame(() => {
                        elem.portions.forEach(p => p.classList.remove('selectedClass'));
                    });
                }
            });
        }
    });
};
const selectElement = (instance, element, scrollIntoView) => {
    if (!element || !instance)
        return false;
    unselectElement();
    selections.forEach(selection => {
        if (selection === instance) {
            selection.active = true;
            requestAnimationFrame(() => {
                selection.mapWrapper.classList.add('selected');
            });
            selection.elements.forEach(elem => {
                if (elem === element) {
                    elem.active = true;
                    requestAnimationFrame(() => {
                        elem.portions.forEach(p => p.classList.add('selected'));
                        elem.mapIndicator.classList.add('selected');
                    });
                    const scrollBehaviour = settings.smoothScrolling ? 'smooth' : 'instant';
                    const scrollSettings = {
                        block: 'center',
                        behavior: scrollBehaviour,
                    };
                    if (settings.keepElementCentered || !isElementInViewport(elem.portions[0])) {
                        scrollIntoView && elem.portions[0].scrollIntoView(scrollSettings);
                    }
                }
                else {
                    elem.active = false;
                    requestAnimationFrame(() => {
                        elem.portions.forEach(p => p.classList.add('selectedClass'));
                    });
                }
            });
        }
    });
};
const removeElement = (selection) => {
    selection.elements.forEach(element => element.mapIndicator.remove());
    selection.mapWrapper.remove();
    selection.elements.forEach(element => {
        element.portions.forEach((portion) => {
            while (portion.childNodes.length) {
                portion.parentNode.insertBefore(portion.childNodes[0], portion);
            }
            portion.parentNode.removeChild(portion);
        });
    });
    // selection.finder.revert();
};
const removeSelectedOrLastElement = () => {
    const { instance } = getSelectedStructures();
    if (instance) {
        removeElement(instance);
        selections.splice(selections.indexOf(instance), 1);
    }
    else {
        selections.length && removeElement(selections.pop());
    }
    if (selections.length) {
        const nextInstance = selections[selections.length - 1];
        const selectedElement = nextInstance.elements.find(elem => elem.active);
        selectElement(nextInstance, selectedElement, true);
    }
};
const removeAllElements = () => {
    selections.forEach(removeElement);
    selections = [];
};
const createElement = (text, selection) => {
    let activeElements = 0;
    const selectionRange = selection.getRangeAt(0);
    let activeSelectionNode = document.createElement('ffelem');
    ;
    if (selectionRange.startContainer == selectionRange.endContainer) {
        selectionRange.surroundContents(activeSelectionNode);
    }
    else {
        const newRange = document.createRange();
        newRange.selectNode(selectionRange.endContainer);
        newRange.surroundContents(activeSelectionNode);
        newRange.collapse();
    }
    const scrollToTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    let color;
    if (currentColor < style_1.colors.length) {
        color = style_1.colors[currentColor++];
    }
    else {
        color = getRandomColor();
    }
    const contrast = getContrastYIQ(color);
    const currentElements = [];
    let portions = [];
    let active = false;
    let someActive = false;
    let regexFinder = null;
    let excapedText = text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    try {
        regexFinder = RegExp(excapedText, settings.matchCaseSensitive ? 'g' : 'gi');
    }
    catch (error) {
        if (DEBUG_ON) {
            console.error(error);
            debugger;
        }
        return;
    }
    const finder = findAndReplaceDOMText(document.body, {
        preset: 'prose',
        find: regexFinder,
        replace: portion => {
            const elementIsVisible = !!(portion.node.parentElement.offsetWidth ||
                portion.node.parentElement.offsetHeight ||
                portion.node.parentElement.getClientRects().length);
            if (elementIsVisible) {
                const div = document.createElement('ffelem');
                portions.push(div);
                requestAnimationFrame(() => {
                    if (portion.index === 0 && portion.isEnd)
                        div.classList.add('ffelem');
                    else if (portion.index === 0)
                        div.classList.add('ffelemStart');
                    else if (portion.isEnd)
                        div.classList.add('ffelemEnd');
                    else
                        div.classList.add('ffelemMiddle');
                    div.style.backgroundColor = renderColor(color, 1.0);
                    div.style.color = contrast;
                    div.innerHTML = portion.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                });
                if (portion.isEnd) {
                    active = active || getElementParents(portion.node).includes(activeSelectionNode);
                    someActive = active || someActive;
                    const element = { portions, active, mapIndicator: null };
                    currentElements.push(element);
                    portions = [];
                    if (active)
                        activeElements++;
                    active = false;
                }
                return div;
            }
            else {
                return portion.text;
            }
        }
    });
    requestAnimationFrame(() => {
        while (activeSelectionNode.childNodes.length)
            activeSelectionNode.parentNode.insertBefore(activeSelectionNode.childNodes[0], activeSelectionNode);
        activeSelectionNode.parentNode.removeChild(activeSelectionNode);
    });
    if (DEBUG_ON && currentElements.length && (activeElements === 0 || activeElements > 1)) {
        console.log('Active elements:', activeElements);
        console.log('Elements:', currentElements);
        debugger;
    }
    if (!currentElements.length)
        return false;
    unselectElement();
    window.getSelection().empty();
    const mapWrapper = document.createElement('div');
    mapWrapper.classList.add('mapWrapper');
    mapWrapper.classList.add('selected');
    const currentSelection = {
        finder,
        active: true,
        elements: currentElements,
        mapWrapper,
        sanitizedText: text,
    };
    currentElements.forEach(element => {
        const { portions, active } = element;
        portions.forEach(div => {
            div.onmouseover = div.onmouseout = onElementHover(currentSelection);
            div.onclick = () => selectElement(currentSelection, element, false);
            if (active) {
                requestAnimationFrame(() => {
                    div.classList.add('selected');
                });
            }
            else if (someActive) {
                requestAnimationFrame(() => {
                    div.classList.add('selectedClass');
                });
            }
        });
        let indicator = document.createElement('div');
        indicator.classList.add('mapIndicator');
        if (active)
            indicator.classList.add('selected');
        indicator.onclick = () => selectElement(currentSelection, element, true);
        requestAnimationFrame(() => {
            pageHeight = getPageHeight();
            let elementPosition = element.portions[0].getBoundingClientRect().top +
                (document.documentElement.scrollTop || document.body.scrollTop || 0);
            indicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
            indicator.style.backgroundColor = renderColor(color, 0.8);
            mapWrapper.insertBefore(indicator, mapWrapper.firstChild);
        });
        element.mapIndicator = indicator;
    });
    const label = document.createElement('div');
    label.classList.add('mapLabel');
    label.style.background =
        `linear-gradient(to bottom,
${renderColor(color, 1.0)} 0%,
${renderColor(color, 0.8)} 10%,
${renderColor(color, 0.6)} 40%,
#00000000 50%,#00000000 100%)`;
    label.innerText = text.split('').reverse().join('');
    requestAnimationFrame(() => {
        currentSelection.mapWrapper.appendChild(label);
        selectionsMapWrapper.appendChild(mapWrapper);
    });
    if (!selections.length)
        redrawMinimapScroll(true);
    selections.push(currentSelection);
    document.documentElement.scrollTop && document.documentElement.scrollTo({ top: scrollToTop });
    document.body.scrollTop && document.body.scrollTo({ top: scrollToTop });
};
const redrawMapIndicators = () => {
    selections.forEach(instance => {
        instance.elements.forEach(element => {
            let elementPosition = element.portions[0].getBoundingClientRect().top +
                (document.documentElement.scrollTop || document.body.scrollTop || 0);
            requestAnimationFrame(() => {
                element.mapIndicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
            });
        });
    });
};
const onElementHover = (currentSelection) => (event) => currentSelection.elements.forEach(element => element.portions.forEach(portion => requestAnimationFrame(() => event.type === 'mouseover'
    ? portion.classList.add('hovered')
    : portion.classList.remove('hovered'))));
const rotateLogo = () => {
    repeatLogo.classList.add('active');
    repeatLogoWrapper.classList.add('active');
    window.setTimeout(() => {
        repeatLogo.classList.remove('active');
        repeatLogoWrapper.classList.remove('active');
    }, 810);
};
const getRandomColor = () => {
    return [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ];
};
const renderColor = (color, transparency) => {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${transparency})`;
};
const getContrastYIQ = (color) => {
    const r = color[0];
    const g = color[1];
    const b = color[2];
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
};
const getParentIndex = (node, reverse = false) => {
    let childNodes = node.parentNode.childNodes;
    let index = 0;
    childNodes.forEach((child, i) => {
        if (child === node)
            index = i;
    });
    if (reverse) {
        return childNodes.length - index - 1;
    }
    else {
        return index;
    }
};
const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top >= 0 + viewPortDelta && rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) - viewPortDelta &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    return isInViewport;
};
const getElementParents = node => {
    const nodes = [node];
    for (; node; node = node.parentNode) {
        nodes.unshift(node);
    }
    return nodes;
};
const commonAncestor = (node1, node2) => {
    const parents1 = getElementParents(node1);
    const parents2 = getElementParents(node2);
    if (parents1[0] != parents2[0])
        throw "No common ancestor!";
    for (let i = 0; i < parents1.length; i++) {
        if (parents1[i] != parents2[i])
            return parents1[i - 1];
    }
};
window.onload = initFF;


/***/ }),

/***/ "./src/style.ts":
/*!**********************!*\
  !*** ./src/style.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ffStyle = `
body {
  --elem-normal: 0px;
  --elem-big: -2px;
  --elem-max: -4px;

  --elem-radius: 2px;
  --elem-radius-selected: 3px;
}



/* #################### FFELEM #################### */

.ffelem {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
  transition: all .2s ease;
}

.ffelemMiddle {
  position: relative;
  z-index: 1;
  display: inline-block;
}

.ffelemStart {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
}

.ffelemEnd {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
}

.ffelem.hovered  { z-index: 2; }
.ffelemMiddle.hovered  { z-index: 2; }
.ffelemStart.hovered  { z-index: 2; }
.ffelemEnd.hovered  { z-index: 2; }
.ffelem.selected { z-index: 3; }
.ffelemMiddle.selected { z-index: 3; }
.ffelemStart.selected { z-index: 3; }
.ffelemEnd.selected { z-index: 3; }



.ffelem::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
  transition: all .2s ease;
}

.ffelemMiddle::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  transition: all .2s ease;
}

.ffelemStart::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
  transition: all .2s ease;
}

.ffelemEnd::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
  transition: all .2s ease;
}



.ffelem.hovered::before {
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
}

.ffelemMiddle.hovered::before {
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.hovered::before {
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
}

.ffelemEnd.hovered::before {
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
}



.ffelem.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemMiddle.selectedClass::before {
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemEnd.selectedClass::before {
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}



.ffelem.selected::before {
  animation: highlight .5s cubic-bezier(.6, 0, .4, 1);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-left: solid 1px rgba(255,255,255,1.0) !important;
  border-right: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemMiddle.selected::before {
  animation: highlightMiddle .5s cubic-bezier(.6, 0, .4, 1);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selected::before {
  animation: highlightStart .5s cubic-bezier(.6, 0, .4, 1);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-left: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemEnd.selected::before {
  animation: highlightEnd .5s cubic-bezier(.6, 0, .4, 1);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-right: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}



/* #################### FFELEM ANIMATIONS #################### */

@keyframes highlight {
  0% {
    top: var(--elem-big);
    left: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
  15% {
    top: var(--elem-normal);
    left: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
    top: var(--elem-max);
    left: var(--elem-max);
    right: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    left: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
}

@keyframes highlightMiddle {
  0% {
    top: var(--elem-big);
    bottom: var(--elem-big);
  }
  10% {
    top: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  70% {
    top: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    bottom: var(--elem-big);
  }
}

@keyframes highlightStart {
  0% {
    top: var(--elem-big);
    left: var(--elem-big);
    bottom: var(--elem-big);
  }
  10% {
    top: var(--elem-normal);
    left: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  70% {
    top: var(--elem-max);
    left: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    left: var(--elem-big);
    bottom: var(--elem-big);
  }
}

@keyframes highlightEnd {
  0% {
    top: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
  10% {
    top: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  70% {
    top: var(--elem-max);
    right: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
}



/* #################### PAGE LOOP LOGO #################### */

.repeatLogoWrapper {
  opacity: 0;
  background-color: rgba(90,90,90,0.7);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px 12px 18px;
  border-radius: 20px;
  z-index: 1000000;
  pointer-events: none;
}

.repeatLogo {
  opacity: .7;
  transform: rotate(-30deg);
  pointer-events: none;
}

.repeatLogo.active {
  animation: rotateLogo .5s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogo {
  0%   { transform: rotate(-30deg); }
  100% { transform: rotate( 80deg); }
}

.repeatLogoWrapper.active {
  animation: rotateLogoWrapper .5s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogoWrapper {
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  65%  { opacity: 1; }
  100% { opacity: 0; }
}



/* #################### SELECTIONS MAP WRAPPER #################### */

.selectionsMapWrapper {
  display: flex;
  min-width: 0px;
  height: 100vh;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 10000;
  background: none;
}

.selectionsMapWrapper:hover {
  background: rgba(0,0,0,0.6);
}

.selectionsMapWrapper.fixed {
  background: rgba(0,0,0,0.6);
}



/* #################### SELECTIONS MAP SCROLL #################### */

.selectionsMapScroll {
  position: absolute;
  width: 100%;
  background: rgba(255,255,255,0.4);
  opacity: 0.5;
  z-index: 2;
  pointer-events: none;
}



/* #################### SELECTIONS MAP PIN #################### */

.selectionsMapPin {
  visibility: hidden;
  width: 20px;
  height: 20px;
  background: rgba(0,0,0,0.6);
  position: absolute;
  left: -20px;
}

.selectionsMapPin.fixed {
  visibility: visible;
}

.selectionsMapWrapper:hover .selectionsMapPin {
  visibility: visible;
}



/* #################### MAP PIN #################### */

.mapPin {
  width: 100%;
  padding: 4px;
  opacity: 0.4;
  filter: invert(100%);
  box-sizing: border-box;
  cursor: pointer;
  transition: all .2s ease;
}

.selectionsMapPin.fixed .mapPin {
  opacity: 1.0;
}

.mapPin:hover {
  padding: 3px;
}



/* #################### MAP WRAPPER #################### */

.selectionsMapWrapper .mapWrapper {
  position: absolute;
  right: 0px;
  width: 14px;
  height: 100vh;
}

.selectionsMapWrapper:hover .mapWrapper {
  position: relative;
}

.selectionsMapWrapper.fixed .mapWrapper {
  position: relative;
}

.mapWrapper.selected {
  z-index: 3;
}

.mapWrapper:hover {
  background: rgba(255,255,255,0.4);
}



/* #################### INDICATORS #################### */

.mapIndicator {
  position: absolute;
  right: 0px;
  width: 10px;
  height: 6px;
  margin-left: 4px;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.8);
  border-radius: 1px;
  transition: all .2s ease;
  z-index: 2;
  cursor: pointer;
  box-sizing: content-box;
}

.mapWrapper.selected .mapIndicator {
  border: solid 0.5px rgba(255,255,255,0.4) !important;
  width: 9px;
  height: 5px;
}

.mapIndicator:hover {
  width: 14px;
  margin-left: 0px;
}

.mapWrapper.selected .mapIndicator:hover {
  width: 14px;
  margin-left: 0px;
}

.mapWrapper.selected .mapIndicator.selected {
  border: solid 0.5px rgba(255,255,255,1.0) !important;
  width: 18px;
  margin-left: -4px;
  z-index: 1;
}



/* #################### MAP LABEL #################### */

.mapLabel {
  visibility: hidden;
  font-size: 11px;
  font-family: monospace;
  color: rgba(255,255,255,1.0);
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 50vh;
  margin-top: 14vh;
  height: 85vh;
  width: 14px;
  user-select: none;
  transform: rotate(180deg);
  box-sizing: content-box;
  unicode-bidi: bidi-override;
  direction: rtl;
  text-align: left;
  line-height: 14px;
  writing-mode: vertical-rl;
  transition: all .2s ease;
}

.mapWrapper:hover .mapLabel {
  margin-top: 13vh;
  padding-top: 30vh;
}

.mapWrapper.selected .mapLabel {
  margin-top: 12vh;
  padding-top: 10vh;
}

.selectionsMapWrapper:hover .mapLabel {
  visibility: visible;
}

.selectionsMapWrapper.fixed .mapLabel {
  visibility: visible;
}
`;
exports.colors = [
    [30, 168, 150],
    [255, 97, 100],
    [0, 113, 188],
    [31, 184, 92],
    [247, 92, 3],
    [101, 155, 94],
    [250, 169, 22],
    [194, 32, 44],
    [181, 40, 144],
    [73, 48, 240],
    [90, 19, 108],
    [23, 68, 43]
];


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmluZGFuZHJlcGxhY2Vkb210ZXh0L3NyYy9maW5kQW5kUmVwbGFjZURPTVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL25vdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL3Rocm90dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLnRzIl0s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O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLEtBQUs7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFF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RUFBRSxHQUFHLENBQUM7SUFDZCxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUNiLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUNkLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDYixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztJQUNiLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7SUFDYixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0NBQ2IsQ0FBQyIsImZpbGUiOiJjb250ZW50LXNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqXG4gKiBmaW5kQW5kUmVwbGFjZURPTVRleHQgdiAwLjQuNlxuICogQGF1dGhvciBKYW1lcyBQYWRvbHNleSBodHRwOi8vamFtZXMucGFkb2xzZXkuY29tXG4gKiBAbGljZW5zZSBodHRwOi8vdW5saWNlbnNlLm9yZy9VTkxJQ0VOU0VcbiAqXG4gKiBNYXRjaGVzIHRoZSB0ZXh0IG9mIGEgRE9NIG5vZGUgYWdhaW5zdCBhIHJlZ3VsYXIgZXhwcmVzc2lvblxuICogYW5kIHJlcGxhY2VzIGVhY2ggbWF0Y2ggKG9yIG5vZGUtc2VwYXJhdGVkIHBvcnRpb25zIG9mIHRoZSBtYXRjaClcbiAqIGluIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAqL1xuIChmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICAgZGVmaW5lKGZhY3RvcnkpO1xuICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgICByb290LmZpbmRBbmRSZXBsYWNlRE9NVGV4dCA9IGZhY3RvcnkoKTtcbiAgICAgfVxuIH0odGhpcywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuXHR2YXIgUE9SVElPTl9NT0RFX1JFVEFJTiA9ICdyZXRhaW4nO1xuXHR2YXIgUE9SVElPTl9NT0RFX0ZJUlNUID0gJ2ZpcnN0JztcblxuXHR2YXIgZG9jID0gZG9jdW1lbnQ7XG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBlc2NhcGVSZWdFeHAocykge1xuXHRcdHJldHVybiBTdHJpbmcocykucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFtcXF1cXC9cXFxcXSkvZywgJ1xcXFwkMScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXhwb3NlZCgpIHtcblx0XHQvLyBUcnkgZGVwcmVjYXRlZCBhcmcgc2lnbmF0dXJlIGZpcnN0OlxuXHRcdHJldHVybiBkZXByZWNhdGVkLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfHwgZmluZEFuZFJlcGxhY2VET01UZXh0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZXByZWNhdGVkKHJlZ2V4LCBub2RlLCByZXBsYWNlbWVudCwgY2FwdHVyZUdyb3VwLCBlbEZpbHRlcikge1xuXHRcdGlmICgobm9kZSAmJiAhbm9kZS5ub2RlVHlwZSkgJiYgYXJndW1lbnRzLmxlbmd0aCA8PSAyKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHZhciBpc1JlcGxhY2VtZW50RnVuY3Rpb24gPSB0eXBlb2YgcmVwbGFjZW1lbnQgPT0gJ2Z1bmN0aW9uJztcblxuXHRcdGlmIChpc1JlcGxhY2VtZW50RnVuY3Rpb24pIHtcblx0XHRcdHJlcGxhY2VtZW50ID0gKGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbihwb3J0aW9uLCBtYXRjaCkge1xuXHRcdFx0XHRcdHJldHVybiBvcmlnaW5hbChwb3J0aW9uLnRleHQsIG1hdGNoLnN0YXJ0SW5kZXgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fShyZXBsYWNlbWVudCkpO1xuXHRcdH1cblxuXHRcdC8vIEF3a3dhcmQgc3VwcG9ydCBmb3IgZGVwcmVjYXRlZCBhcmd1bWVudCBzaWduYXR1cmUgKDwwLjQuMClcblx0XHR2YXIgaW5zdGFuY2UgPSBmaW5kQW5kUmVwbGFjZURPTVRleHQobm9kZSwge1xuXG5cdFx0XHRmaW5kOiByZWdleCxcblxuXHRcdFx0d3JhcDogaXNSZXBsYWNlbWVudEZ1bmN0aW9uID8gbnVsbCA6IHJlcGxhY2VtZW50LFxuXHRcdFx0cmVwbGFjZTogaXNSZXBsYWNlbWVudEZ1bmN0aW9uID8gcmVwbGFjZW1lbnQgOiAnJCcgKyAoY2FwdHVyZUdyb3VwIHx8ICcmJyksXG5cblx0XHRcdHByZXBNYXRjaDogZnVuY3Rpb24obSwgbWkpIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0IGNhcHR1cmVHcm91cCAoYSBkZXByZWNhdGVkIGZlYXR1cmUpXG5cblx0XHRcdFx0aWYgKCFtWzBdKSB0aHJvdyAnZmluZEFuZFJlcGxhY2VET01UZXh0IGNhbm5vdCBoYW5kbGUgemVyby1sZW5ndGggbWF0Y2hlcyc7XG5cblx0XHRcdFx0aWYgKGNhcHR1cmVHcm91cCA+IDApIHtcblx0XHRcdFx0XHR2YXIgY2cgPSBtW2NhcHR1cmVHcm91cF07XG5cdFx0XHRcdFx0bS5pbmRleCArPSBtWzBdLmluZGV4T2YoY2cpO1xuXHRcdFx0XHRcdG1bMF0gPSBjZztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG0uZW5kSW5kZXggPSBtLmluZGV4ICsgbVswXS5sZW5ndGg7XG5cdFx0XHRcdG0uc3RhcnRJbmRleCA9IG0uaW5kZXg7XG5cdFx0XHRcdG0uaW5kZXggPSBtaTtcblxuXHRcdFx0XHRyZXR1cm4gbTtcblx0XHRcdH0sXG5cdFx0XHRmaWx0ZXJFbGVtZW50czogZWxGaWx0ZXJcblx0XHR9KTtcblxuXHRcdGV4cG9zZWQucmV2ZXJ0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UucmV2ZXJ0KCk7XG5cdFx0fTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIGZpbmRBbmRSZXBsYWNlRE9NVGV4dFxuXHQgKlxuXHQgKiBMb2NhdGVzIG1hdGNoZXMgYW5kIHJlcGxhY2VzIHdpdGggcmVwbGFjZW1lbnROb2RlXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZSBFbGVtZW50IG9yIFRleHQgbm9kZSB0byBzZWFyY2ggd2l0aGluXG5cdCAqIEBwYXJhbSB7UmVnRXhwfSBvcHRpb25zLmZpbmQgVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaFxuXHQgKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fSBbb3B0aW9ucy53cmFwXSBBIE5vZGVOYW1lLCBvciBhIE5vZGUgdG8gY2xvbmVcblx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLndyYXBDbGFzc10gQSBjbGFzc25hbWUgdG8gYXBwZW5kIHRvIHRoZSB3cmFwcGluZyBlbGVtZW50XG5cdCAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBbb3B0aW9ucy5yZXBsYWNlPSckJiddIFdoYXQgdG8gcmVwbGFjZSBlYWNoIG1hdGNoIHdpdGhcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZmlsdGVyRWxlbWVudHNdIEEgRnVuY3Rpb24gdG8gYmUgY2FsbGVkIHRvIGNoZWNrIHdoZXRoZXIgdG9cblx0ICpcdHByb2Nlc3MgYW4gZWxlbWVudC4gKHJldHVybmluZyB0cnVlID0gcHJvY2VzcyBlbGVtZW50LFxuXHQgKlx0cmV0dXJuaW5nIGZhbHNlID0gYXZvaWQgZWxlbWVudClcblx0ICovXG5cdGZ1bmN0aW9uIGZpbmRBbmRSZXBsYWNlRE9NVGV4dChub2RlLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIG5ldyBGaW5kZXIobm9kZSwgb3B0aW9ucyk7XG5cdH1cblxuXHRleHBvc2VkLk5PTl9QUk9TRV9FTEVNRU5UUyA9IHtcblx0XHRicjoxLCBocjoxLFxuXHRcdC8vIE1lZGlhIC8gU291cmNlIGVsZW1lbnRzOlxuXHRcdHNjcmlwdDoxLCBzdHlsZToxLCBpbWc6MSwgdmlkZW86MSwgYXVkaW86MSwgY2FudmFzOjEsIHN2ZzoxLCBtYXA6MSwgb2JqZWN0OjEsXG5cdFx0Ly8gSW5wdXQgZWxlbWVudHNcblx0XHRpbnB1dDoxLCB0ZXh0YXJlYToxLCBzZWxlY3Q6MSwgb3B0aW9uOjEsIG9wdGdyb3VwOiAxLCBidXR0b246MVxuXHR9O1xuXG5cdGV4cG9zZWQuTk9OX0NPTlRJR1VPVVNfUFJPU0VfRUxFTUVOVFMgPSB7XG5cblx0XHQvLyBFbGVtZW50cyB0aGF0IHdpbGwgbm90IGNvbnRhaW4gcHJvc2Ugb3IgYmxvY2sgZWxlbWVudHMgd2hlcmUgd2UgZG9uJ3Rcblx0XHQvLyB3YW50IHByb3NlIHRvIGJlIG1hdGNoZXMgYWNyb3NzIGVsZW1lbnQgYm9yZGVyczpcblxuXHRcdC8vIEJsb2NrIEVsZW1lbnRzXG5cdFx0YWRkcmVzczoxLCBhcnRpY2xlOjEsIGFzaWRlOjEsIGJsb2NrcXVvdGU6MSwgZGQ6MSwgZGl2OjEsXG5cdFx0ZGw6MSwgZmllbGRzZXQ6MSwgZmlnY2FwdGlvbjoxLCBmaWd1cmU6MSwgZm9vdGVyOjEsIGZvcm06MSwgaDE6MSwgaDI6MSwgaDM6MSxcblx0XHRoNDoxLCBoNToxLCBoNjoxLCBoZWFkZXI6MSwgaGdyb3VwOjEsIGhyOjEsIG1haW46MSwgbmF2OjEsIG5vc2NyaXB0OjEsIG9sOjEsXG5cdFx0b3V0cHV0OjEsIHA6MSwgcHJlOjEsIHNlY3Rpb246MSwgdWw6MSxcblx0XHQvLyBPdGhlciBtaXNjLiBlbGVtZW50cyB0aGF0IGFyZSBub3QgcGFydCBvZiBjb250aW51b3VzIGlubGluZSBwcm9zZTpcblx0XHRicjoxLCBsaTogMSwgc3VtbWFyeTogMSwgZHQ6MSwgZGV0YWlsczoxLCBycDoxLCBydDoxLCBydGM6MSxcblx0XHQvLyBNZWRpYSAvIFNvdXJjZSBlbGVtZW50czpcblx0XHRzY3JpcHQ6MSwgc3R5bGU6MSwgaW1nOjEsIHZpZGVvOjEsIGF1ZGlvOjEsIGNhbnZhczoxLCBzdmc6MSwgbWFwOjEsIG9iamVjdDoxLFxuXHRcdC8vIElucHV0IGVsZW1lbnRzXG5cdFx0aW5wdXQ6MSwgdGV4dGFyZWE6MSwgc2VsZWN0OjEsIG9wdGlvbjoxLCBvcHRncm91cDoxLCBidXR0b246MSxcblx0XHQvLyBUYWJsZSByZWxhdGVkIGVsZW1lbnRzOlxuXHRcdHRhYmxlOjEsIHRib2R5OjEsIHRoZWFkOjEsIHRoOjEsIHRyOjEsIHRkOjEsIGNhcHRpb246MSwgY29sOjEsIHRmb290OjEsIGNvbGdyb3VwOjFcblxuXHR9O1xuXG5cdGV4cG9zZWQuTk9OX0lOTElORV9QUk9TRSA9IGZ1bmN0aW9uKGVsKSB7XG5cdFx0cmV0dXJuIGhhc093bi5jYWxsKGV4cG9zZWQuTk9OX0NPTlRJR1VPVVNfUFJPU0VfRUxFTUVOVFMsIGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpO1xuXHR9O1xuXG5cdC8vIFByZXNldHMgYWNjZXNzZWQgdmlhIGBvcHRpb25zLnByZXNldGAgd2hlbiBjYWxsaW5nIGZpbmRBbmRSZXBsYWNlRE9NVGV4dCgpOlxuXHRleHBvc2VkLlBSRVNFVFMgPSB7XG5cdFx0cHJvc2U6IHtcblx0XHRcdGZvcmNlQ29udGV4dDogZXhwb3NlZC5OT05fSU5MSU5FX1BST1NFLFxuXHRcdFx0ZmlsdGVyRWxlbWVudHM6IGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdHJldHVybiAhaGFzT3duLmNhbGwoZXhwb3NlZC5OT05fUFJPU0VfRUxFTUVOVFMsIGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRleHBvc2VkLkZpbmRlciA9IEZpbmRlcjtcblxuXHQvKipcblx0ICogRmluZGVyIC0tIGVuY2Fwc3VsYXRlcyBsb2dpYyB0byBmaW5kIGFuZCByZXBsYWNlLlxuXHQgKi9cblx0ZnVuY3Rpb24gRmluZGVyKG5vZGUsIG9wdGlvbnMpIHtcblxuXHRcdHZhciBwcmVzZXQgPSBvcHRpb25zLnByZXNldCAmJiBleHBvc2VkLlBSRVNFVFNbb3B0aW9ucy5wcmVzZXRdO1xuXG5cdFx0b3B0aW9ucy5wb3J0aW9uTW9kZSA9IG9wdGlvbnMucG9ydGlvbk1vZGUgfHwgUE9SVElPTl9NT0RFX1JFVEFJTjtcblxuXHRcdGlmIChwcmVzZXQpIHtcblx0XHRcdGZvciAodmFyIGkgaW4gcHJlc2V0KSB7XG5cdFx0XHRcdGlmIChoYXNPd24uY2FsbChwcmVzZXQsIGkpICYmICFoYXNPd24uY2FsbChvcHRpb25zLCBpKSkge1xuXHRcdFx0XHRcdG9wdGlvbnNbaV0gPSBwcmVzZXRbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLm5vZGUgPSBub2RlO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHQvLyBFbmFibGUgbWF0Y2gtcHJlcGFyYXRpb24gbWV0aG9kIHRvIGJlIHBhc3NlZCBhcyBvcHRpb246XG5cdFx0dGhpcy5wcmVwTWF0Y2ggPSBvcHRpb25zLnByZXBNYXRjaCB8fCB0aGlzLnByZXBNYXRjaDtcblxuXHRcdHRoaXMucmV2ZXJ0cyA9IFtdO1xuXG5cdFx0dGhpcy5tYXRjaGVzID0gdGhpcy5zZWFyY2goKTtcblxuXHRcdGlmICh0aGlzLm1hdGNoZXMubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLnByb2Nlc3NNYXRjaGVzKCk7XG5cdFx0fVxuXG5cdH1cblxuXHRGaW5kZXIucHJvdG90eXBlID0ge1xuXG5cdFx0LyoqXG5cdFx0ICogU2VhcmNoZXMgZm9yIGFsbCBtYXRjaGVzIHRoYXQgY29tcGx5IHdpdGggdGhlIGluc3RhbmNlJ3MgJ21hdGNoJyBvcHRpb25cblx0XHQgKi9cblx0XHRzZWFyY2g6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHR2YXIgbWF0Y2g7XG5cdFx0XHR2YXIgbWF0Y2hJbmRleCA9IDA7XG5cdFx0XHR2YXIgb2Zmc2V0ID0gMDtcblx0XHRcdHZhciByZWdleCA9IHRoaXMub3B0aW9ucy5maW5kO1xuXHRcdFx0dmFyIHRleHRBZ2dyZWdhdGlvbiA9IHRoaXMuZ2V0QWdncmVnYXRlVGV4dCgpO1xuXHRcdFx0dmFyIG1hdGNoZXMgPSBbXTtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0cmVnZXggPSB0eXBlb2YgcmVnZXggPT09ICdzdHJpbmcnID8gUmVnRXhwKGVzY2FwZVJlZ0V4cChyZWdleCksICdnJykgOiByZWdleDtcblxuXHRcdFx0bWF0Y2hBZ2dyZWdhdGlvbih0ZXh0QWdncmVnYXRpb24pO1xuXG5cdFx0XHRmdW5jdGlvbiBtYXRjaEFnZ3JlZ2F0aW9uKHRleHRBZ2dyZWdhdGlvbikge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbCA9IHRleHRBZ2dyZWdhdGlvbi5sZW5ndGg7IGkgPCBsOyArK2kpIHtcblxuXHRcdFx0XHRcdHZhciB0ZXh0ID0gdGV4dEFnZ3JlZ2F0aW9uW2ldO1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0ZXh0ICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0Ly8gRGVhbCB3aXRoIG5lc3RlZCBjb250ZXh0czogKHJlY3Vyc2l2ZSlcblx0XHRcdFx0XHRcdG1hdGNoQWdncmVnYXRpb24odGV4dCk7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVnZXguZ2xvYmFsKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAobWF0Y2ggPSByZWdleC5leGVjKHRleHQpKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZXMucHVzaChzZWxmLnByZXBNYXRjaChtYXRjaCwgbWF0Y2hJbmRleCsrLCBvZmZzZXQpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoID0gdGV4dC5tYXRjaChyZWdleCkpIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlcy5wdXNoKHNlbGYucHJlcE1hdGNoKG1hdGNoLCAwLCBvZmZzZXQpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvZmZzZXQgKz0gdGV4dC5sZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoZXM7XG5cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUHJlcGFyZXMgYSBzaW5nbGUgbWF0Y2ggd2l0aCB1c2VmdWwgbWV0YSBpbmZvOlxuXHRcdCAqL1xuXHRcdHByZXBNYXRjaDogZnVuY3Rpb24obWF0Y2gsIG1hdGNoSW5kZXgsIGNoYXJhY3Rlck9mZnNldCkge1xuXG5cdFx0XHRpZiAoIW1hdGNoWzBdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZmluZEFuZFJlcGxhY2VET01UZXh0IGNhbm5vdCBoYW5kbGUgemVyby1sZW5ndGggbWF0Y2hlcycpO1xuXHRcdFx0fVxuXG5cdFx0XHRtYXRjaC5lbmRJbmRleCA9IGNoYXJhY3Rlck9mZnNldCArIG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXHRcdFx0bWF0Y2guc3RhcnRJbmRleCA9IGNoYXJhY3Rlck9mZnNldCArIG1hdGNoLmluZGV4O1xuXHRcdFx0bWF0Y2guaW5kZXggPSBtYXRjaEluZGV4O1xuXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEdldHMgYWdncmVnYXRlIHRleHQgd2l0aGluIHN1YmplY3Qgbm9kZVxuXHRcdCAqL1xuXHRcdGdldEFnZ3JlZ2F0ZVRleHQ6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHR2YXIgZWxlbWVudEZpbHRlciA9IHRoaXMub3B0aW9ucy5maWx0ZXJFbGVtZW50cztcblx0XHRcdHZhciBmb3JjZUNvbnRleHQgPSB0aGlzLm9wdGlvbnMuZm9yY2VDb250ZXh0O1xuXG5cdFx0XHRyZXR1cm4gZ2V0VGV4dCh0aGlzLm5vZGUpO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEdldHMgYWdncmVnYXRlIHRleHQgb2YgYSBub2RlIHdpdGhvdXQgcmVzb3J0aW5nXG5cdFx0XHQgKiB0byBicm9rZW4gaW5uZXJUZXh0L3RleHRDb250ZW50XG5cdFx0XHQgKi9cblx0XHRcdGZ1bmN0aW9uIGdldFRleHQobm9kZSkge1xuXG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdHJldHVybiBbbm9kZS5kYXRhXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlbGVtZW50RmlsdGVyICYmICFlbGVtZW50RmlsdGVyKG5vZGUpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHR4dCA9IFsnJ107XG5cdFx0XHRcdHZhciBpID0gMDtcblxuXHRcdFx0XHRpZiAobm9kZSA9IG5vZGUuZmlyc3RDaGlsZCkgZG8ge1xuXG5cdFx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0XHR0eHRbaV0gKz0gbm9kZS5kYXRhO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGlubmVyVGV4dCA9IGdldFRleHQobm9kZSk7XG5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRmb3JjZUNvbnRleHQgJiZcblx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmXG5cdFx0XHRcdFx0XHQoZm9yY2VDb250ZXh0ID09PSB0cnVlIHx8IGZvcmNlQ29udGV4dChub2RlKSlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHR4dFsrK2ldID0gaW5uZXJUZXh0O1xuXHRcdFx0XHRcdFx0dHh0WysraV0gPSAnJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBpbm5lclRleHRbMF0gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEJyaWRnZSBuZXN0ZWQgdGV4dC1ub2RlIGRhdGEgc28gdGhhdCB0aGV5J3JlXG5cdFx0XHRcdFx0XHRcdC8vIG5vdCBjb25zaWRlcmVkIHRoZWlyIG93biBjb250ZXh0czpcblx0XHRcdFx0XHRcdFx0Ly8gSS5lLiBbJ3NvbWUnLCBbJ3RoaW5nJ11dIC0+IFsnc29tZXRoaW5nJ11cblx0XHRcdFx0XHRcdFx0dHh0W2ldICs9IGlubmVyVGV4dC5zaGlmdCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGlubmVyVGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0dHh0WysraV0gPSBpbm5lclRleHQ7XG5cdFx0XHRcdFx0XHRcdHR4dFsrK2ldID0gJyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IHdoaWxlIChub2RlID0gbm9kZS5uZXh0U2libGluZyk7XG5cblx0XHRcdFx0cmV0dXJuIHR4dDtcblxuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFN0ZXBzIHRocm91Z2ggdGhlIHRhcmdldCBub2RlLCBsb29raW5nIGZvciBtYXRjaGVzLCBhbmRcblx0XHQgKiBjYWxsaW5nIHJlcGxhY2VGbiB3aGVuIGEgbWF0Y2ggaXMgZm91bmQuXG5cdFx0ICovXG5cdFx0cHJvY2Vzc01hdGNoZXM6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHR2YXIgbWF0Y2hlcyA9IHRoaXMubWF0Y2hlcztcblx0XHRcdHZhciBub2RlID0gdGhpcy5ub2RlO1xuXHRcdFx0dmFyIGVsZW1lbnRGaWx0ZXIgPSB0aGlzLm9wdGlvbnMuZmlsdGVyRWxlbWVudHM7XG5cblx0XHRcdHZhciBzdGFydFBvcnRpb24sXG5cdFx0XHRcdGVuZFBvcnRpb24sXG5cdFx0XHRcdGlubmVyUG9ydGlvbnMgPSBbXSxcblx0XHRcdFx0Y3VyTm9kZSA9IG5vZGUsXG5cdFx0XHRcdG1hdGNoID0gbWF0Y2hlcy5zaGlmdCgpLFxuXHRcdFx0XHRhdEluZGV4ID0gMCwgLy8gaS5lLiBub2RlQXRJbmRleFxuXHRcdFx0XHRtYXRjaEluZGV4ID0gMCxcblx0XHRcdFx0cG9ydGlvbkluZGV4ID0gMCxcblx0XHRcdFx0ZG9Bdm9pZE5vZGUsXG5cdFx0XHRcdG5vZGVTdGFjayA9IFtub2RlXTtcblxuXHRcdFx0b3V0OiB3aGlsZSAodHJ1ZSkge1xuXG5cdFx0XHRcdGlmIChjdXJOb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXG5cdFx0XHRcdFx0aWYgKCFlbmRQb3J0aW9uICYmIGN1ck5vZGUubGVuZ3RoICsgYXRJbmRleCA+PSBtYXRjaC5lbmRJbmRleCkge1xuXHRcdFx0XHRcdFx0Ly8gV2UndmUgZm91bmQgdGhlIGVuZGluZ1xuXHRcdFx0XHRcdFx0Ly8gKE5vdGUgdGhhdCwgaW4gdGhlIGNhc2Ugb2YgYSBzaW5nbGUgcG9ydGlvbiwgaXQnbGwgYmUgYW5cblx0XHRcdFx0XHRcdC8vIGVuZFBvcnRpb24sIG5vdCBhIHN0YXJ0UG9ydGlvbi4pXG5cdFx0XHRcdFx0XHRlbmRQb3J0aW9uID0ge1xuXHRcdFx0XHRcdFx0XHRub2RlOiBjdXJOb2RlLFxuXHRcdFx0XHRcdFx0XHRpbmRleDogcG9ydGlvbkluZGV4KyssXG5cdFx0XHRcdFx0XHRcdHRleHQ6IGN1ck5vZGUuZGF0YS5zdWJzdHJpbmcobWF0Y2guc3RhcnRJbmRleCAtIGF0SW5kZXgsIG1hdGNoLmVuZEluZGV4IC0gYXRJbmRleCksXG5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgaXQncyB0aGUgZmlyc3QgbWF0Y2ggKGF0SW5kZXg9PTApIHdlIHNob3VsZCBqdXN0IHJldHVybiAwXG5cdFx0XHRcdFx0XHRcdGluZGV4SW5NYXRjaDogYXRJbmRleCA9PT0gMCA/IDAgOiBhdEluZGV4IC0gbWF0Y2guc3RhcnRJbmRleCxcblxuXHRcdFx0XHRcdFx0XHRpbmRleEluTm9kZTogbWF0Y2guc3RhcnRJbmRleCAtIGF0SW5kZXgsXG5cdFx0XHRcdFx0XHRcdGVuZEluZGV4SW5Ob2RlOiBtYXRjaC5lbmRJbmRleCAtIGF0SW5kZXgsXG5cdFx0XHRcdFx0XHRcdGlzRW5kOiB0cnVlXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChzdGFydFBvcnRpb24pIHtcblx0XHRcdFx0XHRcdC8vIEludGVyc2VjdGluZyBub2RlXG5cdFx0XHRcdFx0XHRpbm5lclBvcnRpb25zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRub2RlOiBjdXJOb2RlLFxuXHRcdFx0XHRcdFx0XHRpbmRleDogcG9ydGlvbkluZGV4KyssXG5cdFx0XHRcdFx0XHRcdHRleHQ6IGN1ck5vZGUuZGF0YSxcblx0XHRcdFx0XHRcdFx0aW5kZXhJbk1hdGNoOiBhdEluZGV4IC0gbWF0Y2guc3RhcnRJbmRleCxcblx0XHRcdFx0XHRcdFx0aW5kZXhJbk5vZGU6IDAgLy8gYWx3YXlzIHplcm8gZm9yIGlubmVyLXBvcnRpb25zXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIXN0YXJ0UG9ydGlvbiAmJiBjdXJOb2RlLmxlbmd0aCArIGF0SW5kZXggPiBtYXRjaC5zdGFydEluZGV4KSB7XG5cdFx0XHRcdFx0XHQvLyBXZSd2ZSBmb3VuZCB0aGUgbWF0Y2ggc3RhcnRcblx0XHRcdFx0XHRcdHN0YXJ0UG9ydGlvbiA9IHtcblx0XHRcdFx0XHRcdFx0bm9kZTogY3VyTm9kZSxcblx0XHRcdFx0XHRcdFx0aW5kZXg6IHBvcnRpb25JbmRleCsrLFxuXHRcdFx0XHRcdFx0XHRpbmRleEluTWF0Y2g6IDAsXG5cdFx0XHRcdFx0XHRcdGluZGV4SW5Ob2RlOiBtYXRjaC5zdGFydEluZGV4IC0gYXRJbmRleCxcblx0XHRcdFx0XHRcdFx0ZW5kSW5kZXhJbk5vZGU6IG1hdGNoLmVuZEluZGV4IC0gYXRJbmRleCxcblx0XHRcdFx0XHRcdFx0dGV4dDogY3VyTm9kZS5kYXRhLnN1YnN0cmluZyhtYXRjaC5zdGFydEluZGV4IC0gYXRJbmRleCwgbWF0Y2guZW5kSW5kZXggLSBhdEluZGV4KVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhdEluZGV4ICs9IGN1ck5vZGUuZGF0YS5sZW5ndGg7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvQXZvaWROb2RlID0gY3VyTm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgZWxlbWVudEZpbHRlciAmJiAhZWxlbWVudEZpbHRlcihjdXJOb2RlKTtcblxuXHRcdFx0XHRpZiAoc3RhcnRQb3J0aW9uICYmIGVuZFBvcnRpb24pIHtcblxuXHRcdFx0XHRcdGN1ck5vZGUgPSB0aGlzLnJlcGxhY2VNYXRjaChtYXRjaCwgc3RhcnRQb3J0aW9uLCBpbm5lclBvcnRpb25zLCBlbmRQb3J0aW9uKTtcblxuXHRcdFx0XHRcdC8vIHByb2Nlc3NNYXRjaGVzIGhhcyB0byByZXR1cm4gdGhlIG5vZGUgdGhhdCByZXBsYWNlZCB0aGUgZW5kTm9kZVxuXHRcdFx0XHRcdC8vIGFuZCB0aGVuIHdlIHN0ZXAgYmFjayBzbyB3ZSBjYW4gY29udGludWUgZnJvbSB0aGUgZW5kIG9mIHRoZVxuXHRcdFx0XHRcdC8vIG1hdGNoOlxuXG5cdFx0XHRcdFx0YXRJbmRleCAtPSAoZW5kUG9ydGlvbi5ub2RlLmRhdGEubGVuZ3RoIC0gZW5kUG9ydGlvbi5lbmRJbmRleEluTm9kZSk7XG5cblx0XHRcdFx0XHRzdGFydFBvcnRpb24gPSBudWxsO1xuXHRcdFx0XHRcdGVuZFBvcnRpb24gPSBudWxsO1xuXHRcdFx0XHRcdGlubmVyUG9ydGlvbnMgPSBbXTtcblx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoZXMuc2hpZnQoKTtcblx0XHRcdFx0XHRwb3J0aW9uSW5kZXggPSAwO1xuXHRcdFx0XHRcdG1hdGNoSW5kZXgrKztcblxuXHRcdFx0XHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdFx0XHRcdGJyZWFrOyAvLyBubyBtb3JlIG1hdGNoZXNcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0XHQhZG9Bdm9pZE5vZGUgJiZcblx0XHRcdFx0XHQoY3VyTm9kZS5maXJzdENoaWxkIHx8IGN1ck5vZGUubmV4dFNpYmxpbmcpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdC8vIE1vdmUgZG93biBvciBmb3J3YXJkOlxuXHRcdFx0XHRcdGlmIChjdXJOb2RlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRcdG5vZGVTdGFjay5wdXNoKGN1ck5vZGUpO1xuXHRcdFx0XHRcdFx0Y3VyTm9kZSA9IGN1ck5vZGUuZmlyc3RDaGlsZDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y3VyTm9kZSA9IGN1ck5vZGUubmV4dFNpYmxpbmc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTW92ZSBmb3J3YXJkIG9yIHVwOlxuXHRcdFx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0XHRcdGlmIChjdXJOb2RlLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdFx0XHRjdXJOb2RlID0gY3VyTm9kZS5uZXh0U2libGluZztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJOb2RlID0gbm9kZVN0YWNrLnBvcCgpO1xuXHRcdFx0XHRcdGlmIChjdXJOb2RlID09PSBub2RlKSB7XG5cdFx0XHRcdFx0XHRicmVhayBvdXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXZlcnRzIC4uLiBUT0RPXG5cdFx0ICovXG5cdFx0cmV2ZXJ0OiBmdW5jdGlvbigpIHtcblx0XHRcdC8vIFJldmVyc2lvbiBvY2N1cnMgYmFja3dhcmRzIHNvIGFzIHRvIGF2b2lkIG5vZGVzIHN1YnNlcXVlbnRseVxuXHRcdFx0Ly8gcmVwbGFjZWQgZHVyaW5nIHRoZSBtYXRjaGluZyBwaGFzZSAoYSBmb3J3YXJkIHByb2Nlc3MpOlxuXHRcdFx0Zm9yICh2YXIgbCA9IHRoaXMucmV2ZXJ0cy5sZW5ndGg7IGwtLTspIHtcblx0XHRcdFx0dGhpcy5yZXZlcnRzW2xdKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJldmVydHMgPSBbXTtcblx0XHR9LFxuXG5cdFx0cHJlcGFyZVJlcGxhY2VtZW50U3RyaW5nOiBmdW5jdGlvbihzdHJpbmcsIHBvcnRpb24sIG1hdGNoKSB7XG5cdFx0XHR2YXIgcG9ydGlvbk1vZGUgPSB0aGlzLm9wdGlvbnMucG9ydGlvbk1vZGU7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHBvcnRpb25Nb2RlID09PSBQT1JUSU9OX01PREVfRklSU1QgJiZcblx0XHRcdFx0cG9ydGlvbi5pbmRleEluTWF0Y2ggPiAwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fVxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcJChcXGQrfCZ8YHwnKS9nLCBmdW5jdGlvbigkMCwgdCkge1xuXHRcdFx0XHR2YXIgcmVwbGFjZW1lbnQ7XG5cdFx0XHRcdHN3aXRjaCh0KSB7XG5cdFx0XHRcdFx0Y2FzZSAnJic6XG5cdFx0XHRcdFx0XHRyZXBsYWNlbWVudCA9IG1hdGNoWzBdO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYCc6XG5cdFx0XHRcdFx0XHRyZXBsYWNlbWVudCA9IG1hdGNoLmlucHV0LnN1YnN0cmluZygwLCBtYXRjaC5zdGFydEluZGV4KTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRcdFx0XHRyZXBsYWNlbWVudCA9IG1hdGNoLmlucHV0LnN1YnN0cmluZyhtYXRjaC5lbmRJbmRleCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmVwbGFjZW1lbnQgPSBtYXRjaFsrdF0gfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlcGxhY2VtZW50O1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChwb3J0aW9uTW9kZSA9PT0gUE9SVElPTl9NT0RFX0ZJUlNUKSB7XG5cdFx0XHRcdHJldHVybiBzdHJpbmc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwb3J0aW9uLmlzRW5kKSB7XG5cdFx0XHRcdHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKHBvcnRpb24uaW5kZXhJbk1hdGNoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHN0cmluZy5zdWJzdHJpbmcocG9ydGlvbi5pbmRleEluTWF0Y2gsIHBvcnRpb24uaW5kZXhJbk1hdGNoICsgcG9ydGlvbi50ZXh0Lmxlbmd0aCk7XG5cdFx0fSxcblxuXHRcdGdldFBvcnRpb25SZXBsYWNlbWVudE5vZGU6IGZ1bmN0aW9uKHBvcnRpb24sIG1hdGNoKSB7XG5cblx0XHRcdHZhciByZXBsYWNlbWVudCA9IHRoaXMub3B0aW9ucy5yZXBsYWNlIHx8ICckJic7XG5cdFx0XHR2YXIgd3JhcHBlciA9IHRoaXMub3B0aW9ucy53cmFwO1xuXHRcdFx0dmFyIHdyYXBwZXJDbGFzcyA9IHRoaXMub3B0aW9ucy53cmFwQ2xhc3M7XG5cblx0XHRcdGlmICh3cmFwcGVyICYmIHdyYXBwZXIubm9kZVR5cGUpIHtcblx0XHRcdFx0Ly8gV3JhcHBlciBoYXMgYmVlbiBwcm92aWRlZCBhcyBhIHN0ZW5jaWwtbm9kZSBmb3IgdXMgdG8gY2xvbmU6XG5cdFx0XHRcdHZhciBjbG9uZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0Y2xvbmUuaW5uZXJIVE1MID0gd3JhcHBlci5vdXRlckhUTUwgfHwgbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZyh3cmFwcGVyKTtcblx0XHRcdFx0d3JhcHBlciA9IGNsb25lLmZpcnN0Q2hpbGQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgcmVwbGFjZW1lbnQgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRyZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50KHBvcnRpb24sIG1hdGNoKTtcblx0XHRcdFx0aWYgKHJlcGxhY2VtZW50ICYmIHJlcGxhY2VtZW50Lm5vZGVUeXBlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcGxhY2VtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUoU3RyaW5nKHJlcGxhY2VtZW50KSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBlbCA9IHR5cGVvZiB3cmFwcGVyID09ICdzdHJpbmcnID8gZG9jLmNyZWF0ZUVsZW1lbnQod3JhcHBlcikgOiB3cmFwcGVyO1xuXG4gXHRcdFx0aWYgKGVsICYmIHdyYXBwZXJDbGFzcykge1xuXHRcdFx0XHRlbC5jbGFzc05hbWUgPSB3cmFwcGVyQ2xhc3M7XG5cdFx0XHR9XG5cblx0XHRcdHJlcGxhY2VtZW50ID0gZG9jLmNyZWF0ZVRleHROb2RlKFxuXHRcdFx0XHR0aGlzLnByZXBhcmVSZXBsYWNlbWVudFN0cmluZyhcblx0XHRcdFx0XHRyZXBsYWNlbWVudCwgcG9ydGlvbiwgbWF0Y2hcblx0XHRcdFx0KVxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKCFyZXBsYWNlbWVudC5kYXRhKSB7XG5cdFx0XHRcdHJldHVybiByZXBsYWNlbWVudDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFlbCkge1xuXHRcdFx0XHRyZXR1cm4gcmVwbGFjZW1lbnQ7XG5cdFx0XHR9XG5cblx0XHRcdGVsLmFwcGVuZENoaWxkKHJlcGxhY2VtZW50KTtcblxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH0sXG5cblx0XHRyZXBsYWNlTWF0Y2g6IGZ1bmN0aW9uKG1hdGNoLCBzdGFydFBvcnRpb24sIGlubmVyUG9ydGlvbnMsIGVuZFBvcnRpb24pIHtcblxuXHRcdFx0dmFyIG1hdGNoU3RhcnROb2RlID0gc3RhcnRQb3J0aW9uLm5vZGU7XG5cdFx0XHR2YXIgbWF0Y2hFbmROb2RlID0gZW5kUG9ydGlvbi5ub2RlO1xuXG5cdFx0XHR2YXIgcHJlY2VkaW5nVGV4dE5vZGU7XG5cdFx0XHR2YXIgZm9sbG93aW5nVGV4dE5vZGU7XG5cblx0XHRcdGlmIChtYXRjaFN0YXJ0Tm9kZSA9PT0gbWF0Y2hFbmROb2RlKSB7XG5cblx0XHRcdFx0dmFyIG5vZGUgPSBtYXRjaFN0YXJ0Tm9kZTtcblxuXHRcdFx0XHRpZiAoc3RhcnRQb3J0aW9uLmluZGV4SW5Ob2RlID4gMCkge1xuXHRcdFx0XHRcdC8vIEFkZCBgYmVmb3JlYCB0ZXh0IG5vZGUgKGJlZm9yZSB0aGUgbWF0Y2gpXG5cdFx0XHRcdFx0cHJlY2VkaW5nVGV4dE5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUobm9kZS5kYXRhLnN1YnN0cmluZygwLCBzdGFydFBvcnRpb24uaW5kZXhJbk5vZGUpKTtcblx0XHRcdFx0XHRub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByZWNlZGluZ1RleHROb2RlLCBub2RlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSB0aGUgcmVwbGFjZW1lbnQgbm9kZTpcblx0XHRcdFx0dmFyIG5ld05vZGUgPSB0aGlzLmdldFBvcnRpb25SZXBsYWNlbWVudE5vZGUoXG5cdFx0XHRcdFx0ZW5kUG9ydGlvbixcblx0XHRcdFx0XHRtYXRjaFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgbm9kZSk7XG5cblx0XHRcdFx0aWYgKGVuZFBvcnRpb24uZW5kSW5kZXhJbk5vZGUgPCBub2RlLmxlbmd0aCkgeyAvLyA/Pz8/P1xuXHRcdFx0XHRcdC8vIEFkZCBgYWZ0ZXJgIHRleHQgbm9kZSAoYWZ0ZXIgdGhlIG1hdGNoKVxuXHRcdFx0XHRcdGZvbGxvd2luZ1RleHROb2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKG5vZGUuZGF0YS5zdWJzdHJpbmcoZW5kUG9ydGlvbi5lbmRJbmRleEluTm9kZSkpO1xuXHRcdFx0XHRcdG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZm9sbG93aW5nVGV4dE5vZGUsIG5vZGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuXG5cdFx0XHRcdHRoaXMucmV2ZXJ0cy5wdXNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChwcmVjZWRpbmdUZXh0Tm9kZSA9PT0gbmV3Tm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcblx0XHRcdFx0XHRcdHByZWNlZGluZ1RleHROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocHJlY2VkaW5nVGV4dE5vZGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZm9sbG93aW5nVGV4dE5vZGUgPT09IG5ld05vZGUubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRcdGZvbGxvd2luZ1RleHROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZm9sbG93aW5nVGV4dE5vZGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRuZXdOb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5vZGUsIG5ld05vZGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gbmV3Tm9kZTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gUmVwbGFjZSBtYXRjaFN0YXJ0Tm9kZSAtPiBbaW5uZXJNYXRjaE5vZGVzLi4uXSAtPiBtYXRjaEVuZE5vZGUgKGluIHRoYXQgb3JkZXIpXG5cblxuXHRcdFx0XHRwcmVjZWRpbmdUZXh0Tm9kZSA9IGRvYy5jcmVhdGVUZXh0Tm9kZShcblx0XHRcdFx0XHRtYXRjaFN0YXJ0Tm9kZS5kYXRhLnN1YnN0cmluZygwLCBzdGFydFBvcnRpb24uaW5kZXhJbk5vZGUpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Zm9sbG93aW5nVGV4dE5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUoXG5cdFx0XHRcdFx0bWF0Y2hFbmROb2RlLmRhdGEuc3Vic3RyaW5nKGVuZFBvcnRpb24uZW5kSW5kZXhJbk5vZGUpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0dmFyIGZpcnN0Tm9kZSA9IHRoaXMuZ2V0UG9ydGlvblJlcGxhY2VtZW50Tm9kZShcblx0XHRcdFx0XHRzdGFydFBvcnRpb24sXG5cdFx0XHRcdFx0bWF0Y2hcblx0XHRcdFx0KTtcblxuXHRcdFx0XHR2YXIgaW5uZXJOb2RlcyA9IFtdO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsID0gaW5uZXJQb3J0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcblx0XHRcdFx0XHR2YXIgcG9ydGlvbiA9IGlubmVyUG9ydGlvbnNbaV07XG5cdFx0XHRcdFx0dmFyIGlubmVyTm9kZSA9IHRoaXMuZ2V0UG9ydGlvblJlcGxhY2VtZW50Tm9kZShcblx0XHRcdFx0XHRcdHBvcnRpb24sXG5cdFx0XHRcdFx0XHRtYXRjaFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cG9ydGlvbi5ub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGlubmVyTm9kZSwgcG9ydGlvbi5ub2RlKTtcblx0XHRcdFx0XHR0aGlzLnJldmVydHMucHVzaCgoZnVuY3Rpb24ocG9ydGlvbiwgaW5uZXJOb2RlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdGlubmVyTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChwb3J0aW9uLm5vZGUsIGlubmVyTm9kZSk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0ocG9ydGlvbiwgaW5uZXJOb2RlKSkpO1xuXHRcdFx0XHRcdGlubmVyTm9kZXMucHVzaChpbm5lck5vZGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGxhc3ROb2RlID0gdGhpcy5nZXRQb3J0aW9uUmVwbGFjZW1lbnROb2RlKFxuXHRcdFx0XHRcdGVuZFBvcnRpb24sXG5cdFx0XHRcdFx0bWF0Y2hcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRtYXRjaFN0YXJ0Tm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcmVjZWRpbmdUZXh0Tm9kZSwgbWF0Y2hTdGFydE5vZGUpO1xuXHRcdFx0XHRtYXRjaFN0YXJ0Tm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmaXJzdE5vZGUsIG1hdGNoU3RhcnROb2RlKTtcblx0XHRcdFx0bWF0Y2hTdGFydE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtYXRjaFN0YXJ0Tm9kZSk7XG5cblx0XHRcdFx0bWF0Y2hFbmROb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxhc3ROb2RlLCBtYXRjaEVuZE5vZGUpO1xuXHRcdFx0XHRtYXRjaEVuZE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZm9sbG93aW5nVGV4dE5vZGUsIG1hdGNoRW5kTm9kZSk7XG5cdFx0XHRcdG1hdGNoRW5kTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1hdGNoRW5kTm9kZSk7XG5cblx0XHRcdFx0dGhpcy5yZXZlcnRzLnB1c2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cHJlY2VkaW5nVGV4dE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwcmVjZWRpbmdUZXh0Tm9kZSk7XG5cdFx0XHRcdFx0Zmlyc3ROb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1hdGNoU3RhcnROb2RlLCBmaXJzdE5vZGUpO1xuXHRcdFx0XHRcdGZvbGxvd2luZ1RleHROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZm9sbG93aW5nVGV4dE5vZGUpO1xuXHRcdFx0XHRcdGxhc3ROb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1hdGNoRW5kTm9kZSwgbGFzdE5vZGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gbGFzdE5vZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cblx0cmV0dXJuIGV4cG9zZWQ7XG5cbn0pKTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgbm93ID0gcmVxdWlyZSgnLi9ub3cnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHRpbWVXYWl0aW5nID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZ1xuICAgICAgPyBuYXRpdmVNaW4odGltZVdhaXRpbmcsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKVxuICAgICAgOiB0aW1lV2FpdGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdztcbiIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdGhyb3R0bGVkIGZ1bmN0aW9uIHRoYXQgb25seSBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxuICogbWV0aG9kIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0b1xuICogaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXG4gKiB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWQgd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlXG4gKiB0aHJvdHRsZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiByZXR1cm4gdGhlXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8udGhyb3R0bGVgIGFuZCBgXy5kZWJvdW5jZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmcuXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XG4gKlxuICogLy8gSW52b2tlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXMuXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhyb3R0bGVkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCB7XG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxuICAgICdtYXhXYWl0Jzogd2FpdCxcbiAgICAndHJhaWxpbmcnOiB0cmFpbGluZ1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0ICogYXMgZmluZEFuZFJlcGxhY2VET01UZXh0IGZyb20gJ2ZpbmRhbmRyZXBsYWNlZG9tdGV4dCc7XG5pbXBvcnQgKiBhcyB0aHJvdHRsZSBmcm9tICdsb2Rhc2gvdGhyb3R0bGUnO1xuaW1wb3J0IHsgZmZTdHlsZSwgY29sb3JzIH0gZnJvbSAnLi9zdHlsZSc7XG5cbmNvbnN0IGdldFBhZ2VIZWlnaHQgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLm1heChcbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCxcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodFxuICApO1xufTtcblxuLy8gVE9ETzpcbi8vIC0gb25seSBhbmltYXRlIGZmZWxlbSBBRlRFUiBzY3JvbGwgaXMgb3ZlclxuLy8gLSBodG1sIHRleHQgXCJicmVha3NcIiBhZnRlciByZW1vdmluZyBlbGVtZW50c1xuLy8gLSB0eXBpbmcgaXMgbWlzc2luZyBpbiBzb21lIHBsYWNlc1xuXG5jb25zdCBERUJVR19PTiA9IHRydWU7XG5jb25zdCBBVVRPX1BJTl9NQVAgPSB0cnVlO1xuXG5sZXQgdmlld1BvcnREZWx0YSA9IDIwO1xubGV0IGN1cnJlbnRDb2xvciA9IDA7XG5sZXQgcGFnZUhlaWdodCA9IGdldFBhZ2VIZWlnaHQoKTtcbmxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbmxldCBzZXR0aW5ncyA9IHtcbiAgbWFpbktleTogJ2YnLFxuICB1bnNlbGVjdEFsbEtleTogJ2QnLFxuICBuZXh0RWxlbWVudEtleTogJ3InLFxuICBwcmV2aW91c0VsZW1lbnRLZXk6ICdlJyxcbiAgbmV4dEluc3RhbmNlS2V5OiAndCcsXG4gIHByZXZpb3VzSW5zdGFuY2VLZXk6ICd3JyxcbiAgc2hvd1JvdGF0aW5nQXJyb3c6IGZhbHNlLFxuICBzaG93U2lkZU1hcDogdHJ1ZSxcbiAga2VlcEVsZW1lbnRDZW50ZXJlZDogZmFsc2UsXG4gIG1hdGNoQ2FzZVNlbnNpdGl2ZTogdHJ1ZSxcbiAgc21vb3RoU2Nyb2xsaW5nOiB0cnVlLFxufTtcblxuaW50ZXJmYWNlIEZGZWxlbWVudCB7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgcG9ydGlvbnM6IEhUTUxFbGVtZW50W107XG4gIG1hcEluZGljYXRvcjogSFRNTEVsZW1lbnQ7XG59XG5pbnRlcmZhY2UgRkZpbnN0YW5jZSB7XG4gIGZpbmRlcjogYW55O1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIHNhbml0aXplZFRleHQ6IHN0cmluZztcbiAgZWxlbWVudHM6IEZGZWxlbWVudFtdO1xuICBtYXBXcmFwcGVyOiBIVE1MRWxlbWVudDtcbn1cbmxldCBzZWxlY3Rpb25zOiBGRmluc3RhbmNlW10gPSBbXTtcblxubGV0IHJlcGVhdExvZ286IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5sZXQgcmVwZWF0TG9nb1dyYXBwZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmxldCBzZWxlY3Rpb25zTWFwV3JhcHBlcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmxldCBzZWxlY3Rpb25zTWFwUGluOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHNlbGVjdGlvbnNNYXBTY3JvbGw6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5sZXQgbWFwUGluOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG5jb25zdCBpbml0RkYgPSAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUuaW5uZXJIVE1MID0gZmZTdHlsZTtcblxuICByZXBlYXRMb2dvLnNldEF0dHJpYnV0ZSgnc3JjJywgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2Fzc2V0cy9yZXBlYXQucG5nJykpO1xuICByZXBlYXRMb2dvLmNsYXNzTmFtZSA9ICdyZXBlYXRMb2dvJztcbiAgcmVwZWF0TG9nb1dyYXBwZXIuY2xhc3NOYW1lID0gJ3JlcGVhdExvZ29XcmFwcGVyJztcblxuICBzZWxlY3Rpb25zTWFwV3JhcHBlci5jbGFzc05hbWUgPSAnc2VsZWN0aW9uc01hcFdyYXBwZXInO1xuXG4gIHNlbGVjdGlvbnNNYXBQaW4uY2xhc3NOYW1lID0gJ3NlbGVjdGlvbnNNYXBQaW4nO1xuICBzZWxlY3Rpb25zTWFwUGluLm9uY2xpY2sgPSAoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHNlbGVjdGlvbnNNYXBQaW4uY2xhc3NMaXN0LnRvZ2dsZSgnZml4ZWQnKTtcbiAgICBzZWxlY3Rpb25zTWFwV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKCdmaXhlZCcpO1xuICB9KTtcbiAgaWYgKEFVVE9fUElOX01BUCkge1xuICAgIHNlbGVjdGlvbnNNYXBQaW4uY2xhc3NMaXN0LnRvZ2dsZSgnZml4ZWQnKTtcbiAgICBzZWxlY3Rpb25zTWFwV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKCdmaXhlZCcpO1xuICB9XG5cbiAgc2VsZWN0aW9uc01hcFNjcm9sbC5jbGFzc05hbWUgPSBcInNlbGVjdGlvbnNNYXBTY3JvbGxcIjtcbiAgbWFwUGluLnNldEF0dHJpYnV0ZSgnc3JjJywgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2Fzc2V0cy9waW4ucG5nJykpO1xuICBtYXBQaW4uY2xhc3NOYW1lID0gJ21hcFBpbic7XG4gIFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIHJlcGVhdExvZ29XcmFwcGVyLmFwcGVuZENoaWxkKHJlcGVhdExvZ28pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVwZWF0TG9nb1dyYXBwZXIpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZWN0aW9uc01hcFdyYXBwZXIpO1xuICAgIHNlbGVjdGlvbnNNYXBXcmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdGlvbnNNYXBQaW4pO1xuICAgIHNlbGVjdGlvbnNNYXBQaW4uYXBwZW5kQ2hpbGQobWFwUGluKTtcbiAgICBzZWxlY3Rpb25zTWFwV3JhcHBlci5hcHBlbmRDaGlsZChzZWxlY3Rpb25zTWFwU2Nyb2xsKTtcbiAgfSk7XG5cbiAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGUoXG4gICAgKCkgPT4ge1xuICAgICAgbGV0IG5ld1BhZ2VIZWlnaHQgPSBnZXRQYWdlSGVpZ2h0KCk7XG4gICAgICBsZXQgbmV3V2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgaWYgKG5ld1BhZ2VIZWlnaHQgIT0gcGFnZUhlaWdodCB8fFxuICAgICAgICAgIG5ld1dpbmRvd0hlaWdodCAhPSB3aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgd2luZG93SGVpZ2h0ID0gbmV3V2luZG93SGVpZ2h0O1xuICAgICAgICBwYWdlSGVpZ2h0ID0gbmV3UGFnZUhlaWdodDtcbiAgICAgICAgcmVkcmF3TWluaW1hcFNjcm9sbCh0cnVlKTtcbiAgICAgICAgcmVkcmF3TWFwSW5kaWNhdG9ycygpO1xuICAgICAgfVxuICAgIH0sIDIwMClcbiAgKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4gcmVkcmF3TWluaW1hcFNjcm9sbChmYWxzZSkpO1xuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xufTtcblxuY29uc3QgcmVkcmF3TWluaW1hcFNjcm9sbCA9IChyZXNjYWxlOiBib29sZWFuKSA9PiB7XG4gIGlmICghc2VsZWN0aW9ucy5sZW5ndGggJiYgIXJlc2NhbGUpIHJldHVybjtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBwYWdlSGVpZ2h0ID0gZ2V0UGFnZUhlaWdodCgpO1xuICAgIGNvbnN0IG1pbkhlaWdodCA9IDE1O1xuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyBwYWdlSGVpZ2h0KSAqIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBmaW5hbEhlaWdodCA9IHBhcnNlRmxvYXQoTWF0aC5tYXgoc2Nyb2xsSGVpZ2h0LCBtaW5IZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgIGlmKHJlc2NhbGUpXG4gICAgICBzZWxlY3Rpb25zTWFwU2Nyb2xsLnN0eWxlLmhlaWdodCA9IGAke2ZpbmFsSGVpZ2h0fXB4YDtcbiAgICBjb25zdCBzY3JvbGxUb1RvcCA9IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApO1xuICAgIGxldCBzY3JvbGxEaXN0YW5jZSA9IHNjcm9sbFRvVG9wIC8gcGFnZUhlaWdodCAqIDEwMCAtIDAuMDQ7XG4gICAgaWYgKHNjcm9sbEhlaWdodCA8IG1pbkhlaWdodCkge1xuICAgICAgc2Nyb2xsRGlzdGFuY2UgLT0gMC4zO1xuICAgIH1cbiAgICBzZWxlY3Rpb25zTWFwU2Nyb2xsLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICBgdHJhbnNsYXRlWSgke3Njcm9sbERpc3RhbmNlLnRvRml4ZWQoMyl9dmgpYDtcbiAgfSlcbn07XG5cbmNvbnN0IG9uS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50ICYgeyB0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQgfSkgPT4ge1xuICBpZiAoXG4gICAgZS50YXJnZXQuY29udGVudEVkaXRhYmxlID09PSAndHJ1ZScgfHxcbiAgICBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcgfHxcbiAgICBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScgfHxcbiAgICBlLm1ldGFLZXkpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgY29uc3QgdGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuXG4gIGlmIChlLmtleSA9PT0gc2V0dGluZ3MubWFpbktleSB8fFxuICAgICAgKGUua2V5ID09PSBzZXR0aW5ncy5tYWluS2V5LnRvVXBwZXJDYXNlKCkgJiYgIWUuc2hpZnRLZXkpKSB7XG4gICAgaWYgKHRleHQgJiYgdGV4dC5sZW5ndGgpIHtcbiAgICAgIC8vIE5vIHN1cHBvcnQgZm9yIG11bHRpLWxpbmUgZm9yIG5vdy4uLlxuICAgICAgaWYgKFxuICAgICAgICAhdGV4dC50cmltKCkubGVuZ3RoIHx8XG4gICAgICAgICh0ZXh0LmluZGV4T2YoJ1xcbicpICE9IHRleHQubGVuZ3RoIC0gMSAmJiB0ZXh0LmluZGV4T2YoJ1xcbicpICE9IC0xKVxuICAgICAgICApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHNlbGVjdGlvbnMuZmluZChcbiAgICAgICAgc2VsZWN0aW9uID0+IHNlbGVjdGlvbi5zYW5pdGl6ZWRUZXh0ID09PSB0ZXh0XG4gICAgICApO1xuICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgY3JlYXRlRWxlbWVudCh0ZXh0LCBzZWxlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlU2VsZWN0ZWRPckxhc3RFbGVtZW50KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZVNlbGVjdGVkT3JMYXN0RWxlbWVudCgpO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSBlbHNlIGlmIChlLmtleSA9PT0gc2V0dGluZ3MudW5zZWxlY3RBbGxLZXkgJiYgc2VsZWN0aW9ucy5sZW5ndGggfHxcbiAgICAoZS5rZXkgPT09IHNldHRpbmdzLnVuc2VsZWN0QWxsS2V5LnRvVXBwZXJDYXNlKCkgJiYgIWUuc2hpZnRLZXkpKSB7XG4gICAgcmVtb3ZlQWxsRWxlbWVudHMoKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSBlbHNlIGlmIChlLmtleSA9PT0gc2V0dGluZ3MubmV4dEVsZW1lbnRLZXkgJiYgc2VsZWN0aW9ucy5sZW5ndGggfHxcbiAgICAoZS5rZXkgPT09IHNldHRpbmdzLm5leHRFbGVtZW50S2V5LnRvVXBwZXJDYXNlKCkgJiYgIWUuc2hpZnRLZXkpKSB7XG4gICAgY3ljbGVUaHJvdWdoRWxlbWVudHMoMSk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0gZWxzZSBpZiAoZS5rZXkgPT09IHNldHRpbmdzLnByZXZpb3VzRWxlbWVudEtleSAmJiBzZWxlY3Rpb25zLmxlbmd0aCB8fFxuICAgIChlLmtleSA9PT0gc2V0dGluZ3MucHJldmlvdXNFbGVtZW50S2V5LnRvVXBwZXJDYXNlKCkgJiYgIWUuc2hpZnRLZXkpKSB7XG4gICAgY3ljbGVUaHJvdWdoRWxlbWVudHMoLTEpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9IGVsc2UgaWYgKGUua2V5ID09PSBzZXR0aW5ncy5uZXh0SW5zdGFuY2VLZXkgJiYgc2VsZWN0aW9ucy5sZW5ndGggfHxcbiAgICAoZS5rZXkgPT09IHNldHRpbmdzLm5leHRJbnN0YW5jZUtleS50b1VwcGVyQ2FzZSgpICYmICFlLnNoaWZ0S2V5KSkge1xuICAgIGN5Y2xlVGhyb3VnaEluc3RhbmNlcygxKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSBlbHNlIGlmIChlLmtleSA9PT0gc2V0dGluZ3MucHJldmlvdXNJbnN0YW5jZUtleSAmJiBzZWxlY3Rpb25zLmxlbmd0aCB8fFxuICAgIChlLmtleSA9PT0gc2V0dGluZ3MucHJldmlvdXNJbnN0YW5jZUtleS50b1VwcGVyQ2FzZSgpICYmICFlLnNoaWZ0S2V5KSkge1xuICAgIGN5Y2xlVGhyb3VnaEluc3RhbmNlcygtMSk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn07XG5cbmNvbnN0IGN5Y2xlVGhyb3VnaEluc3RhbmNlcyA9IChkaXJlY3Rpb246IG51bWJlcikgPT4ge1xuICBjb25zdCB7IGluc3RhbmNlLCBlbGVtZW50IH0gPSBnZXRTZWxlY3RlZFN0cnVjdHVyZXMoKTtcbiAgaWYgKCFpbnN0YW5jZSB8fCAhZWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuICBsZXQgbmV4dEluZGV4ID0gc2VsZWN0aW9ucy5pbmRleE9mKGluc3RhbmNlKSArIGRpcmVjdGlvbjtcbiAgaWYgKG5leHRJbmRleCA+PSBzZWxlY3Rpb25zLmxlbmd0aCkge1xuICAgIG5leHRJbmRleCA9IDA7XG4gICAgLy8gc2V0dGluZ3Muc2hvd1JvdGF0aW5nQXJyb3cgJiYgcm90YXRlTG9nbygpO1xuICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICBuZXh0SW5kZXggPSBzZWxlY3Rpb25zLmxlbmd0aCAtIDE7XG4gICAgLy8gc2V0dGluZ3Muc2hvd1JvdGF0aW5nQXJyb3cgJiYgcm90YXRlTG9nbygpO1xuICB9XG4gIGNvbnN0IG5leHRBY3RpdmUgPSBzZWxlY3Rpb25zW25leHRJbmRleF07XG4gIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IG5leHRBY3RpdmUuZWxlbWVudHMuZmluZChlbGVtID0+IGVsZW0uYWN0aXZlKTtcbiAgc2VsZWN0RWxlbWVudChuZXh0QWN0aXZlLCBzZWxlY3RlZEVsZW1lbnQsIHRydWUpO1xufTtcblxuY29uc3QgY3ljbGVUaHJvdWdoRWxlbWVudHMgPSAoZGlyZWN0aW9uOiBudW1iZXIpID0+IHtcbiAgY29uc3QgeyBpbnN0YW5jZSwgZWxlbWVudCB9ID0gZ2V0U2VsZWN0ZWRTdHJ1Y3R1cmVzKCk7XG4gIGlmICghaW5zdGFuY2UgfHwgIWVsZW1lbnQpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgeyBlbGVtZW50cyB9ID0gaW5zdGFuY2U7XG4gIGxldCBuZXh0SW5kZXggPSBlbGVtZW50cy5pbmRleE9mKGVsZW1lbnQpICsgZGlyZWN0aW9uO1xuICBpZiAobmV4dEluZGV4ID49IGVsZW1lbnRzLmxlbmd0aCkge1xuICAgIG5leHRJbmRleCA9IDA7XG4gICAgc2V0dGluZ3Muc2hvd1JvdGF0aW5nQXJyb3cgJiYgcm90YXRlTG9nbygpO1xuICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICBuZXh0SW5kZXggPSBlbGVtZW50cy5sZW5ndGggLSAxO1xuICAgIHNldHRpbmdzLnNob3dSb3RhdGluZ0Fycm93ICYmIHJvdGF0ZUxvZ28oKTtcbiAgfVxuICBjb25zdCBuZXh0QWN0aXZlID0gZWxlbWVudHNbbmV4dEluZGV4XTtcbiAgc2VsZWN0RWxlbWVudChpbnN0YW5jZSwgbmV4dEFjdGl2ZSwgdHJ1ZSk7XG59O1xuXG5jb25zdCBnZXRTZWxlY3RlZFN0cnVjdHVyZXMgPSAoKSA9PiB7XG4gIGxldCBpbnN0YW5jZSA9IHNlbGVjdGlvbnMuZmluZChpbnN0YW5jZSA9PiBpbnN0YW5jZS5hY3RpdmUpIHx8IG51bGw7XG4gIGxldCBlbGVtZW50ID0gaW5zdGFuY2VcbiAgICA/IGluc3RhbmNlLmVsZW1lbnRzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LmFjdGl2ZSlcbiAgICA6IG51bGw7XG4gIHJldHVybiB7IGVsZW1lbnQsIGluc3RhbmNlIH07XG59O1xuXG5jb25zdCB1bnNlbGVjdEVsZW1lbnQgPSAoKSA9PiB7XG4gIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4ge1xuICAgIGlmIChzZWxlY3Rpb24uYWN0aXZlKSB7XG4gICAgICBzZWxlY3Rpb24uYWN0aXZlID0gZmFsc2U7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBzZWxlY3Rpb24ubWFwV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgfSk7XG4gICAgICBzZWxlY3Rpb24uZWxlbWVudHMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgaWYgKGVsZW0uYWN0aXZlKSB7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGVsZW0ucG9ydGlvbnMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XG4gICAgICAgICAgICBlbGVtLm1hcEluZGljYXRvci5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBlbGVtLnBvcnRpb25zLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkQ2xhc3MnKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBzZWxlY3RFbGVtZW50ID0gKGluc3RhbmNlLCBlbGVtZW50LCBzY3JvbGxJbnRvVmlldykgPT4ge1xuICBpZiAoIWVsZW1lbnQgfHwgIWluc3RhbmNlKSByZXR1cm4gZmFsc2U7XG4gIHVuc2VsZWN0RWxlbWVudCgpO1xuXG4gIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4ge1xuICAgIGlmIChzZWxlY3Rpb24gPT09IGluc3RhbmNlKSB7XG4gICAgICBzZWxlY3Rpb24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHNlbGVjdGlvbi5tYXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICB9KTtcbiAgICAgIHNlbGVjdGlvbi5lbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICBpZiAoZWxlbSA9PT0gZWxlbWVudCkge1xuICAgICAgICAgIGVsZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbS5wb3J0aW9ucy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpKTtcbiAgICAgICAgICAgIGVsZW0ubWFwSW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3Qgc2Nyb2xsQmVoYXZpb3VyOiBhbnkgPSBzZXR0aW5ncy5zbW9vdGhTY3JvbGxpbmcgPyAnc21vb3RoJyA6ICdpbnN0YW50JztcbiAgICAgICAgICBjb25zdCBzY3JvbGxTZXR0aW5nczogU2Nyb2xsSW50b1ZpZXdPcHRpb25zID0ge1xuICAgICAgICAgICAgYmxvY2s6ICdjZW50ZXInLFxuICAgICAgICAgICAgYmVoYXZpb3I6IHNjcm9sbEJlaGF2aW91cixcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5rZWVwRWxlbWVudENlbnRlcmVkIHx8ICFpc0VsZW1lbnRJblZpZXdwb3J0KGVsZW0ucG9ydGlvbnNbMF0pKSB7XG4gICAgICAgICAgICBzY3JvbGxJbnRvVmlldyAmJiBlbGVtLnBvcnRpb25zWzBdLnNjcm9sbEludG9WaWV3KHNjcm9sbFNldHRpbmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbS5wb3J0aW9ucy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZENsYXNzJykpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlRWxlbWVudCA9IChzZWxlY3Rpb246IEZGaW5zdGFuY2UpID0+IHtcbiAgc2VsZWN0aW9uLmVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PlxuICAgIGVsZW1lbnQubWFwSW5kaWNhdG9yLnJlbW92ZSgpXG4gICk7XG4gIHNlbGVjdGlvbi5tYXBXcmFwcGVyLnJlbW92ZSgpO1xuICBzZWxlY3Rpb24uZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBlbGVtZW50LnBvcnRpb25zLmZvckVhY2goKHBvcnRpb246IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICB3aGlsZShwb3J0aW9uLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHBvcnRpb24ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocG9ydGlvbi5jaGlsZE5vZGVzWzBdLCBwb3J0aW9uKTtcbiAgICAgIH1cbiAgICAgIHBvcnRpb24ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwb3J0aW9uKTtcbiAgICB9KTtcbiAgfSk7XG4gIC8vIHNlbGVjdGlvbi5maW5kZXIucmV2ZXJ0KCk7XG59O1xuXG5jb25zdCByZW1vdmVTZWxlY3RlZE9yTGFzdEVsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHsgaW5zdGFuY2UgfSA9IGdldFNlbGVjdGVkU3RydWN0dXJlcygpO1xuICBpZiAoaW5zdGFuY2UpIHtcbiAgICByZW1vdmVFbGVtZW50KGluc3RhbmNlKTtcbiAgICBzZWxlY3Rpb25zLnNwbGljZShzZWxlY3Rpb25zLmluZGV4T2YoaW5zdGFuY2UpLCAxKTtcbiAgfSBlbHNlIHtcbiAgICBzZWxlY3Rpb25zLmxlbmd0aCAmJiByZW1vdmVFbGVtZW50KHNlbGVjdGlvbnMucG9wKCkpO1xuICB9XG4gIGlmIChzZWxlY3Rpb25zLmxlbmd0aCkge1xuICAgIGNvbnN0IG5leHRJbnN0YW5jZSA9IHNlbGVjdGlvbnNbc2VsZWN0aW9ucy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBzZWxlY3RlZEVsZW1lbnQgPSBuZXh0SW5zdGFuY2UuZWxlbWVudHMuZmluZChlbGVtID0+IGVsZW0uYWN0aXZlKTtcbiAgICBzZWxlY3RFbGVtZW50KG5leHRJbnN0YW5jZSwgc2VsZWN0ZWRFbGVtZW50LCB0cnVlKTtcbiAgfVxufTtcblxuY29uc3QgcmVtb3ZlQWxsRWxlbWVudHMgPSAoKSA9PiB7XG4gIHNlbGVjdGlvbnMuZm9yRWFjaChyZW1vdmVFbGVtZW50KTtcbiAgc2VsZWN0aW9ucyA9IFtdO1xufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0ZXh0OiBzdHJpbmcsIHNlbGVjdGlvbjogU2VsZWN0aW9uKSA9PiB7XG4gIGxldCBhY3RpdmVFbGVtZW50cyA9IDA7XG4gIGNvbnN0IHNlbGVjdGlvblJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGxldCBhY3RpdmVTZWxlY3Rpb25Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmZlbGVtJyk7O1xuICBpZiAoc2VsZWN0aW9uUmFuZ2Uuc3RhcnRDb250YWluZXIgPT0gc2VsZWN0aW9uUmFuZ2UuZW5kQ29udGFpbmVyKSB7XG4gICAgc2VsZWN0aW9uUmFuZ2Uuc3Vycm91bmRDb250ZW50cyhhY3RpdmVTZWxlY3Rpb25Ob2RlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuZXdSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgbmV3UmFuZ2Uuc2VsZWN0Tm9kZShzZWxlY3Rpb25SYW5nZS5lbmRDb250YWluZXIpO1xuICAgIG5ld1JhbmdlLnN1cnJvdW5kQ29udGVudHMoYWN0aXZlU2VsZWN0aW9uTm9kZSk7XG4gICAgbmV3UmFuZ2UuY29sbGFwc2UoKTtcbiAgfVxuICBjb25zdCBzY3JvbGxUb1RvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcblxuICBsZXQgY29sb3I6IEFycmF5PG51bWJlcj47XG4gIGlmIChjdXJyZW50Q29sb3IgPCBjb2xvcnMubGVuZ3RoKSB7XG4gICAgY29sb3IgPSBjb2xvcnNbY3VycmVudENvbG9yKytdO1xuICB9IGVsc2Uge1xuICAgIGNvbG9yID0gZ2V0UmFuZG9tQ29sb3IoKTtcbiAgfVxuICBjb25zdCBjb250cmFzdCA9IGdldENvbnRyYXN0WUlRKGNvbG9yKTtcbiAgY29uc3QgY3VycmVudEVsZW1lbnRzOiBGRmVsZW1lbnRbXSA9IFtdO1xuICBsZXQgcG9ydGlvbnM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgbGV0IGFjdGl2ZSA9IGZhbHNlO1xuICBsZXQgc29tZUFjdGl2ZSA9IGZhbHNlO1xuICBsZXQgcmVnZXhGaW5kZXIgPSBudWxsO1xuICBsZXQgZXhjYXBlZFRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcblxuICB0cnkge1xuICAgIHJlZ2V4RmluZGVyID0gUmVnRXhwKGV4Y2FwZWRUZXh0LCBzZXR0aW5ncy5tYXRjaENhc2VTZW5zaXRpdmUgPyAnZycgOiAnZ2knKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoREVCVUdfT04pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgZGVidWdnZXI7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGZpbmRlciA9IGZpbmRBbmRSZXBsYWNlRE9NVGV4dChkb2N1bWVudC5ib2R5LCB7XG4gICAgcHJlc2V0OiAncHJvc2UnLFxuICAgIGZpbmQ6IHJlZ2V4RmluZGVyLFxuICAgIHJlcGxhY2U6IHBvcnRpb24gPT4ge1xuXG4gICAgICBjb25zdCBlbGVtZW50SXNWaXNpYmxlID1cbiAgICAgICAgISEoIHBvcnRpb24ubm9kZS5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoIHx8XG4gICAgICAgICAgICBwb3J0aW9uLm5vZGUucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQgfHxcbiAgICAgICAgICAgIHBvcnRpb24ubm9kZS5wYXJlbnRFbGVtZW50LmdldENsaWVudFJlY3RzKCkubGVuZ3RoXG4gICAgICAgICAgKTtcblxuICAgICAgaWYgKGVsZW1lbnRJc1Zpc2libGUpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmZlbGVtJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIHBvcnRpb25zLnB1c2goZGl2KTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBpZiAocG9ydGlvbi5pbmRleCA9PT0gMCAmJiBwb3J0aW9uLmlzRW5kKSBkaXYuY2xhc3NMaXN0LmFkZCgnZmZlbGVtJyk7XG4gICAgICAgICAgZWxzZSBpZiAocG9ydGlvbi5pbmRleCA9PT0gMCkgZGl2LmNsYXNzTGlzdC5hZGQoJ2ZmZWxlbVN0YXJ0Jyk7XG4gICAgICAgICAgZWxzZSBpZiAocG9ydGlvbi5pc0VuZCkgZGl2LmNsYXNzTGlzdC5hZGQoJ2ZmZWxlbUVuZCcpO1xuICAgICAgICAgIGVsc2UgZGl2LmNsYXNzTGlzdC5hZGQoJ2ZmZWxlbU1pZGRsZScpO1xuICAgICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSByZW5kZXJDb2xvcihjb2xvciwgMS4wKTtcbiAgICAgICAgICBkaXYuc3R5bGUuY29sb3IgPSBjb250cmFzdDtcbiAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gcG9ydGlvbi50ZXh0LnJlcGxhY2UoLyYvZywnJmFtcDsnKS5yZXBsYWNlKC88L2csJyZsdDsnKS5yZXBsYWNlKC8+L2csJyZndDsnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBvcnRpb24uaXNFbmQpIHtcbiAgICAgICAgICBhY3RpdmUgPSBhY3RpdmUgfHwgZ2V0RWxlbWVudFBhcmVudHMocG9ydGlvbi5ub2RlKS5pbmNsdWRlcyhhY3RpdmVTZWxlY3Rpb25Ob2RlKTtcbiAgICAgICAgICBzb21lQWN0aXZlID0gYWN0aXZlIHx8IHNvbWVBY3RpdmU7XG4gICAgICAgICAgY29uc3QgZWxlbWVudDogRkZlbGVtZW50ID0geyBwb3J0aW9ucywgYWN0aXZlLCBtYXBJbmRpY2F0b3I6IG51bGwgfTtcbiAgICAgICAgICBjdXJyZW50RWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICBwb3J0aW9ucyA9IFtdO1xuICAgICAgICAgIGlmIChhY3RpdmUpIGFjdGl2ZUVsZW1lbnRzKys7XG4gICAgICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBvcnRpb24udGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHdoaWxlKGFjdGl2ZVNlbGVjdGlvbk5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICBhY3RpdmVTZWxlY3Rpb25Ob2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGFjdGl2ZVNlbGVjdGlvbk5vZGUuY2hpbGROb2Rlc1swXSwgYWN0aXZlU2VsZWN0aW9uTm9kZSk7XG4gICAgYWN0aXZlU2VsZWN0aW9uTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFjdGl2ZVNlbGVjdGlvbk5vZGUpO1xuICB9KTtcbiAgaWYgKERFQlVHX09OICYmIGN1cnJlbnRFbGVtZW50cy5sZW5ndGggJiYgKGFjdGl2ZUVsZW1lbnRzID09PSAwIHx8IGFjdGl2ZUVsZW1lbnRzID4gMSkpIHtcbiAgICBjb25zb2xlLmxvZygnQWN0aXZlIGVsZW1lbnRzOicsIGFjdGl2ZUVsZW1lbnRzKTtcbiAgICBjb25zb2xlLmxvZygnRWxlbWVudHM6JywgY3VycmVudEVsZW1lbnRzKTtcbiAgICBkZWJ1Z2dlcjtcbiAgfVxuXG4gIGlmICghY3VycmVudEVsZW1lbnRzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gIHVuc2VsZWN0RWxlbWVudCgpO1xuICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcbiAgY29uc3QgbWFwV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtYXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ21hcFdyYXBwZXInKTtcbiAgbWFwV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICBjb25zdCBjdXJyZW50U2VsZWN0aW9uOiBGRmluc3RhbmNlID0ge1xuICAgIGZpbmRlcixcbiAgICBhY3RpdmU6IHRydWUsXG4gICAgZWxlbWVudHM6IGN1cnJlbnRFbGVtZW50cyxcbiAgICBtYXBXcmFwcGVyLFxuICAgIHNhbml0aXplZFRleHQ6IHRleHQsXG4gIH07XG5cbiAgY3VycmVudEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgY29uc3QgeyBwb3J0aW9ucywgYWN0aXZlIH0gPSBlbGVtZW50O1xuXG4gICAgcG9ydGlvbnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgZGl2Lm9ubW91c2VvdmVyID0gZGl2Lm9ubW91c2VvdXQgPSBvbkVsZW1lbnRIb3ZlcihjdXJyZW50U2VsZWN0aW9uKTtcbiAgICAgIGRpdi5vbmNsaWNrID0gKCkgPT4gc2VsZWN0RWxlbWVudChjdXJyZW50U2VsZWN0aW9uLCBlbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHNvbWVBY3RpdmUpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRDbGFzcycpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBpbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgnbWFwSW5kaWNhdG9yJyk7XG4gICAgaWYgKGFjdGl2ZSkgaW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgaW5kaWNhdG9yLm9uY2xpY2sgPSAoKSA9PiBzZWxlY3RFbGVtZW50KGN1cnJlbnRTZWxlY3Rpb24sIGVsZW1lbnQsIHRydWUpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBwYWdlSGVpZ2h0ID0gZ2V0UGFnZUhlaWdodCgpO1xuICAgICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9XG4gICAgICAgIGVsZW1lbnQucG9ydGlvbnNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICtcbiAgICAgICAgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMCk7XG4gICAgICBpbmRpY2F0b3Iuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtlbGVtZW50UG9zaXRpb24gLyBwYWdlSGVpZ2h0ICogMTAwfXZoKWA7XG4gICAgICBpbmRpY2F0b3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcmVuZGVyQ29sb3IoY29sb3IsIDAuOCk7XG4gICAgICBtYXBXcmFwcGVyLmluc2VydEJlZm9yZShpbmRpY2F0b3IsIG1hcFdyYXBwZXIuZmlyc3RDaGlsZCk7XG4gICAgfSk7XG4gICAgZWxlbWVudC5tYXBJbmRpY2F0b3IgPSBpbmRpY2F0b3I7XG4gIH0pO1xuXG4gIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ21hcExhYmVsJyk7XG4gIGxhYmVsLnN0eWxlLmJhY2tncm91bmQgPVxuICAgIGBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLFxuJHtyZW5kZXJDb2xvcihjb2xvciwgMS4wKX0gMCUsXG4ke3JlbmRlckNvbG9yKGNvbG9yLCAwLjgpfSAxMCUsXG4ke3JlbmRlckNvbG9yKGNvbG9yLCAwLjYpfSA0MCUsXG4jMDAwMDAwMDAgNTAlLCMwMDAwMDAwMCAxMDAlKWA7XG4gIGxhYmVsLmlubmVyVGV4dCA9IHRleHQuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIGN1cnJlbnRTZWxlY3Rpb24ubWFwV3JhcHBlci5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgc2VsZWN0aW9uc01hcFdyYXBwZXIuYXBwZW5kQ2hpbGQobWFwV3JhcHBlcik7XG4gIH0pO1xuXG4gIGlmICghc2VsZWN0aW9ucy5sZW5ndGgpIHJlZHJhd01pbmltYXBTY3JvbGwodHJ1ZSk7XG4gIHNlbGVjdGlvbnMucHVzaChjdXJyZW50U2VsZWN0aW9uKTtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG8oeyB0b3A6IHNjcm9sbFRvVG9wIH0pO1xuICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCAmJiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvKHsgdG9wOiBzY3JvbGxUb1RvcCB9KTtcbn07XG5cbmNvbnN0IHJlZHJhd01hcEluZGljYXRvcnMgPSAoKSA9PiB7XG4gIHNlbGVjdGlvbnMuZm9yRWFjaChpbnN0YW5jZSA9PiB7XG4gICAgaW5zdGFuY2UuZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGxldCBlbGVtZW50UG9zaXRpb24gPVxuICAgICAgICBlbGVtZW50LnBvcnRpb25zWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArXG4gICAgICAgICAgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBlbGVtZW50Lm1hcEluZGljYXRvci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke2VsZW1lbnRQb3NpdGlvbiAvIHBhZ2VIZWlnaHQgKiAxMDB9dmgpYDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IG9uRWxlbWVudEhvdmVyID0gKGN1cnJlbnRTZWxlY3Rpb246IEZGaW5zdGFuY2UpID0+XG4gIChldmVudDogTW91c2VFdmVudCkgPT5cbiAgICBjdXJyZW50U2VsZWN0aW9uLmVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PlxuICAgICAgZWxlbWVudC5wb3J0aW9ucy5mb3JFYWNoKHBvcnRpb24gPT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICAgICAgZXZlbnQudHlwZSA9PT0gJ21vdXNlb3ZlcidcbiAgICAgICAgICAgID8gcG9ydGlvbi5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkJylcbiAgICAgICAgICAgIDogcG9ydGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcmVkJylcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG5cbmNvbnN0IHJvdGF0ZUxvZ28gPSAoKSA9PiB7XG4gIHJlcGVhdExvZ28uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIHJlcGVhdExvZ29XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVwZWF0TG9nby5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICByZXBlYXRMb2dvV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgfSwgODEwKTtcbn07XG5cbmNvbnN0IGdldFJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICByZXR1cm4gW1xuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSksXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KSxcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpXG4gIF07XG59O1xuXG5jb25zdCByZW5kZXJDb2xvciA9KGNvbG9yOiBBcnJheTxudW1iZXI+LCB0cmFuc3BhcmVuY3k6IG51bWJlcikgPT4ge1xuICByZXR1cm4gYHJnYmEoJHtjb2xvclswXX0sICR7Y29sb3JbMV19LCAke2NvbG9yWzJdfSwgJHt0cmFuc3BhcmVuY3l9KWA7XG59XG5cbmNvbnN0IGdldENvbnRyYXN0WUlRID0gKGNvbG9yOiBBcnJheTxudW1iZXI+KSA9PiB7XG4gIGNvbnN0IHIgPSBjb2xvclswXTtcbiAgY29uc3QgZyA9IGNvbG9yWzFdO1xuICBjb25zdCBiID0gY29sb3JbMl07XG4gIGNvbnN0IHlpcSA9IChyICogMjk5ICsgZyAqIDU4NyArIGIgKiAxMTQpIC8gMTAwMDtcbiAgcmV0dXJuIHlpcSA+PSAxMjggPyAnYmxhY2snIDogJ3doaXRlJztcbn07XG5cbmNvbnN0IGdldFBhcmVudEluZGV4ID0gKG5vZGU6IEhUTUxFbGVtZW50LCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpID0+IHtcbiAgbGV0IGNoaWxkTm9kZXMgPSBub2RlLnBhcmVudE5vZGUuY2hpbGROb2RlcztcbiAgbGV0IGluZGV4ID0gMDtcbiAgY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgIGlmIChjaGlsZCA9PT0gbm9kZSkgaW5kZXggPSBpO1xuICB9KVxuICBpZiAocmV2ZXJzZSkge1xuICAgIHJldHVybiBjaGlsZE5vZGVzLmxlbmd0aCAtIGluZGV4IC0gMTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbn07XG5cbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGlzSW5WaWV3cG9ydCA9XG4gICAgcmVjdC50b3AgPj0gMCArIHZpZXdQb3J0RGVsdGEgJiYgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PVxuICAgICAgKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAtIHZpZXdQb3J0RGVsdGEgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICByZXR1cm4gaXNJblZpZXdwb3J0O1xufTtcblxuY29uc3QgZ2V0RWxlbWVudFBhcmVudHMgPSBub2RlID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBbbm9kZV1cbiAgZm9yICg7IG5vZGU7IG5vZGUgPSBub2RlLnBhcmVudE5vZGUpIHtcbiAgICBub2Rlcy51bnNoaWZ0KG5vZGUpXG4gIH1cbiAgcmV0dXJuIG5vZGVzXG59XG5cbmNvbnN0IGNvbW1vbkFuY2VzdG9yID0gKG5vZGUxOiBIVE1MRWxlbWVudCwgbm9kZTI6IEhUTUxFbGVtZW50KSA9PiB7XG4gIGNvbnN0IHBhcmVudHMxID0gZ2V0RWxlbWVudFBhcmVudHMobm9kZTEpXG4gIGNvbnN0IHBhcmVudHMyID0gZ2V0RWxlbWVudFBhcmVudHMobm9kZTIpXG5cbiAgaWYgKHBhcmVudHMxWzBdICE9IHBhcmVudHMyWzBdKSB0aHJvdyBcIk5vIGNvbW1vbiBhbmNlc3RvciFcIlxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50czEubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocGFyZW50czFbaV0gIT0gcGFyZW50czJbaV0pIHJldHVybiBwYXJlbnRzMVtpIC0gMV1cbiAgfVxufVxuXG53aW5kb3cub25sb2FkID0gaW5pdEZGO1xuIiwiZXhwb3J0IGNvbnN0IGZmU3R5bGUgPSBgXG5ib2R5IHtcbiAgLS1lbGVtLW5vcm1hbDogMHB4O1xuICAtLWVsZW0tYmlnOiAtMnB4O1xuICAtLWVsZW0tbWF4OiAtNHB4O1xuXG4gIC0tZWxlbS1yYWRpdXM6IDJweDtcbiAgLS1lbGVtLXJhZGl1cy1zZWxlY3RlZDogM3B4O1xufVxuXG5cblxuLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMgRkZFTEVNICMjIyMjIyMjIyMjIyMjIyMjIyMjICovXG5cbi5mZmVsZW0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cyk7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cyk7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cyk7XG4gIHRyYW5zaXRpb246IGFsbCAuMnMgZWFzZTtcbn1cblxuLmZmZWxlbU1pZGRsZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4uZmZlbGVtU3RhcnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cyk7XG59XG5cbi5mZmVsZW1FbmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzKTtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzKTtcbn1cblxuLmZmZWxlbS5ob3ZlcmVkICB7IHotaW5kZXg6IDI7IH1cbi5mZmVsZW1NaWRkbGUuaG92ZXJlZCAgeyB6LWluZGV4OiAyOyB9XG4uZmZlbGVtU3RhcnQuaG92ZXJlZCAgeyB6LWluZGV4OiAyOyB9XG4uZmZlbGVtRW5kLmhvdmVyZWQgIHsgei1pbmRleDogMjsgfVxuLmZmZWxlbS5zZWxlY3RlZCB7IHotaW5kZXg6IDM7IH1cbi5mZmVsZW1NaWRkbGUuc2VsZWN0ZWQgeyB6LWluZGV4OiAzOyB9XG4uZmZlbGVtU3RhcnQuc2VsZWN0ZWQgeyB6LWluZGV4OiAzOyB9XG4uZmZlbGVtRW5kLnNlbGVjdGVkIHsgei1pbmRleDogMzsgfVxuXG5cblxuLmZmZWxlbTo6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gIGxlZnQ6IC0xcHg7XG4gIHJpZ2h0OiAtMXB4O1xuICBib3R0b206IHZhcigtLWVsZW0tbm9ybWFsKTtcbiAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgei1pbmRleDogLTE7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzKTtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2U7XG59XG5cbi5mZmVsZW1NaWRkbGU6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogdmFyKC0tZWxlbS1ub3JtYWwpO1xuICBsZWZ0OiAtMXB4O1xuICByaWdodDogLTFweDtcbiAgYm90dG9tOiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gIHotaW5kZXg6IC0xO1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2U7XG59XG5cbi5mZmVsZW1TdGFydDo6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gIGxlZnQ6IC0xcHg7XG4gIHJpZ2h0OiAtMXB4O1xuICBib3R0b206IHZhcigtLWVsZW0tbm9ybWFsKTtcbiAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgei1pbmRleDogLTE7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzKTtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2U7XG59XG5cbi5mZmVsZW1FbmQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogdmFyKC0tZWxlbS1ub3JtYWwpO1xuICBsZWZ0OiAtMXB4O1xuICByaWdodDogLTFweDtcbiAgYm90dG9tOiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gIHotaW5kZXg6IC0xO1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMpO1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2U7XG59XG5cblxuXG4uZmZlbGVtLmhvdmVyZWQ6OmJlZm9yZSB7XG4gIHRvcDogdmFyKC0tZWxlbS1iaWcpO1xuICBsZWZ0OiB2YXIoLS1lbGVtLWJpZyk7XG4gIHJpZ2h0OiB2YXIoLS1lbGVtLWJpZyk7XG4gIGJvdHRvbTogdmFyKC0tZWxlbS1iaWcpO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzLXNlbGVjdGVkKTtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzLXNlbGVjdGVkKTtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzLXNlbGVjdGVkKTtcbn1cblxuLmZmZWxlbU1pZGRsZS5ob3ZlcmVkOjpiZWZvcmUge1xuICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgYm90dG9tOiB2YXIoLS1lbGVtLWJpZyk7XG59XG5cbi5mZmVsZW1TdGFydC5ob3ZlcmVkOjpiZWZvcmUge1xuICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgbGVmdDogdmFyKC0tZWxlbS1iaWcpO1xuICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG59XG5cbi5mZmVsZW1FbmQuaG92ZXJlZDo6YmVmb3JlIHtcbiAgdG9wOiB2YXIoLS1lbGVtLWJpZyk7XG4gIHJpZ2h0OiB2YXIoLS1lbGVtLWJpZyk7XG4gIGJvdHRvbTogdmFyKC0tZWxlbS1iaWcpO1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xufVxuXG5cblxuLmZmZWxlbS5zZWxlY3RlZENsYXNzOjpiZWZvcmUge1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzLXNlbGVjdGVkKTtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzLXNlbGVjdGVkKTtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IHZhcigtLWVsZW0tcmFkaXVzLXNlbGVjdGVkKTtcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMC40KSAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwwLjQpICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwwLjQpICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yaWdodDogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMC40KSAhaW1wb3J0YW50O1xuICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgbGVmdDogdmFyKC0tZWxlbS1iaWcpO1xuICByaWdodDogdmFyKC0tZWxlbS1iaWcpO1xuICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbn1cblxuLmZmZWxlbU1pZGRsZS5zZWxlY3RlZENsYXNzOjpiZWZvcmUge1xuICBib3JkZXItdG9wOiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwwLjQpICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCByZ2JhKDI1NSwyNTUsMjU1LDAuNCkgIWltcG9ydGFudDtcbiAgdG9wOiB2YXIoLS1lbGVtLWJpZyk7XG4gIGJvdHRvbTogdmFyKC0tZWxlbS1iaWcpO1xufVxuXG4uZmZlbGVtU3RhcnQuc2VsZWN0ZWRDbGFzczo6YmVmb3JlIHtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG4gIGJvcmRlci10b3A6IHNvbGlkIDFweCByZ2JhKDI1NSwyNTUsMjU1LDAuNCkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMC40KSAhaW1wb3J0YW50O1xuICBib3JkZXItbGVmdDogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMC40KSAhaW1wb3J0YW50O1xuICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgbGVmdDogdmFyKC0tZWxlbS1iaWcpO1xuICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbn1cblxuLmZmZWxlbUVuZC5zZWxlY3RlZENsYXNzOjpiZWZvcmUge1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItdG9wOiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwwLjQpICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCByZ2JhKDI1NSwyNTUsMjU1LDAuNCkgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwwLjQpICFpbXBvcnRhbnQ7XG4gIHRvcDogdmFyKC0tZWxlbS1iaWcpO1xuICByaWdodDogdmFyKC0tZWxlbS1iaWcpO1xuICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbn1cblxuXG5cbi5mZmVsZW0uc2VsZWN0ZWQ6OmJlZm9yZSB7XG4gIGFuaW1hdGlvbjogaGlnaGxpZ2h0IC41cyBjdWJpYy1iZXppZXIoLjYsIDAsIC40LCAxKTtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG4gIGJvcmRlci10b3A6IHNvbGlkIDFweCByZ2JhKDI1NSwyNTUsMjU1LDEuMCkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMS4wKSAhaW1wb3J0YW50O1xuICBib3JkZXItbGVmdDogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMS4wKSAhaW1wb3J0YW50O1xuICBib3JkZXItcmlnaHQ6IHNvbGlkIDFweCByZ2JhKDI1NSwyNTUsMjU1LDEuMCkgIWltcG9ydGFudDtcbiAgdG9wOiB2YXIoLS1lbGVtLWJpZyk7XG4gIGxlZnQ6IHZhcigtLWVsZW0tYmlnKTtcbiAgcmlnaHQ6IHZhcigtLWVsZW0tYmlnKTtcbiAgYm90dG9tOiB2YXIoLS1lbGVtLWJpZyk7XG59XG5cbi5mZmVsZW1NaWRkbGUuc2VsZWN0ZWQ6OmJlZm9yZSB7XG4gIGFuaW1hdGlvbjogaGlnaGxpZ2h0TWlkZGxlIC41cyBjdWJpYy1iZXppZXIoLjYsIDAsIC40LCAxKTtcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMS4wKSAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwxLjApICFpbXBvcnRhbnQ7XG4gIHRvcDogdmFyKC0tZWxlbS1iaWcpO1xuICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbn1cblxuLmZmZWxlbVN0YXJ0LnNlbGVjdGVkOjpiZWZvcmUge1xuICBhbmltYXRpb246IGhpZ2hsaWdodFN0YXJ0IC41cyBjdWJpYy1iZXppZXIoLjYsIDAsIC40LCAxKTtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiB2YXIoLS1lbGVtLXJhZGl1cy1zZWxlY3RlZCk7XG4gIGJvcmRlci10b3A6IHNvbGlkIDFweCByZ2JhKDI1NSwyNTUsMjU1LDEuMCkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMS4wKSAhaW1wb3J0YW50O1xuICBib3JkZXItbGVmdDogc29saWQgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMS4wKSAhaW1wb3J0YW50O1xuICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgbGVmdDogdmFyKC0tZWxlbS1iaWcpO1xuICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbn1cblxuLmZmZWxlbUVuZC5zZWxlY3RlZDo6YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiBoaWdobGlnaHRFbmQgLjVzIGN1YmljLWJlemllciguNiwgMCwgLjQsIDEpO1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdmFyKC0tZWxlbS1yYWRpdXMtc2VsZWN0ZWQpO1xuICBib3JkZXItdG9wOiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwxLjApICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCByZ2JhKDI1NSwyNTUsMjU1LDEuMCkgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggcmdiYSgyNTUsMjU1LDI1NSwxLjApICFpbXBvcnRhbnQ7XG4gIHRvcDogdmFyKC0tZWxlbS1iaWcpO1xuICByaWdodDogdmFyKC0tZWxlbS1iaWcpO1xuICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbn1cblxuXG5cbi8qICMjIyMjIyMjIyMjIyMjIyMjIyMjIEZGRUxFTSBBTklNQVRJT05TICMjIyMjIyMjIyMjIyMjIyMjIyMjICovXG5cbkBrZXlmcmFtZXMgaGlnaGxpZ2h0IHtcbiAgMCUge1xuICAgIHRvcDogdmFyKC0tZWxlbS1iaWcpO1xuICAgIGxlZnQ6IHZhcigtLWVsZW0tYmlnKTtcbiAgICByaWdodDogdmFyKC0tZWxlbS1iaWcpO1xuICAgIGJvdHRvbTogdmFyKC0tZWxlbS1iaWcpO1xuICB9XG4gIDE1JSB7XG4gICAgdG9wOiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gICAgbGVmdDogdmFyKC0tZWxlbS1ub3JtYWwpO1xuICAgIHJpZ2h0OiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gICAgYm90dG9tOiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gIH1cbiAgNjAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tbWF4KTtcbiAgICBsZWZ0OiB2YXIoLS1lbGVtLW1heCk7XG4gICAgcmlnaHQ6IHZhcigtLWVsZW0tbWF4KTtcbiAgICBib3R0b206IHZhcigtLWVsZW0tbWF4KTtcbiAgfVxuICAxMDAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgICBsZWZ0OiB2YXIoLS1lbGVtLWJpZyk7XG4gICAgcmlnaHQ6IHZhcigtLWVsZW0tYmlnKTtcbiAgICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGhpZ2hsaWdodE1pZGRsZSB7XG4gIDAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgICBib3R0b206IHZhcigtLWVsZW0tYmlnKTtcbiAgfVxuICAxMCUge1xuICAgIHRvcDogdmFyKC0tZWxlbS1ub3JtYWwpO1xuICAgIGJvdHRvbTogdmFyKC0tZWxlbS1ub3JtYWwpO1xuICB9XG4gIDcwJSB7XG4gICAgdG9wOiB2YXIoLS1lbGVtLW1heCk7XG4gICAgYm90dG9tOiB2YXIoLS1lbGVtLW1heCk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdG9wOiB2YXIoLS1lbGVtLWJpZyk7XG4gICAgYm90dG9tOiB2YXIoLS1lbGVtLWJpZyk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBoaWdobGlnaHRTdGFydCB7XG4gIDAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgICBsZWZ0OiB2YXIoLS1lbGVtLWJpZyk7XG4gICAgYm90dG9tOiB2YXIoLS1lbGVtLWJpZyk7XG4gIH1cbiAgMTAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tbm9ybWFsKTtcbiAgICBsZWZ0OiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gICAgYm90dG9tOiB2YXIoLS1lbGVtLW5vcm1hbCk7XG4gIH1cbiAgNzAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tbWF4KTtcbiAgICBsZWZ0OiB2YXIoLS1lbGVtLW1heCk7XG4gICAgYm90dG9tOiB2YXIoLS1lbGVtLW1heCk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdG9wOiB2YXIoLS1lbGVtLWJpZyk7XG4gICAgbGVmdDogdmFyKC0tZWxlbS1iaWcpO1xuICAgIGJvdHRvbTogdmFyKC0tZWxlbS1iaWcpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgaGlnaGxpZ2h0RW5kIHtcbiAgMCUge1xuICAgIHRvcDogdmFyKC0tZWxlbS1iaWcpO1xuICAgIHJpZ2h0OiB2YXIoLS1lbGVtLWJpZyk7XG4gICAgYm90dG9tOiB2YXIoLS1lbGVtLWJpZyk7XG4gIH1cbiAgMTAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tbm9ybWFsKTtcbiAgICByaWdodDogdmFyKC0tZWxlbS1ub3JtYWwpO1xuICAgIGJvdHRvbTogdmFyKC0tZWxlbS1ub3JtYWwpO1xuICB9XG4gIDcwJSB7XG4gICAgdG9wOiB2YXIoLS1lbGVtLW1heCk7XG4gICAgcmlnaHQ6IHZhcigtLWVsZW0tbWF4KTtcbiAgICBib3R0b206IHZhcigtLWVsZW0tbWF4KTtcbiAgfVxuICAxMDAlIHtcbiAgICB0b3A6IHZhcigtLWVsZW0tYmlnKTtcbiAgICByaWdodDogdmFyKC0tZWxlbS1iaWcpO1xuICAgIGJvdHRvbTogdmFyKC0tZWxlbS1iaWcpO1xuICB9XG59XG5cblxuXG4vKiAjIyMjIyMjIyMjIyMjIyMjIyMjIyBQQUdFIExPT1AgTE9HTyAjIyMjIyMjIyMjIyMjIyMjIyMjIyAqL1xuXG4ucmVwZWF0TG9nb1dyYXBwZXIge1xuICBvcGFjaXR5OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDkwLDkwLDkwLDAuNyk7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIHBhZGRpbmc6IDIwcHggMjBweCAxMnB4IDE4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIHotaW5kZXg6IDEwMDAwMDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4ucmVwZWF0TG9nbyB7XG4gIG9wYWNpdHk6IC43O1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzBkZWcpO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnJlcGVhdExvZ28uYWN0aXZlIHtcbiAgYW5pbWF0aW9uOiByb3RhdGVMb2dvIC41cyBjdWJpYy1iZXppZXIoLjYsIDAsIC40LCAxKTtcbn1cbkBrZXlmcmFtZXMgcm90YXRlTG9nbyB7XG4gIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgtMzBkZWcpOyB9XG4gIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSggODBkZWcpOyB9XG59XG5cbi5yZXBlYXRMb2dvV3JhcHBlci5hY3RpdmUge1xuICBhbmltYXRpb246IHJvdGF0ZUxvZ29XcmFwcGVyIC41cyBjdWJpYy1iZXppZXIoLjYsIDAsIC40LCAxKTtcbn1cbkBrZXlmcmFtZXMgcm90YXRlTG9nb1dyYXBwZXIge1xuICAwJSAgIHsgb3BhY2l0eTogMDsgfVxuICAyNSUgIHsgb3BhY2l0eTogMTsgfVxuICA2NSUgIHsgb3BhY2l0eTogMTsgfVxuICAxMDAlIHsgb3BhY2l0eTogMDsgfVxufVxuXG5cblxuLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMgU0VMRUNUSU9OUyBNQVAgV1JBUFBFUiAjIyMjIyMjIyMjIyMjIyMjIyMjIyAqL1xuXG4uc2VsZWN0aW9uc01hcFdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4td2lkdGg6IDBweDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogMHB4O1xuICB0b3A6IDBweDtcbiAgei1pbmRleDogMTAwMDA7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5zZWxlY3Rpb25zTWFwV3JhcHBlcjpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC42KTtcbn1cblxuLnNlbGVjdGlvbnNNYXBXcmFwcGVyLmZpeGVkIHtcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjYpO1xufVxuXG5cblxuLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMgU0VMRUNUSU9OUyBNQVAgU0NST0xMICMjIyMjIyMjIyMjIyMjIyMjIyMjICovXG5cbi5zZWxlY3Rpb25zTWFwU2Nyb2xsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjQpO1xuICBvcGFjaXR5OiAwLjU7XG4gIHotaW5kZXg6IDI7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG5cblxuLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMgU0VMRUNUSU9OUyBNQVAgUElOICMjIyMjIyMjIyMjIyMjIyMjIyMjICovXG5cbi5zZWxlY3Rpb25zTWFwUGluIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNik7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogLTIwcHg7XG59XG5cbi5zZWxlY3Rpb25zTWFwUGluLmZpeGVkIHtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLnNlbGVjdGlvbnNNYXBXcmFwcGVyOmhvdmVyIC5zZWxlY3Rpb25zTWFwUGluIHtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuXG5cbi8qICMjIyMjIyMjIyMjIyMjIyMjIyMjIE1BUCBQSU4gIyMjIyMjIyMjIyMjIyMjIyMjIyMgKi9cblxuLm1hcFBpbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA0cHg7XG4gIG9wYWNpdHk6IDAuNDtcbiAgZmlsdGVyOiBpbnZlcnQoMTAwJSk7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlO1xufVxuXG4uc2VsZWN0aW9uc01hcFBpbi5maXhlZCAubWFwUGluIHtcbiAgb3BhY2l0eTogMS4wO1xufVxuXG4ubWFwUGluOmhvdmVyIHtcbiAgcGFkZGluZzogM3B4O1xufVxuXG5cblxuLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMgTUFQIFdSQVBQRVIgIyMjIyMjIyMjIyMjIyMjIyMjIyMgKi9cblxuLnNlbGVjdGlvbnNNYXBXcmFwcGVyIC5tYXBXcmFwcGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMHB4O1xuICB3aWR0aDogMTRweDtcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cblxuLnNlbGVjdGlvbnNNYXBXcmFwcGVyOmhvdmVyIC5tYXBXcmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uc2VsZWN0aW9uc01hcFdyYXBwZXIuZml4ZWQgLm1hcFdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5tYXBXcmFwcGVyLnNlbGVjdGVkIHtcbiAgei1pbmRleDogMztcbn1cblxuLm1hcFdyYXBwZXI6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNCk7XG59XG5cblxuXG4vKiAjIyMjIyMjIyMjIyMjIyMjIyMjIyBJTkRJQ0FUT1JTICMjIyMjIyMjIyMjIyMjIyMjIyMjICovXG5cbi5tYXBJbmRpY2F0b3Ige1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwcHg7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDZweDtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAzcHggMHB4IHJnYmEoMCwwLDAsMC44KTtcbiAgYm9yZGVyLXJhZGl1czogMXB4O1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2U7XG4gIHotaW5kZXg6IDI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG5cbi5tYXBXcmFwcGVyLnNlbGVjdGVkIC5tYXBJbmRpY2F0b3Ige1xuICBib3JkZXI6IHNvbGlkIDAuNXB4IHJnYmEoMjU1LDI1NSwyNTUsMC40KSAhaW1wb3J0YW50O1xuICB3aWR0aDogOXB4O1xuICBoZWlnaHQ6IDVweDtcbn1cblxuLm1hcEluZGljYXRvcjpob3ZlciB7XG4gIHdpZHRoOiAxNHB4O1xuICBtYXJnaW4tbGVmdDogMHB4O1xufVxuXG4ubWFwV3JhcHBlci5zZWxlY3RlZCAubWFwSW5kaWNhdG9yOmhvdmVyIHtcbiAgd2lkdGg6IDE0cHg7XG4gIG1hcmdpbi1sZWZ0OiAwcHg7XG59XG5cbi5tYXBXcmFwcGVyLnNlbGVjdGVkIC5tYXBJbmRpY2F0b3Iuc2VsZWN0ZWQge1xuICBib3JkZXI6IHNvbGlkIDAuNXB4IHJnYmEoMjU1LDI1NSwyNTUsMS4wKSAhaW1wb3J0YW50O1xuICB3aWR0aDogMThweDtcbiAgbWFyZ2luLWxlZnQ6IC00cHg7XG4gIHotaW5kZXg6IDE7XG59XG5cblxuXG4vKiAjIyMjIyMjIyMjIyMjIyMjIyMjIyBNQVAgTEFCRUwgIyMjIyMjIyMjIyMjIyMjIyMjIyMgKi9cblxuLm1hcExhYmVsIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDEuMCk7XG4gIHBhZGRpbmctbGVmdDogMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XG4gIHBhZGRpbmctdG9wOiA1MHZoO1xuICBtYXJnaW4tdG9wOiAxNHZoO1xuICBoZWlnaHQ6IDg1dmg7XG4gIHdpZHRoOiAxNHB4O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gIHVuaWNvZGUtYmlkaTogYmlkaS1vdmVycmlkZTtcbiAgZGlyZWN0aW9uOiBydGw7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICB3cml0aW5nLW1vZGU6IHZlcnRpY2FsLXJsO1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2U7XG59XG5cbi5tYXBXcmFwcGVyOmhvdmVyIC5tYXBMYWJlbCB7XG4gIG1hcmdpbi10b3A6IDEzdmg7XG4gIHBhZGRpbmctdG9wOiAzMHZoO1xufVxuXG4ubWFwV3JhcHBlci5zZWxlY3RlZCAubWFwTGFiZWwge1xuICBtYXJnaW4tdG9wOiAxMnZoO1xuICBwYWRkaW5nLXRvcDogMTB2aDtcbn1cblxuLnNlbGVjdGlvbnNNYXBXcmFwcGVyOmhvdmVyIC5tYXBMYWJlbCB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi5zZWxlY3Rpb25zTWFwV3JhcHBlci5maXhlZCAubWFwTGFiZWwge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IGNvbG9ycyA9IFtcbiAgWzMwLCAxNjgsIDE1MF0sXG4gIFsyNTUsIDk3LCAxMDBdLFxuICBbMCwgMTEzLCAxODhdLFxuICBbMzEsIDE4NCwgOTJdLFxuICBbMjQ3LCA5MiwgM10sXG4gIFsxMDEsIDE1NSwgOTRdLFxuICBbMjUwLCAxNjksIDIyXSxcbiAgWzE5NCwgMzIsIDQ0XSxcbiAgWzE4MSwgNDAsIDE0NF0sXG4gIFs3MywgNDgsIDI0MF0sXG4gIFs5MCwgMTksIDEwOF0sXG4gIFsyMywgNjgsIDQzXVxuXTsiXSwic291cmNlUm9vdCI6IiJ9