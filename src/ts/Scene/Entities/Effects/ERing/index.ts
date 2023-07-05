import * as GLP from 'glpower';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

import eRingVert from './shaders/eRing.vs';
import eRingFrag from './shaders/eRing.fs';

export class ERing extends GLP.Entity {

	constructor() {

		super();

		const r = 0.5;

		/*-------------------------------
			Geometyr
		-------------------------------*/

		const geo = new GLP.RingGeometry( r, r * 0.985, 32 );
		this.addComponent( "geometry", geo );

		/*-------------------------------
			Material
		-------------------------------*/

		const matName = "eRing";

		const mat = this.addComponent( "material", new GLP.Material( {
			name: matName,
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uRnd: {
					value: new GLP.Vector( Math.random(), Math.random() ),
					type: "2fv"
				}
			} ),
			vert: hotGet( matName + "vs", eRingVert ),
			frag: hotGet( matName + "fs", eRingFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/eRing.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( matName + "fs", module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/eRing.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( matName + "vs", module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
