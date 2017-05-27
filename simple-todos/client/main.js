
import { Template } from 'meteor/templating';
import Products from '../collections/Products.js';
import Labs from '../collections/Labs.js';
import Checkouts from '../collections/Checkouts.js';
import UserAccounts from '../collections/UserAccounts.js';


import './main.html';

// validating email
var isEmail = function(value){
    var filter=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if(filter.test(value)){
        return true
    }
    Bert.alert("Invalid email or empty.",'warning','fixed-top');
    return false;
};


Template.register.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var emailVar = template.find('#email').value;
        var pinVar = template.find('#userPin').value;



        if (isEmail(emailVar)) {
            Accounts.createUser({
                email: emailVar,
                password: pinVar
            });
            UserAccounts.insert({email:emailVar,pin:pinVar});
            FlowRouter.go('login');

        }

        return false;// prevent the submission

    },
    'click .goLogin': function(event) {
        event.preventDefault();
        FlowRouter.go('login');
    }
});

Template.login.events({
    'submit form': function(event, template) {FlowRouter.go('login');
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var pinVar = template.find('#login-userPin').value;
        Meteor.loginWithPassword(emailVar,pinVar,function (err) {
            if(err){
                Bert.alert("Incorrect email or password! Try again.",'warning','fixed-top');
            }
        });
    },'click .register': function(event){
        event.preventDefault();
        FlowRouter.go('register');
    },'click .addAdmin': function(event){
        event.preventDefault();
        FlowRouter.go('addAdmin');
    }
});

Template.adminhome.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },'click .adminTools': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    },'click .newCheckout': function(event){
        event.preventDefault();
        FlowRouter.go('newCheckout');
    }
});
Template.home.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.adminTools.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    },
    'click .addadmin': function(event){
        event.preventDefault();
        FlowRouter.go('addAdmin');
    },
    'click .labPage': function(event){
        event.preventDefault();
        FlowRouter.go('labPage');
    }, 'click .users': function(event){
        event.preventDefault();
        FlowRouter.go('users');
    }, 'click .productPage': function(event){
        event.preventDefault();
        FlowRouter.go('productPage');
    }
    , 'click .newCheckout': function(event){
        event.preventDefault();
        FlowRouter.go('newCheckout');
    }
    , 'click .checkoutPage': function(event) {
        event.preventDefault();
        FlowRouter.go('checkoutPage');
    }
});


Template.updateStock.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    },
    'click .goProducts': function(event){
        event.preventDefault();
        FlowRouter.go('productPage');
    },
    'submit form': function(event, template) {
        event.preventDefault();
        var newPrice = template.find('#newPrice').value;
        var newQuan = template.find('#newQuan').value;
        var productName = template.find('#product').value;
        var prodId = Products.findOne({name:productName})._id;
        var prodquan = Products.findOne({name:productName}).quantity;
        var prodprice = Products.findOne({name:productName}).price;
        if(newPrice =="" && newQuan == ""){
            Bert.alert("Update failed. Please enter a new price or quantity.",'danger','fixed-top');
        }
        else{
            if(newQuan ==""){
                newQuan = prodquan;
            }
            if(newPrice == ""){
                newPrice = prodprice;
            }
            Products.update({_id: prodId},{$set: {quantity : newQuan}});
            Products.update({_id: prodId},{$set: {price : newPrice}});

            Bert.alert("Update successful.",'success','fixed-top');
        }

    }
});
Template.editLab.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    },
    'click .goLabs': function(event){
        event.preventDefault();
        FlowRouter.go('labPage');
    },
    'submit form': function(event, template) {
        event.preventDefault();
        var newRoom = template.find('#newRoom').value;
        var labName = template.find('#lab').value;
        var labId = Labs.findOne({name:labName})._id;
        Labs.update({_id: labId},{$set: {room : newRoom}});
        if(Labs.findOne({name:labName}).room == newRoom){
            Bert.alert("Edit successful.",'success','fixed-top');

        }
        else{
            Bert.alert("Update failed. Please enter a valid new room.",'danger','fixed-top');
        }

    }
});
Template.addAdmin.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    }
});

