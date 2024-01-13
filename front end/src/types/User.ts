export type User = {
    id?: string;
    name: string;
    email: string;
    image?: string;
    password?: string;
    phone?: string;
    cart?: { product: [], quantity: number}
  };