'use strict';

var inherits    = require('../utils/inherits');
var assign      = require('../utils/assign');
var Model       = require('./Model');

function Task(data) {
    Model.call(this, data);
}

inherits(Task, Model);

assign(Task.prototype, {
    toJSON: function () {
        return {
            title: this.title,
            completed: this.completed,
            assignee: this.assignee,
            project: this.project,
            _type: 'Task'
        };
    },
    
    validate: function () {
        var errors = [];
        if (!this.title) {
            errors.push('missing task title');
        }
        if (!this.project) {
            errors.push('missing task project');
        }
        return errors;
    }
});


module.exports = Task;