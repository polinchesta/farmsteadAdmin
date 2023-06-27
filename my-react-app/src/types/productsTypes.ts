export interface ProductType {
    id: number;
    img: string;
    price: number;
    adress: string;
    rajon: string;
    title: string;
    number: string;
    count: string;
    related?: number[];
    data?:any;
    t?: any;
}

export interface ProductTypeUpdate {
    id: number;
    title: string;
    img: string;
    price: number;
    count: string;
    adress: string;
    number: string;
/*     rajon: string;
 *//*     related?: number[]; */
}


export interface ProductsFilterType {
    sortField: string;
    relatedIds?: number;
    query: string;
    limit: number;
    page: number;
    minPrice?: number;
    maxPrice?: number;
    rajon?: string;
    related?: number[];
    sortOrder?: 'asc' | 'desc';
}
