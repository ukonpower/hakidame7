import * as GLP from 'glpower';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

import eGridDotVert from './shaders/eGridDot.vs';
import eGridDotFrag from './shaders/eGridDot.fs';

export class EGridDot extends GLP.Entity {

	constructor() {

		super();

		const res = new GLP.Vector( 8, 8 );
		const size = new GLP.Vector( 1, 1 );

		/*-------------------------------
			Geometyr
		-------------------------------*/

		const geo = new GLP.PlaneGeometry( size.x / res.x * 0.5, size.y / res.y * 0.5 );

		const instancePosArray: number[] = [];
		const instanceIdArray: number [] = [];


		for ( let i = 0; i < res.y; i ++ ) {

			for ( let j = 0; j < res.x; j ++ ) {

				instancePosArray.push(
					j * ( size.x / res.x ) - size.x / 2, i * ( size.y / res.y ) - size.y / 2, 0
				);

				instanceIdArray.push(
					j, i, Math.random()
				);

			}

		}

		geo.setAttribute( "insPos", new Float32Array( instancePosArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "insId", new Float32Array( instanceIdArray ), 3, { instanceDivisor: 1 } );

		this.addComponent( "geometry", geo );

		/*-------------------------------
			Material
		-------------------------------*/

		const matName = "eGridDot";

		const mat = this.addComponent( "material", new GLP.Material( {
			name: matName,
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			vert: hotGet( matName + "vs", eGridDotVert ),
			frag: hotGet( matName + "fs", eGridDotFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/eGridDot.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( matName + "fs", module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/eGridDot.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( matName + "vs", module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
