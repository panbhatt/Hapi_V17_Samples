const Hapi = require('hapi') ;



const Server = new Hapi.Server({ host : '0.0.0.0', port : 3002});


Server.route({
    method : 'GET',
    path : '/',
    handler : (request,h) => {
        return " I M the hoome route" ; 
    }
})


process.on('unhandledRejection', (err) => {
    console.log(err); 
    process.exit(); 
});


const launch = async() => {
    try {
        await Server.start()
    } catch(err) {
        console.error(err); 
        process.exit(1); 
    }
    console.log("Server has been started. ") ; 
}; 

launch(); 