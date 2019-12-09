let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love'
    });
});

var contactController = require('./contactController');
var appealController = require('./appealController');
var newController = require('./newController');


router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

router.route('/appeals')
    .get(appealController.index)
    .post(appealController.new);

router.route('/appeals/:appeal_id')
    .get(appealController.view)
    .patch(appealController.update)
    .put(appealController.update)
    .delete(appealController.delete);

router.route('/news')
    .get(newController.index)
    .post(newController.new);

router.route('/news/:new_id')
    .get(newController.view)
    .patch(newController.update)
    .put(newController.update)
    .delete(newController.delete);


module.exports = router;

