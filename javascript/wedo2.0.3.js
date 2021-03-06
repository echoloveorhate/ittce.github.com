;(function(){
    // ( 21, 94 ) 定义了一些函数和方法包括
    jQuery = function( selector, context ){
        return new jQuery.fn.init( selector, context );
    };
//begin 21 row
    var
    // A central reference to the root jQuery(document)
    //存储一下jQuery(document);
        rootjQuery,

    // The deferred used on DOM ready
    //当dom准备好时使用
        readyList,

    // Support: IE9
    // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
    //存储字符串"undefined"，在判断时使用;
        core_strundefined = typeof undefined,

    // Use the correct document accordingly with window argument (sandbox)
    //将window下的参数存储为变量;
        location = window.location,
        document = window.document,
        docElem = document.documentElement,//存储html标签;

    // Map over jQuery in case of overwrite
    //当window.jQuery被占用时使用;
        _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    //当window.$被占用时使用;
        _$ = window.$,

    // [[Class]] -> type pairs
    //类型对最好后存储为class2type = {"[Object String]":"string","[Object Array]":"array"}
        class2type = {},

    // List of deleted data cache ids, so we can reuse them
    //删除数据缓存id列表,所以我们可以重用它们
        core_deletedIds = [],

        core_version = "2.0.3",

    // Save a reference to some core methods
    //保存引用的一些核心方法;合并，插入，截取，查找，转换字符串，是否是自身的属性或方法，去空格;
        core_concat = core_deletedIds.concat,//
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,

    // Define a local copy of jQuery
    //实例化jQuery;
        jQuery = function( selector, context ) {
            // The jQuery object is actually just the init constructor 'enhanced'
            //jQuery对象实际上只是init构造函数“增强”
            return new jQuery.fn.init( selector, context, rootjQuery );
        },

    // Used for matching numbers
    //匹配数字科学记数法，带小数的
    //等价于"[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)"
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

    // Used for splitting on whitespace
    //用空格分割
        core_rnotwhite = /\S+/g,


    // A simple way to check for HTML strings
    //一条简单的路去检查HTML字符串
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    //让id比tag优先，用来避免使用xss来攻击location.hash
    // Strict HTML recognition (#11290: must start with <)
    //严格的识别（必须以<开头）
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

    // Match a standalone tag
    //匹配一个独立的标签;
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

    // Matches dashed string for camelizing
    //匹配ie的前缀转法  MsBorderRadius  标准浏览器为:webkitBorderRadius;
        rmsPrefix = /^-ms-/,

        rdashAlpha = /-([\da-z])/gi,
    //找到 margin-left 找到-l 操作它

    // Used by jQuery.camelCase as callback to replace()
    //使用jQuery.camelCase替代()的回调
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        },

    // The ready event handler and self cleanup method
    //监听load事件
        completed = function() {
            document.removeEventListener( "DOMContentLoaded", completed, false );
            window.removeEventListener( "load", completed, false );
            jQuery.ready();
        };
	//( 96, 283 ) 给jQuery对象的原型上绑定属性和方法;
    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: core_version,
        //版本号
        constructor: jQuery,
        //修正原型的指向
        init: function (selector, context, rootjQuery) {//选择器，上下文，document
            var match, elem;

            //如果无效直接返回;处理异常 $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            //处理HTML字符串
            if (typeof selector === "string") {//判断字符串
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    //假设以<开头，>结尾的是HTML，跳过正则检查
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                    //match 等于一个包含id 或者标签名的数组
                }

                // Match html or make sure no context is specified for #id
                //匹配html 或 确保没有上下文的是指定的id
                if (match && (match[1] || !context)) {
                    //判断match的解果
                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        //将context 指定为 原生的Dom对象 document
                        // scripts is true for back-compat
                        jQuery.merge(this, jQuery.parseHTML(//parseHTML 将字符串列表的标签转换为数组
                            match[1],//merge 将 数组合并到this上变为json形式
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        //处理:$(html,状态)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                //如果需要将需要的作为上下文的属性;
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                        //处理$(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        // Check parentNode to catch when Blackberry 4.6 returns
                        //检查父节点去存储如果是黑莓4.6的话返回
                        // nodes that are no longer in the document #6963
                        //节点不在文档中
                        if (elem && elem.parentNode) {
                            // Inject the element directly into the jQuery object
                            //将元素直接注入到jQuery对象中
                            this.length = 1;
                            this[0] = elem;
                        }
                        //制定上下文和选择器;
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    //如果不存在上线文或者上下文有jquery属性和方法，调用find在上下文或document中查找他
                    return ( context || rootjQuery ).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                    //和$(context).find(expr)等价的
                } else {
                    //否则返回jQuery(context).find(selector)；
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
                //处理：$(DOMElement)；dom元素;
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                //处理$(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector);
                //返回document.ready(selector)
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
            //返回一个数组出去
        },
        selector: "",
        length: 0,
        toArray:function(){
        	return core_slice.call(this);
        },
        get:function( num ){
        	return num == null ?
        	this.toArray() :
        	( num < 0 ? this[ this.length + num ] : this[ num ]);
        },
        pushStack:function( elems ){
        	var ret = this.merge( this.constructor(), elems );
        	ret.prevObject = this;
        	ret.context = this.context;
        	return ret;
        },
        each: function( callback, args ){
        	return jQuery.each( this, callback, args );
        },
        ready: function( fn ){
        	jQuery.ready.promise().done( fn );
        	return this;
        },
        slice: function(){
        	return this.pushStack( core_slice.apply( this, arguments ) );
        },
        first: function(){
        	return this.eq(0);
        },
        last: function(){
        	return this.eq(-1);
        },
        eq: function( i ){
        	var len = this.length,
        		j = +i + ( i < 0 ? len : 0 );
        	return this.pushStack( j >= 0 && j < len ? [ this[ j ] ], []);
        },
        map:function( callback ){
        	return this.pushStack( jQuery.map( this, function( ele, i ){
        		return callback.call( elem, i, elem );
        	}))
        },
        end: function(){
        	return this.prevObject || this.constructor( null );
        },
        push: core_push,
        sort:[].sort,
        splice: [].splice;
}
//end 205 row
    
    //(其实就是jQuery.prototype);
    jQuery.fn.init.prototype = jQuery.fn;
    
     //( 285, 347 ) jQuery的extend方法
	jQuery.extend = jQuery.fn.extend = function(){
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;
		
		if( typeof target === 'boolean' ){
			deep = target;
			target = arguments[ 1 ] || {};
			i = 2;
		}
		
		if( typeof target !== "object" && jQuery.isFunction( target )){
			target = {};
		}
		
		if( length === i ){
			target = this;
			--i;
		}
		
		for( ; i < length; ++i ){
			if( ( options = arguments[ i ] ) != null ){
				for( name in options ){
					src = target[ name ];
					copy = options[ name ];
					
					if( target == copy ){
						continue;
					}
					
					if( deep && copy && ( jQuery.isPlainObject( copy ) || copyIsArray = jQuery.isArray( copy ) ) ){
						if( copyIsArray ){
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : []; 
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : [];
						}
						target[ name ] = jQuery.extend( deep, clone, copy );
					}else if( copy !== undefined){
						target[ name ] = copy;
					}
				}
			} 
		}
		return target;
	};
	
    //( 349, 817 ) 利用jQuery.extend 给构造函数绑定的静态方法;
    jQuery.extend({
    	//一个独立的随机数
    	expando: "jQuery" + ( core_version + Math.random() ).replace(/\D/g,''),
    	
    	//用来解决冲突
    	noConflict: function( deep ){
    		if( window.$ === jQuery ){
    			window.$ = _$;//如果window.$ === jQuery 把 widow.$赋值给保存的_$;
    		}
    		
    		if( deep && window.jQuery === jQuery ){
    			window.jQuery = _jQuery;
    		}
    		
    		 return jQuery;
    	},
    	
    	isReady: false,
    	readyWait: 1,
    	holdReady: function( hold ){
    		if( hold ){
    			jQuery.readyWait++;
    		}else{
    			 jQuery.ready( true );
    		}
    	},
    	
    	ready: function( wait ){
    		if( wait === true ? jQuery.readyWait-- : jQuery.isReady ){
    			return;
    		}
    		
    		jQuery.isReady = true;
    		
    		if( wait !== true && --jQuery.readyWait > 0 ){
    			return;
    		}
    		
    		readyList.resolveWith( document, [ jQuery ] );
    		
    		if( jQuery.fn.trigger ){
    			jQuery( document ).trigger('ready').off('ready');
    		}
    	},
    	
    	isFunction: function( obj ){
    		return jQuery.type( obj ) === 'function';
    	},
    	
    	isArray:Array.isArray,
    	
    	isWindow: function( obj ){
    		return obj != null && obj === obj.window; 
    	},
    	
    	isNumeric: function( obj ){
    		//不是NaN并且是介于正负无穷之间的数字
    		return !isNaN( parseFloat( obj ) ) && isFinite( obj );
    	},
    	
    	type: function( obj ){
    		if( obj == null ){
    			return String( obj );
    		}
    		
    		return typeof obj === 'object' || typeof obj === 'function' ?
    			class2type[ core_toString.call( obj ) ] || 'object':
    			typeof obj;
    	},
    	
    	isPlainObject: function( obj ){
    		if( jQuery.type( obj ) !== 'object' || obj.nodeType || jQuery.isWindow( obj ) ){
    			return false;
    		}
    		
    		try{
    			if( obj.constructor && 
    					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ){
					return false;	
				}
    		} catch( e ){
    			return false;
    		}
    		
    		return true;
    	},
    	
    	isEmptyObject: function( obj ){
    		var name;
    		for( name in obj ){
    			return false;
    		}
    		return true;
    	},
    	
    	error:function( msg ){
    		throw new Error( msg );
    	},
    	
    	parseHTML: function( data, context, keepScripts ){
    		if( !data || typeof data !== 'string' ){
    			return null;
    		}
    		
    		if( typeof context === 'boolean' ){
    			keepScripts = context;
    			context = false;
    		}
    		context = context || document;
			
			var parsed = rsingleTag.exec( data ),
				script = !keepScripts || [];
			
			if( parsed ){
				return [ context.createElement( parsed[1] ) ];
			}
			
			parsed = jQuery.buildFragment( [ data ], context, scripts );
			
			if( scripts ){
				jQuery( scripts ).remove();
			}
    		
    		return jQuery.merge( [], parsed.childNode );
    		
    	},
    	
    	parseJSON: JSON.parse,
    	
    	parseXML: function( data ){
    		var xml, tmp;
    		if( !data : typeof data !== 'string' ){
    			return null;
    		}
    		
    		try{
    			tmp = new DOMParser();
    			
    			xml = tmp.parseFromString（ data, "text/xml" );
    		} catch( e ){
    			xml = undefined;
    		}
    		
    		if( !xml || xml.getElementsByTagName( 'parsererror' ).length ){
    			jQuery.error( "Invalid XML" + data );
    		}
    		
    		return xml;
    		
    	},
    	
    	noop: function(){},
    	
    	globalEval: function( code ){
    		var script,
    			indirect = eval;
			
			code = jQuery.trim( code );
			
			if( code ) {
				if( code.indexOf( 'use strict' ) === 1 ){
					script = document.createElement( script );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				}else{
					indirect( code );
				}
			}
    	},
    	
    	camelCase: function( string ){
    		return string.replace( rmsPrefix, 'ms-' ).replace( rdashAlpha, fcamelCase );
    	},
    	
    	nodeName: function( elem, name ){
    		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    	},
    	
    	each: function( obj, callback, args ){
    		var value, 
    			i = 0, 
    			length = obj.length,
    			isArray = isArraylike( obj );
			
			if( args ){
				if( isArray ) {
					for( ; i < length; i++ ){
						value = callback.apply( obj[i], args );
						
						if( value === false ){
							break;
						}
					}
				} else {
					for( i in obj ) {
						value = callback( obj[i], args );
						
						if( value === false ){
							break;
						}
					}
				}
			}else{
				if( isArray ){
					for( ; i < length; i++ ){
						value = callback.call( obj[i], i, obj[i] );
						
						if( value === false ){
							break;
						}
					}
				}else{
					for( i in obj ){
						value = callback.call( obj[i], i, obj[i] );
						
						if( value === false ){
							break;
						}
					}
				}
			}
			return obj;	
    	},
    	
    	trim: function( text ){
    		return text == null ? '':core_trim.call( text );
    	},
    	
    	makeArray: function( arr, results ){
    		var ret = results || [];
    		
    		if( arr != null ){
    			if( isArraylike( Object( arr ) ){
    				jQuery.merge( ret, typeof arr === 'string' ? [arr] : arr );
    			} else {
    				core_push.call( ret, arr );
    			}
    		}
    		
    		return ret;
    	},
    	
    	inArray: function( elem, arr, i ){
    		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
    	},
    	
    	merge: function( first, second ){
    		var l = second.length,
    			i = first.length,
    			j = 0;
    			
			if( typeof l === 'number' ){
				for( ; j < l; j++ ){
					first[ i++ ] = second[ j ];
				}
			} else {
				while( second[j] !== undefined ){
					first[ i++ ] = second[ j ];
					j++;
				}
			}
			
			first.length = i;
			return first;
    	},
    	
    	grep: function( elems, callback, inv ){
    		var retVal,
    			ret = [],
    			i = 0,
    			length = elems.length;
    			inv = !!inv;
			
			for( ; i < length; i++ ){
				retVal = !!callback( elems[i], i );
				if( inv !== retVal ){
					ret.push( elems[i] );
				}
			}
			return ret;
    	},
    	
    	map: function( elems, callback, args ){
    		var value, 
    			i = 0,
    			length = elems.length,
    			isArray = isArraylike( elems ),
    			ret = [];
    			
			if( isArray ){
				for( ; i < length; i++ ){
					value = callback( elems[i], i, args );
					
					if( value != null ){
						ret[ ret.length ] = value;
					}
				}
			}else{
				for( i in elems ){
					value = callback( elems[i], i, args );
					
					if( value != null ){
						ret[ ret.length ] = value;
					}
				}
			}
			
			return core_concat.apply( [], ret );
    	},
    	
    	guid: 1,
    	
    	proxy: function( fn, context ){
    		var tmp, arg, proxy;
    		
    		if( typeof context === 'string' ){
    			tmp = fn[context];
    			context = fn;
    			fn = tmp;
    		}
    		
    		if( jQuery.isFunction( fn ) ){
    			return undefined;
    		}
    		
    		args = core_slice.call( arguments, 2 );
    		
    		proxy = function(){
    			return fn.apply( context || this, args.concat(core_slice.call( arguments ) ) );
    		}
    		
    		proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    		
    		return proxy;
    		
    	},
    	
    	access:function(){
    		
    	}
    
    
    	
    
    	
    });
    
	
   


    //( 877, 2845 ) jQuery的Sizzle选择引擎;

    //( 2880, 3042 ) jQuery的函数管理 观察者模式;
    jQuery.callbacks = function( options ){
    };

    // ( 3043, 3183 ) jQuery Deferred 对象,对异步的管理;

    // ( 3184, 3295 ) support 功能检测，通过功能来检测浏览器;

    // ( 3308, 3652 ) jQuery data 数据缓存和管理;

    // ( 3653, 3797 ) 熟悉的queue; 队列管理;

    // ( 3083, 4299 ) 对元素属性的操作; attr()  prop()  val()

    //( 4323, 5128 ) jQuery 事件管理系统;

    // ( 5140, 6057 ) Dom的获取和操作;

    // ( 6058, 6620 ) jQuery 对  css 样式的操作;

    //( 6621, 7854 ) jQuery 关于数据提交 和ajax 的封装;

    //( 7855, 8584 ) jQuery 运动相关;

    // ( 8585, 8792 ) jQuery offset() 位置相关;

    // ( 8797, 8799 ) jQuery.fn.size();
    jQuery.fn.size = function(){
        return this.length;
    }
    //( 8804, 8821 ) jQuery 对模块化的支持;

    //( 8825, 8827 ) jQuery对外提供的接口
    if( typeof window === 'object' && typeof window.document === 'object' ){
        window.jQuery = window.$ = jQuery;
    }

})( window );