New_item = require('./newModel');

exports.index = function (req, res) {
    New_item.get(function (err, news) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "News retrieved successfully",
            data: news
        });
    });
};
exports.new = function(req, res){
    var new_item = new New_item();
    new_item.text = req.body.text ? req.body.text : req.body.text;
    new_item.title = req.body.title;
    new_item.img = req.body.img;
    

    new_item.save(function(err){
        if(err){
            res.json(err);
        }
        res.json({
            message: 'New`s detail loading..',
            data: new_item
        });
    })
};

exports.view = function(req, res){
    New_item.findById(req.params.new_id, function(err, new_item){
        if(err){
            res.send(err);
        }
        res.json({
            message: 'New`s details loading..',
            data: new_item
        });
    });
};

exports.update = function(req, res){
    New_item.findById(req.params.new_id, function(err, new_item){
        if(err){
            res.send(err);
        }
        new_item.text = req.body.text ? req.body.text : req.body.text;
        new_item.title = req.body.title;
        new_item.img = req.body.img;

        new_item.save(function(err){
            if(err){
                res.json(err);
            }
            res.json({
                message: 'New Info updated',
                data: new_item
            });
        });
    });
};

exports.delete = function(req, res){
    New_item.remove({
        id: req.params.new_id
    }, function(err, new_item){
        if(err){
            res.send(err);
        }
        res.json({
            status: "success",
            message: "New deleted"
        });
    });
};