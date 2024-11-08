export type CataloItemsType = {
    id: string;
    title: string;
    price: number;
    images: string;
    solo?: boolean;
    description?:string;
};

export interface CatalogItemType extends CataloItemsType {
    description: string;
    article: any;
}
