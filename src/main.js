import jquery from "jquery";
import layer from "./layer";
import datepicker from "./datepicker/jquery.jedate";
import colorpicker from "./colorpicker/jsColor";
import popup from "./popup";
import Vue from 'vue';

require('./layer/theme/default/layer.css')
require('./datepicker/skin/jedate.css')
require('./popup/popup-plugin.css')

function VueMiddleLayer() {}
  VueMiddleLayer.install = function(Vue, options) {
  Vue.prototype.$layer = layer;
  Vue.prototype.$datepicker = datepicker;
  Vue.prototype.$popup = popup;
  Vue.prototype.$colorpicker = colorpicker;
}

export default VueMiddleLayer;
