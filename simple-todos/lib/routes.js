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

FlowRouter.route('/addNewProduct',{
    name:'addNewProduct',
    action(){
        BlazeLayout.render('addNewProduct');
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

FlowRouter.route('/addLab',{
    name:'addLab',
    action(){
        BlazeLayout.render('addLab');
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

