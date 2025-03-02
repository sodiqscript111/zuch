import React from 'react';
import Poise from '../Poise/poise';
import Elegant from '../Elegant/elegant';
import Dapper from '../Dapper/dapper';
import Slider from '../Slider/slider';
import PoiseCollection from '../poisecollection/poisecollection';
import ServiceCards from '../Ourservice/service';
import Feedback from '../Feedback/feedback';
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
                        <ServiceCards/>
                        <Elegant/>
                        <Dapper/>
                        <PoiseCollection/>
                        <Feedback/>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Collection;