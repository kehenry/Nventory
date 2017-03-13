/**
 * Created by Keenan on 3/12/2017.
 */
Products = new Meteor.Collection('products');

ProductSchema = new SimpleSchema({
    name:{
        type: String,
        label: "Name"
    },
    price:{
        type: String,
        label: "Price"
    },
    quantity:{
        type: Number,
        label:"Quantity"
    }
});

Products.attachSchema(ProductSchema);