/* eslint-disable */

const LifxLanColor = function() {
	this._CSS_COLOR_KEYWORDS = {
		'aliceblue': [240, 248, 255],
		'antiquewhite': [250, 235, 215],
		'aqua': [0, 255, 255],
		'aquamarine': [127, 255, 212],
		'azure': [240, 255, 255],
		'beige': [245, 245, 220],
		'bisque': [255, 228, 196],
		'black': [0, 0, 0],
		'blanchedalmond': [255, 235, 205],
		'blue': [0, 0, 255],
		'blueviolet': [138, 43, 226],
		'brown': [165, 42, 42],
		'burlywood': [222, 184, 135],
		'cadetblue': [95, 158, 160],
		'chartreuse': [127, 255, 0],
		'chocolate': [210, 105, 30],
		'coral': [255, 127, 80],
		'cornflowerblue': [100, 149, 237],
		'cornsilk': [255, 248, 220],
		'crimson': [220, 20, 60],
		'cyan': [0, 255, 255],
		'darkblue': [0, 0, 139],
		'darkcyan': [0, 139, 139],
		'darkgoldenrod': [184, 134, 11],
		'darkgray': [169, 169, 169],
		'darkgreen': [0, 100, 0],
		'darkgrey': [169, 169, 169],
		'darkkhaki': [189, 183, 107],
		'darkmagenta': [139, 0, 139],
		'darkolivegreen': [85, 107, 47],
		'darkorange': [255, 140, 0],
		'darkorchid': [153, 50, 204],
		'darkred': [139, 0, 0],
		'darksalmon': [233, 150, 122],
		'darkseagreen': [143, 188, 143],
		'darkslateblue': [72, 61, 139],
		'darkslategray': [47, 79, 79],
		'darkslategrey': [47, 79, 79],
		'darkturquoise': [0, 206, 209],
		'darkviolet': [148, 0, 211],
		'deeppink': [255, 20, 147],
		'deepskyblue': [0, 191, 255],
		'dimgray': [105, 105, 105],
		'dimgrey': [105, 105, 105],
		'dodgerblue': [30, 144, 255],
		'firebrick': [178, 34, 34],
		'floralwhite': [255, 250, 240],
		'forestgreen': [34, 139, 34],
		'fuchsia': [255, 0, 255],
		'gainsboro': [220, 220, 220],
		'ghostwhite': [248, 248, 255],
		'gold': [255, 215, 0],
		'goldenrod': [218, 165, 32],
		'gray': [128, 128, 128],
		'green': [0, 128, 0],
		'greenyellow': [173, 255, 47],
		'grey': [128, 128, 128],
		'honeydew': [240, 255, 240],
		'hotpink': [255, 105, 180],
		'indianred': [205, 92, 92],
		'indigo': [75, 0, 130],
		'ivory': [255, 255, 240],
		'khaki': [240, 230, 140],
		'lavender': [230, 230, 250],
		'lavenderblush': [255, 240, 245],
		'lawngreen': [124, 252, 0],
		'lemonchiffon': [255, 250, 205],
		'lightblue': [173, 216, 230],
		'lightcoral': [240, 128, 128],
		'lightcyan': [224, 255, 255],
		'lightgoldenrodyellow': [250, 250, 210],
		'lightgray': [211, 211, 211],
		'lightgreen': [144, 238, 144],
		'lightgrey': [211, 211, 211],
		'lightpink': [255, 182, 193],
		'lightsalmon': [255, 160, 122],
		'lightseagreen': [32, 178, 170],
		'lightskyblue': [135, 206, 250],
		'lightslategray': [119, 136, 153],
		'lightslategrey': [119, 136, 153],
		'lightsteelblue': [176, 196, 222],
		'lightyellow': [255, 255, 224],
		'lime': [0, 255, 0],
		'limegreen': [50, 205, 50],
		'linen': [250, 240, 230],
		'magenta': [255, 0, 255],
		'maroon': [128, 0, 0],
		'mediumaquamarine': [102, 205, 170],
		'mediumblue': [0, 0, 205],
		'mediumorchid': [186, 85, 211],
		'mediumpurple': [147, 112, 219],
		'mediumseagreen': [60, 179, 113],
		'mediumslateblue': [123, 104, 238],
		'mediumspringgreen': [0, 250, 154],
		'mediumturquoise': [72, 209, 204],
		'mediumvioletred': [199, 21, 133],
		'midnightblue': [25, 25, 112],
		'mintcream': [245, 255, 250],
		'mistyrose': [255, 228, 225],
		'moccasin': [255, 228, 181],
		'navajowhite': [255, 222, 173],
		'navy': [0, 0, 128],
		'oldlace': [253, 245, 230],
		'olive': [128, 128, 0],
		'olivedrab': [107, 142, 35],
		'orange': [255, 165, 0],
		'orangered': [255, 69, 0],
		'orchid': [218, 112, 214],
		'palegoldenrod': [238, 232, 170],
		'palegreen': [152, 251, 152],
		'paleturquoise': [175, 238, 238],
		'palevioletred': [219, 112, 147],
		'papayawhip': [255, 239, 213],
		'peachpuff': [255, 218, 185],
		'peru': [205, 133, 63],
		'pink': [255, 192, 203],
		'plum': [221, 160, 221],
		'powderblue': [176, 224, 230],
		'purple': [128, 0, 128],
		'rebeccapurple': [102, 51, 153],
		'red': [255, 0, 0],
		'rosybrown': [188, 143, 143],
		'royalblue': [65, 105, 225],
		'saddlebrown': [139, 69, 19],
		'salmon': [250, 128, 114],
		'sandybrown': [244, 164, 96],
		'seagreen': [46, 139, 87],
		'seashell': [255, 245, 238],
		'sienna': [160, 82, 45],
		'silver': [192, 192, 192],
		'skyblue': [135, 206, 235],
		'slateblue': [106, 90, 205],
		'slategray': [112, 128, 144],
		'slategrey': [112, 128, 144],
		'snow': [255, 250, 250],
		'springgreen': [0, 255, 127],
		'steelblue': [70, 130, 180],
		'tan': [210, 180, 140],
		'teal': [0, 128, 128],
		'thistle': [216, 191, 216],
		'tomato': [255, 99, 71],
		'turquoise': [64, 224, 208],
		'violet': [238, 130, 238],
		'wheat': [245, 222, 179],
		'white': [255, 255, 255],
		'whitesmoke': [245, 245, 245],
		'yellow': [255, 255, 0],
		'yellowgreen': [154, 205, 50]
	};
};

