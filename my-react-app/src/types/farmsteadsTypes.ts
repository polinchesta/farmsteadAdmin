interface ImageType {
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
    url: string;
    titleVideo: string;
    id: number;
    img: string;
    title: string;
    t: any;
    adres: string;
    longitude: number;
    house: string;
    place: string;
    price: number;
    contact: string;
    email: string;
    top: number;
    latitude: number;
    comment: Array <CommentType>
    image: Array <ImageType>
    comments: Array<CommentType>
}