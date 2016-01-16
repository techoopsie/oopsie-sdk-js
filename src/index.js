
import OopsieObject from './object.js';

(function(window){
    //I recommend this
    'use strict';

    //define globally if it doesn't already exist
    if(typeof(Oopsie) === 'undefined'){
        window.Oopsie = OopsieObject;
    } else {
        console.log("Oopsie already defined.");
    }

})(window);
