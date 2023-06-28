export interface ImageType {
    img: string;
}

export interface CommentType {
    id: number;
    content: string;
}

export interface FarmsteadsFilterType {
    sortField: string;
    query?: string;
    limit: number;
    page?: number;
}
export interface FarmsteadsType {
    text: string;
    textAll: string;
    url?: string;
    titleVideo?: string;
    id: number;
    img: string;
    title: string;
    adres: string;
    longitude: number;
    house: string;
    place: string;
    price: number;
    contact: string;
    email: string;
    top: number;
    latitude: number;
    image: Array <ImageType>
    comments: Array<CommentType>
}

export interface FarmsteadsTypeUpdate {
    text: string;
    textAll: string;
    url?: string;
    titleVideo?: string;
    id: number;
    img: string;
    title: string;
    adres: string;
    longitude: number;
    house: string;
    place: string;
    price: number;
    contact: string;
    email: string;
    top: number;
    latitude: number;
    image?: Array <ImageType>
    comments?: Array<CommentType>
}

export interface FarmsteadOrder{
    id:number;
    name:string;
    title: string;
    number: string;
    farmsteadId: number;
    time:string;
    orderDate: Date | null;
    oplata: string;
    email: string;
    day: string
}