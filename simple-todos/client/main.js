import { Template } from 'meteor/templating';
import Products from '../collections/Products.js';
import Labs from '../collections/Labs.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.register.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var emailVar = template.find('#email').value;
    var pinVar = template.find('#userPin').value;
    Accounts.createUser({
      email: emailVar,
      password: pinVar
    });

    console.log(emailVar + " registered as ");
  },
    'click .goLogin': function(event){
        event.preventDefault();
        FlowRouter.go('login');

    }

});

Template.login.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var emailVar = template.find('#login-email').value;
    var pinVar = template.find('#login-userPin').value;
    Meteor.loginWithPassword(emailVar,pinVar);
    console.log(emailVar + " logged in" );
  },'click .register': function(event){
        event.preventDefault();
        FlowRouter.go('register');
        console.log("register here");
    }
});

Template.home.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    console.log("logged out");
  },'click .adminTools': function(event){
    event.preventDefault();
    FlowRouter.go('adminTools');
    console.log("add products here");
  }
});

Template.adminTools.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('home');
        console.log("returned home");
    },'click .addNew': function(event){
        event.preventDefault();
        FlowRouter.go('addNewProduct');
        console.log("add products here");
    },'click .removeProduct': function(event){
        event.preventDefault();
        FlowRouter.go('removeProduct');
        console.log("remove products here");
    }, 'click .edit': function(event){
        event.preventDefault();
        FlowRouter.go('editProduct');
        console.log("edit products here");}
        , 'click .labPage': function(event){
        event.preventDefault();
        FlowRouter.go('labPage');
        console.log("view and edit labs here");}
});


Template.editProduct.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    }
});

Template.labPage.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    }
    ,'click .addLab': function(event){
        event.preventDefault();
        FlowRouter.go('addLab');
        console.log("add products here");
    }
    // ,'click .removeLab': function(event){
    //     event.preventDefault();
    //     FlowRouter.go('removeLab');
    //     console.log("remove products here");
    // }
    // , 'click .editLab': function(event){
    //     event.preventDefault();
    //     FlowRouter.go('editLab');
    //     console.log("edit products here");}
});

Template.addNewProduct.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    }
});

Template.addLab.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('labPage');
    }
});
Template.removeProduct.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    },
    'click .delete': function () {
        Products.remove(this._id);
    }
});

// Template.home.events({
//     'click.register': function(event){
//         event.preventDefault();
//         FlowRouter.go('register');
//         console.log("register here");
//     }
// });

Tracker.autorun(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('login');
    }
});


Template.removeProduct.helpers({
    products() {
        return Products.find({});
    }
});
Template.home.helpers({
    products() {
        return Products.find({});
    }
});
Template.editProduct.helpers({
    products() {
        return Products.find({});
    }
});

Template.labPage.helpers({
    labs() {
        return Labs.find({});
    }
});
Template.editProduct.events({
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
