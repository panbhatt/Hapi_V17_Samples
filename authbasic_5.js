const Hapi = require('hapi') ;

const hapiAuthBasic = require('hapi-auth-basic') ; 

// Remember Schemes and Strategy.
// Scheme is a name and strategy is a predefined boject to SCHEME with VALIDATE function populated. 

const Server = Hapi.Server({ host : '0.0.0.0', port : 3002}) ;


const validate = async function(request,username, password) {
    let user = { id : 1, username: 'panbhatt'} ; 

    return {
        isValid : true, credentials : user 
    }

};

const launch = async() => {
    try {
        await Server.register(hapiAuthBasic) ;

        Server.auth.strategy('simple', 'basic', { validate } ) ;

        Server.route({
            method : 'GET',
            path : '/auth',
            handler : function(request,h) { 
                return " Hey, you are able to reach here " ;
            },
            options: {
                auth : 'simple'
            }
        })

        await Server.start(); 
        console.log("Server Started. ") ;
    } catch(err) {
        console.log("Error occured. ") ;
    }
};

launch(); 