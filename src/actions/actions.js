import * as firebase from "firebase/app";
import "firebase/database";

// Prototype extentions here
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

let database = firebase.database();
let todosRef = database.ref().child('data');

// Manually add item to database on refresh
// let testDate = new Date().toString();
// firebase.database().ref().child('data').push({name: 'do stuff', eventDate: testDate})

export const fetchToDos = (uid) => async dispatch => {
  database.ref().child('users/' + uid + '/tasks/').on("value", snapshot => {
    dispatch({
      type: 'FETCH_TASKS',
      payload: snapshot.val()
    });
  });
};

export const addTask = (taskObject) => async dispatch => {
  database.ref().child('users/' + taskObject.uid + '/tasks/').push({name: taskObject.name, eventDate: taskObject.startDate.toString()}, (snap) => {
    dispatch({
      type: 'ADD_TASK'
    });
  })
};

export const removeTask = (key, uid) => async dispatch => {
  database.ref().child('users/' + uid + '/tasks/' + key).remove((snap) => {
    dispatch({
      type: 'REMOVE_TASK'
    });
  });
};

export const changeTaskName = (currentTaskObject) => async dispatch => {
  database.ref().child('data/' + currentTaskObject.key).update({ name: currentTaskObject.name }, (snap) => {
    dispatch({
      type: 'CHANGE_TASK_NAME'
    });
  })
};

export const changeTaskDate = (currentTaskObject) => async dispatch => {
  database.ref().child('data/' + currentTaskObject.key).update({ eventDate: currentTaskObject.date.toString() }, (snap) => {
    dispatch({
      type: 'CHANGE_TASK_DATE'
    });
  })
};
