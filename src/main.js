import jquery from "jquery";
import layer from "./layer";
import datepicker from "./datepicker/jquery.jedate";
import Vue from 'vue';

require('./layer/theme/default/layer.css')
require('./datepicker/skin/jedate.css')

export function VueMiddleLayer() {}
  VueMiddleLayer.install = function(Vue, options) {
  Vue.prototype.$layer = layer;
  Vue.prototype.$datepicker = datepicker;
}
