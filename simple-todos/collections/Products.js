/**
 * Created by Keenan on 3/12/2017.
 */
Products = new Mongo.Collection('products');

Products.allow({
    insert: function(userId, doc){
        return !!userId;
    }
});

ProductSchema = new SimpleSchema({
    name:{
        type: String,
        regEx:/^[a-zA-Z0-9 ]+$/,
        label: "Name"
    },
    price:{
        type: String,
        regEx:/^[0-9]*(\.\d{2})$/,
        label: "Price"
    },
    quantity:{
        type: Number,
        min: 0,
        label:"Quantity"
    }
});

Products.attachSchema(ProductSchema);

export default Products;