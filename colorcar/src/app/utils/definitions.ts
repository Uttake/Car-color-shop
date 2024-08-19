export type CataloItemsType = {
    id: string;
    title: string;
    price: number;
    images: string;
};

export interface CatalogItemType extends CataloItemsType {
    description: string;
    article: any;
}
