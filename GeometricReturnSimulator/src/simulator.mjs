import { TDigest } from 'tdigest'

export class ProbAndResult {
    // Both should be decimals, so 20% change of a -10% return is: new ProbAndResult(.2, -.1)
    constructor(prob, result) {
        this.prob = prob
        this.result = result
    }
}

export function printReturns(tdigest, percentilesofInterest) {
    const results = tdigest.percentile(percentilesofInterest)
    for (let i = 0; i < percentilesofInterest.length; i++) {
        const percentile = percentilesofInterest[i]
        const result = results[i]

        console.log(`Percent of Wealth Left: ${(result * 100).toFixed(2)}% Percentile: ${percentile.toFixed(2) * 100}th`)
    }
}

export class Simulator {
    static runSimulation(probAndResults, runCount, iterationsPerRun) {
        // TODO: allow greater precision. Right now only allowing 10,000
        const lookupSize = 10000
        const lookup = new Array(lookupSize)
        let curLookupPosition = 0
        probAndResults.forEach(probAndResult => {
            const prob = probAndResult.prob
            const lookupPlaceCount = prob * lookupSize

            // Populating the lookup array.
            for (let i = 0; i < lookupPlaceCount; i++) {
                if (curLookupPosition < lookupSize) {
                    lookup[curLookupPosition] = probAndResult.result
                    curLookupPosition++
                }
            }
        })

        const tdigest = new TDigest()
        for (let i = 0; i < runCount; i++) {
            let curWealthPercentage = 1.0 // Start at 100% of wealth.
            for (let j = 0; j < iterationsPerRun; j++) {
                const lookupPosition = Math.floor(lookupSize * Math.random())
                const lookupReturn = lookup[lookupPosition]

                curWealthPercentage = curWealthPercentage * lookupReturn
            }

            tdigest.push(curWealthPercentage)
        }

        return tdigest
    }
}