Template.labPage.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    }
    ,'click .addLab': function(event){
        event.preventDefault();
        FlowRouter.go('addLab');
    }
    ,'click .editLab': function(event){
        event.preventDefault();
        FlowRouter.go('editLab');
    }
    ,'click .removeLab': function(event){
        event.preventDefault();
        FlowRouter.go('removeLab');
    }
});
Template.users.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    }
});

Template.productPage.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    }
    ,'click .newProduct': function(event){
        event.preventDefault();
        FlowRouter.go('addProduct');
    }
    ,'click .removeProduct': function(event){
        event.preventDefault();
        FlowRouter.go('removeProduct');
    }
    , 'click .updateStock': function(event){
        event.preventDefault();
        FlowRouter.go('updateStock');
    }
});
Template.checkoutPage.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    }
    ,'click .newCheckout': function(event){
        event.preventDefault();
        FlowRouter.go('newCheckout');
    }
    ,'click .removeCheckout': function(event){
        event.preventDefault();
        FlowRouter.go('removeCheckout');
    }

});


Template.addProduct.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    }
});

Template.newCheckout.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    },
    'click .goCheckouts': function(event){
        event.preventDefault();
        FlowRouter.go('checkoutPage');
    },
    'click .addLab': function(event){
        event.preventDefault();
        FlowRouter.go('addLab');
    },
    'click .newProduct': function(event){
        event.preventDefault();
        FlowRouter.go('addProduct');
    },
    'submit form': function(event, template) {
        event.preventDefault();
        var customer = template.find('#customer').value;
        var product = template.find('#product').value;
        var qty = template.find('#quantity').value;
        var bquan = Products.findOne({name:product}).quantity;
        var aquan = bquan - qty;
        var prodId = Products.findOne({name:product})._id;

        if(aquan >= 0 && qty != ''){
            Checkouts.insert({
                product: product,
                customer: customer,
                quantity: qty
            });
            Products.update({_id: prodId},{$set: {quantity : aquan}});

            Bert.alert("Checkout successful.",'success','fixed-top');
        }
        else{
            Bert.alert("Checkout failed.",'danger','fixed-top');
        }

    }
});

Template.addLab.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    }
});
Template.removeProduct.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    },
    'click .delete': function () {
        Products.remove(this._id);
    }
});
Template.removeCheckout.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    },
    'click .delete': function () {
        Checkouts.remove(this._id);
        var qty = this.quantity;
        var product = this.product;
        var bquan = Products.findOne({name:product}).quantity;
        var aquan = bquan + qty;
        var prodId = Products.findOne({name:product})._id;

        Products.update({_id: prodId},{$set: {quantity : aquan}});
    }
});
Template.removeLab.events({
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('adminhome');
    },
    'click .delete': function () {
        Labs.remove(this._id);
    }
});


Tracker.autorun(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('login');
    }
});


Template.removeProduct.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});

Template.productPage.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});
Template.users.helpers({
    useraccounts() {
        return UserAccounts.find({},{
            sort:{email:1}
        });    }
});
Template.newCheckout.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});
Template.home.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});
Template.adminhome.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});
Template.updateStock.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });
    }
});
Template.editLab.helpers({
    labs() {
        return Labs.find({},{
            sort:{name:1}
        });
    }
});

Template.labPage.helpers({
    labs() {
        return Labs.find({},{
            sort:{name:1}
        });    }
});
Template.removeLab.helpers({
    labs() {
        return Labs.find({},{
            sort:{name:1}
        });    }
});
Template.newCheckout.helpers({
    labs() {
        return Labs.find({},{
            sort:{name:1}
        });    }
});

// global template for dates
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('LLL');
});


Template.checkoutPage.helpers({
    checkouts() {
        return Checkouts.find({},{
            sort:{date:-1}
        });
    }
});

Template.removeCheckout.helpers({
    checkouts() {
        return Checkouts.find({},{
            sort:{date:-1}
        });
    }
});
Template.editProduct.events({
        'click .goHome': function(event){
            event.preventDefault();
            FlowRouter.go('adminhome');
        },
        'click .editThis': function(event,) {
            event.preventDefault();
            let newName = $("#updateName").val();
            let newPrice = $("#updatePrice").val();
            let newQuantity = $("#updateQuantity").val();
            Products.update(this._id, {$set: {name: newName}});
            Products.update(this._id, {$set: {price: newPrice}});
            Products.update(this._id, {$set: {quantity: newQuantity}});
        },
    }

);