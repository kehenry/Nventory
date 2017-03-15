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
    products:{
        type: [Products]
    },
    // total:{
    //     type: Number,
    //     decimal: true
    // }, TODO
    customer:{
        type: Labs
    },
    // costNumber:{
    //     type: CostNumbers
    // } TODO
});

Checkouts.attachSchema(CheckoutSchema);