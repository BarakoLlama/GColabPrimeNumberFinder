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
while(true){
    if(isPrime(currentScan, primesFound)){
        console.log("FOUND PRIME "+currentScan)
        primesFound.push(currentScan)
    }
    currentScan++
}