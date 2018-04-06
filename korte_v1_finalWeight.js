/*

*/
var barLoader = {
  availablePairPlates: [25, 25, 20, 20, 15, 15, 10, 10, 5, 5, 2.5, 2.5, 1.25, 1.25],
  baseWeight: 0,
  loadedWeight: 0,
  targetWeight: 0,
  finalDifference: 0,
  loadedPairPlates: [],
  load: function (targetWeight) {
    // console.log("loaded pair plates: " + this.loadedPairPlates);
    this.targetWeight = targetWeight;
    var currentDifference = targetWeight - this.baseWeight;
    this.availablePairPlates.forEach(function(platePair, index){
      if (currentDifference>0 && currentDifference>=platePair*2) {
        this.loadedPairPlates.push(platePair);
        currentDifference-=platePair*2
        this.loadedWeight+=platePair*2
      }
    }, this);

    this.availablePairPlates.forEach(function(platePair, index){
      if (currentDifference>0 && currentDifference>Math.abs(this.loadedWeight+platePair*2-this.targetWeight)) {
        this.loadedPairPlates.push(platePair);
        currentDifference-=platePair*2
        this.loadedWeight+=platePair*2
      }
    }, this);

    this.finalDifference = currentDifference;
  },
  setBaseWeight: function(weight) {
    this.baseWeight=weight;
    this.loadedWeight=weight;
    this.loadedPairPlates=[];
  },
};

// target weights
var davidSquatWeight = 77;
var lukasSquatWeight = 98;


// David starts with lower weight
var davidBar = Object.assign({}, barLoader);
davidBar.setBaseWeight(20); // baseWeight = weight of olympic bar (20kg)
davidBar.load(davidSquatWeight) // load desired weight
console.log("David started with base weight of " + davidBar.baseWeight + "kg and loaded: " + davidBar.loadedPairPlates + " pair plates.\n"+
"Total weight of bar is " + davidBar.loadedWeight + " kg with difference of " + davidBar.finalDifference +"kg from desired weight.\n"+
"---------------------------------------------------------------------------------------\n");
// Lukas continues and use David's weight as base weight
var lukasBar = Object.assign({}, barLoader);
lukasBar.setBaseWeight(davidBar.loadedWeight); // baseWeight = David's loadedWeight
lukasBar.load(lukasSquatWeight); // load up to desired weight
console.log("Lukas started with base weight of " + lukasBar.baseWeight + "kg and loaded: " + lukasBar.loadedPairPlates + " pair plates.\n"+
"Total weight of bar is " + lukasBar.loadedWeight + " kg with difference of " + lukasBar.finalDifference +"kg from desired weight.\n"+
"---------------------------------------------------------------------------------------\n");
