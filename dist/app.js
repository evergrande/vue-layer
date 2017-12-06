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


var _layer = __webpack_require__(1);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(2);

var _layer2 = _interopRequireDefault(_layer);

__webpack_require__(3);

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
/***/ (function(module, exports) {

module.exports = "data:text/css;base64,LyoqCiAKIEBOYW1lOiBsYXllcgogQEF1dGhvcjog6LSk5b+DCiAKICoqLwoKLyogKmh0bWx7YmFja2dyb3VuZC1pbWFnZTogdXJsKGFib3V0OmJsYW5rKTsgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDt9ICovCmh0bWwgI2xheXVpY3NzLWxheWVye2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDE5ODlweDt9CgovKiBjb21tb24gKi8KLmxheXVpLWxheWVyLXNoYWRlLCAubGF5dWktbGF5ZXJ7cG9zaXRpb246Zml4ZWQ7IF9wb3NpdGlvbjphYnNvbHV0ZTsgcG9pbnRlci1ldmVudHM6IGF1dG87fQoubGF5dWktbGF5ZXItc2hhZGV7dG9wOjA7IGxlZnQ6MDsgd2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCU7IF9oZWlnaHQ6ZXhwcmVzc2lvbihkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCsicHgiKTt9Ci5sYXl1aS1sYXllcnstd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7fQoubGF5dWktbGF5ZXJ7dG9wOjE1MHB4OyBsZWZ0OiAwOyBtYXJnaW46MDsgcGFkZGluZzowOyBiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7IC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiBjb250ZW50OyBib3JkZXItcmFkaXVzOiAycHg7IGJveC1zaGFkb3c6IDFweCAxcHggNTBweCByZ2JhKDAsMCwwLC4zKTt9Ci5sYXl1aS1sYXllci1jbG9zZXtwb3NpdGlvbjphYnNvbHV0ZTt9Ci5sYXl1aS1sYXllci1jb250ZW50e3Bvc2l0aW9uOnJlbGF0aXZlO30KLmxheXVpLWxheWVyLWJvcmRlcntib3JkZXI6IDFweCBzb2xpZCAjQjJCMkIyOyBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4xKTsgYm94LXNoYWRvdzogMXB4IDFweCA1cHggcmdiYSgwLDAsMCwuMik7fQoubGF5dWktbGF5ZXItbG9hZHtiYWNrZ3JvdW5kOnVybChsb2FkaW5nLTEuZ2lmKSAjZWVlIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O30KLmxheXVpLWxheWVyLWljb3sgYmFja2dyb3VuZDp1cmwoaWNvbi5wbmcpIG5vLXJlcGVhdDt9Ci5sYXl1aS1sYXllci1kaWFsb2cgLmxheXVpLWxheWVyLWljbywKLmxheXVpLWxheWVyLXNldHdpbiBhLAoubGF5dWktbGF5ZXItYnRuIGF7ZGlzcGxheTppbmxpbmUtYmxvY2s7ICpkaXNwbGF5OmlubGluZTsgKnpvb206MTsgdmVydGljYWwtYWxpZ246dG9wO30KCi5sYXl1aS1sYXllci1tb3Zle2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBmaXhlZDsgKnBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogMHB4OyB0b3A6IDBweDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgY3Vyc29yOiBtb3ZlOyBvcGFjaXR5OiAwOyBmaWx0ZXI6YWxwaGEob3BhY2l0eT0wKTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgei1pbmRleDogMjE0NzQ4MzY0Nzt9Ci5sYXl1aS1sYXllci1yZXNpemV7cG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTVweDsgaGVpZ2h0OiAxNXB4OyByaWdodDogMDsgYm90dG9tOiAwOyBjdXJzb3I6IHNlLXJlc2l6ZTt9CgovKiDliqjnlLsgKi8KLmxheWVyLWFuaW17LXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOyBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOyAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjouM3M7IGFuaW1hdGlvbi1kdXJhdGlvbjouM3M7fQoKQC13ZWJraXQta2V5ZnJhbWVzIGxheWVyLWJvdW5jZUluIHsgLyog6buY6K6kICovCgkwJSB7b3BhY2l0eTogMDsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKC41KTsgdHJhbnNmb3JtOiBzY2FsZSguNSl9CgkxMDAlIHtvcGFjaXR5OiAxOyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7IHRyYW5zZm9ybTogc2NhbGUoMSl9Cn0KQGtleWZyYW1lcyBsYXllci1ib3VuY2VJbiB7CgkwJSB7b3BhY2l0eTogMDsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKC41KTsgLW1zLXRyYW5zZm9ybTogc2NhbGUoLjUpOyB0cmFuc2Zvcm06IHNjYWxlKC41KX0KCTEwMCUge29wYWNpdHk6IDE7IC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTsgLW1zLXRyYW5zZm9ybTogc2NhbGUoMSk7IHRyYW5zZm9ybTogc2NhbGUoMSl9Cn0KLmxheWVyLWFuaW0tMDB7LXdlYmtpdC1hbmltYXRpb24tbmFtZTogbGF5ZXItYm91bmNlSW47YW5pbWF0aW9uLW5hbWU6IGxheWVyLWJvdW5jZUlufQoKQC13ZWJraXQta2V5ZnJhbWVzIGxheWVyLXpvb21JbkRvd257MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC4xKSB0cmFuc2xhdGVZKC0yMDAwcHgpO3RyYW5zZm9ybTpzY2FsZSguMSkgdHJhbnNsYXRlWSgtMjAwMHB4KTstd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbi1vdXQ7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluLW91dH02MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC40NzUpIHRyYW5zbGF0ZVkoNjBweCk7dHJhbnNmb3JtOnNjYWxlKC40NzUpIHRyYW5zbGF0ZVkoNjBweCk7LXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXR9fUBrZXlmcmFtZXMgbGF5ZXItem9vbUluRG93bnswJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjEpIHRyYW5zbGF0ZVkoLTIwMDBweCk7LW1zLXRyYW5zZm9ybTpzY2FsZSguMSkgdHJhbnNsYXRlWSgtMjAwMHB4KTt0cmFuc2Zvcm06c2NhbGUoLjEpIHRyYW5zbGF0ZVkoLTIwMDBweCk7LXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2UtaW4tb3V0O2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbi1vdXR9NjAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguNDc1KSB0cmFuc2xhdGVZKDYwcHgpOy1tcy10cmFuc2Zvcm06c2NhbGUoLjQ3NSkgdHJhbnNsYXRlWSg2MHB4KTt0cmFuc2Zvcm06c2NhbGUoLjQ3NSkgdHJhbnNsYXRlWSg2MHB4KTstd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dH19LmxheWVyLWFuaW0tMDF7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpsYXllci16b29tSW5Eb3duO2FuaW1hdGlvbi1uYW1lOmxheWVyLXpvb21JbkRvd259CgpALXdlYmtpdC1rZXlmcmFtZXMgbGF5ZXItZmFkZUluVXBCaWd7MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMjAwMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgyMDAwcHgpfTEwMCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCl9fUBrZXlmcmFtZXMgbGF5ZXItZmFkZUluVXBCaWd7MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMjAwMHB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMjAwMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgyMDAwcHgpfTEwMCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfX0ubGF5ZXItYW5pbS0wMnstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmxheWVyLWZhZGVJblVwQmlnO2FuaW1hdGlvbi1uYW1lOmxheWVyLWZhZGVJblVwQmlnfQoKQC13ZWJraXQta2V5ZnJhbWVzIGxheWVyLXpvb21JbkxlZnR7MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC4xKSB0cmFuc2xhdGVYKC0yMDAwcHgpO3RyYW5zZm9ybTpzY2FsZSguMSkgdHJhbnNsYXRlWCgtMjAwMHB4KTstd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbi1vdXQ7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluLW91dH02MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC40NzUpIHRyYW5zbGF0ZVgoNDhweCk7dHJhbnNmb3JtOnNjYWxlKC40NzUpIHRyYW5zbGF0ZVgoNDhweCk7LXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXR9fUBrZXlmcmFtZXMgbGF5ZXItem9vbUluTGVmdHswJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjEpIHRyYW5zbGF0ZVgoLTIwMDBweCk7LW1zLXRyYW5zZm9ybTpzY2FsZSguMSkgdHJhbnNsYXRlWCgtMjAwMHB4KTt0cmFuc2Zvcm06c2NhbGUoLjEpIHRyYW5zbGF0ZVgoLTIwMDBweCk7LXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2UtaW4tb3V0O2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbi1vdXR9NjAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguNDc1KSB0cmFuc2xhdGVYKDQ4cHgpOy1tcy10cmFuc2Zvcm06c2NhbGUoLjQ3NSkgdHJhbnNsYXRlWCg0OHB4KTt0cmFuc2Zvcm06c2NhbGUoLjQ3NSkgdHJhbnNsYXRlWCg0OHB4KTstd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dH19LmxheWVyLWFuaW0tMDN7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpsYXllci16b29tSW5MZWZ0O2FuaW1hdGlvbi1uYW1lOmxheWVyLXpvb21JbkxlZnR9CgpALXdlYmtpdC1rZXlmcmFtZXMgbGF5ZXItcm9sbEluezAle29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMDAlKSByb3RhdGUoLTEyMGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwMCUpIHJvdGF0ZSgtMTIwZGVnKX0xMDAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDBweCkgcm90YXRlKDBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDBweCkgcm90YXRlKDBkZWcpfX1Aa2V5ZnJhbWVzIGxheWVyLXJvbGxJbnswJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwJSkgcm90YXRlKC0xMjBkZWcpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwJSkgcm90YXRlKC0xMjBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMDAlKSByb3RhdGUoLTEyMGRlZyl9MTAwJXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgwcHgpIHJvdGF0ZSgwZGVnKTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoMHB4KSByb3RhdGUoMGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMHB4KSByb3RhdGUoMGRlZyl9fS5sYXllci1hbmltLTA0ey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6bGF5ZXItcm9sbEluO2FuaW1hdGlvbi1uYW1lOmxheWVyLXJvbGxJbn0KCkBrZXlmcmFtZXMgbGF5ZXItZmFkZUluezAle29wYWNpdHk6MH0xMDAle29wYWNpdHk6MX19LmxheWVyLWFuaW0tMDV7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpsYXllci1mYWRlSW47YW5pbWF0aW9uLW5hbWU6bGF5ZXItZmFkZUlufQoKQC13ZWJraXQta2V5ZnJhbWVzIGxheWVyLXNoYWtlezAlLDEwMCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgwKX0xMCUsMzAlLDUwJSw3MCUsOTAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMHB4KX0yMCUsNDAlLDYwJSw4MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgxMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgxMHB4KX19QGtleWZyYW1lcyBsYXllci1zaGFrZXswJSwxMDAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoMCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVYKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDApfTEwJSwzMCUsNTAlLDcwJSw5MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTBweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTBweCl9MjAlLDQwJSw2MCUsODAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoMTBweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDEwcHgpfX0ubGF5ZXItYW5pbS0wNnstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmxheWVyLXNoYWtlO2FuaW1hdGlvbi1uYW1lOmxheWVyLXNoYWtlfUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW57MCV7b3BhY2l0eTowfTEwMCV7b3BhY2l0eToxfX0KCi8qIOagh+mimOagjyAqLwoubGF5dWktbGF5ZXItdGl0bGV7cGFkZGluZzowIDgwcHggMCAyMHB4OyBoZWlnaHQ6NDJweDsgbGluZS1oZWlnaHQ6NDJweDsgYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTsgZm9udC1zaXplOjE0cHg7IGNvbG9yOiMzMzM7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB3aGl0ZS1zcGFjZTogbm93cmFwOyBiYWNrZ3JvdW5kLWNvbG9yOiAjRjhGOEY4OyBib3JkZXItcmFkaXVzOiAycHggMnB4IDAgMDt9Ci5sYXl1aS1sYXllci1zZXR3aW57cG9zaXRpb246YWJzb2x1dGU7IHJpZ2h0OjE1cHg7ICpyaWdodDowOyB0b3A6MTVweDsgZm9udC1zaXplOjA7IGxpbmUtaGVpZ2h0OiBpbml0aWFsO30KLmxheXVpLWxheWVyLXNldHdpbiBhe3Bvc2l0aW9uOnJlbGF0aXZlOyB3aWR0aDogMTZweDsgaGVpZ2h0OjE2cHg7IG1hcmdpbi1sZWZ0OjEwcHg7IGZvbnQtc2l6ZToxMnB4OyBfb3ZlcmZsb3c6aGlkZGVuO30KLmxheXVpLWxheWVyLXNldHdpbiAubGF5dWktbGF5ZXItbWluIGNpdGV7cG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOjE0cHg7IGhlaWdodDoycHg7IGxlZnQ6MDsgdG9wOjUwJTsgbWFyZ2luLXRvcDotMXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiMyRTJEM0M7IGN1cnNvcjpwb2ludGVyOyBfb3ZlcmZsb3c6aGlkZGVuO30KLmxheXVpLWxheWVyLXNldHdpbiAubGF5dWktbGF5ZXItbWluOmhvdmVyIGNpdGV7YmFja2dyb3VuZC1jb2xvcjojMkQ5M0NBOyB9Ci5sYXl1aS1sYXllci1zZXR3aW4gLmxheXVpLWxheWVyLW1heHtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0zMnB4IC00MHB4O30KLmxheXVpLWxheWVyLXNldHdpbiAubGF5dWktbGF5ZXItbWF4OmhvdmVye2JhY2tncm91bmQtcG9zaXRpb246LTE2cHggLTQwcHg7fQoubGF5dWktbGF5ZXItc2V0d2luIC5sYXl1aS1sYXllci1tYXhtaW57YmFja2dyb3VuZC1wb3NpdGlvbjotNjVweCAtNDBweDt9Ci5sYXl1aS1sYXllci1zZXR3aW4gLmxheXVpLWxheWVyLW1heG1pbjpob3ZlcntiYWNrZ3JvdW5kLXBvc2l0aW9uOi00OXB4IC00MHB4O30KLmxheXVpLWxheWVyLXNldHdpbiAubGF5dWktbGF5ZXItY2xvc2Uxe2JhY2tncm91bmQtcG9zaXRpb246IDFweCAtNDBweDsgY3Vyc29yOiBwb2ludGVyO30KLmxheXVpLWxheWVyLXNldHdpbiAubGF5dWktbGF5ZXItY2xvc2UxOmhvdmVye29wYWNpdHk6MC43O30KLmxheXVpLWxheWVyLXNldHdpbiAubGF5dWktbGF5ZXItY2xvc2Uye3Bvc2l0aW9uOmFic29sdXRlOyByaWdodDotMjhweDsgdG9wOi0yOHB4OyB3aWR0aDozMHB4OyBoZWlnaHQ6MzBweDsgIG1hcmdpbi1sZWZ0OjA7IGJhY2tncm91bmQtcG9zaXRpb246LTE0OXB4IC0zMXB4OyAqcmlnaHQ6LTE4cHg7IF9kaXNwbGF5Om5vbmU7fQoubGF5dWktbGF5ZXItc2V0d2luIC5sYXl1aS1sYXllci1jbG9zZTI6aG92ZXJ7IGJhY2tncm91bmQtcG9zaXRpb246LTE4MHB4IC0zMXB4O30KCi8qIOaMiemSruagjyAqLwoubGF5dWktbGF5ZXItYnRue3RleHQtYWxpZ246IHJpZ2h0OyBwYWRkaW5nOiAwIDE1cHggMTJweDsgcG9pbnRlci1ldmVudHM6IGF1dG87IHVzZXItc2VsZWN0OiBub25lOyAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO30KLmxheXVpLWxheWVyLWJ0biBhe2hlaWdodDogMjhweDsgbGluZS1oZWlnaHQ6IDI4cHg7IG1hcmdpbjogNXB4IDVweCAwOyBwYWRkaW5nOiAwIDE1cHg7IGJvcmRlcjogMXB4IHNvbGlkICNkZWRlZGU7IGJhY2tncm91bmQtY29sb3I6I2ZmZjsgY29sb3I6ICMzMzM7IGJvcmRlci1yYWRpdXM6IDJweDsgZm9udC13ZWlnaHQ6NDAwOyBjdXJzb3I6cG9pbnRlcjsgdGV4dC1kZWNvcmF0aW9uOiBub25lO30KLmxheXVpLWxheWVyLWJ0biBhOmhvdmVye29wYWNpdHk6IDAuOTsgdGV4dC1kZWNvcmF0aW9uOiBub25lO30KLmxheXVpLWxheWVyLWJ0biBhOmFjdGl2ZXtvcGFjaXR5OiAwLjg7fQoubGF5dWktbGF5ZXItYnRuIC5sYXl1aS1sYXllci1idG4we2JvcmRlci1jb2xvcjogIzFFOUZGRjsgYmFja2dyb3VuZC1jb2xvcjogIzFFOUZGRjsgY29sb3I6I2ZmZjt9Ci5sYXl1aS1sYXllci1idG4tbHt0ZXh0LWFsaWduOiBsZWZ0O30KLmxheXVpLWxheWVyLWJ0bi1je3RleHQtYWxpZ246IGNlbnRlcjt9CgovKiDlrprliLbljJYgKi8KLmxheXVpLWxheWVyLWRpYWxvZ3ttaW4td2lkdGg6MjYwcHg7fQoubGF5dWktbGF5ZXItZGlhbG9nIC5sYXl1aS1sYXllci1jb250ZW50e3Bvc2l0aW9uOiByZWxhdGl2ZTsgcGFkZGluZzoyMHB4OyBsaW5lLWhlaWdodDoyNHB4OyB3b3JkLWJyZWFrOiBicmVhay1hbGw7IG92ZXJmbG93OmhpZGRlbjsgZm9udC1zaXplOjE0cHg7IG92ZXJmbG93LXg6IGhpZGRlbjsgb3ZlcmZsb3cteTphdXRvO30KLmxheXVpLWxheWVyLWRpYWxvZyAubGF5dWktbGF5ZXItY29udGVudCAubGF5dWktbGF5ZXItaWNve3Bvc2l0aW9uOmFic29sdXRlOyB0b3A6MTZweDsgbGVmdDoxNXB4OyBfbGVmdDotNDBweDsgd2lkdGg6MzBweDsgaGVpZ2h0OjMwcHg7fQoubGF5dWktbGF5ZXItaWNvMXtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0zMHB4IDAgfQoubGF5dWktbGF5ZXItaWNvMntiYWNrZ3JvdW5kLXBvc2l0aW9uOi02MHB4IDA7fQoubGF5dWktbGF5ZXItaWNvM3tiYWNrZ3JvdW5kLXBvc2l0aW9uOi05MHB4IDA7fQoubGF5dWktbGF5ZXItaWNvNHtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0xMjBweCAwO30KLmxheXVpLWxheWVyLWljbzV7YmFja2dyb3VuZC1wb3NpdGlvbjotMTUwcHggMDt9Ci5sYXl1aS1sYXllci1pY282e2JhY2tncm91bmQtcG9zaXRpb246LTE4MHB4IDA7fQoubGF5dWktbGF5ZXItcmlte2JvcmRlcjo2cHggc29saWQgIzhEOEQ4RDsgYm9yZGVyOjZweCBzb2xpZCByZ2JhKDAsMCwwLC4zKTsgYm9yZGVyLXJhZGl1czo1cHg7IGJveC1zaGFkb3c6IG5vbmU7fQoubGF5dWktbGF5ZXItbXNne21pbi13aWR0aDoxODBweDsgYm9yZGVyOjFweCBzb2xpZCAjRDNENEQzOyBib3gtc2hhZG93OiBub25lO30KLmxheXVpLWxheWVyLWh1aXttaW4td2lkdGg6MTAwcHg7ICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwOyBmaWx0ZXI6YWxwaGEob3BhY2l0eT02MCk7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC42KTsgY29sb3I6ICNmZmY7IGJvcmRlcjpub25lO30KLmxheXVpLWxheWVyLWh1aSAubGF5dWktbGF5ZXItY29udGVudHtwYWRkaW5nOjEycHggMjVweDsgdGV4dC1hbGlnbjpjZW50ZXI7fQoubGF5dWktbGF5ZXItZGlhbG9nIC5sYXl1aS1sYXllci1wYWRkaW5ne3BhZGRpbmc6IDIwcHggMjBweCAyMHB4IDU1cHg7IHRleHQtYWxpZ246IGxlZnQ7fQoubGF5dWktbGF5ZXItcGFnZSAubGF5dWktbGF5ZXItY29udGVudHtwb3NpdGlvbjpyZWxhdGl2ZTsgb3ZlcmZsb3c6YXV0bzt9Ci5sYXl1aS1sYXllci1wYWdlIC5sYXl1aS1sYXllci1idG4sLmxheXVpLWxheWVyLWlmcmFtZSAubGF5dWktbGF5ZXItYnRue3BhZGRpbmctdG9wOjEwcHg7fQoubGF5dWktbGF5ZXItbm9iZ3tiYWNrZ3JvdW5kOm5vbmU7fQoubGF5dWktbGF5ZXItaWZyYW1lIGlmcmFtZXtkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7fQoKLmxheXVpLWxheWVyLWxvYWRpbmd7Ym9yZGVyLXJhZGl1czoxMDAlOyBiYWNrZ3JvdW5kOm5vbmU7ICBib3gtc2hhZG93Om5vbmU7ICBib3JkZXI6bm9uZTt9Ci5sYXl1aS1sYXllci1sb2FkaW5nIC5sYXl1aS1sYXllci1jb250ZW50e3dpZHRoOjYwcHg7IGhlaWdodDoyNHB4OyBiYWNrZ3JvdW5kOnVybChsb2FkaW5nLTAuZ2lmKSBuby1yZXBlYXQ7fQoubGF5dWktbGF5ZXItbG9hZGluZyAubGF5dWktbGF5ZXItbG9hZGluZzF7d2lkdGg6MzdweDsgaGVpZ2h0OjM3cHg7IGJhY2tncm91bmQ6dXJsKGxvYWRpbmctMS5naWYpIG5vLXJlcGVhdDt9Ci5sYXl1aS1sYXllci1sb2FkaW5nIC5sYXl1aS1sYXllci1sb2FkaW5nMiwgLmxheXVpLWxheWVyLWljbzE2e3dpZHRoOjMycHg7IGhlaWdodDozMnB4OyBiYWNrZ3JvdW5kOnVybChsb2FkaW5nLTIuZ2lmKSBuby1yZXBlYXQ7fQoubGF5dWktbGF5ZXItdGlwc3tiYWNrZ3JvdW5kOiBub25lOyBib3gtc2hhZG93Om5vbmU7IGJvcmRlcjpub25lO30KLmxheXVpLWxheWVyLXRpcHMgLmxheXVpLWxheWVyLWNvbnRlbnR7cG9zaXRpb246IHJlbGF0aXZlOyBsaW5lLWhlaWdodDogMjJweDsgbWluLXdpZHRoOiAxMnB4OyBwYWRkaW5nOiA4cHggMTVweDsgZm9udC1zaXplOiAxMnB4OyBfZmxvYXQ6bGVmdDsgYm9yZGVyLXJhZGl1czogMnB4OyBib3gtc2hhZG93OiAxcHggMXB4IDNweCByZ2JhKDAsMCwwLC4yKTsgYmFja2dyb3VuZC1jb2xvcjogIzAwMDsgY29sb3I6ICNmZmY7fQoubGF5dWktbGF5ZXItdGlwcyAubGF5dWktbGF5ZXItY2xvc2V7cmlnaHQ6LTJweDsgdG9wOi0xcHg7fQoubGF5dWktbGF5ZXItdGlwcyBpLmxheXVpLWxheWVyLVRpcHNHeyBwb3NpdGlvbjphYnNvbHV0ZTsgIHdpZHRoOjA7IGhlaWdodDowOyBib3JkZXItd2lkdGg6OHB4OyBib3JkZXItY29sb3I6dHJhbnNwYXJlbnQ7IGJvcmRlci1zdHlsZTpkYXNoZWQ7ICpvdmVyZmxvdzpoaWRkZW47fQoubGF5dWktbGF5ZXItdGlwcyBpLmxheXVpLWxheWVyLVRpcHNULCAubGF5dWktbGF5ZXItdGlwcyBpLmxheXVpLWxheWVyLVRpcHNCe2xlZnQ6NXB4OyBib3JkZXItcmlnaHQtc3R5bGU6c29saWQ7IGJvcmRlci1yaWdodC1jb2xvcjogIzAwMDt9Ci5sYXl1aS1sYXllci10aXBzIGkubGF5dWktbGF5ZXItVGlwc1R7Ym90dG9tOi04cHg7fQoubGF5dWktbGF5ZXItdGlwcyBpLmxheXVpLWxheWVyLVRpcHNCe3RvcDotOHB4O30KLmxheXVpLWxheWVyLXRpcHMgaS5sYXl1aS1sYXllci1UaXBzUiwgLmxheXVpLWxheWVyLXRpcHMgaS5sYXl1aS1sYXllci1UaXBzTHt0b3A6IDVweDsgYm9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDsgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzAwMDt9Ci5sYXl1aS1sYXllci10aXBzIGkubGF5dWktbGF5ZXItVGlwc1J7bGVmdDotOHB4O30KLmxheXVpLWxheWVyLXRpcHMgaS5sYXl1aS1sYXllci1UaXBzTHtyaWdodDotOHB4O30KCi8qIHNraW4gKi8KLmxheXVpLWxheWVyLWxhblt0eXBlPSJkaWFsb2ciXXttaW4td2lkdGg6MjgwcHg7fQoubGF5dWktbGF5ZXItbGFuIC5sYXl1aS1sYXllci10aXRsZXtiYWNrZ3JvdW5kOiM0NDc2QTc7IGNvbG9yOiNmZmY7IGJvcmRlcjogbm9uZTt9Ci5sYXl1aS1sYXllci1sYW4gLmxheXVpLWxheWVyLWJ0bntwYWRkaW5nOiA1cHggMTBweCAxMHB4OyB0ZXh0LWFsaWduOiByaWdodDsgYm9yZGVyLXRvcDoxcHggc29saWQgI0U5RTdFN30KLmxheXVpLWxheWVyLWxhbiAubGF5dWktbGF5ZXItYnRuIGF7YmFja2dyb3VuZDogI2ZmZjsgYm9yZGVyLWNvbG9yOiAjRTlFN0U3OyBjb2xvcjogIzMzMzt9Ci5sYXl1aS1sYXllci1sYW4gLmxheXVpLWxheWVyLWJ0biAubGF5dWktbGF5ZXItYnRuMXtiYWNrZ3JvdW5kOiNDOUM1QzU7fQoubGF5dWktbGF5ZXItbW9sdiAubGF5dWktbGF5ZXItdGl0bGV7YmFja2dyb3VuZDogIzAwOWY5NTsgY29sb3I6I2ZmZjsgYm9yZGVyOiBub25lO30KLmxheXVpLWxheWVyLW1vbHYgLmxheXVpLWxheWVyLWJ0biBhe2JhY2tncm91bmQ6ICMwMDlmOTU7IGJvcmRlci1jb2xvcjogIzAwOWY5NTt9Ci5sYXl1aS1sYXllci1tb2x2IC5sYXl1aS1sYXllci1idG4gLmxheXVpLWxheWVyLWJ0bjF7YmFja2dyb3VuZDojOTJCOEIxO30KCgovKioKIAogQE5hbWU6IGxheWVy5ouT5bGV5qC35byPCiAKICovCgoubGF5dWktbGF5ZXItaWNvbmV4dHtiYWNrZ3JvdW5kOnVybChpY29uLWV4dC5wbmcpIG5vLXJlcGVhdDt9CgovKiBwcm9tcHTmqKHlvI8gKi8KLmxheXVpLWxheWVyLXByb21wdCAubGF5dWktbGF5ZXItaW5wdXR7ZGlzcGxheTogYmxvY2s7IHdpZHRoOiAyMzBweDsgaGVpZ2h0OiAzNnB4OyBtYXJnaW46IDAgYXV0bzsgbGluZS1oZWlnaHQ6IDMwcHg7IHBhZGRpbmctbGVmdDogMTBweDsgYm9yZGVyOiAxcHggc29saWQgI2U2ZTZlNjsgY29sb3I6ICMzMzM7fQoubGF5dWktbGF5ZXItcHJvbXB0IHRleHRhcmVhLmxheXVpLWxheWVyLWlucHV0e3dpZHRoOiAzMDBweDsgaGVpZ2h0OiAxMDBweDsgbGluZS1oZWlnaHQ6IDIwcHg7IHBhZGRpbmc6IDZweCAxMHB4O30KLmxheXVpLWxheWVyLXByb21wdCAubGF5dWktbGF5ZXItY29udGVudHtwYWRkaW5nOiAyMHB4O30KLmxheXVpLWxheWVyLXByb21wdCAubGF5dWktbGF5ZXItYnRue3BhZGRpbmctdG9wOiAwO30KCi8qIHRhYuaooeW8jyAqLwoubGF5dWktbGF5ZXItdGFie2JveC1zaGFkb3c6MXB4IDFweCA1MHB4IHJnYmEoMCwwLDAsLjQpO30KLmxheXVpLWxheWVyLXRhYiAubGF5dWktbGF5ZXItdGl0bGV7cGFkZGluZy1sZWZ0OjA7IG92ZXJmbG93OiB2aXNpYmxlO30KLmxheXVpLWxheWVyLXRhYiAubGF5dWktbGF5ZXItdGl0bGUgc3Bhbntwb3NpdGlvbjpyZWxhdGl2ZTsgZmxvYXQ6bGVmdDsgbWluLXdpZHRoOjgwcHg7IG1heC13aWR0aDoyNjBweDsgcGFkZGluZzowIDIwcHg7IHRleHQtYWxpZ246Y2VudGVyOyBjdXJzb3I6ZGVmYXVsdDsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IG92ZXJmbG93OiBoaWRkZW47IHdoaXRlLXNwYWNlOiBub3dyYXA7IGN1cnNvcjogcG9pbnRlcjt9Ci5sYXl1aS1sYXllci10YWIgLmxheXVpLWxheWVyLXRpdGxlIHNwYW4ubGF5dWktdGhpc3toZWlnaHQ6IDQzcHg7IGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2VlZTsgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2VlZTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgei1pbmRleDogMTA7fQoubGF5dWktbGF5ZXItdGFiIC5sYXl1aS1sYXllci10aXRsZSBzcGFuOmZpcnN0LWNoaWxke2JvcmRlci1sZWZ0Om5vbmU7fQoubGF5dWktbGF5ZXItdGFibWFpbntsaW5lLWhlaWdodDoyNHB4OyBjbGVhcjpib3RoO30KLmxheXVpLWxheWVyLXRhYm1haW4gLmxheXVpLWxheWVyLXRhYmxpe2Rpc3BsYXk6bm9uZTt9Ci5sYXl1aS1sYXllci10YWJtYWluIC5sYXl1aS1sYXllci10YWJsaS5sYXl1aS10aGlze2Rpc3BsYXk6IGJsb2NrO30KCi8qIHBob3Rv5qih5byPICovCi5sYXl1aS1sYXllci1waG90b3N7LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IC44czsgYW5pbWF0aW9uLWR1cmF0aW9uOiAuOHM7fQoubGF5dWktbGF5ZXItcGhvdG9zIC5sYXl1aS1sYXllci1jb250ZW50e292ZXJmbG93OmhpZGRlbjsgdGV4dC1hbGlnbjogY2VudGVyO30KLmxheXVpLWxheWVyLXBob3RvcyAubGF5dWktbGF5ZXItcGhpbWcgaW1ne3Bvc2l0aW9uOiByZWxhdGl2ZTsgd2lkdGg6MTAwJTsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAqZGlzcGxheTppbmxpbmU7ICp6b29tOjE7IHZlcnRpY2FsLWFsaWduOnRvcDt9Ci5sYXl1aS1sYXllci1pbWd1aWRlLC5sYXl1aS1sYXllci1pbWdiYXJ7ZGlzcGxheTpub25lO30KLmxheXVpLWxheWVyLWltZ3ByZXYsIC5sYXl1aS1sYXllci1pbWduZXh0e3Bvc2l0aW9uOmFic29sdXRlOyB0b3A6NTAlOyB3aWR0aDoyN3B4OyBfd2lkdGg6NDRweDsgaGVpZ2h0OjQ0cHg7ICBtYXJnaW4tdG9wOi0yMnB4OyBvdXRsaW5lOm5vbmU7YmxyOmV4cHJlc3Npb24odGhpcy5vbkZvY3VzPXRoaXMuYmx1cigpKTt9Ci5sYXl1aS1sYXllci1pbWdwcmV2e2xlZnQ6MTBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjotNXB4IC01cHg7IF9iYWNrZ3JvdW5kLXBvc2l0aW9uOi03MHB4IC01cHg7fQoubGF5dWktbGF5ZXItaW1ncHJldjpob3ZlcntiYWNrZ3JvdW5kLXBvc2l0aW9uOi0zM3B4IC01cHg7IF9iYWNrZ3JvdW5kLXBvc2l0aW9uOi0xMjBweCAtNXB4O30KLmxheXVpLWxheWVyLWltZ25leHR7cmlnaHQ6MTBweDsgX3JpZ2h0OjhweDsgYmFja2dyb3VuZC1wb3NpdGlvbjotNXB4IC01MHB4OyBfYmFja2dyb3VuZC1wb3NpdGlvbjotNzBweCAtNTBweDt9Ci5sYXl1aS1sYXllci1pbWduZXh0OmhvdmVye2JhY2tncm91bmQtcG9zaXRpb246LTMzcHggLTUwcHg7IF9iYWNrZ3JvdW5kLXBvc2l0aW9uOi0xMjBweCAtNTBweDt9Ci5sYXl1aS1sYXllci1pbWdiYXJ7cG9zaXRpb246YWJzb2x1dGU7IGxlZnQ6MDsgYm90dG9tOjA7IHdpZHRoOjEwMCU7IGhlaWdodDozMnB4OyBsaW5lLWhlaWdodDozMnB4OyBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjgpOyBiYWNrZ3JvdW5kLWNvbG9yOiMwMDBcOTsgZmlsdGVyOkFscGhhKG9wYWNpdHk9ODApOyBjb2xvcjojZmZmOyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgb3ZlcmZsb3c6IGhpZGRlbjsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgZm9udC1zaXplOjA7fQoubGF5dWktbGF5ZXItaW1ndGl0ey8qcG9zaXRpb246YWJzb2x1dGU7IGxlZnQ6MjBweDsqL30KLmxheXVpLWxheWVyLWltZ3RpdCAqe2Rpc3BsYXk6aW5saW5lLWJsb2NrOyAqZGlzcGxheTppbmxpbmU7ICp6b29tOjE7IHZlcnRpY2FsLWFsaWduOnRvcDsgZm9udC1zaXplOjEycHg7fQoubGF5dWktbGF5ZXItaW1ndGl0IGF7bWF4LXdpZHRoOjY1JTsgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyBvdmVyZmxvdzogaGlkZGVuOyB3aGl0ZS1zcGFjZTogbm93cmFwOyBjb2xvcjojZmZmO30KLmxheXVpLWxheWVyLWltZ3RpdCBhOmhvdmVye2NvbG9yOiNmZmY7IHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7fQoubGF5dWktbGF5ZXItaW1ndGl0IGVte3BhZGRpbmctbGVmdDoxMHB4OyBmb250LXN0eWxlOiBub3JtYWw7fQoKLyog5YWz6Zet5Yqo55S7ICovCkAtd2Via2l0LWtleWZyYW1lcyBsYXllci1ib3VuY2VPdXQgewogIDEwMCUge29wYWNpdHk6IDA7IC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSguNyk7IHRyYW5zZm9ybTogc2NhbGUoLjcpfQogIDMwJSB7LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMDUpOyB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpfQogIDAlIHstd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7IHRyYW5zZm9ybTogc2NhbGUoMSk7fQp9CkBrZXlmcmFtZXMgbGF5ZXItYm91bmNlT3V0IHsKICAxMDAlIHtvcGFjaXR5OiAwOyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoLjcpOyAtbXMtdHJhbnNmb3JtOiBzY2FsZSguNyk7IHRyYW5zZm9ybTogc2NhbGUoLjcpO30KICAzMCUgey13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTsgLW1zLXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7IHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7fQogIDAlIHstd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7IC1tcy10cmFuc2Zvcm06IHNjYWxlKDEpO3RyYW5zZm9ybTogc2NhbGUoMSk7fQp9Ci5sYXllci1hbmltLWNsb3Nley13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGxheWVyLWJvdW5jZU91dDsgYW5pbWF0aW9uLW5hbWU6IGxheWVyLWJvdW5jZU91dDsgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOyBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOyAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjouMnM7IGFuaW1hdGlvbi1kdXJhdGlvbjouMnM7fQoKQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTEwMHB4KSB7CiAgLmxheXVpLWxheWVyLWlmcmFtZXtvdmVyZmxvdy15OiBhdXRvOyAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7fQp9CgoK"

/***/ })
/******/ ]);