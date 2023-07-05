#include <common>
#include <vert_h>

out float vTime;

uniform float uTime;
uniform vec2 uRnd;

#include <rotate>

void main( void ) {

	vTime = fract( uTime * 0.2 + uRnd.x );
	
	#include <vert_in>
	outPos.xy *= rotate( smoothstep( 0.0, 0.1, vTime ) * uRnd.y * 15.0 + uRnd.x );
	
	#include <vert_out>

	
}