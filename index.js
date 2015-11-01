var testString = require('fs').readFileSync('data.json', 'UTF-8');

testString = testString
    .replace(/[^’{}:,\[\]"]/g, 1) // Just making sure nothing but these characters exist
    // .replace(/’/g, 'abcd') // Uncomment this line to stop seeing the issue
    ;

var count = 0;
function doIt() {
    var x = JSON.parse(testString);
    global.gc();
    console.log('Round', count);
    count += 1;
    setTimeout(doIt);
}

setTimeout(doIt);
