class CRDTSet {

    constructor(bias) {
        this.addSet = new Map();
        this.removeSet = new Map();
        this.bias = bias;
    }

    addToSet(element, set){
        // New Element
        if (!set.has(element.value)) {
            set.set(element.value, element.timeStamp);
            return;
        }

        // Update Element
        if (set.get(element.value).timeStamp < element.timeStamp) {
            set.set(element.value, element.timeStamp);
            return;
        }
    }

    add(element) {
        this.addToSet(element, this.addSet);
    }

    remove(element) {
        this.addToSet(element, this.removeSet);
    }

    getAll(){
        let result = [];
        this.addSet.forEach((timeStamp, key) => {
            // Add bias
            if (this.bias == "add" && this.removeSet.has(key) && this.removeSet.get(key) > timeStamp){
                return;
            }
            // Delete bias
            if (this.bias == "delete" && this.removeSet.has(key) && this.removeSet.get(key) >= timeStamp){
                return;
            }

            result.push(key);
        })

        return result.sort();
    }

    mergeTwoSets(SetA, SetB) {

        let result = SetA;

        SetB.forEach((timeStamp, key) => {
            // New element
            if (!SetA.has(key)){
                result.set(key, timeStamp);
            }

            // Update Element
            if (this.bias == "add" && SetA.has(key) && SetA.get(key) <= timeStamp){
                result.set(key, timeStamp);
            }
        })

        return result;
    }

    merge(CRDTSet){
        this.addSet = this.mergeTwoSets(this.addSet, CRDTSet.addSet);
        this.removeSet = this.mergeTwoSets(this.removeSet, CRDTSet.removeSet);
        return this.getAll();
    }
}

module.exports = CRDTSet;