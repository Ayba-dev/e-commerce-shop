

export interface IProduct {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    image: string,
    isFeatured: boolean,
    createdAt?: string,
    updatedAt?: string
}

export interface IProductCategory {
    name: string,
    image: string,
    price: number,
}
