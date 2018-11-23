export const sample = (population = []) => {
  return population[Math.floor(Math.random() * population.length)]
}
