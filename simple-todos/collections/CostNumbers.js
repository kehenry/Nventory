/**
 * Created by Keenan on 3/14/2017.
 */
/**
 * Created by Keenan on 3/12/2017.
 */
CostNumbers = new Mongo.Collection('costNumber');

CostNumbers.allow({
    insert: function(userId, doc){
        return !!userId;
    }
});

CostNumberSchema = new SimpleSchema({
    number:{
        type: String,
        regEx: /^2([0-9]{8,20})$/,
        label: "Number"
    }
});

CostNumbers.attachSchema(CostNumberSchema);

export default CostNumbers;