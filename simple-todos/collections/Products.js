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
        label: "Name"
    },
    price:{
        type: Number,
        decimal: true
    },
    quantity:{
        type: Number,
        label:"Quantity"
    }
});

Products.attachSchema(ProductSchema);