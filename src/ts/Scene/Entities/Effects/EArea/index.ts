import * as GLP from 'glpower';
import { EBorder } from '../EBorder';
import { ECross } from '../ECross';
import { EGridDots } from '../EGridDots';
import { ERing } from '../ERing';
import { EGridLine } from '../EGridLine';

export class EArea extends GLP.Entity {

	private effects: GLP.Entity[];
	private range: GLP.Vector;

	constructor( num = 50.0, range = new GLP.Vector( 10, 5, 5 ) ) {

		super();

		this.range = range;

		this.effects = [];

		const getEffect = ( ) => {

			const t = Math.floor( Math.random() * 5.0 );

			if ( t == 0 ) {

				return new EBorder();

			} else if ( t == 1 ) {

				return new ECross();

			} else if ( t == 2 ) {

				const gridType = Math.random() < 0.5 ? 'circle' : 'square';

				return new EGridDots( gridType, undefined, undefined, Math.random() );

			} else if ( t == 3 ) {

				const ringType = Math.random() < 0.5 ? 'line' : 'dash';

				return new ERing( ringType );

			} else if ( t == 4 ) {

				return new EGridLine( undefined, undefined, new GLP.Vector( Math.random(), Math.random() ) );

			}

			return new GLP.Entity();

		};

		for ( let i = 0; i < num; i ++ ) {

			const effect = getEffect();
			effect.position.set( range.x * Math.random(), range.y * Math.random(), range.z * Math.random() );
			effect.position.sub( range.clone().divide( 2.0 ) );

			effect.scale.multiply( Math.random() * 0.8 + 0.2 );

			this.add( effect );

		}

	}

}
