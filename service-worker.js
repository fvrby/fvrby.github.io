var cacheName = "perris-v5";
var filesToCache = [
    "/",
    "/index.html",
    "/registro.html",
    "/login.html",
    "/gallery.html",
    "/app/app.js",
    "/app/jquery-3.1.0.min.js",
    "/app/main.js",
    "/styles/main.css",
    "/styles/estily.css",
    "/styles/estilos.css",
    "/styles/gallery.css",
    "/styles/font-awesome.css",
    "/styles/registro.css",
    "/fonts/fontawesome-webfont.woff2",
    "/fonts/fontawesome-webfont.woff",
    "/fonts/fontawesome-webfont.ttf",
    "/fonts/fontawesome-webfont.svg",
    "/fonts/fontawesome-webfont.eot",
    "/fonts/FontAwesome.otf",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/dog-icono.png",
    "/img/img1.jpeg",
    "/img/img2.jpg",
    "/img/img3.jpg",
    "/img/img4.jpg",
    "/img/img5.jpg",
    "/img/img6.jpg",
    "/img/img7.png"
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );
