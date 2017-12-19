/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _jquery2 = _interopRequireDefault(_jquery);

var _layer = __webpack_require__(1);

var _layer2 = _interopRequireDefault(_layer);

var _jquery3 = __webpack_require__(3);

var _jquery4 = _interopRequireDefault(_jquery3);

var _popup = __webpack_require__(4);

var _popup2 = _interopRequireDefault(_popup);

var _vue = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vue\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);

function VueMiddleLayer() {}
VueMiddleLayer.install = function (Vue, options) {
  Vue.prototype.$layer = _layer2.default;
  Vue.prototype.$datepicker = _jquery4.default;
  Vue.prototype.$popup = _popup2.default;
};

exports.default = VueMiddleLayer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(2);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _layer2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**

 @Name：layer v3.1.1 Web弹层组件
 @Author：贤心
 @Site：http://layer.layui.com
 @License：MIT

 */

;!function (window, undefined) {
  "use strict";

  var isLayui = window.layui && layui.define,
      $,
      win,
      _ready = {
    getPath: function () {
      var jsPath = document.currentScript ? document.currentScript.src : function () {
        var js = document.scripts,
            last = js.length - 1,
            src;
        for (var i = last; i > 0; i--) {
          if (js[i].readyState === 'interactive') {
            src = js[i].src;
            break;
          }
        }
        return src || js[last].src;
      }();
      return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }(),

    config: {}, end: {}, minIndex: 0, minLeft: [],
    btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],

    //五种原始层模式
    type: ['dialog', 'page', 'iframe', 'loading', 'tips'],

    //获取节点的style属性值
    getStyle: function getStyle(node, name) {
      var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
      return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
    },

    //载入CSS配件
    link: function link(href, fn, cssname) {

      //未设置路径，则不主动加载css
      if (!layer.path) return;

      var head = document.getElementsByTagName("head")[0],
          link = document.createElement('link');
      if (typeof fn === 'string') cssname = fn;
      var app = (cssname || href).replace(/\.|\//g, '');
      var id = 'layuicss-' + app,
          timeout = 0;

      link.rel = 'stylesheet';
      link.href = layer.path + href;
      link.id = id;

      if (!document.getElementById(id)) {
        head.appendChild(link);
      }

      if (typeof fn !== 'function') return;

      //轮询css是否加载完毕
      (function poll() {
        if (++timeout > 8 * 1000 / 100) {
          return window.console && console.error('layer.css: Invalid');
        };
        parseInt(_ready.getStyle(document.getElementById(id), 'width')) === 1989 ? fn() : setTimeout(poll, 100);
      })();
    }
  };

  //默认内置方法。
  var layer = {
    v: '3.1.1',
    ie: function () {
      //ie版本
      var agent = navigator.userAgent.toLowerCase();
      return !!window.ActiveXObject || "ActiveXObject" in window ? (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
      : false;
    }(),
    index: window.layer && window.layer.v ? 100000 : 0,
    path: _ready.getPath,
    config: function config(options, fn) {
      options = options || {};
      layer.cache = _ready.config = $.extend({}, _ready.config, options);
      layer.path = _ready.config.path || layer.path;
      typeof options.extend === 'string' && (options.extend = [options.extend]);

      if (_ready.config.path) layer.ready();

      if (!options.extend) return this;

      isLayui ? layui.addcss('modules/layer/' + options.extend) : _ready.link('theme/' + options.extend);

      return this;
    },

    //主体CSS等待事件
    ready: function ready(callback) {
      var cssname = 'layer',
          ver = '',
          path = (isLayui ? 'modules/layer/' : 'theme/') + 'default/layer.css?v=' + layer.v + ver;
      isLayui ? layui.addcss(path, callback, cssname) : _ready.link(path, callback, cssname);
      return this;
    },

    //各种快捷引用
    alert: function alert(content, options, yes) {
      var type = typeof options === 'function';
      if (type) yes = options;
      return layer.open($.extend({
        content: content,
        yes: yes
      }, type ? {} : options));
    },

    confirm: function confirm(content, options, yes, cancel) {
      var type = typeof options === 'function';
      if (type) {
        cancel = yes;
        yes = options;
      }
      return layer.open($.extend({
        content: content,
        btn: _ready.btn,
        yes: yes,
        btn2: cancel
      }, type ? {} : options));
    },

    msg: function msg(content, options, end) {
      //最常用提示层
      var type = typeof options === 'function',
          rskin = _ready.config.skin;
      var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '') || 'layui-layer-msg';
      var anim = doms.anim.length - 1;
      if (type) end = options;
      return layer.open($.extend({
        content: content,
        time: 3000,
        shade: false,
        skin: skin,
        title: false,
        closeBtn: false,
        btn: false,
        resize: false,
        end: end
      }, type && !_ready.config.skin ? {
        skin: skin + ' layui-layer-hui',
        anim: anim
      } : function () {
        options = options || {};
        if (options.icon === -1 || options.icon === undefined && !_ready.config.skin) {
          options.skin = skin + ' ' + (options.skin || 'layui-layer-hui');
        }
        return options;
      }()));
    },

    load: function load(icon, options) {
      return layer.open($.extend({
        type: 3,
        icon: icon || 0,
        resize: false,
        shade: 0.01
      }, options));
    },

    tips: function tips(content, follow, options) {
      return layer.open($.extend({
        type: 4,
        content: [content, follow],
        closeBtn: false,
        time: 3000,
        shade: false,
        resize: false,
        fixed: false,
        maxWidth: 210
      }, options));
    }
  };

  var Class = function Class(setings) {
    var that = this;
    that.index = ++layer.index;
    that.config = $.extend({}, that.config, _ready.config, setings);
    document.body ? that.creat() : setTimeout(function () {
      that.creat();
    }, 30);
  };

  Class.pt = Class.prototype;

  //缓存常用字符
  var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
  doms.anim = ['layer-anim-00', 'layer-anim-01', 'layer-anim-02', 'layer-anim-03', 'layer-anim-04', 'layer-anim-05', 'layer-anim-06'];

  //默认配置
  Class.pt.config = {
    type: 0,
    shade: 0.3,
    fixed: true,
    move: doms[1],
    title: '&#x4FE1;&#x606F;',
    offset: 'auto',
    area: 'auto',
    closeBtn: 1,
    time: 0, //0表示不自动关闭
    zIndex: 19891014,
    maxWidth: 360,
    anim: 0,
    isOutAnim: true,
    icon: -1,
    moveType: 1,
    resize: true,
    scrollbar: true, //是否允许浏览器滚动条
    tips: 2
  };

  //容器
  Class.pt.vessel = function (conType, callback) {
    var that = this,
        times = that.index,
        config = that.config;
    var zIndex = config.zIndex + times,
        titype = _typeof(config.title) === 'object';
    var ismax = config.maxmin && (config.type === 1 || config.type === 2);
    var titleHTML = config.title ? '<div class="layui-layer-title" style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</div>' : '';

    config.zIndex = zIndex;
    callback([
    //遮罩
    config.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + times + '" times="' + times + '" style="' + ('z-index:' + (zIndex - 1) + '; ') + '"></div>' : '',

    //主体
    '<div class="' + doms[0] + (' layui-layer-' + _ready.type[config.type]) + ((config.type == 0 || config.type == 2) && !config.shade ? ' layui-layer-border' : '') + ' ' + (config.skin || '') + '" id="' + doms[0] + times + '" type="' + _ready.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? 'object' : 'string') + '" style="z-index: ' + zIndex + '; width:' + config.area[0] + ';height:' + config.area[1] + (config.fixed ? '' : ';position:absolute;') + '">' + (conType && config.type != 2 ? '' : titleHTML) + '<div id="' + (config.id || '') + '" class="layui-layer-content' + (config.type == 0 && config.icon !== -1 ? ' layui-layer-padding' : '') + (config.type == 3 ? ' layui-layer-loading' + config.icon : '') + '">' + (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + config.icon + '"></i>' : '') + (config.type == 1 && conType ? '' : config.content || '') + '</div>' + '<span class="layui-layer-setwin">' + function () {
      var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
      config.closeBtn && (closebtn += '<a class="layui-layer-ico ' + doms[7] + ' ' + doms[7] + (config.title ? config.closeBtn : config.type == 4 ? '1' : '2') + '" href="javascript:;"></a>');
      return closebtn;
    }() + '</span>' + (config.btn ? function () {
      var button = '';
      typeof config.btn === 'string' && (config.btn = [config.btn]);
      for (var i = 0, len = config.btn.length; i < len; i++) {
        button += '<a class="' + doms[6] + '' + i + '">' + config.btn[i] + '</a>';
      }
      return '<div class="' + doms[6] + ' layui-layer-btn-' + (config.btnAlign || '') + '">' + button + '</div>';
    }() : '') + (config.resize ? '<span class="layui-layer-resize"></span>' : '') + '</div>'], titleHTML, $('<div class="layui-layer-move"></div>'));
    return that;
  };

  //创建骨架
  Class.pt.creat = function () {
    var that = this,
        config = that.config,
        times = that.index,
        nodeIndex,
        content = config.content,
        conType = (typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object',
        body = $('body');

    if (config.id && $('#' + config.id)[0]) return;

    if (typeof config.area === 'string') {
      config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
    }

    //anim兼容旧版shift
    if (config.shift) {
      config.anim = config.shift;
    }

    if (layer.ie == 6) {
      config.fixed = false;
    }

    switch (config.type) {
      case 0:
        config.btn = 'btn' in config ? config.btn : _ready.btn[0];
        layer.closeAll('dialog');
        break;
      case 2:
        var content = config.content = conType ? config.content : [config.content || 'http://layer.layui.com', 'auto'];
        config.content = '<iframe scrolling="' + (config.content[1] || 'auto') + '" allowtransparency="true" id="' + doms[4] + '' + times + '" name="' + doms[4] + '' + times + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
        break;
      case 3:
        delete config.title;
        delete config.closeBtn;
        config.icon === -1 && config.icon === 0;
        layer.closeAll('loading');
        break;
      case 4:
        conType || (config.content = [config.content, 'body']);
        config.follow = config.content[1];
        config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
        delete config.title;
        config.tips = _typeof(config.tips) === 'object' ? config.tips : [config.tips, true];
        config.tipsMore || layer.closeAll('tips');
        break;
    }

    //建立容器
    that.vessel(conType, function (html, titleHTML, moveElem) {
      body.append(html[0]);
      conType ? function () {
        config.type == 2 || config.type == 4 ? function () {
          $('body').append(html[1]);
        }() : function () {
          if (!content.parents('.' + doms[0])[0]) {
            content.data('display', content.css('display')).show().addClass('layui-layer-wrap').wrap(html[1]);
            $('#' + doms[0] + times).find('.' + doms[5]).before(titleHTML);
          }
        }();
      }() : body.append(html[1]);
      $('.layui-layer-move')[0] || body.append(_ready.moveElem = moveElem);
      that.layero = $('#' + doms[0] + times);
      config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
    }).auto(times);

    //遮罩
    $('#layui-layer-shade' + that.index).css({
      'background-color': config.shade[1] || '#000',
      'opacity': config.shade[0] || config.shade
    });

    config.type == 2 && layer.ie == 6 && that.layero.find('iframe').attr('src', content[0]);

    //坐标自适应浏览器窗口尺寸
    config.type == 4 ? that.tips() : that.offset();
    if (config.fixed) {
      win.on('resize', function () {
        that.offset();
        (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
        config.type == 4 && that.tips();
      });
    }

    config.time <= 0 || setTimeout(function () {
      layer.close(that.index);
    }, config.time);
    that.move().callback();

    //为兼容jQuery3.0的css动画影响元素尺寸计算
    if (doms.anim[config.anim]) {
      var animClass = 'layer-anim ' + doms.anim[config.anim];
      that.layero.addClass(animClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass(animClass);
      });
    };

    //记录关闭动画
    if (config.isOutAnim) {
      that.layero.data('isOutAnim', true);
    }
  };

  //自适应
  Class.pt.auto = function (index) {
    var that = this,
        config = that.config,
        layero = $('#' + doms[0] + index);

    if (config.area[0] === '' && config.maxWidth > 0) {
      //为了修复IE7下一个让人难以理解的bug
      if (layer.ie && layer.ie < 8 && config.btn) {
        layero.width(layero.innerWidth());
      }
      layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
    }

    var area = [layero.innerWidth(), layero.innerHeight()],
        titHeight = layero.find(doms[1]).outerHeight() || 0,
        btnHeight = layero.find('.' + doms[6]).outerHeight() || 0,
        setHeight = function setHeight(elem) {
      elem = layero.find(elem);
      elem.height(area[1] - titHeight - btnHeight - 2 * (parseFloat(elem.css('padding-top')) | 0));
    };

    switch (config.type) {
      case 2:
        setHeight('iframe');
        break;
      default:
        if (config.area[1] === '') {
          if (config.maxHeight > 0 && layero.outerHeight() > config.maxHeight) {
            area[1] = config.maxHeight;
            setHeight('.' + doms[5]);
          } else if (config.fixed && area[1] >= win.height()) {
            area[1] = win.height();
            setHeight('.' + doms[5]);
          }
        } else {
          setHeight('.' + doms[5]);
        }
        break;
    };

    return that;
  };

  //计算坐标
  Class.pt.offset = function () {
    var that = this,
        config = that.config,
        layero = that.layero;
    var area = [layero.outerWidth(), layero.outerHeight()];
    var type = _typeof(config.offset) === 'object';
    that.offsetTop = (win.height() - area[1]) / 2;
    that.offsetLeft = (win.width() - area[0]) / 2;

    if (type) {
      that.offsetTop = config.offset[0];
      that.offsetLeft = config.offset[1] || that.offsetLeft;
    } else if (config.offset !== 'auto') {

      if (config.offset === 't') {
        //上
        that.offsetTop = 0;
      } else if (config.offset === 'r') {
        //右
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === 'b') {
        //下
        that.offsetTop = win.height() - area[1];
      } else if (config.offset === 'l') {
        //左
        that.offsetLeft = 0;
      } else if (config.offset === 'lt') {
        //左上角
        that.offsetTop = 0;
        that.offsetLeft = 0;
      } else if (config.offset === 'lb') {
        //左下角
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = 0;
      } else if (config.offset === 'rt') {
        //右上角
        that.offsetTop = 0;
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === 'rb') {
        //右下角
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = win.width() - area[0];
      } else {
        that.offsetTop = config.offset;
      }
    }

    if (!config.fixed) {
      that.offsetTop = /%$/.test(that.offsetTop) ? win.height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
      that.offsetLeft = /%$/.test(that.offsetLeft) ? win.width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
      that.offsetTop += win.scrollTop();
      that.offsetLeft += win.scrollLeft();
    }

    if (layero.attr('minLeft')) {
      that.offsetTop = win.height() - (layero.find(doms[1]).outerHeight() || 0);
      that.offsetLeft = layero.css('left');
    }

    layero.css({ top: that.offsetTop, left: that.offsetLeft });
  };

  //Tips
  Class.pt.tips = function () {
    var that = this,
        config = that.config,
        layero = that.layero;
    var layArea = [layero.outerWidth(), layero.outerHeight()],
        follow = $(config.follow);
    if (!follow[0]) follow = $('body');
    var goal = {
      width: follow.outerWidth(),
      height: follow.outerHeight(),
      top: follow.offset().top,
      left: follow.offset().left
    },
        tipsG = layero.find('.layui-layer-TipsG');

    var guide = config.tips[0];
    config.tips[1] || tipsG.remove();

    goal.autoLeft = function () {
      if (goal.left + layArea[0] - win.width() > 0) {
        goal.tipLeft = goal.left + goal.width - layArea[0];
        tipsG.css({ right: 12, left: 'auto' });
      } else {
        goal.tipLeft = goal.left;
      };
    };

    //辨别tips的方位
    goal.where = [function () {
      //上
      goal.autoLeft();
      goal.tipTop = goal.top - layArea[1] - 10;
      tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
    }, function () {
      //右
      goal.tipLeft = goal.left + goal.width + 10;
      goal.tipTop = goal.top;
      tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]);
    }, function () {
      //下
      goal.autoLeft();
      goal.tipTop = goal.top + goal.height + 10;
      tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
    }, function () {
      //左
      goal.tipLeft = goal.left - layArea[0] - 10;
      goal.tipTop = goal.top;
      tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
    }];
    goal.where[guide - 1]();

    /* 8*2为小三角形占据的空间 */
    if (guide === 1) {
      goal.top - (win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
    } else if (guide === 2) {
      win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal.where[3]();
    } else if (guide === 3) {
      goal.top - win.scrollTop() + goal.height + layArea[1] + 8 * 2 - win.height() > 0 && goal.where[0]();
    } else if (guide === 4) {
      layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]();
    }

    layero.find('.' + doms[5]).css({
      'background-color': config.tips[1],
      'padding-right': config.closeBtn ? '30px' : ''
    });
    layero.css({
      left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0),
      top: goal.tipTop - (config.fixed ? win.scrollTop() : 0)
    });
  };

  //拖拽层
  Class.pt.move = function () {
    var that = this,
        config = that.config,
        _DOC = $(document),
        layero = that.layero,
        moveElem = layero.find(config.move),
        resizeElem = layero.find('.layui-layer-resize'),
        dict = {};

    if (config.move) {
      moveElem.css('cursor', 'move');
    }

    moveElem.on('mousedown', function (e) {
      e.preventDefault();
      if (config.move) {
        dict.moveStart = true;
        dict.offset = [e.clientX - parseFloat(layero.css('left')), e.clientY - parseFloat(layero.css('top'))];
        _ready.moveElem.css('cursor', 'move').show();
      }
    });

    resizeElem.on('mousedown', function (e) {
      e.preventDefault();
      dict.resizeStart = true;
      dict.offset = [e.clientX, e.clientY];
      dict.area = [layero.outerWidth(), layero.outerHeight()];
      _ready.moveElem.css('cursor', 'se-resize').show();
    });

    _DOC.on('mousemove', function (e) {

      //拖拽移动
      if (dict.moveStart) {
        var X = e.clientX - dict.offset[0],
            Y = e.clientY - dict.offset[1],
            fixed = layero.css('position') === 'fixed';

        e.preventDefault();

        dict.stX = fixed ? 0 : win.scrollLeft();
        dict.stY = fixed ? 0 : win.scrollTop();

        //控制元素不被拖出窗口外
        if (!config.moveOut) {
          var setRig = win.width() - layero.outerWidth() + dict.stX,
              setBot = win.height() - layero.outerHeight() + dict.stY;
          X < dict.stX && (X = dict.stX);
          X > setRig && (X = setRig);
          Y < dict.stY && (Y = dict.stY);
          Y > setBot && (Y = setBot);
        }

        layero.css({
          left: X,
          top: Y
        });
      }

      //Resize
      if (config.resize && dict.resizeStart) {
        var X = e.clientX - dict.offset[0],
            Y = e.clientY - dict.offset[1];

        e.preventDefault();

        layer.style(that.index, {
          width: dict.area[0] + X,
          height: dict.area[1] + Y
        });
        dict.isResize = true;
        config.resizing && config.resizing(layero);
      }
    }).on('mouseup', function (e) {
      if (dict.moveStart) {
        delete dict.moveStart;
        _ready.moveElem.hide();
        config.moveEnd && config.moveEnd(layero);
      }
      if (dict.resizeStart) {
        delete dict.resizeStart;
        _ready.moveElem.hide();
      }
    });

    return that;
  };

  Class.pt.callback = function () {
    var that = this,
        layero = that.layero,
        config = that.config;
    that.openLayer();
    if (config.success) {
      if (config.type == 2) {
        layero.find('iframe').on('load', function () {
          config.success(layero, that.index);
        });
      } else {
        config.success(layero, that.index);
      }
    }
    layer.ie == 6 && that.IE6(layero);

    //按钮
    layero.find('.' + doms[6]).children('a').on('click', function () {
      var index = $(this).index();
      if (index === 0) {
        if (config.yes) {
          config.yes(that.index, layero);
        } else if (config['btn1']) {
          config['btn1'](that.index, layero);
        } else {
          layer.close(that.index);
        }
      } else {
        var close = config['btn' + (index + 1)] && config['btn' + (index + 1)](that.index, layero);
        close === false || layer.close(that.index);
      }
    });

    //取消
    function cancel() {
      var close = config.cancel && config.cancel(that.index, layero);
      close === false || layer.close(that.index);
    }

    //右上角关闭回调
    layero.find('.' + doms[7]).on('click', cancel);

    //点遮罩关闭
    if (config.shadeClose) {
      $('#layui-layer-shade' + that.index).on('click', function () {
        layer.close(that.index);
      });
    }

    //最小化
    layero.find('.layui-layer-min').on('click', function () {
      var min = config.min && config.min(layero);
      min === false || layer.min(that.index, config);
    });

    //全屏/还原
    layero.find('.layui-layer-max').on('click', function () {
      if ($(this).hasClass('layui-layer-maxmin')) {
        layer.restore(that.index);
        config.restore && config.restore(layero);
      } else {
        layer.full(that.index, config);
        setTimeout(function () {
          config.full && config.full(layero);
        }, 100);
      }
    });

    config.end && (_ready.end[that.index] = config.end);
  };

  //for ie6 恢复select
  _ready.reselect = function () {
    $.each($('select'), function (index, value) {
      var sthis = $(this);
      if (!sthis.parents('.' + doms[0])[0]) {
        sthis.attr('layer') == 1 && $('.' + doms[0]).length < 1 && sthis.removeAttr('layer').show();
      }
      sthis = null;
    });
  };

  Class.pt.IE6 = function (layero) {
    //隐藏select
    $('select').each(function (index, value) {
      var sthis = $(this);
      if (!sthis.parents('.' + doms[0])[0]) {
        sthis.css('display') === 'none' || sthis.attr({ 'layer': '1' }).hide();
      }
      sthis = null;
    });
  };

  //需依赖原型的对外方法
  Class.pt.openLayer = function () {
    var that = this;

    //置顶当前窗口
    layer.zIndex = that.config.zIndex;
    layer.setTop = function (layero) {
      var setZindex = function setZindex() {
        layer.zIndex++;
        layero.css('z-index', layer.zIndex + 1);
      };
      layer.zIndex = parseInt(layero[0].style.zIndex);
      layero.on('mousedown', setZindex);
      return layer.zIndex;
    };
  };

  _ready.record = function (layero) {
    var area = [layero.width(), layero.height(), layero.position().top, layero.position().left + parseFloat(layero.css('margin-left'))];
    layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
    layero.attr({ area: area });
  };

  _ready.rescollbar = function (index) {
    if (doms.html.attr('layer-full') == index) {
      if (doms.html[0].style.removeProperty) {
        doms.html[0].style.removeProperty('overflow');
      } else {
        doms.html[0].style.removeAttribute('overflow');
      }
      doms.html.removeAttr('layer-full');
    }
  };

  /** 内置成员 */

  window.layer = layer;

  //获取子iframe的DOM
  layer.getChildFrame = function (selector, index) {
    index = index || $('.' + doms[4]).attr('times');
    return $('#' + doms[0] + index).find('iframe').contents().find(selector);
  };

  //得到当前iframe层的索引，子iframe时使用
  layer.getFrameIndex = function (name) {
    return $('#' + name).parents('.' + doms[4]).attr('times');
  };

  //iframe层自适应宽高
  layer.iframeAuto = function (index) {
    if (!index) return;
    var heg = layer.getChildFrame('html', index).outerHeight();
    var layero = $('#' + doms[0] + index);
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.' + doms[6]).outerHeight() || 0;
    layero.css({ height: heg + titHeight + btnHeight });
    layero.find('iframe').css({ height: heg });
  };

  //重置iframe url
  layer.iframeSrc = function (index, url) {
    $('#' + doms[0] + index).find('iframe').attr('src', url);
  };

  //设定层的样式
  layer.style = function (index, options, limit) {
    var layero = $('#' + doms[0] + index),
        contElem = layero.find('.layui-layer-content'),
        type = layero.attr('type'),
        titHeight = layero.find(doms[1]).outerHeight() || 0,
        btnHeight = layero.find('.' + doms[6]).outerHeight() || 0,
        minLeft = layero.attr('minLeft');

    if (type === _ready.type[3] || type === _ready.type[4]) {
      return;
    }

    if (!limit) {
      if (parseFloat(options.width) <= 260) {
        options.width = 260;
      };

      if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
        options.height = 64 + titHeight + btnHeight;
      };
    }

    layero.css(options);
    btnHeight = layero.find('.' + doms[6]).outerHeight();

    if (type === _ready.type[2]) {
      layero.find('iframe').css({
        height: parseFloat(options.height) - titHeight - btnHeight
      });
    } else {
      contElem.css({
        height: parseFloat(options.height) - titHeight - btnHeight - parseFloat(contElem.css('padding-top')) - parseFloat(contElem.css('padding-bottom'))
      });
    }
  };

  //最小化
  layer.min = function (index, options) {
    var layero = $('#' + doms[0] + index),
        titHeight = layero.find(doms[1]).outerHeight() || 0,
        left = layero.attr('minLeft') || 181 * _ready.minIndex + 'px',
        position = layero.css('position');

    _ready.record(layero);

    if (_ready.minLeft[0]) {
      left = _ready.minLeft[0];
      _ready.minLeft.shift();
    }

    layero.attr('position', position);

    layer.style(index, {
      width: 180,
      height: titHeight,
      left: left,
      top: win.height() - titHeight,
      position: 'fixed',
      overflow: 'hidden'
    }, true);

    layero.find('.layui-layer-min').hide();
    layero.attr('type') === 'page' && layero.find(doms[4]).hide();
    _ready.rescollbar(index);

    if (!layero.attr('minLeft')) {
      _ready.minIndex++;
    }
    layero.attr('minLeft', left);
  };

  //还原
  layer.restore = function (index) {
    var layero = $('#' + doms[0] + index),
        area = layero.attr('area').split(',');
    var type = layero.attr('type');
    layer.style(index, {
      width: parseFloat(area[0]),
      height: parseFloat(area[1]),
      top: parseFloat(area[2]),
      left: parseFloat(area[3]),
      position: layero.attr('position'),
      overflow: 'visible'
    }, true);
    layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
    layero.find('.layui-layer-min').show();
    layero.attr('type') === 'page' && layero.find(doms[4]).show();
    _ready.rescollbar(index);
  };

  //全屏
  layer.full = function (index) {
    var layero = $('#' + doms[0] + index),
        timer;
    _ready.record(layero);
    if (!doms.html.attr('layer-full')) {
      doms.html.css('overflow', 'hidden').attr('layer-full', index);
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      var isfix = layero.css('position') === 'fixed';
      layer.style(index, {
        top: isfix ? 0 : win.scrollTop(),
        left: isfix ? 0 : win.scrollLeft(),
        width: win.width(),
        height: win.height()
      }, true);
      layero.find('.layui-layer-min').hide();
    }, 100);
  };

  //改变title
  layer.title = function (name, index) {
    var title = $('#' + doms[0] + (index || layer.index)).find(doms[1]);
    title.html(name);
  };

  //关闭layer总方法
  layer.close = function (index) {
    var layero = $('#' + doms[0] + index),
        type = layero.attr('type'),
        closeAnim = 'layer-anim-close';
    if (!layero[0]) return;
    var WRAP = 'layui-layer-wrap',
        remove = function remove() {
      if (type === _ready.type[1] && layero.attr('conType') === 'object') {
        layero.children(':not(.' + doms[5] + ')').remove();
        var wrap = layero.find('.' + WRAP);
        for (var i = 0; i < 2; i++) {
          wrap.unwrap();
        }
        wrap.css('display', wrap.data('display')).removeClass(WRAP);
      } else {
        //低版本IE 回收 iframe
        if (type === _ready.type[2]) {
          try {
            var iframe = $('#' + doms[4] + index)[0];
            iframe.contentWindow.document.write('');
            iframe.contentWindow.close();
            layero.find('.' + doms[5])[0].removeChild(iframe);
          } catch (e) {}
        }
        layero[0].innerHTML = '';
        layero.remove();
      }
      typeof _ready.end[index] === 'function' && _ready.end[index]();
      delete _ready.end[index];
    };

    if (layero.data('isOutAnim')) {
      layero.addClass('layer-anim ' + closeAnim);
    }

    $('#layui-layer-moves, #layui-layer-shade' + index).remove();
    layer.ie == 6 && _ready.reselect();
    _ready.rescollbar(index);
    if (layero.attr('minLeft')) {
      _ready.minIndex--;
      _ready.minLeft.push(layero.attr('minLeft'));
    }

    if (layer.ie && layer.ie < 10 || !layero.data('isOutAnim')) {
      remove();
    } else {
      setTimeout(function () {
        remove();
      }, 200);
    }
  };

  //关闭所有层
  layer.closeAll = function (type) {
    $.each($('.' + doms[0]), function () {
      var othis = $(this);
      var is = type ? othis.attr('type') === type : 1;
      is && layer.close(othis.attr('times'));
      is = null;
    });
  };

  /**
  
    拓展模块，layui开始合并在一起
  
   */

  var cache = layer.cache || {},
      skin = function skin(type) {
    return cache.skin ? ' ' + cache.skin + ' ' + cache.skin + '-' + type : '';
  };

  //仿系统prompt
  layer.prompt = function (options, _yes) {
    var style = '';
    options = options || {};

    if (typeof options === 'function') _yes = options;

    if (options.area) {
      var area = options.area;
      style = 'style="width: ' + area[0] + '; height: ' + area[1] + ';"';
      delete options.area;
    }
    var prompt,
        content = options.formType == 2 ? '<textarea class="layui-layer-input"' + style + '>' + (options.value || '') + '</textarea>' : function () {
      return '<input type="' + (options.formType == 1 ? 'password' : 'text') + '" class="layui-layer-input" value="' + (options.value || '') + '">';
    }();

    var _success = options.success;
    delete options.success;

    return layer.open($.extend({
      type: 1,
      btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
      content: content,
      skin: 'layui-layer-prompt' + skin('prompt'),
      maxWidth: win.width(),
      success: function success(layero) {
        prompt = layero.find('.layui-layer-input');
        prompt.focus();
        typeof _success === 'function' && _success(layero);
      },
      resize: false,
      yes: function yes(index) {
        var value = prompt.val();
        if (value === '') {
          prompt.focus();
        } else if (value.length > (options.maxlength || 500)) {
          layer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (options.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', prompt, { tips: 1 });
        } else {
          _yes && _yes(value, index, prompt);
        }
      }
    }, options));
  };

  //tab层
  layer.tab = function (options) {
    options = options || {};

    var tab = options.tab || {},
        THIS = 'layui-this',
        _success2 = options.success;

    delete options.success;

    return layer.open($.extend({
      type: 1,
      skin: 'layui-layer-tab' + skin('tab'),
      resize: false,
      title: function () {
        var len = tab.length,
            ii = 1,
            str = '';
        if (len > 0) {
          str = '<span class="' + THIS + '">' + tab[0].title + '</span>';
          for (; ii < len; ii++) {
            str += '<span>' + tab[ii].title + '</span>';
          }
        }
        return str;
      }(),
      content: '<ul class="layui-layer-tabmain">' + function () {
        var len = tab.length,
            ii = 1,
            str = '';
        if (len > 0) {
          str = '<li class="layui-layer-tabli ' + THIS + '">' + (tab[0].content || 'no content') + '</li>';
          for (; ii < len; ii++) {
            str += '<li class="layui-layer-tabli">' + (tab[ii].content || 'no  content') + '</li>';
          }
        }
        return str;
      }() + '</ul>',
      success: function success(layero) {
        var btn = layero.find('.layui-layer-title').children();
        var main = layero.find('.layui-layer-tabmain').children();
        btn.on('mousedown', function (e) {
          e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
          var othis = $(this),
              index = othis.index();
          othis.addClass(THIS).siblings().removeClass(THIS);
          main.eq(index).show().siblings().hide();
          typeof options.change === 'function' && options.change(index);
        });
        typeof _success2 === 'function' && _success2(layero);
      }
    }, options));
  };

  //相册层
  layer.photos = function (options, loop, key) {
    var dict = {};
    options = options || {};
    if (!options.photos) return;
    var type = options.photos.constructor === Object;
    var photos = type ? options.photos : {},
        data = photos.data || [];
    var start = photos.start || 0;
    dict.imgIndex = (start | 0) + 1;

    options.img = options.img || 'img';

    var _success3 = options.success;
    delete options.success;

    if (!type) {
      //页面直接获取
      var parent = $(options.photos),
          pushData = function pushData() {
        data = [];
        parent.find(options.img).each(function (index) {
          var othis = $(this);
          othis.attr('layer-index', index);
          data.push({
            alt: othis.attr('alt'),
            pid: othis.attr('layer-pid'),
            src: othis.attr('layer-src') || othis.attr('src'),
            thumb: othis.attr('src')
          });
        });
      };

      pushData();

      if (data.length === 0) return;

      loop || parent.on('click', options.img, function () {
        var othis = $(this),
            index = othis.attr('layer-index');
        layer.photos($.extend(options, {
          photos: {
            start: index,
            data: data,
            tab: options.tab
          },
          full: options.full
        }), true);
        pushData();
      });

      //不直接弹出
      if (!loop) return;
    } else if (data.length === 0) {
      return layer.msg('&#x6CA1;&#x6709;&#x56FE;&#x7247;');
    }

    //上一张
    dict.imgprev = function (key) {
      dict.imgIndex--;
      if (dict.imgIndex < 1) {
        dict.imgIndex = data.length;
      }
      dict.tabimg(key);
    };

    //下一张
    dict.imgnext = function (key, errorMsg) {
      dict.imgIndex++;
      if (dict.imgIndex > data.length) {
        dict.imgIndex = 1;
        if (errorMsg) {
          return;
        };
      }
      dict.tabimg(key);
    };

    //方向键
    dict.keyup = function (event) {
      if (!dict.end) {
        var code = event.keyCode;
        event.preventDefault();
        if (code === 37) {
          dict.imgprev(true);
        } else if (code === 39) {
          dict.imgnext(true);
        } else if (code === 27) {
          layer.close(dict.index);
        }
      }
    };

    //切换
    dict.tabimg = function (key) {
      if (data.length <= 1) return;
      photos.start = dict.imgIndex - 1;
      layer.close(dict.index);
      return layer.photos(options, true, key);
      setTimeout(function () {
        layer.photos(options, true, key);
      }, 200);
    };

    //一些动作
    dict.event = function () {
      dict.bigimg.hover(function () {
        dict.imgsee.show();
      }, function () {
        dict.imgsee.hide();
      });

      dict.bigimg.find('.layui-layer-imgprev').on('click', function (event) {
        event.preventDefault();
        dict.imgprev();
      });

      dict.bigimg.find('.layui-layer-imgnext').on('click', function (event) {
        event.preventDefault();
        dict.imgnext();
      });

      $(document).on('keyup', dict.keyup);
    };

    //图片预加载
    function loadImage(url, callback, error) {
      var img = new Image();
      img.src = url;
      if (img.complete) {
        return callback(img);
      }
      img.onload = function () {
        img.onload = null;
        callback(img);
      };
      img.onerror = function (e) {
        img.onerror = null;
        error(e);
      };
    };

    dict.loadi = layer.load(1, {
      shade: 'shade' in options ? false : 0.9,
      scrollbar: false
    });

    loadImage(data[start].src, function (img) {
      layer.close(dict.loadi);
      dict.index = layer.open($.extend({
        type: 1,
        id: 'layui-layer-photos',
        area: function () {
          var imgarea = [img.width, img.height];
          var winarea = [$(window).width() - 100, $(window).height() - 100];

          //如果 实际图片的宽或者高比 屏幕大（那么进行缩放）
          if (!options.full && (imgarea[0] > winarea[0] || imgarea[1] > winarea[1])) {
            var wh = [imgarea[0] / winarea[0], imgarea[1] / winarea[1]]; //取宽度缩放比例、高度缩放比例
            if (wh[0] > wh[1]) {
              //取缩放比例最大的进行缩放
              imgarea[0] = imgarea[0] / wh[0];
              imgarea[1] = imgarea[1] / wh[0];
            } else if (wh[0] < wh[1]) {
              imgarea[0] = imgarea[0] / wh[1];
              imgarea[1] = imgarea[1] / wh[1];
            }
          }

          return [imgarea[0] + 'px', imgarea[1] + 'px'];
        }(),
        title: false,
        shade: 0.9,
        shadeClose: true,
        closeBtn: false,
        move: '.layui-layer-phimg img',
        moveType: 1,
        scrollbar: false,
        moveOut: true,
        //anim: Math.random()*5|0,
        isOutAnim: false,
        skin: 'layui-layer-photos' + skin('photos'),
        content: '<div class="layui-layer-phimg">' + '<img src="' + data[start].src + '" alt="' + (data[start].alt || '') + '" layer-pid="' + data[start].pid + '">' + '<div class="layui-layer-imgsee">' + (data.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : '') + '<div class="layui-layer-imgbar" style="display:' + (key ? 'block' : '') + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (data[start].alt || '') + '</a><em>' + dict.imgIndex + '/' + data.length + '</em></span></div>' + '</div>' + '</div>',
        success: function success(layero, index) {
          dict.bigimg = layero.find('.layui-layer-phimg');
          dict.imgsee = layero.find('.layui-layer-imguide,.layui-layer-imgbar');
          dict.event(layero);
          options.tab && options.tab(data[start], layero);
          typeof _success3 === 'function' && _success3(layero);
        }, end: function end() {
          dict.end = true;
          $(document).off('keyup', dict.keyup);
        }
      }, options));
    }, function () {
      layer.close(dict.loadi);
      layer.msg('&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;', {
        time: 30000,
        btn: ['&#x4E0B;&#x4E00;&#x5F20;', '&#x4E0D;&#x770B;&#x4E86;'],
        yes: function yes() {
          data.length > 1 && dict.imgnext(true, true);
        }
      });
    });
  };

  //主入口
  _ready.run = function (_$) {
    $ = _$;
    win = $(window);
    doms.html = $('html');
    layer.open = function (deliver) {
      var o = new Class(deliver);
      return o.index;
    };
  };

  //加载方式
  window.layui && layui.define ?
  //layer.ready()
  layui.define('jquery', function (exports) {
    //layui加载
    layer.path = layui.cache.dir;
    _ready.run(layui.$);

    //暴露模块
    window.layer = layer;
    exports('layer', layer);
  }) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    //requirejs加载
    _ready.run(window.jQuery);
    return layer;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : function () {
    //普通script标签加载
    _ready.run(window.jQuery);
    //layer.ready();
  }();
}(window);

