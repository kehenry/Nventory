//import 'simple-todos/client/main.js';


FlowRouter.route('/register',{
        name:'register',
        action(){
            BlazeLayout.render('register');
        }
});
FlowRouter.route('/home',{
        name:'home',
        triggersEnter: [checkLoggedIn],
        action(){
            BlazeLayout.render('home');
        }
});
FlowRouter.route('/',{
    name:'login',
    triggersEnter: [redirectIfLoggedIn],
    action(){
        BlazeLayout.render('login');
    }
});
FlowRouter.route('/editProduct',{
    name:'editProduct',
    action(){
        BlazeLayout.render('editProduct');
    }
});
FlowRouter.route('/adminTools',{
    name:'adminTools',
    action(){
        BlazeLayout.render('adminTools');
    }
});

FlowRouter.route('/productPage',{
    name:'productPage',
    action(){
        BlazeLayout.render('productPage');
    }
});

FlowRouter.route('/addProduct',{
    name:'addProduct',
    action(){
        BlazeLayout.render('addProduct');
    }
});
FlowRouter.route('/removeProduct',{
    name:'removeProduct',
    action(){
        BlazeLayout.render('removeProduct');
    }
});

FlowRouter.route('/labs',{
    name:'labPage',
    action(){
        BlazeLayout.render('labPage');
    }
});

FlowRouter.route('/checkoutPage',{
    name:'checkoutPage',
    action(){
        BlazeLayout.render('checkoutPage');
    }
});

FlowRouter.route('/addLab',{
    name:'addLab',
    action(){
        BlazeLayout.render('addLab');
    }
});
FlowRouter.route('/newCheckout',{
    name:'newCheckout',
    action(){
        BlazeLayout.render('newCheckout');
    }
});
FlowRouter.route('/removeCheckout',{
    name:'removeCheckout',
    action(){
        BlazeLayout.render('removeCheckout');
    }
});


function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) {
        redirect('/');
    }
};

function redirectIfLoggedIn (ctx, redirect) {
    if (Meteor.userId()) {
        redirect('/home');
    }
};

Accounts.onLogin(function () {
    FlowRouter.go('home');
});

