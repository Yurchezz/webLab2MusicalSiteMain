Appeal = require('./appealModel');

exports.index = function (req, res) {
    Appeal.get(function (err, appeals) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Appels retrieved successfully",
            data: appeals
        });
    });
};
exports.new = function(req, res){
    var appeal = new Appeal();
    appeal.text = req.body.text ? req.body.text : req.body.text;
    appeal.appealHours = req.body.appealHours;
    appeal.appealMinutes = req.body.appealMinutes;
    appeal.appealDate = req.body.appealDate;

    appeal.save(function(err){
        if(err){
            res.json(err);
        }
        res.json({
            message: 'Appeal detail loading..',
            data: appeal
        });
    })
};

exports.view = function(req, res){
    Appeal.findById(req.params.appeal_id, function(err, appeals){
        if(err){
            res.send(err);
        }
        res.json({
            message: 'Appeal details loading..',
            data: appeals
        });
    });
};

exports.update = function(req, res){
    Appeal.findById(req.params.appeal_id, function(err, appeal){
        if(err){
            res.send(err);
        }
        appeal.text = req.body.text ? req.body.text : req.body.text;
        appeal.appealHours = req.body.appealHours;
        appeal.appealMinutes = req.body.appealMinutes;
        appeal.appealDate = req.body.appealDate;

        appeal.save(function(err){
            if(err){
                res.json(err);
            }
            res.json({
                message: 'Appeal Info updated',
                data: appeal
            });
        });
    });
};

exports.delete = function(req, res){
    Appeal.remove({
        id: req.params.appeal_id
    }, function(err, appeal){
        if(err){
            res.send(err);
        }
        res.json({
            status: "success",
            message: "Appeal deleted"
        });
    });
};