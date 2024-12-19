export interface CataloItemsType  {
    id: string;
    title: string;
    price: number;
    images: string; 
    solo?: boolean;
    description?: string;
    isAdmin?: boolean;
    discount?: number;
    fulldescription?: string;
    category?: string;
    subcategory?: string;
    avaiblity?: boolean;
    disabled?: boolean;
    new?: boolean;
};

export interface CatalogItemType extends CataloItemsType {
    description: string;
    article: any;
}


export interface ServiceItemType {
    title: string;
    desc?: string;
    list?: { title?: string; desc: string }[];
  }

