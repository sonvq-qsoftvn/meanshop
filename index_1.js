var _ = require('underscore');
_.each([1, 2, 3], function (v) {
    console.log(v);
});

var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function (error, db) {
    if (error) {
        console.log(error);
        process.exit(1);
    }

//    db.collection('sample').insert({x: 1}, function (error, result) {
//        if (error) {
//            console.log(error);
//            process.exit(1);
//        }
//
//        db.collection('sample').find().toArray(function (error, docs) {
//            if (error) {
//                console.log(error);
//                process.exit(1);
//            }
//
//            console.log('Found docs:');
//            docs.forEach(function (doc) {
//                console.log(JSON.stringify(doc));
//            });
//            process.exit(0);
//        });
//    });

    var doc = {
        title: 'Jaws',
        year: 1975,
        director: 'Steven Spielberg',
        rating: 'PG',
        ratings: {
            critics: 80,
            audience: 97
        },
        screenplay: ['Peter Benchley', 'Carl Gotlieb' ]
    };

    db.collection('movies').insert(doc, function (error, result) {
        if (error) {
            console.log(error);
            process.exit(1);
        }

        //var query = { year: 1975, rating: 'PG' };
        //db.collection('movies').find(query).toArray(function (error, docs) {
        //db.collection('movies').find().toArray(function (error, docs) {
        //db.collection('movies').find({ screenplay: 'Peter Benchley' }).toArray(function (error, docs) {
        db.collection('movies').find({ 'ratings.audience': { '$gte': 90 } }).toArray(function (error, docs) {
            if (error) {
                console.log(error);
                process.exit(1);
            }

            console.log('Found docs: ');
            docs.forEach(function (doc) {
                console.log(JSON.stringify(doc));
            });
            process.exit(0);
        });
    });
});