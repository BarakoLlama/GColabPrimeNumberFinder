const fs = require('fs')

function isPrime(number = Number(), previousPrimes = Array()){
    // Shortcuts
    if(number > 9){
        var clc = String(number)
        if(clc.endsWith("0")){return false}
        if(clc.endsWith("2")){return false}
        if(clc.endsWith("4")){return false}
        if(clc.endsWith("5")){return false}
        if(clc.endsWith("6")){return false}
        if(clc.endsWith("8")){return false}
    }
    var numberMax = number - 1
    var numberPart = 2
    while(numberPart <= numberMax){
        if(number%numberPart == 0){return false}
        numberPart++
    }
    return true
}
async function asyncSave(pfound){
    fs.writeFileSync("./primes.txt", pfound.toString())
}

var primesFound = []
var currentScan = 2
var primesFoundSinceLastUpdate = 0
var numbersSinceLastUpdate = 0
var secondsPassed = 0
var lastTime = Date.now()
var maxScan = Infinity

if(process.argv[2] !== undefined){currentScan = Number(process.argv[2])}
if(process.argv[3] !== undefined){maxScan = Number(process.argv[3])}

while(currentScan <= maxScan){
    if(isPrime(currentScan, primesFound)){
        primesFoundSinceLastUpdate++
        primesFound.push(currentScan)
    }
    numbersSinceLastUpdate++
    var now = Date.now()
    if((now%1000 == 0) && (now !== lastTime)){
        var stack = Math.floor((Date.now() - lastTime) / 1000)
        secondsPassed = secondsPassed + stack
        var speed = (numbersSinceLastUpdate / (stack*1000)).toFixed(2)
        console.log("Found "+primesFoundSinceLastUpdate+" new primes with "+secondsPassed+" seconds passed. Speed: "+speed+"knum/s, Total: "+primesFound.length+", Scanned so far: "+currentScan)
        primesFoundSinceLastUpdate = 0
        numbersSinceLastUpdate = 0
        lastTime = now
        asyncSave(primesFound)
    }
    currentScan++
}
fs.writeFileSync("./primes.txt", primesFound.toString())