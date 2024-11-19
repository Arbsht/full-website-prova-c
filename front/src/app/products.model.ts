export interface Products {
  _id: {
    $oid: string;
  };
  product_name: string;
  supplier: string;
  quantity: number;
  unit_cost: string;
  }