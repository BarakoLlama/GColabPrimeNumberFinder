function isPrime(number = Number(), previousPrimes = Array()){
    // Shortcut
    previousPrimes.forEach(function(prime){
        if(number%prime == 0){return false}
    })
    var numberPart = number - 1
    while(numberPart > 1){
        if(number%numberPart == 0){return false}
        numberPart--
    }
    return true
}

var primesFound = []
var currentScan = 2
var primesFoundSinceLastUpdate = 0
var numbersSinceLastUpdate = 0
var secondsPassed = 0
var lastTime = Date.now()

while(true){
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
    }
    currentScan++
}