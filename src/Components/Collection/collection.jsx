import React from 'react';
import Poise from '../Poise/poise';
import Elegant from '../Elegant/elegant';
import Slider from '../Slider/slider';
import ServiceCards from '../Ourservice/service';
import Feedback from '../Feedback/feedback';
import CategoryList from '../CollectionList/collectionlist';
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
                        <CategoryList/>
                        <ServiceCards/>
                        <Feedback/>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Collection;