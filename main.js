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
var secondsPassed = 0

setInterval(() => {
    var toSend = "Found "+primesFoundSinceLastUpdate+" new primes with "+secondsPassed+" seconds passed."
    console.log(toSend)
    secondsPassed++
    primesFoundSinceLastUpdate = 0
}, 1000)

while(true){
    if(isPrime(currentScan, primesFound)){
        primesFoundSinceLastUpdate++
        primesFound.push(currentScan)
    }
    currentScan++
}