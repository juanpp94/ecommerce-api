const {database } = require("../config/db");

const get_products = (req,res) => {
    console.log("holi");

    database.table('products as p')
        .withFields([
            'p.id',
            'p.cat_id',
            'p.subcat_id',
            'p.brand_id',
            'p.name',
            'p.description',
            'p.discount',
            'p.img_url',
            'p.price',
            'p.stock',
            'p.created'
        ])
        .sort({id:1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({message: 'No products can be founded'})
            }
        })
        .catch(err => console.log(err));
}

const get_product = (req,res) => {
    let productId = req.params.id;
    console.log(productId)

    database.table('products as p')
    .withFields([
        'p.id',
        'p.cat_id',
        'p.subcat_id',
        'p.brand_id',
        'p.name',
        'p.description',
        'p.discount',
        'p.img_url',
        'p.price',
        'p.precio',
        'p.stock',
        'p.created'
    ])
    .filter({'p.id' : productId})
    .get()
    .then(product => {
        if (product) {
            res.status(200).json(product);
        } else {
            res.json({message: `No products can be founded with id ${productId}`})
        }
    })
    .catch(err => console.log(err));
}

const update_product = (req,res) => {
    console.log("updated product");
}

const delete_product = (req,res) => {
    console.log("deleted product");
}

const add_product = (req,res) => {
    let date_ob = new Date();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let created = `${year}-${month}-${date}`
    if(req.method == 'POST'){
        let { cat_id, subcat_id, brand_id, name, description, discount, price, precio, stock } = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No Files was Uploaded');}
        products = req.files.products;
        console.log(products)
        uploadPath = `../../clientApp/src/assets/images/products/` + products.name  //utilizar carpeta de almacenamiento local del proyecto
        savePath = `assets/images/products/`+ products.name //utilizar carpeta de almacenamiento local del proyecto
        if(products.mimetype == 'image/jpeg' || products.mimetype == 'image/png'|| products.mimetype == 'image/jpg' ){
            products.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
                
                database.table('products')
                    .insert({
                        cat_id: cat_id,
                        subcat_id: subcat_id,
                        brand_id: brand_id,
                        name: name,
                        description: description,
                        discount: discount,
                        img_url: savePath,
                        price: price,
                        precio: precio,
                        stock: stock,
                        created: created
                    })
                    .then(newProduct=>{
                        res.json({message:'The product was uploaded', success: true})
                    })
                    .catch(error=>console.log(error))
            })
        } else {
            message = 'Please select a JPG, JPEG or PNG image',
            res.json({message: message})
        }    
    }
}
module.exports = {get_products, get_product, update_product, delete_product, add_product};