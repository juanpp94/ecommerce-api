export class Product {
    id;
    cat_id;
    subcat_id;
    brand_id;
    name;
    description;
    discount;
    img_url;
    price;
    stock;
    created;

    constructor(cat_id,
        subcat_id,
        brand_id,
        name,
        description,
        discount,
        img_url,
        price,
        stock) {
            this.cat_id = cat_id;
            this.brand_id = brand_id;
            this.name = name;
            this.description = description;
            this.discount = discount;
            this.img_url = img_url;
            this.price = price;
            this.stock = stock;
        }
}