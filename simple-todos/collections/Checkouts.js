/**
 * Created by Keenan on 3/14/2017.
 */
import Products from './Products.js';
import Labs from './Labs.js';
import CostNumbers from './CostNumbers.js';

Checkouts = new Mongo.Collection('checkouts');

Checkouts.allow({
    insert: function(userId, doc){
        return !!userId;
    }
});



CheckoutSchema = new SimpleSchema({
    product:{
        type: String,
        label: "Product"
    },
    // total:{
    //     type: Number,
    //     decimal: true
    // }, TODO
    quantity:{
        type: Number,
        label:"Quantity"
    },
    customer:{
        type: String,
        regEx:/^[a-zA-Z ]+$/,
        label: "Customer"
    },
    date:{
        type: Date,
        label: "Date Created",
        autoValue: function () {
            return new Date()
        },
        autoform: {
            type:"hidden"
        }
    }
    // costNumber:{
    //     type: CostNumbers
    // } TODO
});

Checkouts.attachSchema(CheckoutSchema);
export default Checkouts;