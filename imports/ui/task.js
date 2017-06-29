import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  'click .toggle-checked'() {
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private); 
  },
  'click .priority'(event) {
    if (event.target.id === 'priority1') {
      Meteor.call('tasks.setPriority', this._id, 1);
      $(event.target).next().css("background-color", "yellow");
      $(event.target).next().next().css("background-color", "red");
      if (event.target.style.background !== "darkgreen") {
        event.target.style.background = "darkgreen";
      }
    }
    if (event.target.id === 'priority2') {
      Meteor.call('tasks.setPriority', this._id, 2);
      $(event.target).prev().css("background-color", "green");
      $(event.target).next().css("background-color", "red");
      if (event.target.style.background !== "goldenrod") {
        event.target.style.background = "goldenrod";
      }
    }
    if (event.target.id === 'priority3') {
      Meteor.call('tasks.setPriority', this._id, 3);
      $(event.target).prevAll().css("background-color", "green");
      $(event.target).prev().css("background-color", "yellow");
      if (event.target.style.background !== "darkred") {
        event.target.style.background = "darkred";
      } 
    }
  },
  // 'click .priority2'(event) {
  //   Meteor.call('tasks.setPriority', this._id, 2);
  //   $(event.target).prev().css("background-color", "blue");
  //   $(event.target).next().css("background-color", "red");
  //   if (event.target.style.background !== "goldenrod") {
  //     event.target.style.background = "goldenrod";
  //   }
  // },
  // 'click .priority3'() {
  //   Meteor.call('tasks.setPriority', this._id, 3);
  //   $(event.target).prevAll().css("background-color", "blue");
  //   $(event.target).prev().css("background-color", "yellow");
  //   if (event.target.style.background !== "darkred") {
  //     event.target.style.background = "darkred";
  //   } 
  // },
});
