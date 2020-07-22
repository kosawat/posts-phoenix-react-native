export default compareValues = (key) => {
    // compare function for sorting array
    return  (a, b) => {
        
        // return 0 if both do not have the key property, e.g both keys are null
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
        }

        // ignore character casting, thus convert it to uppercase before sorting
        const keyA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
        const keyB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

        // sort asc, null always comes last
        let comparison = 0;
        if (keyA > keyB || keyA === null) {
        comparison = 1;
        } else if (keyA < keyB || keyB == null) {
        comparison = -1;
        } 

        return comparison;
    };
  };