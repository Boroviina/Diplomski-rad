/**
 * create an object composed of the picked object properties
 * new object contains keys that are explicitly named in array 'keys'
 * @param object - properties are chosen from this
 * @param keys -the array of keys that we should choose
 *
 * @method keys.reduce - creates a new object with chosen features
 */

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {      //prolazak kroz svaki element niza keys
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

module.exports = pick;