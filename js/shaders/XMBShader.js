/**
 * @author javdevgames http://coding.javdev.com
 *
 * XMB Shader
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
