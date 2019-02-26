const Hapi = require('hapi');
const Hoek = require('hoek') ;
const Catbox = require('catbox');


const Server = Hapi.Server({
    host: '0.0.0.0', port: 3000
});





Server.route({
    method: 'GET',
    path: '/hapi',
    handler: (request, h) => {
        let lastModified = new Date();
        return h.response({ "name": "Pankaj Bhatt " }).ttl(8000).header('Last-Modified', lastModified.toUTCString()).etag('xxxxxxxxx');;;

    },
    options: {
        cache: {
            expiresIn: 30 * 1000,
            privacy: 'private'
        }
    }
});


Server.route({
    method: 'GET',
    path: '/hapi/server',
    handler: (request, h) => {

    }
});

Server.route({
    path: '/add/{a}/{b}',
    method: 'GET',
    handler: async function (request, h) {

        const { a, b } = request.params;
        const id = `${a}:${b}`;

        return await sumCache.get({ id, a, b });
    }
});



const launch = async () => {
    try {

        await Server.start();
        console.log("Server Started. ");
        console.log('Server running at:', Server.info.uri);
    } catch (err) {
        console.log("An Error Occured. ");
    }
}

launch(); 