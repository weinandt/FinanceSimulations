import { Simulator, ProbAndResult, printReturns } from '../src/simulator.mjs'

const probAndResults = [
    new ProbAndResult(0.2, 0.5),
    new ProbAndResult(0.2, 1.5),
    new ProbAndResult(0.6, 1.05),
]

const numTrials = 10000
const periodsPerTrial = 300
const tdigest = Simulator.runSimulation(probAndResults, numTrials, periodsPerTrial)

const percentilesofInterest = [0.01, 0.05, 0.5, 0.75, 0.8, 0.9, 0.95, 0.99]
printReturns(tdigest, percentilesofInterest)

/**
Prints: 
Percent of Wealth Left: 0.00% Percentile: 1th
Percent of Wealth Left: 0.00% Percentile: 5th
Percent of Wealth Left: 0.02% Percentile: 50th
Percent of Wealth Left: 1.31% Percentile: 75th
Percent of Wealth Left: 3.71% Percentile: 80th
Percent of Wealth Left: 63.50% Percentile: 90th
Percent of Wealth Left: 495.61% Percentile: 95th
Percent of Wealth Left: 34433.24% Percentile: 99th
 */