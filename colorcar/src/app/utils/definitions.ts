export type CataloItemsType = {
    id: string;
    title: string;
    price: number;
    images: string | File;
    solo?: boolean;
    description?:string;
    isAdmin?: boolean;
    discount?: number;
    fulldescription?: string;
    category?: string;
    subcategory?: string;
};

export interface CatalogItemType extends CataloItemsType {
    description: string;
    article: any;
}

