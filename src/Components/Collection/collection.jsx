import React from 'react';
import Poise from '../Poise/poise';
import Elegant from '../Elegant/elegant';
import Dapper from '../Dapper/dapper';
import Slider from '../Slider/slider';
import PoiseCollection from '../poisecollection/poisecollection';
import './collection.css';

const Collection = () => {
    return (
        <div>
            <div className="allcollection">
                <div className="newcolection">
                    <Poise/>
                </div>
                <div className="subcollection">
                
                    <div className="othercollection">
                        <Slider/>
                        <Elegant/>
                        <Dapper/>
                        <PoiseCollection/>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Collection;