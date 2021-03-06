//anim.js
Cold.add('anim', ['dom'], function(){

	Cold.log("anim 载入完毕。");

	var _id = Cold.dom.$E,
		_css = Cold.dom.css,
		_create = Cold.dom.create,
		_isStyle = Cold.dom.isStyle,
		_getXY = Cold.dom.getXY,
		BACK_CONST = 1.70158,
		$void = function(){},
		$time = Date.now || function(){
			return +new Date;
		};

	var Easing = {
		'linear' : function(t){
			return t;
		},
		'easeIn' : function(t){
			return t * t;
		},
		'easeOut' : function(t) {
			return ( 2 - t) * t;
		},
		'easeBoth' : function(t){
			return (t *= 2) < 1 ?
				.5 * t * t :
				.5 * (1 - (--t) * (t - 2));
		},
		'easeInStrong' : function(t){
			return t * t * t * t;
		},
		'easeOutStrong' : function(t){
			return 1 - (--t) * t * t * t;
		},
		'easeBothStrong' : function(t){
			return (t *= 2) < 1 ?
				.5 * t * t * t * t :
				.5 * (2 - (t -= 2) * t * t * t);
		},
		'elasticIn' : function(t){
			var p = .3, s = p / 4;
			if (t === 0 || t === 1) return t;
			return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
		},
		'elasticOut' : function(t){
			var p = .3, s = p / 4;
			if (t === 0 || t === 1) return t;
			return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
		},
		'elasticBoth' : function(t){
			var p = .45, s = p / 4;
			if (t === 0 || (t *= 2) === 2) return t;

			if (t < 1) {
				return -.5 * (Math.pow(2, 10 * (t -= 1)) *
					Math.sin((t - s) * (2 * Math.PI) / p));
			}
			return Math.pow(2, -10 * (t -= 1)) *
				Math.sin((t - s) * (2 * Math.PI) / p) * .5 + 1;
		},
		'backIn' : function(t){
			if (t === 1) t -= .001;
			return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
		},
		'backOut' : function(t){
			return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
		},
		'backBoth' : function(t){
			if ((t *= 2 ) < 1) {
				return .5 * (t * t * (((BACK_CONST *= (1.525)) + 1) * t - BACK_CONST));
			}
			return .5 * ((t -= 2) * t * (((BACK_CONST *= (1.525)) + 1) * t + BACK_CONST) + 2);
		},
		'bounceIn' : function(t){
			return 1 - Easing.bounceOut(1 - t);
		},
		'bounceOut' : function(t){
			var s = 7.5625, r;
			if (t < (1 / 2.75)) {
				r = s * t * t;
			}
			else if (t < (2 / 2.75)) {
				r = s * (t -= (1.5 / 2.75)) * t + .75;
			}
			else if (t < (2.5 / 2.75)) {
				r = s * (t -= (2.25 / 2.75)) * t + .9375;
			}
			else {
				r = s * (t -= (2.625 / 2.75)) * t + .984375;
			}
			return r;
		},
		'bounceBoth' : function(t){
			if (t < .5) {
				return Easing.bounceIn(t * 2) * .5;
			}
			return Easing.bounceOut(t * 2 - 1) * .5 + .5;
		}
	};

	var _color = {
		//from YUI
		re_RGB: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
		re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
		re_hex3: /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,
		
		getRGB : function(val){
			if(_color.re_hex.exec(val)) {
				val = 'rgb(' + [
					parseInt(RegExp.$1, 16),
					parseInt(RegExp.$2, 16),
					parseInt(RegExp.$3, 16)
				].join(', ') + ')';
			}
			else if(_color.re_hex3.exec(val)){
				val = 'rgb(' + [
					parseInt(RegExp.$1+RegExp.$1, 16),
					parseInt(RegExp.$2+RegExp.$2, 16),
					parseInt(RegExp.$3+RegExp.$3, 16)
				].join(', ') + ')';
			}
			return val;
		},
		isColorStyle : function(p){
			var re_color = /backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|outlineColor/i;
			return re_color.test(p);
		},
		init : function(el, p, prop){
			var from, to, frgb, trgb, re_rgb = _color.re_RGB;

			frgb = _color.getRGB(_css(el, p));
			frgb = frgb.match(re_rgb);
			from = [parseInt(frgb[1], 10), parseInt(frgb[2], 10), parseInt(frgb[3], 10)];

			trgb = _color.getRGB(prop);
			trgb = trgb.match(re_rgb);
			to = [parseInt(trgb[1], 10), parseInt(trgb[2], 10), parseInt(trgb[3], 10)];

			return [from, to];
		}
	};

	var _effect = function(){
		this.init.apply(this, arguments);
	};

	var _getTransitionName = function(){
		var name = 'transition', tempEl = _create('div'), prefixs = ['Webkit', 'Moz', 'O'];
        if (tempEl.style[name] === undefined) {
			for(var i=0; i<prefixs.length; i++){
				if(tempEl.style[name = prefixs[i] + 'Transition'] !== undefined){
					return name;
				}
			}
			return null;
        }
        return 'transition';
	};

	_effect.DefaultOption = {
		'fps'			: 25,
		'duration'		: 1000,
		'onStart'		: $void,
		'onComplete'	: $void,
		/*
		'onPause'		: $void,
		'onResume'		: $void,
		*/
		'easing'		: 'linear',
		'css3support'	: true
	};
	_effect.prototype = (function(){
		return {
			init : function(el, props, option){
				this.el = _id(el);
				this.props = props || {};
				this.from = {};
				this.to = {};
				this.unit = {};
				
				option = option || {};
				option = Cold.extend(option, _effect.DefaultOption);
				Cold.extend(this, option, true);
				//this.current = 0;
				if(this.css3support){
					if(/^(linear|easeIn|easeOut|easeInOut|cubic-bezier\(.*\))$/.test(this.easing)){
						this.transitionName = _getTransitionName();
					}
					//修复firefox对left,top等定位属性在css3 transition下,如果没有定义left等属性就没有动画效果的问题
					if(this.transitionName === 'MozTransition'){
						for(var p in this.props){
							if(/top|left|right|bottom/i.test(p) && !this.el.style[p]){
								_css(this.el, p, _css(this.el, p));
							}
						}
					}
					//记录有多少css动画效果
					if(this.transitionName){
						this.el.css3AnimNum || this.el.css3AnimNum === 1
							? this.el.css3AnimNum++
							: ( this.el.css3AnimNum = 1 );
					}
				}
			},
			initData : function(){
				this.begin = $time();
				this.end = this.begin + this.duration;
				for(var p in this.props){
					var prop = this.props[p],
						temp = Cold.isString(prop) ? prop.match(/^(-?\d*)(\.\d*)?(.*)$/) : prop;
					//Cold.log(temp);
					if(_color.isColorStyle(p)){
						var c = _color.init(this.el, p, prop);
						this.from[p] = c[0];
						this.to[p] = c[1];
					}
					else if(temp != null){
						this.from[p] = parseFloat(this.el[p] || _css(this.el, p));
						this.to[p] = temp[1] || temp;
						this.unit[p] = temp[3] || 'px';
					}
					else{
						throw 'anim init: Invalid arguments.';
					}
					//Cold.log(p+"| from: "+this.from[p] + " to: " + this.to[p]);
				}
			},
			step : function(){
				var now = $time();
				//Cold.log(this.begin + " " + now + " " + this.end);
				//Cold.log(this.duration);
				if(now < this.end){
					this.update((now - this.begin) / this.duration);
				}
				else{
					this.stop && this.stop();
					this.update(1);
					this.onComplete && this.onComplete();
				}
			},
			update : function(progress){
				for(var p in this.props){
					var pos = this.compute(this.from[p], this.to[p], progress);
					if(_isStyle(this.el, p)){
						if(p !== 'opacity' && !_color.isColorStyle(p)) pos = parseInt(pos, 10) + this.unit[p];
						//Cold.log(this.from[p] + " " + pos + " " + this.to[p]);
						_css(this.el, p, pos);
					}
					else{
						//Cold.log(this.el + " " + p + " " + pos);
						this.el[p] = pos;
					}
				}
			},
			compute : function(from, to, progress){
				var e = Easing[this.easing || 'linear'];
				if(Cold.isArray(from)){
					var r = parseInt(from[0] + (to[0] - from[0]) * e(progress), 10),
						b = parseInt(from[1] + (to[1] - from[1]) * e(progress), 10),
						g = parseInt(from[2] + (to[2] - from[2]) * e(progress), 10);
					return 'rgb('+ r +','+ b +','+ g +')';
				}
				return from + (to - from) * e(progress);
			},
			pause : function(){
				this.paused = true;
			},
			resume : function(){
				this.paused = false;
			},
			//无法使用在queue模式下
			repeat : function(){
				var oldComplete = this.onComplete;
				this.onComplete = (function(that){
					return function(){
						oldComplete && oldComplete();
						that.reset();
						that.start(false);
					};
				})(this);
			},
			reset : function(){
				this.update(0);
				this.stop();
			},
			start : function(inQueue){
				!this.transitionName && this.stop();

				var firstRun = false, f;
				inQueue = inQueue || false;
				var _uncamelize = function(str){
					return String(str).replace(/[A-Z]/g, '-$&').toLowerCase();
				};
				var f = (function(that){
					return function(){
							that.initData();
							var old = that.onComplete, next;
							that.onStart && that.onStart();

							that.onComplete = function(){
								old && old();
								if(firstRun || inQueue){
									if(that.el.queue !== null){
										next = that.el.queue.shift();
										next ? next() : ( that.el.queue = null );
									}
								}
							};
							//css3动画效果
							if(that.transitionName){
								Cold.log('css3 anim.');
								var transition = 'all '+ that.duration + 'ms ' + _uncamelize(that.easing);
								that.el.style[that.transitionName] = transition;
								setTimeout(function(){
									//设定css3 transition
									that.el.style[that.transitionName] = transition;
									//设定目标样式
									that.update(1);
								}, 0);
								//到时间后停止并回调
								setTimeout(function(){
									that.stop();
									that.onComplete && that.onComplete();
								}, that.duration);
							}
							//正常动画
							else{
								Cold.log('tandition anim.');
								that.timer = setInterval(function(){
									if(that.paused){
										that.end += that.fps;
										return;
									}
									that.step.call(that);
								}, that.fps || _effect.DefaultOption.fps);
							}
						};
				})(this);
				
				if(this.el.queue == null){
					firstRun = true;
					this.el.queue = [];
					//Cold.log('!!!');
					f();
					return this;
				}
				inQueue ? this.el.queue.push(f) : f();
				return this;
			},
			stop: function(){
				if(this.transitionName){
					if(Cold.isNumber(this.el.css3AnimNum) && --this.el.css3AnimNum === 0){ //当最后一个效果结束，去掉transition
						_css(this.el, this.transitionName, '');
					}
				}
				else{
					this.timer && clearInterval(this.timer);
					this.timer = null;
				}
			}
		};
	})();

	var _runBuilder = function(inQueue){
		inQueue = inQueue || false;
		return function(el, props, callback, duration, easing){
			var option = {};
			if(Cold.isFunction(callback) || callback === null){
				option.onComplete = callback;
				option.duration = duration;
				option.easing = easing;
			}
			else{
				option = callback;
			}
			var anim = new _effect(el, props, option);
			return anim.start(inQueue);
		};
	};

	/* run 和 queue的不同之处在于，run直接执行，queue会等到它前面的run和queue执行完了才执行 */
	var run = _runBuilder();

	/* queue在第一个出现时，效果和run一样 */
	var queue = _runBuilder(true);

	var move = function(el, toPos, callback, duration, easing){
		if(_css(el, 'position') !== 'static'){
			var anim = new _effect(el, { left:toPos[0], top:toPos[1] },{
				'duration' : duration,
				'onComplete' : callback,
				'easing' : easing
			});
			anim.start();
		}
		else{
			throw 'position is static, cant move!';
		}
	};

	var fade = function(el, to, callback, duration, easing){
		var anim = new _effect(el, { opacity : to },{
			'duration' : duration,
			'onComplete' : callback,
			'easing' : easing
		});
		return anim.start();
	};

	var fadeIn = function(el, callback, duration, easing){
		var anim = new _effect(el, { opacity : 1 },{
			'duration' : duration,
			'onComplete' : callback,
			'easing' : easing
		});
		return anim.start();
	};

	var fadeOut = function(el, callback, duration, easing){
		var anim = new _effect(el, { opacity : 0 },{
			'duration' : duration,
			'onComplete' : callback,
			'easing' : easing
		});
		return anim.start();
	};

	var slide = function(el, to, callback, duration, easing){
		var anim = new _effect(el, { height : to },{
			'duration' : duration,
			'onComplete' : callback,
			'easing' : easing
		});
		return anim.start();
	};

	var scrollTo = function(top, callback, duration, easing){
		if(Cold.isString(top)){
			top = _getXY(_id(top.match(/\s*#(.*)\s*/)[1]))['y'];
		}
		else{
			top = _getXY(top)['y'];
		}
		var handle = document.documentElement
			_ua = navigator.userAgent.toLowerCase();;
		//修复chrome对document.documentElement.scrollTop无法识别的bug
		if(/chrome/.test(_ua)){
			handle = document.body;
		}
		var anim = new _effect(handle, { scrollTop : top },{
			'duration' : Cold.isFunction(callback) ? duration : callback,
			'onComplete' : Cold.isFunction(callback) ? callback : $void,
			'easing' : easing,
			'css3support' : false
		});
		return anim.start();
	};

	return {
		run			: run,
		queue		: queue,
		move		: move,
		fade		: fade,
		fadeIn		: fadeIn,
		fadeOut		: fadeOut,
		slide		: slide,
		scrollTo	: scrollTo,
		Easing		: Easing
	};
});
