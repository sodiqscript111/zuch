import React from 'react';
import Poise from '../Poise/poise';
import Elegant from '../Elegant/elegant';
import Dapper from '../Dapper/dapper';
const Collection = () => {
    return (
        <div>
            <div className="allcollection">
                <div className="newcolection">
                    <Poise/>
                </div>
                <div className="subcollection">
                    <div className="othercollection">
                        <Elegant/>
                        <Dapper/>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Collection;