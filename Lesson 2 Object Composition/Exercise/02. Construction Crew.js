function solve(workerStats) {

    if (workerStats.dizziness === true) {
        workerStats.levelOfHydrated += 0.1 * workerStats.weight * workerStats.experience;
        workerStats.dizziness = false;
    }

    return workerStats;
}

console.log(solve(
    { 
        weight: 80,
        experience: 1,
        levelOfHydrated: 0,
        dizziness: true 
    }
  ));