const test = require("tape");
const turf = require("@turf/turf");
const featureUtils = require("../src/feature_utils");

test("geohub - combine two lines, same order", {skip: false}, t => {
  const baseLine = turf.lineString([[9, 50], [10, 50], [11, 50]]);
  const secondLine = turf.lineString([[11, 50], [12, 49], [13, 49]]);
  const combinedCords = featureUtils.combineSameTypeFeatures([baseLine, secondLine]);
  t.equals(JSON.stringify(combinedCords), "[[9,50],[10,50],[11,50],[12,49],[13,49]]");
  t.end();
});

test("geohub - combine two lines, second reverse order", {skip: false}, t => {
  const baseLine = turf.lineString([[9, 50], [10, 50], [11, 50]]);
  const secondLine = turf.lineString([[13, 49], [12, 49], [11, 50]]);
  const combinedCords = featureUtils.combineSameTypeFeatures([baseLine, secondLine]);
  t.equals(JSON.stringify(combinedCords), "[[9,50],[10,50],[11,50],[12,49],[13,49]]");
  t.end();
});


test("geohub - combine two lines, apart", {skip: false}, t => {
  const baseLine = turf.lineString([[9, 50], [10, 50], [11, 50]]);
  const secondLine = turf.lineString([[11, 49], [12, 49], [13, 49]]);
  const combinedCords = featureUtils.combineSameTypeFeatures([baseLine, secondLine]);
  t.equals(JSON.stringify(combinedCords), "[[9,50],[10,50],[11,50],[11,49],[12,49],[13,49]]");
  t.end();
});


test("geohub - combine two lines, apart reverse", {skip: false}, t => {
  const baseLine = turf.lineString([[9, 50], [10, 50], [11, 50]]);
  const secondLine = turf.lineString([[13, 49], [12, 49], [11, 49]]);
  const combinedCords = featureUtils.combineSameTypeFeatures([baseLine, secondLine]);
  t.equals(JSON.stringify(combinedCords), "[[9,50],[10,50],[11,50],[11,49],[12,49],[13,49]]");
  t.end();
});

test("geohub - combine two lines, not apart reverse", {skip: false}, t => {
  const baseLine = turf.lineString([[9.2202326, 49.1438103],
    [9.2202022, 49.1438226],
    [9.2199531, 49.1439048],
    [9.2196177, 49.1440264],
    [9.2195749, 49.1440446],
    [9.2195515, 49.1440619]]);
  const secondLine = turf.lineString([[9.2202007, 49.1435182],
    [9.2202059, 49.1435552],
    [9.2202431, 49.143794],
    [9.2202326, 49.1438103]
  ]);
  const combinedCords = featureUtils.combineSameTypeFeatures([baseLine, secondLine]);
  t.equals(combinedCords.length, 9);
  t.equals(combinedCords[0][0], 9.2202007);
  t.equals(combinedCords[0][1], 49.1435182);
  t.equals(JSON.stringify(combinedCords), "[[9.2202007,49.1435182],[9.2202059,49.1435552],[9.2202431,49.143794],[9.2202326,49.1438103],[9.2202022,49.1438226],[9.2199531,49.1439048],[9.2196177,49.1440264],[9.2195749,49.1440446],[9.2195515,49.1440619]]");
  t.end();
});
