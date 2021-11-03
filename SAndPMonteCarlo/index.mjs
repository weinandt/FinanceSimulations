import { SAndP500Data } from "../SAndPProbDistribution/index.mjs"

const startingWealth = 1.0 * 1000 * 1000
const years = 25
let currentWealth = startingWealth
const tdigest = SAndP500Data.getYearlyReturnsTDigest()

for (let i = 0; i < years; i++) {
    const percentage = Math.random()
    const sAndPReturnForThatPercentile = tdigest.percentile(percentage)
    currentWealth *= sAndPReturnForThatPercentile
}

const percentageReturn = currentWealth / startingWealth

const printablePercent = ((percentageReturn - 1) * 100).toFixed(2)
console.log(`${printablePercent}% Return`)