exports.default = layer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 @Name : jeDate v6.0.2 日期控件
 @Author: chen guojun
 @Date: 2017-11-02
 @QQ群：516754269
 @官网：http://www.jemui.com/ 或 https://github.com/singod/jeDate
 */
;(function (root, factory) {
    //amd
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        //umd
        module.exports = factory();
    } else {
        root.jeDate = factory();
    }
})(undefined, function () {
    // 验证是否引用jquery
    if (!$ || !$.fn || !$.fn.jquery) {
        alert('在引用jquery.jedate.js之前，先引用jQuery，否则无法使用 jeDate');
        return;
    }
    var jet = {},
        doc = document,
        regymdzz = "YYYY|MM|DD|hh|mm|ss|zz",
        gr = /\-/g,
        regymd = "YYYY|MM|DD|hh|mm|ss|zz".replace("|zz", ""),
        parseInt = function parseInt(n) {
        return window.parseInt(n, 10);
    },
        config = {
        skinCell: "jedateblue",
        language: {
            name: "cn",
            month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            weeks: ["日", "一", "二", "三", "四", "五", "六"],
            times: ["小时", "分钟", "秒数"],
            titText: "请选择日期时间",
            clear: "清空",
            today: "现在",
            yes: "确定",
            close: "关闭"
        },
        range: false,
        trigger: "click",
        format: "YYYY-MM-DD hh:mm:ss", //日期格式
        minDate: "1900-01-01 00:00:00", //最小日期
        maxDate: "2099-12-31 23:59:59" //最大日期
    };
    $.fn.jeDate = function (options) {
        return new _jeDate($(this), options || {});
    };
    $.extend({
        jeDate: function jeDate(elem, options) {
            return new _jeDate($(elem), options || {});
        }
    });
    jet.isObj = function (obj) {
        for (var i in obj) {
            return true;
        }
        return false;
    };
    jet.reMatch = function (str) {
        return str.match(/\w+|d+/g);
    };
    jet.docScroll = function (type) {
        type = type ? "scrollLeft" : "scrollTop";
        return document.body[type] | document.documentElement[type];
    };
    jet.docArea = function (type) {
        return document.documentElement[type ? "clientWidth" : "clientHeight"];
    };
    //判断是否闰年
    jet.isLeap = function (y) {
        return y % 100 !== 0 && y % 4 === 0 || y % 400 === 0;
    };
    //补齐数位
    jet.digit = function (num) {
        return num < 10 ? "0" + (num | 0) : num;
    };
    //判断是否为数字
    jet.isNum = function (value) {
        return (/^[+-]?\d*\.?\d*$/.test(value) ? true : false
        );
    };
    //获取本月的总天数
    jet.getDaysNum = function (y, m) {
        var num = 31;
        switch (parseInt(m)) {
            case 2:
                num = jet.isLeap(y) ? 29 : 28;break;
            case 4:case 6:case 9:case 11:
                num = 30;break;
        }
        return num;
    };
    //获取月与年
    jet.getYM = function (y, m, n) {
        var nd = new Date(y, m - 1);
        nd.setMonth(m - 1 + n);
        return {
            y: nd.getFullYear(),
            m: nd.getMonth() + 1
        };
    };
    //获取上个月
    jet.prevMonth = function (y, m, n) {
        return jet.getYM(y, m, 0 - (n || 1));
    };
    //获取下个月
    jet.nextMonth = function (y, m, n) {
        return jet.getYM(y, m, n || 1);
    };
    //转换日期格式
    jet.parse = function (ymdhms, format) {
        return format.replace(new RegExp(regymdzz, "g"), function (str, index) {
            return str == "zz" ? "00" : jet.digit(ymdhms[str]);
        });
    };
    jet.isparmat = function (format) {
        var remat = jet.reMatch(format),
            mat = regymdzz.split("|"),
            tmpArr = [];
        $.each(mat, function (m, mval) {
            $.each(remat, function (r, rval) {
                if (mval == rval) tmpArr.push(rval);
            });
        });
        return tmpArr.join("-");
    };

    jet.parseOld = function (ymd, hms, format) {
        ymd = ymd.concat(hms);
        var ymdObj = {},
            mat = regymdzz.split("|"),
            remat = jet.reMatch(format);
        $.each(ymd, function (i, val) {
            ymdObj[remat[i]] = parseInt(val);
        });
        return format.replace(new RegExp(regymdzz, "g"), function (str, index) {
            return str == "zz" ? "00" : jet.digit(ymdObj[str]);
        });
    };
    //验证日期格式
    jet.checkFormat = function (format) {
        var ymdhms = [];
        format.replace(new RegExp(regymdzz, "g"), function (str, index) {
            ymdhms.push(str);
        });
        return ymdhms.join("-");
    };
    jet.splMatch = function (str) {
        var timeArr = str.split(" ");
        return jet.reMatch(timeArr[0]);
    };
    jet.mlen = function (format) {
        var matlen = format.match(/\w+|d+/g).length,
            mathh = format.substring(0, 2) == "hh",
            lens = mathh && matlen <= 3 ? 7 : matlen;
        return lens;
    };
    //验证日期
    jet.checkDate = function (date) {
        var dateArr = jet.reMatch(date);
        if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2])) return false;
        if (dateArr[1] > 12 || dateArr[1] < 1) return false;
        if (dateArr[2] < 1 || dateArr[2] > 31) return false;
        if ((dateArr[1] == 4 || dateArr[1] == 6 || dateArr[1] == 9 || dateArr[1] == 11) && dateArr[2] > 30) return false;
        if (dateArr[1] == 2) {
            if (dateArr[2] > 29) return false;
            if ((dateArr[0] % 100 == 0 && dateArr[0] % 400 != 0 || dateArr[0] % 4 != 0) && dateArr[2] > 28) return false;
        }
        return true;
    };
    //返回日期
    function DateTime() {
        var ND = new Date(),
            that = this;
        //返回一个数值相同的新GetDateTime对象
        that.reDate = function () {
            return new DateTime();
        };
        //返回此实例的Date值
        that.GetValue = function () {
            return ND;
        };
        //获取此实例所表示日期的年份部分。
        that.GetFullYear = function () {
            return ND.getFullYear();
        };
        //获取此实例所表示日期的月份部分。
        that.GetMonth = function () {
            return ND.getMonth() + 1;
        };
        //获取此实例所表示日期的小时部分。
        that.GetHours = function () {
            return ND.getHours();
        };
        //获取此实例所表示的日期为该月中的第几天。
        that.GetDate = function () {
            return ND.getDate();
        };
        //获取此实例所表示日期的分钟部分。
        that.GetMinutes = function () {
            return ND.getMinutes();
        };
        //获取此实例所表示日期的秒部分。
        that.GetSeconds = function () {
            return ND.getSeconds();
        };
    }
    //获取返回的日期
    jet.GetDateTime = function (obj, format) {
        format = format || 'YYYY-MM-DD hh:mm:ss';
        var objVal = $.extend({ YYYY: null, MM: null, DD: null, hh: 0, mm: 0, ss: 0 }, obj),
            matArr = { YYYY: "FullYear", MM: "Month", DD: "Date", hh: "Hours", mm: "Minutes", ss: "Seconds" };

        var result = new DateTime().reDate();
        $.each(["ss", "mm", "hh", "DD", "MM", "YYYY"], function (i, mat) {
            if (!jet.isNum(parseInt(objVal[mat]))) return null;
            var reVal = result.GetValue();
            if (parseInt(objVal[mat]) || parseInt(objVal[mat]) == 0) {
                reVal["set" + matArr[mat]](result["Get" + matArr[mat]]() + (mat == "MM" ? -1 : 0) + parseInt(objVal[mat]));
            }
        });
        //获取格式化后的日期
        var reParse = jet.parse({
            YYYY: result.GetFullYear(), MM: result.GetMonth(), DD: result.GetDate(),
            hh: result.GetHours(), mm: result.GetMinutes(), ss: result.GetSeconds()
        }, format);
        return reParse;
    };

    //判断元素类型
    jet.isValHtml = function (elem) {
        return (/textarea|input/.test(elem[0].tagName.toLocaleLowerCase())
        );
    };
    jet.isBool = function (obj) {
        return obj == undefined || obj == true ? true : false;
    };
    var searandom = function searandom() {
        var str = "",
            arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        for (var i = 0; i < 8; i++) {
            str += arr[Math.round(Math.random() * (arr.length - 1))];
        }return str;
    };
    function _jeDate(elem, opts) {
        this.opts = opts;
        this.valCell = elem;
        this.format = this.opts.format;
        this.initdates();
    }
    var jedfn = _jeDate.prototype,
        jefix = "jefixed",
        matArr = jet.reMatch(regymdzz);
    jedfn.initdates = function () {
        var that = this,
            opts = that.opts,
            newDate = new Date(),
            jetrigger = opts.trigger != undefined ? opts.trigger : config.trigger,
            zIndex = opts.zIndex == undefined ? 10000 : opts.zIndex,
            isinitVal = opts.isinitVal == undefined || opts.isinitVal == false ? false : true;
        var randomCell = "#jedatebox" + searandom(),
            isShow = jet.isBool(opts.isShow);
        that.areaVal = [];
        opts.range = opts.range || config.range;
        that.fixed = jet.isBool(opts.fixed);
        var formatDate = function formatDate(cls, boxcell) {
            var dateDiv = $("<div/>", { "id": boxcell.replace(/\#/g, ""), "class": "jedatebox " + (opts.skinCell || config.skinCell) }),
                reabsfix = !isShow ? "relative" : that.fixed == true ? "absolute" : "fixed";
            dateDiv.attr("author", "chen guojun").css({ "z-index": boxcell != "#jedatebox" ? "" : zIndex, "position": reabsfix });
            if (boxcell != "#jedatebox") dateDiv.attr({ "jeformat": opts.format || config.format, "jefixed": randomCell });
            var min = config.minDate.split(" "),
                max = config.maxDate.split(" ");
            jet.minDate = (!/\-/g.test(opts.minDate) && opts.minDate != undefined ? min[0] + " " + opts.minDate : opts.minDate) || config.minDate;
            jet.maxDate = (!/\-/g.test(opts.maxDate) && opts.maxDate != undefined ? max[0] + " " + opts.maxDate : opts.maxDate) || config.maxDate;
            jet.boxelem = !isShow ? boxcell : "#jedatebox";
            that.format = !isShow ? dateDiv.attr("jeformat") : opts.format || config.format;
            var vals = that.getValue({});
            $(cls).append(dateDiv);
            that.renderHtml(vals[0].YYYY, vals[0].MM, vals[0].DD, opts, jet.boxelem);
        };
        //为开启初始化的时间设置值
        if (isinitVal && jetrigger) {
            //opts.range = undefined;
            var ndate = opts.initDate || [],
                reVal;
            if (ndate[1]) {
                var addval = jet.reMatch(jet.GetDateTime(ndate[0]));
                reVal = [{ YYYY: addval[0], MM: jet.digit(addval[1]), DD: jet.digit(addval[2]), hh: jet.digit(addval[3]), mm: jet.digit(addval[4]), ss: jet.digit(addval[5]) }];
            } else {
                reVal = that.getValue(jet.isObj(ndate[0]) ? ndate[0] : {});
            }
            that.setValue(reVal[0], opts.format || config.format);
        }
        //判断固定元素是否存在
        if (!isShow) {
            formatDate(that.valCell, randomCell);
        } else {
            //insTrigger的值为true时内部默认点击事件
            var jd = ["body", "#jedatebox"];
            if (jetrigger) {
                that.valCell.on(jetrigger, function (ev) {
                    ev.stopPropagation();
                    if ($(jd[1]).length > 0) return;
                    formatDate(jd[0], jd[1]);
                });
            } else {
                formatDate(jd[0], jd[1]);
            }
        }
    };
    jedfn.parseFormat = function (ymdhms, format) {
        return jet.parse(ymdhms, format);
    };
    //转换日期值
    jedfn.parseValue = function (fnStr, matStr) {
        var that = this,
            valArr = [],
            opts = that.opts,
            setVal = "",
            elm = $(jet.boxelem),
            formats = matStr == undefined ? $(elm.attr(jefix)).length > 0 ? elm.attr("jeformat") : that.format : matStr,
            dateStr = $.isFunction(fnStr) ? fnStr() : fnStr;
        if (dateStr != "" || dateStr.length > 0) {
            var unrange = opts.range != false,
                rangeArr = new Array(unrange ? 2 : 1);
            $.each(rangeArr, function (i) {
                var rangLen = rangeArr.length == 2,
                    ymdObj = {},
                    parmat = jet.reMatch(formats),
                    ranArr = rangLen ? dateStr.split(opts.range) : dateStr;
                if (rangLen) {
                    $.each(jet.reMatch(ranArr[i]), function (r, val) {
                        ymdObj[jet.mlen(that.format) == 7 ? parmat[r] : matArr[r]] = val;
                    });
                }
                valArr.push(that.parseFormat(rangLen ? ymdObj : ranArr, formats));
                ymdObj = {};
            });
            setVal = valArr.join(unrange ? opts.range : "");
        }
        return setVal;
    };
    //设置日期值
    jedfn.setValue = function (fnStr, matStr, bool) {
        var that = this,
            elCell = that.valCell,
            strVal;
        if (typeof fnStr == 'string' && fnStr != '' && that.opts.range == false) {
            var reVal = jet.reMatch(fnStr),
                inObj = {};
            $.each(jet.reMatch(that.format), function (r, val) {
                inObj[val] = parseInt(reVal[r]);
            });
            strVal = inObj;
        } else {
            strVal = fnStr;
        }
        var type = jet.isValHtml(elCell) ? "val" : "text",
            vals = that.parseValue(strVal, matStr);
        if (bool != false) elCell[type](vals);
        return vals;
    };
    //获取日期值
    jedfn.getValue = function (valobj) {
        var that = this,
            objCell = that.valCell,
            opts = that.opts,
            reObj,
            result = new DateTime().reDate(),
            dateY = result.GetFullYear(),
            dateM = result.GetMonth(),
            dateD = result.GetDate(),
            timeh = result.GetHours(),
            timem = result.GetMinutes(),
            times = result.GetSeconds();
        if (valobj == undefined && jet.isBool(opts.isShow)) {
            var type = jet.isValHtml(objCell) ? "val" : "text";
            reObj = objCell[type]();
        } else {
            var isValShow = jet.isBool(opts.isShow) ? that.getValue() == "" : !jet.isBool(opts.isShow),
                objarr = $.extend({ YYYY: null, MM: null, DD: null }, valobj || {}),
                ranMat = [],
                newArr = new Array(2),
                unObj = function unObj(obj) {
                return [objarr[obj] == undefined || objarr[obj] == null, objarr[obj]];
            },
                defObj = [{ YYYY: dateY, MM: dateM, DD: dateD, hh: timeh, mm: timem, ss: times, zz: '00' }, { YYYY: dateY, MM: dateM, DD: dateD, hh: timeh, mm: timem, ss: times, zz: '00' }];
            if (isValShow) {
                //目标为空值则获取当前日期时间
                $.each(newArr, function (i) {
                    var inObj = {};
                    $.each(matArr, function (r, val) {
                        inObj[val] = parseInt(unObj(val)[0] ? defObj[i][val] : unObj(val)[1]);
                    });
                    ranMat.push($.extend(defObj[i], inObj));
                });
            } else {
                var isunRange = opts.range != false,
                    initVal = that.getValue(),
                    spVal = initVal.split(opts.range),
                    reMat = jet.reMatch(that.format);
                $.each(newArr, function (i) {
                    var inObj = {},
                        reVal = isunRange ? jet.reMatch(spVal[i]) : jet.reMatch(initVal);
                    $.each(reMat, function (r, val) {
                        inObj[val] = parseInt(reVal[r]);
                    });
                    var exVal = $.extend(inObj, valobj || {});
                    ranMat.push($.extend(defObj[i], exVal));
                });
            }
            reObj = ranMat;
        }
        return reObj;
    };
    //布局控件骨架
    jedfn.renderHtml = function (ys, ms, ds, opts, boxcls) {
        var that = this,
            boxCell = $(boxcls),
            lang = opts.language || config.language,
            isrange = opts.range != false,
            isShow = jet.isBool(opts.isShow);
        var minTime = jet.minDate.replace(/\s+/g, " ").split(" "),
            maxTime = jet.maxDate.replace(/\s+/g, " ").split(" "),
            allvals = that.getValue({ YYYY: ys, MM: ms, DD: ds }),
            vals = allvals[0],
            valx = allvals[1];
        that.format = isShow ? that.format : boxCell.attr("jeformat");
        var mlens = jet.mlen(that.format),
            testhh = /\hh/.test(that.format);
        var clearTxt = lang.name == "cn" ? !isShow ? "重置" : lang.clear : !isShow ? "Reset" : lang.clear;
        var headcon = "<div class='arthead'></div><div class='artcont'></div>",
            artcont = $("<div/>", { "class": "maincont" }),
            footer = $("<div/>", { "class": "mainfoot" }),
            daycon = $("<div/>", { "class": "daybox" }).append(headcon),
            ymscon = $("<div/>", { "class": "ymsbox" }).append(headcon),
            timecon = $("<div/>", { "class": "timebox" }).append(headcon);
        artcont.append(ymscon).append(daycon).append(mlens == 1 || mlens == 2 ? "" : timecon);
        boxCell.empty().append(artcont.children().hide()).append(footer);
        var timeStr = function timeStr() {
            var emStr = '<em></em><i>:</i><em></em><i>:</i><em></em>';
            return isrange ? emStr + "<span> ~ </span>" + emStr : emStr;
        },
            btnStr = '<span class="clear">' + clearTxt + '</span><span class="today">' + lang.today + '</span><span class="setok">' + lang.yes + '</span>',
            timeDiv = $("<div/>", { "class": "timecon" }).append(timeStr()),
            btnsDiv = $("<div/>", { "class": "btnscon" }).append(btnStr);
        footer.append(timeDiv).append(btnsDiv);
        boxCell.append($("<div/>", { "class": "jedate-tips" }).hide());
        that.maincon = function (elem, is) {
            return boxCell.find(elem + " > " + (is == 0 ? ".arthead" : ".artcont"));
        };
        //设置时分秒
        if (testhh) {
            var minVal = /\s/.test(jet.minDate) ? minTime[1] : minTime[0],
                maxVal = /\s/.test(jet.maxDate) ? maxTime[1] : maxTime[0];
            var rehms = jet.reMatch(minVal),
                vehms = [vals.hh, vals.mm, vals.ss],
                hms = [];
            if (isrange) {
                if (that.getValue() == "") {
                    hms = mlens == 7 ? rehms.concat(rehms) : rehms.concat(['00', '00', '00']);
                } else {
                    hms = vehms.concat([valx.hh, valx.mm, valx.ss]);
                }
            } else {
                hms = vehms;
            }
            $.each(footer.find(".timecon em"), function (i, cls) {
                $(this).text(jet.digit(hms[i]));
            });
        } else {
            footer.find(".timecon").hide();
        }
        //根据日期格式进行对应的日期时间显示
        if (mlens == 7) {
            that.maincon(".timebox", 0).html(lang.titText);
            boxCell.find(".timebox").show();
            that.eachHms(opts, boxCell);
        } else if (mlens >= 3 && mlens <= 6) {
            that.maincon(".daybox", 0).append('<em class="yearprev yprev"></em><em class="monthprev mprev"></em><em class="monthnext mnext"></em><em class="yearnext ynext"></em>');
            boxCell.find(".daybox").show();
            that.eachDays(vals.YYYY, vals.MM, vals.DD, opts, boxCell);
            //判断日期格式中是否包含hh（时）
            if (testhh) {
                that.maincon(".timebox", 1).attr("cont", "no");
                that.maincon(".timebox", 0).html(lang.titText + '<em class="close"></em>');
                boxCell.find(".timecon").on("click", function () {
                    if (that.maincon(".timebox", 1).attr("cont") == "no") {
                        that.maincon(".timebox", 1).attr("cont", "yes");
                        boxCell.find(".ymsbox,.daybox").hide();
                        boxCell.find(".timebox").show();
                        that.eachHms(opts, boxCell);
                        that.dateOrien(boxCell, that.valCell);
                    }
                });
                that.maincon(".timebox", 0).on("click", ".close", function () {
                    that.maincon(".timebox", 1).html("").attr("cont", "no");
                    boxCell.find(".ymsbox,.timebox").hide();
                    boxCell.find(".daybox").show();
                    that.dateOrien(boxCell, that.valCell);
                });

                timeDiv.css({ "cursor": "pointer" });
            }
            //将所有子元素用一个生成的div将所有段落包裹起来
            that.maincon(".ymsbox", 0).append('<em class="yearprev yprev"></em><em class="yearnext ynext"></em><em class="close"></em>').addClass("ymfix");
            //将生成的年月插入到元素中
            that.eachYM(vals.YYYY, vals.MM, opts, boxCell, ".fixcon");
        }
        //为年月的情况下执行
        if (mlens == 1 || mlens == 2) {
            that.maincon(".ymsbox", 0).append('<em class="yearprev yprev"></em><em class="yearnext ynext"></em>');
            boxCell.find(".ymsbox").show();
            that.eachYM(vals.YYYY, vals.MM, opts, boxCell, ".jedate-cont");
        }
        //是否开启时间选择
        if (!jet.isBool(opts.isTime) || !isShow) {
            footer.find(".timecon").hide();
        }
        if (!isShow) footer.find(".today").hide();
        //绑定各个事件
        that.eventsDate(opts, boxCell);
        setTimeout(function () {
            opts.success && opts.success(boxCell);
        }, 50);
    };
    jedfn.createYMHtml = function (ys, ms, opts) {
        var year = parseInt(ys),
            month = parseInt(ms),
            headCls = this.maincon(".daybox", 0);
        var ymCls = $("<p/>").css({ "width": jet.isBool(opts.multiPane) ? '' : '50%' }),
            ymText = "<span class='ymbtn'>" + month + '\u6708 ' + year + '\u5E74</span>';
        headCls.append(ymCls.html(ymText));
        return year + "-" + month;
    };
    //循环生成年或月
    jedfn.eachYM = function (y, m, opts, boxCell, clsCell) {
        var that = this,
            yearArr = new Array(15),
            date = new Date(),
            lang = opts.language || config.language,
            ymscon = that.maincon(".ymsbox", 1),
            multiPane = jet.isBool(opts.multiPane),
            mlens = jet.mlen(that.format),
            ymarr = that.getValue({}),
            testhh = /\hh/.test(that.format),
            formatYY = mlens == 1;

        if (ymscon.find(".ymcon").length > 0) ymscon.find(".ymcon").remove();
        $.each(new Array(multiPane ? 1 : 2), function (s) {
            var retSetCls = function retSetCls(sym, gym, eym) {
                var sval = sym.replace(gr, ""),
                    gval = gym.replace(gr, ""),
                    ieval = eym.replace(gr, "");
                if (/YYYY-MM-DD/g.test(jet.isparmat(that.format))) {
                    return parseInt(sval) == parseInt(gval) ? s == 0 ? "actdate" : "" : "";
                } else {
                    if (parseInt(sval) == parseInt(gval)) {
                        if (!testhh) {
                            that.areaVal.push(sym);
                            that.areaStart = true;
                        }
                        return "actdate";
                    } else if (parseInt(sval) > parseInt(gval) && parseInt(sval) < parseInt(ieval)) {
                        return "contain";
                    } else if (parseInt(sval) == parseInt(ieval)) {
                        if (!testhh) {
                            that.areaVal.push(sym);
                            that.areaStart = true;
                        }
                        return "actdate";
                    } else {
                        return "";
                    }
                }
            };
            var ymDiv = $("<div/>", { "class": "ymcon" }).addClass(s == 1 ? "spaer" : ""),
                ymArr = [];
            $.each(formatYY ? yearArr : lang.month, function (n, val) {
                var ym = s == 1 ? y + (formatYY ? yearArr.length : 1) : y,
                    seCls;
                n = s == 1 ? formatYY ? 15 + n : 12 + n : n;
                if (formatYY) {
                    var minArr = jet.splMatch(jet.minDate),
                        maxArr = jet.splMatch(jet.maxDate),
                        minY = minArr[0],
                        maxY = maxArr[0],
                        year = ym - 7 + n,
                        getyear = that.getValue() == "" && jet.isBool(opts.isShow) ? date.getFullYear() : that.getValue();
                    //判断是否在有效期内
                    if (year < minY || year > maxY) {
                        ymArr.push({ style: "disabled", ym: year, idx: n });
                    } else {
                        seCls = retSetCls(year.toString(), getyear.toString(), ymarr[1].YYYY.toString());
                        ymArr.push({ style: seCls, ym: year, idx: n });
                    }
                } else {
                    var minArr = jet.splMatch(jet.minDate),
                        maxArr = jet.splMatch(jet.maxDate),
                        thisDate = parseInt(ym + "" + jet.digit(val) + "" + "01"),
                        minTime = parseInt(minArr[0] + "" + jet.digit(minArr[1]) + "" + jet.digit(minArr[2])),
                        maxTime = parseInt(maxArr[0] + "" + jet.digit(maxArr[1]) + "" + jet.digit(maxArr[2]));
                    //判断是否在有效期内
                    if (thisDate < minTime || thisDate > maxTime) {
                        ymArr.push({ style: "disabled", ym: ym + "-" + jet.digit(val), idx: n });
                    } else {
                        var ymVal = ym + "-" + jet.digit(val),
                            ymmVal = ymarr[0].YYYY + "-" + jet.digit(ymarr[0].MM);
                        seCls = retSetCls(ymVal, ymmVal, ymarr[1].YYYY + "-" + jet.digit(ymarr[1].MM));
                        ymArr.push({ style: seCls, ym: ym + "-" + jet.digit(val), idx: n });
                    }
                }
            });
            var table = $('<table/>', { "class": formatYY ? "yul" : "ymul" });
            //生成表格主体
            $.each(new Array(formatYY ? 5 : 4), function (i) {
                var tr = $('<tr/>');
                $.each(new Array(3), function () {
                    var td = $("<td/>");
                    table.append(tr.append(td));
                });
            });
            //为表格赋值年月
            $.each(ymArr, function (i, val) {
                table.find("td").eq(i).addClass(val.style).attr({ idx: val.idx, "je-val": val.ym }).html(val.ym);
            });
            ymscon.append(ymDiv.append(table));
        });
        var contd = ymscon.find("td"),
            ymstit = that.maincon(".ymsbox", 0),
            eqNum = formatYY ? multiPane ? 15 - 1 : 15 * 2 - 1 : multiPane ? 12 - 1 : 12 * 2 - 1,
            sval = contd.eq(0).text(),
            ieval = contd.eq(eqNum).text();
        var mnx = [formatYY ? sval : sval.substring(0, 4), formatYY ? ieval : ieval.substring(0, 4)];
        ymstit.find("p").remove();
        ymstit.append("<p>" + sval + " ~ " + ieval + "</p>").attr({ min: mnx[0], max: mnx[1] });
    };
    //初始验证正则
    jedfn.dateRegExp = function (valArr) {
        var enval = valArr.split(",") || [],
            re = "";
        var doExp = function doExp(val) {
            var arr,
                tmpEval,
                re = /#?\{(.*?)\}/;
            val = val + "";
            while ((arr = re.exec(val)) != null) {
                arr.lastIndex = arr.index + arr[1].length + arr[0].length - arr[1].length - 1;
                tmpEval = parseInt(eval(arr[1]));
                if (tmpEval < 0) tmpEval = "9700" + -tmpEval;
                val = val.substring(0, arr.index) + tmpEval + val.substring(arr.lastIndex + 1);
            }
            return val;
        };
        if (enval && enval.length > 0) {
            for (var i = 0; i < enval.length; i++) {
                re += doExp(enval[i]);
                if (i != enval.length - 1) re += "|";
            }
            re = re ? new RegExp("(?:" + re + ")") : null;
        } else {
            re = null;
        }
        //re = new RegExp((re + "").replace(/^\/\(\?:(.*)\)\/.*/, "$1"));
        return re;
    };
    //循环生成日
    jedfn.eachDays = function (ys, ms, ds, opts, boxCell) {
        var that = this,
            isShow = jet.isBool(opts.isShow);
        var year = parseInt(ys),
            month = parseInt(ms),
            objCell = that.valCell,
            lang = opts.language || config.language,
            endval = opts.valiDate || [],
            minArr = jet.reMatch(jet.minDate),
            minNum = parseInt(minArr[0] + "" + jet.digit(minArr[1]) + "" + jet.digit(minArr[2])),
            maxArr = jet.reMatch(jet.maxDate),
            maxNum = parseInt(maxArr[0] + "" + jet.digit(maxArr[1]) + "" + jet.digit(maxArr[2]));
        var multiPane = jet.isBool(opts.multiPane),
            ymdarr = that.getValue(!isShow ? { YYYY: ys, MM: ms, DD: ds } : {}),
            valrange = (objCell.val() || objCell.text()) != "" && opts.range != false,
            ymdDate = parseInt(ymdarr[0].YYYY + "" + jet.digit(ymdarr[0].MM) + "" + jet.digit(ymdarr[0].DD));
        //设置时间标注
        var setMark = function setMark(my, mm, md) {
            var Marks = opts.marks,
                contains = function contains(arr, obj) {
                var len = arr.length;
                while (len--) {
                    if (arr[len] === obj) return true;
                }
                return false;
            };
            return $.isArray(Marks) && Marks.length > 0 && contains(Marks, my + "-" + jet.digit(mm) + "-" + jet.digit(md)) ? '<i class="marks"></i>' : "";
        };
        //是否显示节日
        var isfestival = function isfestival(y, m, d) {
            var festivalStr;
            if (opts.festival == true && lang.name == "cn") {
                var lunar = that.jeLunar(y, m - 1, d),
                    feslunar = lunar.solarFestival || lunar.lunarFestival,
                    lunartext = (feslunar && lunar.jieqi) != "" ? feslunar : lunar.jieqi || lunar.showInLunar;
                festivalStr = '<p><span class="solar">' + d + '</span><span class="lunar">' + lunartext + '</span></p>';
            } else {
                festivalStr = '<p class="nolunar">' + d + '</p>';
            }
            return festivalStr;
        };
        //判断是否在限制的日期之中
        var dateLimit = function dateLimit(Y, M, D, isMonth) {
            var thatNum = parseInt(Y + "" + jet.digit(M) + "" + jet.digit(D));
            if (isMonth) {
                if (thatNum >= minNum && thatNum <= maxNum) return true;
            } else {
                if (minNum > thatNum || maxNum < thatNum) return true;
            }
        };

        var eachDays = function eachDays(yd, md) {
            var count = 0,
                daysArr = [],
                firstWeek = new Date(yd, md - 1, 1).getDay() || 7,
                daysNum = jet.getDaysNum(yd, md),
                didx = 0,
                prevM = jet.prevMonth(yd, md),
                prevDaysNum = jet.getDaysNum(yd, prevM.m),
                nextM = jet.nextMonth(yd, md);
            //上一月剩余天数
            for (var p = prevDaysNum - firstWeek + 1; p <= prevDaysNum; p++, count++) {
                var pmark = setMark(prevM.y, prevM.m, p);
                var cls = dateLimit(prevM.y, prevM.m, p, false) ? "disabled" : "other";
                daysArr.push({ style: cls, ymd: prevM.y + '-' + prevM.m + '-' + p, day: p, d: isfestival(prevM.y, prevM.m, p) + pmark, idx: didx++ });
            }
            //本月的天数
            for (var b = 1; b <= daysNum; b++, count++) {
                var bmark = setMark(yd, md, b),
                    cls = "";
                var dateval = parseInt(yd + "" + jet.digit(md) + "" + jet.digit(b)),
                    rangval = parseInt(ymdarr[1].YYYY + "" + jet.digit(ymdarr[1].MM) + "" + jet.digit(ymdarr[1].DD)),
                    parsdate = dateval > ymdDate,
                    rangdate = dateval < rangval;
                if (dateLimit(yd, md, b, true)) {
                    if (dateval == ymdDate) {
                        cls = "actdate";
                        that.areaVal.push(yd + '-' + jet.digit(md) + '-' + jet.digit(b));
                        that.areaStart = true;
                    } else if (parsdate && rangdate && valrange) {
                        cls = "contain";
                    } else if (dateval == rangval && valrange) {
                        cls = "actdate";
                        that.areaVal.push(yd + '-' + jet.digit(md) + '-' + jet.digit(b));
                        that.areaEnd = true;
                    } else {
                        cls = "";
                    }
                } else {
                    cls = "disabled";
                }
                daysArr.push({ style: cls, ymd: yd + '-' + md + '-' + b, day: b, d: isfestival(yd, md, b) + bmark, idx: didx++ });
            }
            //下一月开始天数
            for (var n = 1, nlen = 42 - count; n <= nlen; n++) {
                var nmark = setMark(nextM.y, nextM.m, n);
                var cls = dateLimit(nextM.y, nextM.m, n, false) ? "disabled" : "other";
                daysArr.push({ style: cls, ymd: nextM.y + '-' + nextM.m + '-' + n, day: n, d: isfestival(nextM.y, nextM.m, n) + nmark, idx: didx++ });
            }
            //将星期与日期拼接起来
            return daysArr;
        };
        var valdigit = function valdigit(val) {
            var spval = jet.reMatch(val),
                rearr = [];
            $.each(spval, function (i, v) {
                rearr.push(jet.digit(v));
            });
            return rearr.join("-");
        };
        var moreArr = new Array(multiPane ? 1 : 2),
            isDec = month + 1 > 12,
            ymarr = [];
        $.each(moreArr, function (d, val) {
            var table = $('<table/>', { "class": "daysul" }),
                thead = $('<thead/>'),
                tbody = $('<tbody/>'),
                t = d == 1 ? 42 : 0;
            table.append(thead).append(tbody);
            //生成表格主体
            $.each(new Array(7), function (i) {
                var tr = $('<tr/>');
                $.each(new Array(7), function () {
                    var th = $("<th/>"),
                        td = $("<td/>");
                    tr.append(i == 0 ? th : td.attr("idx", t++));
                    i == 0 ? thead.append(tr) : tbody.append(tr);
                });
            });
            var nian = isDec && d == 1 ? year + 1 : year,
                yue = isDec && d == 1 ? 1 : d == 1 ? month + 1 : month;
            var arrDay = eachDays(nian, yue);
            var moreCls = $("<div/>", { 'class': 'contlist' });
            //赋值星期
            $.each(lang.weeks, function (i, val) {
                table.find("th").eq(i).text(val);
            });
            ymarr.push(that.createYMHtml(nian, yue, opts));
            $.each(arrDay, function (i, val) {
                var clsVal = val.style;
                if (endval.length > 0 && endval[0] != "") {
                    if (/\%/g.test(endval[0])) {
                        var reval = endval[0].replace(/\%/g, "").split(","),
                            enArr = [];
                        $.each(reval, function (r, rel) {
                            enArr.push(jet.digit(parseInt(rel)));
                        });
                        var isfind = $.inArray(jet.digit(val.day), enArr) == -1;
                        clsVal = jet.isBool(endval[1]) ? isfind ? "disabled" : clsVal : isfind ? clsVal : "disabled";
                    } else {
                        var valreg = that.dateRegExp(endval[0]),
                            regday = valreg.test(jet.digit(val.day));
                        clsVal = jet.isBool(endval[1]) ? regday ? "disabled" : val.style : regday ? val.style : "disabled";
                    }
                }
                table.find("td").eq(i).addClass(clsVal).attr("je-val", valdigit(val.ymd)).html(val.d);
            });
            that.maincon(".daybox", 1).append(moreCls.append(table)).addClass(d == 1 ? "spaer" : "");
        });
        that.maincon(".daybox", 0).attr("je-ym", ymarr.join(","));
    };
    //循环生成时分秒
    jedfn.eachHms = function (opts, boxCell) {
        var that = this,
            lang = opts.language || config.language,
            multiPane = jet.isBool(opts.multiPane),
            gval = that.getValue({}),
            isVal = that.getValue() == "",
            ranges = opts.range == false,
            minTime = jet.minDate.replace(/\s+/g, " ").split(" "),
            maxTime = jet.maxDate.replace(/\s+/g, " ").split(" "),
            isymdh = /YYYY-MM-DD/g.test(jet.isparmat(that.format)) && /\hh/.test(that.format);
        var minhms = jet.reMatch(minTime[1]),
            maxhms = jet.reMatch(maxTime[1]);
        var hmsCell = that.maincon(".timebox", 1),
            clas = ["action", "disabled"],
            inputs = boxCell.find(".mainfoot .timecon em");
        //conhms = isymdh ? hmsCell.parent() : hmsCell;
        var date = new Date(),
            timeh = date.getHours(),
            timem = date.getMinutes(),
            times = date.getSeconds();
        var minVal = [gval[0].hh || timeh, gval[0].mm || timem, gval[0].ss || times],
            maxVal = [gval[1].hh || timeh, gval[1].mm || timem, gval[1].ss || times];
        if (opts.range == false && boxCell.find(".timelist").length > 0) return;
        $.each(new Array(ranges ? 1 : 2), function (m) {
            var timeList = $("<div/>", { "class": "timelist" }).css({ width: ranges ? "100%" : "50%", float: ranges ? "" : "left" }),
                timeDiv = $("<div/>", { "class": "contime" }),
                textDiv = $("<div/>", { "class": "textbox" });
            var timetxt = textDiv.append('<p>' + lang.times[0] + '</p><p>' + lang.times[1] + '</p><p>' + lang.times[2] + '</p>');

            timeList.append(timetxt);
            hmsCell.addClass(m == 1 ? "spaer" : "");
            $.each([24, 60, 60], function (i, lens) {
                var hmsCls = "",
                    tuls = $("<ul/>").attr("idx", m == 1 ? 3 + i : i),
                    textem = inputs.eq(i).text();
                for (var h = 0; h < lens; h++) {
                    var tlis = $("<li/>");
                    //判断限制时间范围的状态
                    if (opts.range != false) {
                        if (isymdh) {
                            if (m == 0) {
                                if (h >= minhms[i]) {
                                    hmsCls = h == (isVal ? minhms[i] : minVal[i]) ? clas[0] : "";
                                } else {
                                    hmsCls = clas[1];
                                }
                            } else {
                                if (h > maxhms[i]) {
                                    hmsCls = clas[1];
                                } else {
                                    hmsCls = h == (isVal ? 0 : maxVal[i]) ? clas[0] : "";
                                }
                            }
                        } else {
                            if (h >= minhms[i]) {
                                hmsCls = h == (isVal ? minhms[i] : m == 0 ? minVal[i] : maxVal[i]) ? clas[0] : "";
                            } else {
                                hmsCls = clas[1];
                            }
                        }
                    } else {
                        if (h >= minhms[i] && h <= maxhms[i]) {
                            if (textem < minhms[i]) {
                                hmsCls = h == minhms[i] ? clas[0] : "";
                            } else if (textem > maxhms[i]) {
                                hmsCls = h == maxhms[i] ? clas[0] : "";
                            } else {
                                hmsCls = h == textem ? clas[0] : "";
                            }
                        } else {
                            hmsCls = clas[1];
                        }
                    }
                    tlis.text(jet.digit(h)).addClass(hmsCls);
                    hmsCell.append(timeList.append(timeDiv.append(tuls.append(tlis))));
                }
            });
            if (multiPane == false && ranges) {
                timeList.css({ "padding-left": timeList.outerWidth() / 2 + 12, "padding-right": timeList.outerWidth() / 2 + 12 });
            }
        });
        //计算当前时分秒的位置
        that.locateScroll(hmsCell.find("ul"));
        //时分秒选择
        that.clickTime(opts, boxCell);
        var hmsTxt = [];
        $.each(minhms, function (i, val) {
            if (parseInt(val) > parseInt(maxhms[i])) {
                hmsTxt.push("不能大于最大" + lang.times[i]);
            }
        });
        if (hmsTxt.length > 0) that.tips(hmsTxt.join("<br/>"), 4.5);
    };
    //为日期绑定各类事件
    jedfn.eventsDate = function (opts, boxCell) {
        var that = this,
            multiPane = jet.isBool(opts.multiPane);
        //上下月事件
        that.clickYM(opts, boxCell);
        //点击天事件
        that.clickDays(opts, boxCell);
        //按钮事件
        that.clickBtn(opts, boxCell);
        //自适应定位,值在isShow为true的情况下有效
        if (jet.isBool(opts.isShow)) {
            var datepos = opts.position || [];
            if (datepos.length > 0) {
                boxCell.css({ "top": datepos[0], "left": datepos[1] });
            } else {
                that.dateOrien(boxCell, that.valCell);
                $(window).on("resize", function () {
                    that.dateOrien(boxCell, that.valCell);
                });
            }
        }
        //点击空白处隐藏
        $(document).on("mouseup", function (ev) {
            ev.stopPropagation();
            if (jet.boxelem == "#jedatebox") {
                var box = $(jet.boxelem);
                if (box && box.css("display") !== "none") that.dateClose();
                if ($("#jedatetipscon").length > 0) $("#jedatetipscon").remove();
                delete that.areaStart;
                delete that.areaEnd;
                that.areaVal = [];
            }
        });
        $(jet.boxelem).on("mouseup", function (ev) {
            ev.stopPropagation();
        });
    };
    //切换年月并重新生成日历
    jedfn.clickYM = function (opts, boxCell) {
        var that = this,
            ymhead = that.maincon(".ymsbox", 0),
            elemCell = that.valCell,
            yPre = ymhead.find(".yprev"),
            yNext = ymhead.find(".ynext"),
            ymdhead = that.maincon(".daybox", 0),
            isShow = jet.isBool(opts.isShow),
            ydPre = ymdhead.find(".yprev"),
            ydNext = ymdhead.find(".ynext"),
            mdPre = ymdhead.find(".mprev"),
            mdNext = ymdhead.find(".mnext"),
            mlens = jet.mlen(that.format),
            isYYMM = mlens == 2,
            isYY = mlens == 1;
        var carr = ["actdate", "contain"],
            ymDate = new Date();
        var clickYmSelected = function clickYmSelected() {
            var ulCell = that.maincon(".ymsbox", 1).find(".ymcon"),
                tdCell = ulCell.find("td");
            tdCell.on("click", function () {
                var lithis = $(this),
                    thisdate = lithis.attr("je-val");
                if (lithis.hasClass("disabled")) return;
                if (opts.range == false) {
                    tdCell.removeClass(carr[0]);
                    lithis.addClass(carr[0]);
                    that.maincon(".ymsbox", 0).attr("data-val", lithis.text());
                } else {
                    //判断是否存在选择的开始与结束日期
                    if (that.areaStart && that.areaEnd == undefined) {
                        lithis.addClass(carr[0]);
                        that.areaEnd = true;
                        //添加当前选中的到数组中
                        that.areaVal.push(thisdate);
                        //遍历元素，并在范围中查找同时着色
                        tdCell.each(function () {
                            var sefl = $(this),
                                seVals = sefl.attr("je-val").replace(gr, ""),
                                rearea = [that.areaVal[0].replace(gr, ""), that.areaVal[1].replace(gr, "")],
                                minVal = Math.min.apply(null, rearea),
                                maxVal = Math.max.apply(null, rearea);
                            if (!sefl.hasClass("other")) {
                                var contrast = parseInt(seVals) > parseInt(minVal) && parseInt(seVals) < parseInt(maxVal);
                                if (contrast) {
                                    sefl.addClass(carr[1]);
                                }
                            }
                        });
                    } else if (that.areaStart && that.areaEnd) {
                        //如果已经选择了一个范围，就清除属性
                        that.delAreaAttr();
                        tdCell.removeClass(carr[0]).removeClass(carr[1]);
                        lithis.addClass(carr[0]);
                        that.areaVal.push(thisdate);
                        that.areaStart = true;
                    }
                }
            });
        };
        if (isYYMM || isYY) {
            clickYmSelected();
            //年或年月情况下的变化
            $.each([yPre, yNext], function (ym, cls) {
                cls.on("click", function (ev) {
                    var cthat = $(this),
                        ymMonth = ymDate.getMonth() + 1,
                        ymMin = parseInt(cthat.parent().attr("min")),
                        ymMax = parseInt(cthat.parent().attr("max"));
                    var ymYear = isYY ? ym == 0 ? ymMin : ymMax : ym == 0 ? --ymMin : ++ymMax;
                    that.renderHtml(ymYear, ymMonth, null, opts, boxCell);
                    if (opts.range == false) {
                        var ymobj = isYY ? { YYYY: ymYear } : { YYYY: ymYear, MM: ymMonth };
                        var value = that.parseValue(ymobj),
                            date = {
                            YYYY: ymYear, MM: ymMonth, DD: ymDate.getDate(),
                            hh: ymDate.getHours(), mm: ymDate.getMinutes(), ss: ymDate.getSeconds()
                        };
                        if ($.isFunction(opts.toggle)) opts.toggle(elemCell, value, date);
                    }
                });
            });
        } else {
            //切换年
            $.each([ydPre, ydNext], function (y, cls) {
                cls.on("click", function (ev) {
                    ev.stopPropagation();
                    var gym = jet.reMatch($(this).parent().attr("je-ym"));
                    var year = parseInt(gym[0]),
                        month = parseInt(gym[1]),
                        pnYear = y == 0 ? --year : ++year;
                    that.renderHtml(pnYear, month, null, opts, boxCell);
                    if (opts.range == false) {
                        var gv = that.getValue({})[0];
                        var value = that.parseValue({ YYYY: pnYear, MM: month, DD: gv.DD }),
                            dateobj = {
                            YYYY: pnYear, MM: month, DD: ymDate.getDate(),
                            hh: ymDate.getHours(), mm: ymDate.getMinutes(), ss: ymDate.getSeconds()
                        };
                        if ($.isFunction(opts.toggle)) opts.toggle({ elem: elemCell, val: value, date: dateobj });
                    }
                });
            });
            //切换月
            $.each([mdPre, mdNext], function (m, cls) {
                cls.on("click", function (ev) {
                    ev.stopPropagation();
                    var gym = jet.reMatch($(this).parent().attr("je-ym"));
                    var year = parseInt(gym[0]),
                        month = parseInt(gym[1]),
                        PrevYM = jet.prevMonth(year, month),
                        NextYM = jet.nextMonth(year, month);
                    m == 0 ? that.renderHtml(PrevYM.y, PrevYM.m, null, opts, boxCell) : that.renderHtml(NextYM.y, NextYM.m, null, opts, boxCell);
                    var yearVal = m == 0 ? PrevYM.y : NextYM.y,
                        monthVal = m == 0 ? PrevYM.m : NextYM.m;
                    if (opts.range == false) {
                        var gv = that.getValue({})[0];
                        var value = that.parseValue({ YYYY: yearVal, MM: monthVal, DD: gv.DD }),
                            dateobj = {
                            YYYY: yearVal, MM: monthVal, DD: ymDate.getDate(),
                            hh: ymDate.getHours(), mm: ymDate.getMinutes(), ss: ymDate.getSeconds()
                        };
                        if ($.isFunction(opts.toggle)) opts.toggle({ elem: elemCell, val: value, date: dateobj });
                    }
                });
            });
        }
        if (mlens >= 3 && mlens <= 6) {
            that.maincon(".daybox", 0).on("click", ".ymbtn", function (ev) {
                boxCell.children(".ymsbox").show();
                boxCell.children(".daybox,.mainfoot").hide();
                if (isShow) that.dateOrien(boxCell, that.valCell);
            });
            var aloneSelym = function aloneSelym() {
                var ulCell = boxCell.find(".ymcon"),
                    tdCell = ulCell.find("td");
                tdCell.on("click", function () {
                    var sefl = $(this),
                        seval = jet.reMatch(sefl.attr("je-val"));
                    tdCell.removeClass(carr[0]);
                    sefl.addClass(carr[0]);
                    boxCell.children(".jedate-contfix").show();
                    boxCell.children(".jedate-jedatewrap").hide();
                    that.renderHtml(seval[0], seval[1], null, opts, boxCell);
                });
            };
            $.each([yPre, yNext], function (ym, cls) {
                cls.on("click", function (ev) {
                    var ymMonth = ymDate.getMonth() + 1,
                        ymMin = parseInt($(this).parent().attr("min")),
                        ymMax = parseInt($(this).parent().attr("max"));
                    var ymYear = isYY ? ym == 0 ? ymMin : ymMax : ym == 0 ? --ymMin : ++ymMax;
                    that.eachYM(ymYear, ymMonth, opts, boxCell, ".jedate-contfix");
                    aloneSelym();
                    if (isShow) that.dateOrien(boxCell, that.valCell);
                    if ($.isFunction(opts.toggle)) opts.toggle();
                });
            });
            ymhead.on("click", ".close", function (ev) {
                boxCell.children(".daybox,.mainfoot").show();
                boxCell.children(".ymsbox").hide();
                if (isShow) that.dateOrien(boxCell, that.valCell);
            });
            aloneSelym();
        }
    };
    jedfn.gethmsVal = function (boxCell) {
        var hmsArr = {};
        boxCell.find(".timecon em").each(function (i) {
            var disb = $(this).attr('disabled');
            if (disb == undefined) hmsArr[matArr[3 + i]] = $(this).text();
        });
        return hmsArr;
    };
    //绑定天的事件
    jedfn.clickDays = function (opts, boxCell) {
        var that = this,
            elemCell = that.valCell,
            valStr = "je-val",
            ulCls = boxCell.find(".daysul"),
            tdCls = ulCls.find("td"),
            lang = opts.language || config.language,
            carr = ["actdate", "contain"];

        //点击绑定日期事件
        tdCls.on("click", function (ev) {
            var lithis = $(this),
                thisdate = lithis.attr(valStr),
                ymdArr = jet.reMatch(thisdate),
                dayArr = [];
            if (lithis.hasClass("disabled")) return;
            ev.stopPropagation();
            //单独选择
            var aloneSelected = function aloneSelected() {
                $.each(ymdArr, function (i, val) {
                    dayArr.push(parseInt(val));
                });
                if ($(boxCell.attr(jefix)).length > 0) {
                    that.renderHtml(dayArr[0], dayArr[1], dayArr[2], opts, boxCell);
                } else {
                    //判断是否为点击后关闭弹层
                    if (jet.isBool(opts.onClose)) {
                        tdCls.removeClass(carr[0]);
                        lithis.addClass(carr[0]);
                    } else {
                        var ymdObj = {},
                            spval = jet.reMatch(lithis.attr(valStr));
                        //获取时分秒的集合
                        $.each(spval, function (i, val) {
                            ymdObj[matArr[i]] = val;
                        });
                        var objs = /\hh/.test(that.format) ? $.extend(ymdObj, that.gethmsVal(boxCell)) : ymdObj;
                        var vals = that.setValue(objs);
                        that.dateClose();
                        if ($.isFunction(opts.okfun) || opts.okfun != null) {
                            opts.okfun && opts.okfun({ elem: elemCell, val: vals, date: objs });
                        }
                    }
                }
            };
            //区域选择
            var areaSelected = function areaSelected() {
                //判断是否只选中一个
                if (that.areaStart && that.areaEnd == undefined) {
                    lithis.addClass(carr[0]);
                    that.areaEnd = true;
                    //添加当前选中的到数组中
                    that.areaVal.push(thisdate);
                    //遍历元素，并在范围中查找同时着色
                    tdCls.each(function () {
                        var sefl = $(this),
                            seVals = sefl.attr("je-val").replace(gr, ""),
                            rearea = [that.areaVal[0].replace(gr, ""), that.areaVal[1].replace(gr, "")],
                            minVal = Math.min.apply(null, rearea),
                            maxVal = Math.max.apply(null, rearea);
                        if (!sefl.hasClass("other") && !sefl.hasClass("disabled")) {
                            var contrast = parseInt(seVals) > parseInt(minVal) && parseInt(seVals) < parseInt(maxVal);
                            if (contrast) {
                                sefl.addClass(carr[1]);
                            }
                        }
                    });
                } else if (that.areaStart && that.areaEnd) {
                    //如果已经选择了一个范围，就清除属性
                    that.delAreaAttr();
                    tdCls.removeClass(carr[0]).removeClass(carr[1]);
                    lithis.addClass(carr[0]);
                    that.areaVal.push(thisdate);
                    that.areaStart = true;
                }
            };
            //判断是否要进行日期区域选择
            opts.range == false ? aloneSelected() : areaSelected();
        });
        if (opts.festival && lang.name == "cn") {
            boxCell.addClass("grid");
            //鼠标进入提示框出现
            tdCls.on("mouseover", function () {
                if ($("#jedatetipscon").length > 0) $("#jedatetipscon").remove();
                var _this = $(this),
                    atlunar = jet.reMatch(_this.attr(valStr)),
                    tipDiv = $("<div/>", { "id": "jedatetipscon", "class": "jedatetipscon" }),
                    lunar = that.jeLunar(parseInt(atlunar[0]), parseInt(atlunar[1]) - 1, parseInt(atlunar[2]));
                var tiphtml = '<p>' + lunar.solarYear + '\u5E74' + lunar.solarMonth + '\u6708' + lunar.solarDate + '\u65E5 ' + lunar.inWeekDays + '</p><p class="red">\u519C\u5386\uFF1A' + lunar.shengxiao + '\u5E74 ' + lunar.lnongMonth + '\u6708' + lunar.lnongDate + '</p><p>' + lunar.ganzhiYear + '\u5E74 ' + lunar.ganzhiMonth + '\u6708 ' + lunar.ganzhiDate + '\u65E5</p>';
                var Fesjieri = (lunar.solarFestival || lunar.lunarFestival) != "" ? '<p class="red">' + ('\u8282\u65E5\uFF1A' + lunar.solarFestival + lunar.lunarFestival) + '</p>' : "";
                var Fesjieqi = lunar.jieqi != "" ? '<p class="red">' + (lunar.jieqi != "" ? '\u8282\u6C14\uFF1A' + lunar.jieqi : "") + '</p>' : "";
                var tiptext = (lunar.solarFestival || lunar.lunarFestival || lunar.jieqi) != "" ? Fesjieri + Fesjieqi : "";
                //生成提示框到文档中
                $("body").append(tipDiv);
                tipDiv.html(tiphtml + tiptext);
                //获取并设置农历提示框出现的位置
                var tipPos = jedfn.lunarOrien(tipDiv, _this);
                tipDiv.css({ "z-index": opts.zIndex == undefined ? 10000 + 5 : opts.zIndex + 5, top: tipPos.top, left: tipPos.left, position: "absolute", display: "block" });
            }).on("mouseout", function () {
                //鼠标移除提示框消失
                $("#jedatetipscon").remove();
            });
        }
    };
    jedfn.clickBtn = function (opts, boxCell) {
        var that = this,
            elemCell = that.valCell,
            isShow = jet.isBool(opts.isShow),
            ishhmat = jet.mlen(that.format) == 7,
            multiPane = jet.isBool(opts.multiPane),
            isYYMM = jet.mlen(that.format) == 2,
            isYY = jet.mlen(that.format) == 1;
        //清空按钮清空日期时间
        boxCell.on("click", ".clear", function (ev) {
            ev.stopPropagation();
            if (isShow) {
                var type = jet.isValHtml(that.valCell) ? "val" : "text",
                    gtval = that.valCell[type](),
                    clearVal = that.setValue("");
                that.dateClose();
                if (gtval != "") {
                    if (jet.isBool(opts.clearRestore)) {
                        jet.minDate = opts.startMin || jet.minDate;
                        jet.maxDate = opts.startMax || jet.maxDate;
                    }
                    if ($.isFunction(opts.clearfun) || opts.clearfun != null) opts.clearfun({ elem: elemCell, val: clearVal });
                }
            } else {
                var cdate = that.getValue({});
                that.renderHtml(cdate[0].YYYY, cdate[0].MM, cdate[0].DD, opts, boxCell);
            }
            if (opts.range != false) that.delAreaAttr();
        });
        //今天（现在）按钮设置日期时间
        if (opts.range != false) boxCell.find(".today").hide();
        boxCell.on("click", ".today", function () {
            var xDate = new Date(),
                objVal = {
                YYYY: xDate.getFullYear(), MM: jet.digit(xDate.getMonth() + 1), DD: jet.digit(xDate.getDate()),
                hh: jet.digit(xDate.getHours()), mm: jet.digit(xDate.getMinutes()), ss: jet.digit(xDate.getSeconds())
            };
            var thisdate = that.setValue(objVal);
            that.dateClose();
            if ($.isFunction(opts.okfun) || opts.okfun != null) opts.okfun({ elem: elemCell, val: thisdate, date: objVal });
        });
        //确认按钮设置日期时间
        boxCell.on("click", ".setok", function (ev) {
            ev.stopPropagation();
            var sDate = new Date(),
                okVal,
                valdate,
                objVal;
            if (opts.range == false) {
                var hmsVal = that.gethmsVal(boxCell),
                    dateVal = function dateVal() {
                    var ymdObj = {},
                        ymday = isYYMM || isYY ? ".ymcon" : ".daysul",
                        spval = jet.reMatch(boxCell.find(ymday).find("td.actdate").attr("je-val"));
                    $.each(spval, function (i, val) {
                        ymdObj[matArr[i]] = val;
                    });
                    var objVal = /\hh/.test(that.format) ? $.extend(ymdObj, hmsVal) : ymdObj;
                    return objVal;
                };
                okVal = ishhmat ? hmsVal : dateVal();
            } else {
                var newobj = {},
                    newarea = [],
                    hmsArr = [[], []];
                boxCell.find(".timecon em").each(function (i) {
                    var disab = $(this).attr('disabled');
                    if (disab == undefined) {
                        hmsArr[i > 2 ? 1 : 0].push($(this).text());
                    }
                });
                if (jet.mlen(that.format) == 7) {
                    if (opts.range != false) {
                        $.each(hmsArr, function (i, val) {
                            var group = val.join("");
                            newobj[group] = val.join(":");
                            newarea.push(group);
                        });
                    }
                } else {
                    $.each(that.areaVal, function (n, val) {
                        var group = val + (/\hh/.test(that.format) ? " " + hmsArr[n].join(":") : "");
                        var repgroup = group.replace(/\s|-|:/g, "");
                        newobj[repgroup] = group;
                        newarea.push(repgroup);
                    });
                }
                var minVal = Math.min.apply(null, newarea),
                    maxVal = Math.max.apply(null, newarea);
                okVal = newobj[minVal] + opts.range + newobj[maxVal];
            }
            if (isShow) {
                valdate = that.setValue(okVal);
                that.dateClose();
            } else {
                valdate = that.setValue(okVal, that.format, false);
            }
            if (opts.range == false) {
                objVal = {
                    YYYY: okVal.YYYY || sDate.getFullYear(), MM: jet.digit(okVal.MM || sDate.getMonth() + 1),
                    DD: jet.digit(okVal.DD || sDate.getDate()), hh: jet.digit(okVal.hh || sDate.getHours()),
                    mm: jet.digit(okVal.mm || sDate.getMinutes()), ss: jet.digit(okVal.ss || sDate.getSeconds())
                };
            } else {
                var rans = that.setValue(okVal, that.format, false),
                    objVal = [];
                $.each(new Array(2), function (i, v) {
                    var tmpval = {},
                        spra = jet.reMatch(rans.split(opts.range)[i]);
                    $.each(jet.reMatch(that.format), function (r, val) {
                        tmpval[val] = spra[r];
                    });
                    objVal.push(tmpval);
                });
            }
            if ($.isFunction(opts.okfun) || opts.okfun != null) opts.okfun({ elem: elemCell, val: valdate, date: objVal });
        });
    };
    jedfn.clickTime = function (opts, boxCell) {
        var that = this;
        if (/\hh/.test(that.format)) {
            var timeUl = that.maincon(".timebox", 1).find("ul");
            timeUl.on("click", "li", function () {
                var lithis = $(this);
                var ulidx = lithis.parent().attr("idx"),
                    hmsval = lithis.text();
                if (lithis.hasClass("disabled")) return;
                lithis.addClass('action').siblings().removeClass('action');
                boxCell.find(".timecon em").eq(ulidx).text(hmsval);
                //计算当前时分秒的位置
                that.locateScroll(timeUl);
            });
        }
    };
    //计算当前选中的滚动条位置
    jedfn.locateScroll = function (cell) {
        $.each(cell, function () {
            var hmsCls = $(this),
                achmsCls = hmsCls.find(".action");
            var acNUm = achmsCls.length > 0 ? achmsCls[0].offsetTop - 114 : 0;
            hmsCls[0].scrollTop = acNUm;
        });
    };
    //农历方位辨别
    jedfn.lunarOrien = function (obj, self, pos) {
        var tops,
            leris,
            ortop,
            orleri,
            rect = self[0].getBoundingClientRect();
        leris = rect.right + obj[0].offsetWidth / 1.5 >= jet.docArea(1) ? rect.right - obj[0].offsetWidth : rect.left + (pos ? 0 : jet.docScroll(1));
        tops = rect.bottom + obj[0].offsetHeight / 1 <= jet.docArea() ? rect.bottom - 1 : rect.top > obj[0].offsetHeight / 1.5 ? rect.top - obj[0].offsetHeight - 1 : jet.docArea() - obj[0].offsetHeight;
        ortop = Math.max(tops + (pos ? 0 : jet.docScroll()) + 1, 1) + "px", orleri = leris + "px";
        return { top: ortop, left: orleri };
    };
    //辨别控件的方位
    jedfn.dateOrien = function (boxCls, valCls, pos) {
        var that = this,
            tops,
            leris,
            ortop,
            orleri,
            rect = that.fixed ? valCls[0].getBoundingClientRect() : boxCls[0].getBoundingClientRect(),
            leris = rect.left,
            tops = rect.bottom;
        if (that.fixed) {
            var boxW = boxCls.outerWidth(),
                boxH = boxCls.outerHeight();
            //如果右侧超出边界
            if (leris + boxW > jet.docArea(true)) {
                leris = jet.docArea(true) - boxW;
            }
            //如果底部超出边界
            if (tops + boxH > jet.docArea()) {
                tops = rect.top > boxH ? rect.top - boxH - 2 : jet.docArea() - boxH - 1;
            }
            //根据目标元素计算弹层位置
            ortop = Math.max(tops + (pos ? 0 : jet.docScroll()) + 1, 1) + "px", orleri = leris + "px";
        } else {
            //弹层位置位于页面上下左右居中
            ortop = "50%", orleri = "50%";
            boxCls.css({ "margin-top": -(rect.height / 2), "margin-left": -(rect.width / 2) });
        }
        boxCls.css({ "top": ortop, "left": orleri });
    };
    jedfn.tips = function (text, time) {
        var that = this,
            tipCls = $(jet.boxelem).find(".jedate-tips");
        tipCls.html("").html(text || "").show();
        clearTimeout(that.tipTime);
        that.tipTime = setTimeout(function () {
            tipCls.html("").hide();
        }, (time || 2.5) * 1000);
    };
    //关闭层
    jedfn.dateClose = function () {
        if ($($(jet.boxelem).attr(jefix)).length == 0) $(jet.boxelem).remove();
    };
    //日期大小比较
    jedfn.dateContrast = function (ac, bc) {
        var sarr = ac.split("-"),
            earr = bc.split("-"),
            start = parseInt(sarr[0] + "" + jet.digit(parseInt(sarr[1]) - 1) + "" + jet.digit(sarr[2] || "01")),
            end = parseInt(earr[0] + "" + jet.digit(parseInt(earr[1]) - 1) + "" + jet.digit(sarr[2] || "01"));
        return start >= end ? false : true;
    };
    //删除区域属性
    jedfn.delAreaAttr = function () {
        delete this.areaStart;
        delete this.areaEnd;
        this.areaVal = [];
    };
    //农历数据
    jedfn.jeLunar = function (ly, lm, ld) {
        var lunarInfo = [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42448, 83315, 21200, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46496, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448],
            sTermInfo = [0, 21208, 43467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
        var Gan = "甲乙丙丁戊己庚辛壬癸",
            Zhi = "子丑寅卯辰巳午未申酉戌亥",
            Animals = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
        var solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
        var nStr1 = "日一二三四五六七八九十",
            nStr2 = "初十廿卅",
            nStr3 = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"],
            sFtv1 = {
            "0101": "*1元旦节", "0202": "湿地日",
            "0214": "情人节", "0308": "妇女节",
            "0312": "植树节", "0315": "消费者权益日",
            "0401": "愚人节", "0422": "地球日",
            "0501": "*1劳动节", "0504": "青年节",
            "0512": "护士节", "0518": "博物馆日",
            "0520": "母亲节", "0601": "儿童节",
            "0623": "奥林匹克日", "0630": "父亲节",
            "0701": "建党节", "0801": "建军节",
            "0903": "抗战胜利日", "0910": "教师节",
            "1001": "*3国庆节", "1201": "艾滋病日",
            "1224": "平安夜", "1225": "圣诞节"
        },
            sFtv2 = {
            "0100": "除夕", "0101": "*2春节",
            "0115": "元宵节", "0505": "*1端午节",
            "0707": "七夕节", "0715": "中元节",
            "0815": "*1中秋节", "0909": "*1重阳节",
            "1015": "下元节", "1208": "腊八节",
            "1223": "小年"

        };
        function flunar(Y) {
            var sTerm = function sTerm(j, i) {
                var h = new Date(31556925974.7 * (j - 1900) + sTermInfo[i] * 60000 + Date.UTC(1900, 0, 6, 2, 5));
                return h.getUTCDate();
            },
                d = function d(k) {
                var h,
                    j = 348;
                for (h = 32768; h > 8; h >>= 1) {
                    j += lunarInfo[k - 1900] & h ? 1 : 0;
                }
                return j + b(k);
            },
                ymdCyl = function ymdCyl(h) {
                return Gan.charAt(h % 10) + Zhi.charAt(h % 12);
            },
                b = function b(h) {
                var islp = g(h) ? lunarInfo[h - 1900] & 65536 ? 30 : 29 : 0;
                return islp;
            },
                g = function g(h) {
                return lunarInfo[h - 1900] & 15;
            },
                e = function e(i, h) {
                return lunarInfo[i - 1900] & 65536 >> h ? 30 : 29;
            },
                newymd = function newymd(m) {
                var k,
                    j = 0,
                    h = 0,
                    l = new Date(1900, 0, 31),
                    n = (m - l) / 86400000;
                this.dayCyl = n + 40;
                this.monCyl = 14;
                for (k = 1900; k < 2050 && n > 0; k++) {
                    h = d(k);n -= h;
                    this.monCyl += 12;
                }
                if (n < 0) {
                    n += h;k--;
                    this.monCyl -= 12;
                }
                this.year = k;
                this.yearCyl = k - 1864;
                j = g(k);
                this.isLeap = false;
                for (k = 1; k < 13 && n > 0; k++) {
                    if (j > 0 && k == j + 1 && this.isLeap == false) {
                        --k;
                        this.isLeap = true;
                        h = b(this.year);
                    } else {
                        h = e(this.year, k);
                    }
                    if (this.isLeap == true && k == j + 1) {
                        this.isLeap = false;
                    }
                    n -= h;
                    if (this.isLeap == false) this.monCyl++;
                }
                if (n == 0 && j > 0 && k == j + 1) {
                    if (this.isLeap) {
                        this.isLeap = false;
                    } else {
                        this.isLeap = true;
                        --k;
                        --this.monCyl;
                    }
                }
                if (n < 0) {
                    n += h;--k;
                    --this.monCyl;
                }
                this.month = k;
                this.day = n + 1;
            },
                digit = function digit(num) {
                return num < 10 ? "0" + (num | 0) : num;
            },
                reymd = function reymd(i, j) {
                var h = i;
                return j.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g, function (k) {
                    switch (k) {
                        case "yyyy":
                            var l = "000" + h.getFullYear();
                            return l.substring(l.length - 4);
                        case "dd":
                            return digit(h.getDate());
                        case "d":
                            return h.getDate().toString();
                        case "MM":
                            return digit(h.getMonth() + 1);
                        case "M":
                            return h.getMonth() + 1;
                    }
                });
            },
                lunarMD = function lunarMD(i, h) {
                var j;
                switch (i, h) {
                    case 10:
                        j = "初十";break;
                    case 20:
                        j = "二十";break;
                    case 30:
                        j = "三十";break;
                    default:
                        j = nStr2.charAt(Math.floor(h / 10));
                        j += nStr1.charAt(h % 10);
                }
                return j;
            };
            this.isToday = false;
            this.isRestDay = false;
            this.solarYear = reymd(Y, "yyyy");
            this.solarMonth = reymd(Y, "M");
            this.solarDate = reymd(Y, "d");
            this.solarWeekDay = Y.getDay();
            this.inWeekDays = "星期" + nStr1.charAt(this.solarWeekDay);
            var X = new newymd(Y);
            this.lunarYear = X.year;
            this.shengxiao = Animals.charAt((this.lunarYear - 4) % 12);
            this.lunarMonth = X.month;
            this.lunarIsLeapMonth = X.isLeap;
            this.lnongMonth = this.lunarIsLeapMonth ? "闰" + nStr3[X.month - 1] : nStr3[X.month - 1];
            this.lunarDate = X.day;
            this.showInLunar = this.lnongDate = lunarMD(this.lunarMonth, this.lunarDate);
            if (this.lunarDate == 1) {
                this.showInLunar = this.lnongMonth + "月";
            }
            this.ganzhiYear = ymdCyl(X.yearCyl);
            this.ganzhiMonth = ymdCyl(X.monCyl);
            this.ganzhiDate = ymdCyl(X.dayCyl++);
            this.jieqi = "";
            this.restDays = 0;
            if (sTerm(this.solarYear, (this.solarMonth - 1) * 2) == reymd(Y, "d")) {
                this.showInLunar = this.jieqi = solarTerm[(this.solarMonth - 1) * 2];
            }
            if (sTerm(this.solarYear, (this.solarMonth - 1) * 2 + 1) == reymd(Y, "d")) {
                this.showInLunar = this.jieqi = solarTerm[(this.solarMonth - 1) * 2 + 1];
            }
            if (this.showInLunar == "清明") {
                this.showInLunar = "清明节";
                this.restDays = 1;
            }
            this.solarFestival = sFtv1[reymd(Y, "MM") + reymd(Y, "dd")];
            if (typeof this.solarFestival == "undefined") {
                this.solarFestival = "";
            } else {
                if (/\*(\d)/.test(this.solarFestival)) {
                    this.restDays = parseInt(RegExp.$1);
                    this.solarFestival = this.solarFestival.replace(/\*\d/, "");
                }
            }
            this.showInLunar = this.solarFestival == "" ? this.showInLunar : this.solarFestival;
            this.lunarFestival = sFtv2[this.lunarIsLeapMonth ? "00" : digit(this.lunarMonth) + digit(this.lunarDate)];
            if (typeof this.lunarFestival == "undefined") {
                this.lunarFestival = "";
            } else {
                if (/\*(\d)/.test(this.lunarFestival)) {
                    this.restDays = this.restDays > parseInt(RegExp.$1) ? this.restDays : parseInt(RegExp.$1);
                    this.lunarFestival = this.lunarFestival.replace(/\*\d/, "");
                }
            }
            if (this.lunarMonth == 12 && this.lunarDate == e(this.lunarYear, 12)) {
                this.lunarFestival = sFtv2["0100"];
                this.restDays = 1;
            }
            this.showInLunar = this.lunarFestival == "" ? this.showInLunar : this.lunarFestival;
        }
        return new flunar(new Date(ly, lm, ld));
    };
    //日期控件版本
    $.dateVer = "6.0.2";
    //返回指定日期
    $.nowDate = function (str, format) {
        format = format || 'YYYY-MM-DD hh:mm:ss';
        if (typeof str === 'number') {
            str = { DD: str };
        }
        return jet.GetDateTime(str, format);
    };
    //日期时间戳相互转换
    $.timeStampDate = function (date, format) {
        format = format || 'YYYY-MM-DD hh:mm:ss';
        var dateTest = /^(-)?\d{1,10}$/.test(date) || /^(-)?\d{1,13}$/.test(date);
        if (/^[1-9]*[1-9][0-9]*$/.test(date) && dateTest) {
            var vdate = parseInt(date);
            if (/^(-)?\d{1,10}$/.test(vdate)) {
                vdate = vdate * 1000;
            } else if (/^(-)?\d{1,13}$/.test(vdate)) {
                vdate = vdate * 1000;
            } else if (/^(-)?\d{1,14}$/.test(vdate)) {
                vdate = vdate * 100;
            } else {
                alert("时间戳格式不正确");
                return;
            }
            var setdate = new Date(vdate);
            return jet.parse({ YYYY: setdate.getFullYear(), MM: jet.digit(setdate.getMonth() + 1), DD: jet.digit(setdate.getDate()), hh: jet.digit(setdate.getHours()), mm: jet.digit(setdate.getMinutes()), ss: jet.digit(setdate.getSeconds()) }, format);
        } else {
            //将日期转换成时间戳
            var arrs = jet.reMatch(date),
                newdate = new Date(arrs[0], parseInt(arrs[1]) - 1, arrs[2], arrs[3] || 0, arrs[4] || 0, arrs[5] || 0),
                timeStr = Math.round(newdate.getTime() / 1000);
            return timeStr;
        }
    };
    //分解日期时间
    $.splitDate = function (str) {
        var sdate = str.match(/\w+|d+/g);
        return {
            YYYY: parseInt(sdate[0]), MM: parseInt(sdate[1]) || '00', DD: parseInt(sdate[2]) || '00',
            hh: parseInt(sdate[3]) || '00', mm: parseInt(sdate[4]) || '00', ss: parseInt(sdate[5]) || '00'
        };
    };
    //获取年月日星期
    $.getLunar = function (date, format) {
        var that = this;
        format = format || 'YYYY-MM-DD hh:mm:ss';
        if (/YYYY-MM-DD/g.test(jet.isparmat(format))) {
            //如果为数字类型的日期对获取到日期的进行替换
            var charDate = date.substr(0, 4).replace(/^(\d{4})/g, "$1,") + date.substr(4).replace(/(.{2})/g, "$1,"),
                reArr = jet.isNum(date) ? jet.reMatch(charDate) : jet.reMatch(date),
                lunars = that.jeLunar(reArr[0], reArr[1] - 1, reArr[2]);
            return {
                nMonth: lunars.lnongMonth, //农历月
                nDays: lunars.lnongDate, //农历日
                yYear: parseInt(lunars.solarYear), //阳历年
                yMonth: parseInt(lunars.solarMonth), //阳历月
                yDays: parseInt(lunars.solarDate), //阳历日
                cWeek: lunars.inWeekDays, //汉字星期几
                nWeek: lunars.solarWeekDay //数字星期几
            };
        }
    };
    return _jeDate;
});

exports.default = $.jeDate;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popupPlugin = __webpack_require__(5);

var _popupPlugin2 = _interopRequireDefault(_popupPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _popupPlugin2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Popup = {};
;(function ($, window, document, undefined) {
  'use strict';

  var old = $.fn.popover;

  var Popover = function Popover(el, options) {
    this.$el = $(el);
    this.options = this.getOptions(options);
    this.$wrapper = this.$el.parents('.popover-wrapper').eq(0);
    this.$body = this.$wrapper.find('.popover-body');
    this.listenEvents();
    return this;
  };

  Popover.DEFAULTS = {
    trigger: 'click' // click | hover
  };

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };

  Popover.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$el.data(), options);
    return options;
  };

  Popover.prototype.listenEvents = function (options) {
    var this_ = this;
    var $el = this.$el;

    // click outside to close modal
    $(document).click(function (e) {
      if (!this.$wrapper.hasClass('open')) {
        return;
      }

      var shouldClose = !$.contains(this.$wrapper[0], e.target) && this.$wrapper[0] !== e.target;

      if (shouldClose) {
        this.close();
      }
    }.bind(this));

    // click, hover, or focus based triggers
    var trigger = this.options.trigger;
    if (trigger === 'click') {
      $el.on('click', function (e) {
        e.preventDefault();
        this_.toggle();
      });
    } else if (trigger === 'hover') {
      $el.on('mouseenter', function (e) {
        e.preventDefault();
        this_.open();
      });
      $el.on('mouseleave', function (e) {
        e.preventDefault();
        this_.close();
      });
      $el.on('click', function (e) {
        e.preventDefault();
        this_.toggle();
      });
    } else if (trigger === 'focus') {}

    // Listen to close buttons
    this.$wrapper.find('[data-toggle-role="close"]').on('click', function (e) {
      e.preventDefault();
      this_.close();
    });

    return this;
  };

  Popover.prototype.open = function () {
    if (this.$wrapper) this.$wrapper.addClass('open');
    return this;
  };

  Popover.prototype.close = function () {
    if (this.$wrapper) this.$wrapper.removeClass('open');
    return this;
  };

  Popover.prototype.toggle = function () {
    if (this.$wrapper) this.$wrapper.toggleClass('open');
    return this;
  };

  // PLUGIN DEFINITION
  var Plugin = function Plugin(options) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('gb.popover');

      if (!data) {
        data = new Popover(this, options);
        $this.data('gb.popover', data);
      }
    });
  };

  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover;
  Popup = function Popup(el, options) {
    return new Popover(el, options);
  };

  // NO CONFLICT
  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
})(jQuery, window, document);

exports.default = Popup;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);