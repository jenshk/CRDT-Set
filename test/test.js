let assert = require('assert');
const CRDTSet = require('../CRDT_set.js');
const Element = require('../Element.js');

describe('CRDTSet', function() {
    describe('Add / Remove elements', function() {
      it('Add elements "ABC"', function() {
        let set = new CRDTSet("add")
        set.add(new Element("A", 0));
        set.add(new Element("B", 1));
        set.add(new Element("C", 2));
        const result = set.getAll().join('');

        assert.equal(result, "ABC");
      });

      it('Add element, Remove element', function() {
        let set = new CRDTSet("add")
        set.add(new Element("A", 0));
        set.remove(new Element("A", 1));
        const result = set.getAll().join('');

        assert.equal(result, "");
      });

      it('Remove element, Add element', function() {
        let set = new CRDTSet("add")
        set.remove(new Element("A", 0));
        set.add(new Element("A", 1));
        const result = set.getAll().join('');

        assert.equal(result, "A");
      });
    });

    describe('BIAS', function() {

      it('Add Bias - Add / Remove element at time 0', function() {
        let set = new CRDTSet("add")  
        set.add(new Element("A", 0));
        set.remove(new Element("A", 0));
        const result = set.getAll().join('');

        assert.equal(result, "A");
      });

      it('Delete Bias - Add / Remove element at time 0', function() {
        let set = new CRDTSet("delete")  
        set.add(new Element("A", 0));
        set.remove(new Element("A", 0));
        const result = set.getAll().join('');

        assert.equal(result, "");
      });
    });

    describe('Merge two CRDTSets', function() {
      it('Merge AB with B!A', function() {
        let setA = new CRDTSet("add")  
        setA.add(new Element("A", 0));
        setA.add(new Element("B", 1));

        let setB = new CRDTSet("add") 
        setB.add(new Element("B", 3));
        setB.remove(new Element("A", 1));

        const result = setA.merge(setB)
        assert.equal(result, "B");
      });
    })

  });