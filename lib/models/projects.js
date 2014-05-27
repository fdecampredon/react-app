'use strict';

var inherits    = require('../utils/inherits');
var assign      = require('../utils/assign');
var Model       = require('./Model');

function Project(data) {
    Model.call(this, data);
}

inherits(Project, Model);

assign(Project.prototype, {
    toJSON: function () {
        return {
            name: this.name,
            _type: 'Project'
        };
    },
    
    validate: function () {
        var errors = [];
        if (!this.name) {
            errors.push('missing project name');
        }
        return errors;
    }
});


module.exports = Project;