export interface IItem  {
    _id: string;
    category?: string;
    name: string,
    description?: string,
    price: number,
    image: string,
    isFeatured?: boolean,
}


export interface IProduct {
    _id: string;
    name: string,
    description: string,
    price: number,
    category: string,
    image: string | undefined,
    isFeatured?: boolean,
    products:IItem[]
}

export interface IProductCategory {
    name: string,
    image: string,
    price: number,
}

