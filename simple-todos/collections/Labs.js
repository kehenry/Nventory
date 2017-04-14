/**
 * Created by Keenan on 3/14/2017.
 */
/**
 * Created by Keenan on 3/12/2017.
 */
import CostNumbers from './CostNumbers.js';

Labs = new Mongo.Collection('labs');

Labs.allow({
    insert: function(userId, doc){
        return !!userId;
    }
});
LabSchema = new SimpleSchema({
    name:{
        type: String,
        regEx:/^[a-zA-Z ]+$/,
        label: "Name"
    },
    costNumbers:{
        type: [CostNumbers],
        label:"Cost Number"
    }
});

Labs.attachSchema(LabSchema);

export default Labs;