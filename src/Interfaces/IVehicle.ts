interface IVehicle {
  id?: string | undefined, 
  model: string, 
  year: number, 
  color: string,
  buyValue: number,
  status?: boolean,
}

export default IVehicle;