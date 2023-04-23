import { MouseEventHandler } from "react";

export interface meal {
  searchItems: { nutrients: any; name: string }[] | null;
  diet: string;
}

export interface data {
  data: {}[];
  key?: any;
}

// to do: use this to either create a generic or to go deeper with the Array<T> stuff
export type dataDetails = {
  food_name: string;
};

export interface mealType {
  breakfast?: MouseEventHandler<HTMLButtonElement>;
  lunch?: MouseEventHandler<HTMLButtonElement>;
  dinner?: MouseEventHandler<HTMLButtonElement>;
}

// chart
export interface props {
  data: any;
  overall?: boolean;
}

// overall
export interface props {
  data: any;
}

// breakfast
/*export interface props {
  searchItems: { nutrients: any; name: string }[] | null;
  nurtrients: any;
  diet: string;
}

// lunch
export interface props {
  searchItems: { nutrients: any; name: string }[] | null;
  nurtrients: any;
  diet: string;
}

// dinner
export interface props {
  searchItems: { nutrients: any; name: string }[] | null;
  nurtrients: any;
  diet: string;
}*/

// breakfast chart
/*export interface props {
  data: any;
  diet: string;
}*/

// dinner chart
/*export interface props {
  data: any;
  diet: string;
}*/

// lunch chart
/*export interface props {
  data: any;
  diet: string;
}*/

// auto complete
export interface props {
  onChangeAC: any;
  dataAC: any;
  onSubmitAC: any;
  valueAC: any;
}

// meal type
/*export interface props {
  breakfast?: MouseEventHandler<HTMLButtonElement>;
  lunch?: MouseEventHandler<HTMLButtonElement>;
  dinner?: MouseEventHandler<HTMLButtonElement>;
}*/

// search item
/*export interface props {
  nutrients: any;
}*/
