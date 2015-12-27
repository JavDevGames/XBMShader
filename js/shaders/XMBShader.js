/**
 * @author javdevgames http://coding.javdev.com
 *
 * XMB Shader
 * The MIT License (MIT)

 * Copyright (c) 2015 javdevgames

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

THREE.XMBShader = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"time":    { type: "f", value: 0.0 },
		"speed":    { type: "f", value: 0.2 },
		"widthFactor":    { type: "f", value: 4.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float time;",
		"uniform float speed;",
		"uniform float widthFactor;",
		
		"varying vec2 vUv;",
		
		"vec3 calcSine(vec2 uv, float frequency, float amplitude, float shift, float offset, vec3 color, float width, float exponent, bool dir)",
		"{",
			"float angle = time * speed * frequency + (shift + uv.x) * 3.14;",
		
			"float y = sin(angle) * amplitude + offset;",
			"float diffY = y - uv.y;",
			"float dsqr = distance(y,uv.y);",
			"float scale = 1.0;",
			
			"if(dir && diffY > 0.0)",
			"{",
				"dsqr = dsqr * 8.0;",
			"}",
			"else if(!dir && diffY < 0.0)",
			"{",
				"dsqr = dsqr * 8.0;",
			"}",
			
			"scale = pow(smoothstep(width * widthFactor, 0.0, dsqr), exponent);",
			
			"return min(color * scale, color);",		
		"}",	

		"void main() {",
			"vec2 uv = vUv;",
			"vec3 color = vec3(0.0);",
			"float colorHelper = 0.5;",
			
			"float t1 = (sin(time/20.0) / 3.14) + 0.2;",
			"float t2 = (sin(time/10.0) / 3.14) + 0.2;",
			
			"color += calcSine(uv, 0.20, 0.2, 0.0, 0.5,  vec3(0.5, 0.5, 0.5), 0.1, 15.0,false);",
			"color += calcSine(uv, 0.40, 0.15, 0.0, 0.5, vec3(0.5, 0.5, 0.5), 0.1, 17.0,false);",
			"color += calcSine(uv, 0.60, 0.15, 0.0, 0.5, vec3(0.5, 0.5, 0.5), 0.05, 23.0,false);",
			
			"color += calcSine(uv, 0.26, 0.07, 0.0, 0.3, vec3(0.5, 0.5, 0.5), 0.1, 17.0,true);",
			"color += calcSine(uv, 0.46, 0.07, 0.0, 0.3, vec3(0.5, 0.5, 0.5), 0.05, 23.0,true);",
			"color += calcSine(uv, 0.58, 0.05, 0.0, 0.3, vec3(0.5, 0.5, 0.5), 0.2, 15.0,true);",
			
			"color.x += t1 * (1.0-uv.y);",
			"color.y += t2 * (1.0-uv.y);",
			
			"gl_FragColor = vec4(color,1.0);",

		"}"

	].join( "\n" )

};
