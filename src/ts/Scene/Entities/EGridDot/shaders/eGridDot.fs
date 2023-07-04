#include <common>
#include <packing>
#include <frag_h>

in float vAlpha;

void main( void ) {

	if( vAlpha < 0.5 ) discard;

	#include <frag_in>

	outEmission = vec3( 1.0 );

	#include <frag_out>

} 