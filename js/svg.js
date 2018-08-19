"use strict";

let svg = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
if (!svg) document.getElementsByTagName('html')[0].className += ' nosvg';