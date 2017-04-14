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
        type: Number,
        min: 10000000,
        max: 100000000000000,
        label: "Number"
    }
});

CostNumbers.attachSchema(CostNumberSchema);

export default CostNumbers;