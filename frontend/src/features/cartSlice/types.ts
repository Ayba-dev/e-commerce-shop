export interface ICart {
    _id: string;
    image?: string,
    quantity?: number,
    price?: number,
    name?: string,
    description?: string
}

export interface ICartSlice{
    carts: ICart[] | [];
    coupon: string | null;
    total: number;
    subtotal: number;
    isCouponApplied: boolean
}

interface ISales {
    date: string,
    sales: number,
    revenue: number
}
export  interface  IAnalyticsData {
    analyticsData: {
        users: number,
        products: number,
        totalSales: number,
        totalRevenue: number
    },
    dailySalesData: ISales[]
}