LifxLanColor.prototype.cssToHsb = function(p) {
	// Check the parameters
	if(!('css' in p)) {
		return {error: new Error('The `css` is required.')};
	}
	let css = p['css'];
	if(typeof(css) !== 'string') {
		return {error: new Error('The `css` must be a string.')};
	}
	//
	css = css.toLowerCase();
	let rgb = {};
	if(css.match(/^\#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/)) {
		rgb = {
			red   : parseInt(RegExp.$1, 16) / 255,
			green : parseInt(RegExp.$2, 16) / 255,
			blue  : parseInt(RegExp.$3, 16) / 255
		};
	} else if(css.match(/^rgb\(\s*(\d{1,3})\,\s*(\d{1,3})\,\s*(\d{1,3})\s*\)$/)) {
		rgb = {
			red   : parseInt(RegExp.$1, 10) / 255,
			green : parseInt(RegExp.$2, 10) / 255,
			blue  : parseInt(RegExp.$3, 10) / 255
		};
	} else if(this._CSS_COLOR_KEYWORDS[css]) {
		let c = this._CSS_COLOR_KEYWORDS[css];
		rgb = {
			red   : c[0] / 255,
			green : c[1] / 255,
			blue  : c[2] / 255
		};
	} else {
		return {error: new Error('The `css` is invalid as a CSS color string.')};
	}
	return this.rgbToHsb(rgb);
};

/* ------------------------------------------------------------------
* Method: rgbToHsb(params)
* - params:
*   - red   | Float | Required | R component. 0.0 - 1.0.
*   - green | Float | Required | G component. 0.0 - 1.0.
*   - blue  | Float | Required | B component. 0.0 - 1.0.
* ---------------------------------------------------------------- */
LifxLanColor.prototype.rgbToHsb = function(p) {
	// Check the parameters
	let error = null;
	['red', 'green', 'blue'].forEach((c) => {
		if(c in p) {
			let v = p[c];
			if(typeof(v) !== 'number' || v < 0 || v > 1) {
				error = new Error('The `' + c + '` must be a float between 0.0 and 1.0.');
			}
		} else {
			error = new Error('The `' + c + '` is required.');
		}
	});
	if(error) {
		return {error: error};
	}
	let r = p['red'] * 255;
	let g = p['green'] * 255;
	let b = p['blue'] * 255;
	// Determine the max and min value in RGB
	let max = Math.max(r, g, b);
	let min = Math.min(r, g, b);
	// Hue
	let hue = 0;
	if(r === max && g === max && b === max) {
		hue = 0;
	} else if(r === max) {
		hue = 60 * ((g - b) / (max - min));
	} else if(g === max) {
		hue = 60 * ((b - r) / (max - min)) + 120;
	} else {
		hue = 60 * ((r - g) / (max - min)) + 240;
	}
	if(hue < 0) {
		hue += 360;
	}
	hue = hue / 360;
	// Saturation
	let sat = 0;
	if(max > 0) {
		sat = (max - min) / max;
	}
	// Brightness
	let bri = max / 255;
	return {
		hsb: {
			hue        : hue,
			saturation : sat,
			brightness : bri
		}
	};
};

const col = new LifxLanColor();

module.exports = (cssColour) => {
  return {...col.cssToHsb(cssColour).hsb, kelvin: 3500};
};