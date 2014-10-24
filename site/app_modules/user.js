var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {
    
    var moduleName = 'user';
    var block = {
        app: app,
        model: null
    };
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));
    
    block.model = {
        username: {
            type: 'string',
            optional: true
        },
        firstname: {
            type: 'string',
            optional: true
        },
        lastname: {
            type: 'string',
            optional: true
        },
        email: {
            type: 'string',
            subtype: {
                type: 'email'
            },
            optional: false,
            option: {
                unique: true
            }
        },
        salt: {
            type: 'string',
            subtype: {
                type:'random'
            },
            auto: true
        },
        password: {
            type: 'string',
            subtype: {
                type: 'password'
            }
        },
        status: {
            type: 'string'
        }
    };
    
    block.page.getIndex = function(req, res) {
        block.data.getWeb(req, res, null, function(error, docs, info) {
            var page = { title:'User List', docs:docs };
            res.render('user/index', { page:page });
        });
    };
    
    // page route
    app.server.get('/user', block.page.getIndex);
    
    return block;
};

