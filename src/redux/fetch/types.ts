export type PizzaType = {
  id: string;
  description: string;
  types: string[];
  sizes: string[];
  diameters: number[];
  weights: number[];
  cost: number;
  name: string;
  imageURL: string;
};

export type RequestParametersTypes = {
  currentPage: number;
  categoryIndex: number;
  sortParameterName: string;
  sortParameterIndex: number;
};

export enum Status {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export interface IFetchState {
  status: Status;
  homePizzas: PizzaType[];
}
