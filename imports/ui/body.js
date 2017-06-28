import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './body.html';
import './task.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.pr_state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      if (instance.pr_state.get('ByPriority')) {
        return Tasks.find({checked: { $ne: true}, owner: Meteor.userId()}, { sort: {createdAt: -1, priority: -1}});
      }
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    
    if (instance.pr_state.get('ByPriority')) {
      return Tasks.find({owner: Meteor.userId()}, { sort: { priority: -1 } } );
    }

    return Tasks.find({owner: Meteor.userId()}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true} , owner: Meteor.userId()}).count();
  },

});

Template.body.events({
  'submit .new-task'(event) {
    //Prevent default browser form submit
    event.preventDefault();

    //Get value from form element
    const target = event.target;
    const text = target.text.value;

    Meteor.call('tasks.insert', text); 

    //Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
  'change .by-priority'(event, instance) {
    instance.pr_state.set('ByPriority', event.target.checked);
  }
  
});  

