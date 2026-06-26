export const checkIfCoordIsValid = (coord?: number) => typeof coord === "number";

export const checkIfTotalAreaIsValid = (totalArea: number) => typeof totalArea === "number";

export const checkIfNameIsValid = (name: string) => name.length >= 4
  
