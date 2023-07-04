#include <common>
#include <vert_h>

out float vAlpha;

uniform float uTime;

void main( void ) {

	#include <vert_in>

	vUv.x *= modelMatrix[0][0] / modelMatrix[1][1];

	#include <vert_out>
	
}