#include <common>
#include <packing>
#include <frag_h>

in float vTime;

void main( void ) {

	float alpha = smoothstep( 0.0, 0.1, -vUv.x + vTime * ( 1.1 ) * 10.0 );

	float dis = smoothstep( 0.6, 0.63, vTime );

	alpha *= mix( cos( dis * 100.0  ), 0.0, dis );

	if( alpha <= 0.0 ) discard;

	#include <frag_in>

	outEmission = vec3( alpha );

	#include <frag_out>

} 