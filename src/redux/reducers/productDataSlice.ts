import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const productDataSlice = createSlice({
    name: 'productData',
    initialState: [] as Product[],
    reducers: {
        setProductData: (state, action: PayloadAction<Product[]>) => {
            return action.payload;
        }
    }
});

export const { setProductData } = productDataSlice.actions;

export default productDataSlice.reducer;
