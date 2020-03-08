module.exports = function (exitCode) {
    var fs = require('fs');
    var q = require('q');
    var del = require('del');
    var deferred = q.defer();

    var reportsFolder = 'build/reports';
    var reportsFile = reportsFolder + '/console.log';
    var archiver = require('archiver');

    fs.access(reportsFile, fs.constants.F_OK, function (err) {
        if (err) {
            deferred.resolve(exitCode);
            return;
        }

        var archive = archiver.create('zip', {});

        var output = fs.createWriteStream(reportsFolder + '/console.zip');
        archive.pipe(output);

        output.on('close', function () {
            del([reportsFolder + '/*.txt'])
                .then(function () {
                    deferred.resolve(exitCode);
                });
        });

        archive.file(reportsFolder + '/console.log', {name: 'console.log'});
        archive.finalize();
    });

    return deferred.promise;
};
