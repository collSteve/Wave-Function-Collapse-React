import React from 'react';
import { Cord2D } from '../utils/standard-models';

export default class HomePage extends React.Component {
    render(): React.ReactNode {
        const c1 = new Cord2D(1,2);
        const c2 = new Cord2D(1,2);
        console.log(`Equal: ${c1 == c2}`);
        console.log(`Equal strict: ${c1 === c2}`);
        console.log(`Equal custom: ${c1.equals(c2)}`);

        const z1 = {x:1, y:2};
        const z2 = {x:1, y:2};

        console.log(`z1 Equal: ${z1 == z2}`);
        console.log(`z1 Equal strict: ${z1 === z2}`);
        return (<div>Home Page Here</div>);
    }
}