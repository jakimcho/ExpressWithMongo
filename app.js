const cors = require('cors');
const config = require( "config" );
const express = require( 'express');
const mongoose = require( 'mongoose' ); 
const coursesRoutes = require( './routes/courses' );
const moviesRouter = require( './routes/movies' );
const genresRouter = require( './routes/genres' );
const usersRouter = require( './routes/users' );
const authRouter = require( './routes/authenticate' );

process.on( 'uncaughtException', ( ex ) => 
{
  console.log('We Got an uncoought exception');
});

if ( !config.get( "jwtPrivateKey" ) )
{
    console.log( "Fatal: jwtPrivateKey env. var. does not exist" );
    process.exit( 1 );
}

mongoose.connect( 'mongodb://localhost/test', { 
        useCreateIndex: true, 
        useNewUrlParser: true 
    })
    .then( () => console.log( 'Connected to MongoDB' ) )
    .catch( ( err ) => console.log( 'Something happend while connecting to db: ', err) );

const app = express( );
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( '/api/courses', coursesRoutes );
app.use( '/api/movies', moviesRouter );
app.use( '/api/users', usersRouter );
app.use( '/api/genres', genresRouter );
app.use( '/api/auth', authRouter );

app.listen( 3001, 
            () => console.log( " Listening on port 3001... " ) );