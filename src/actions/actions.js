import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGING_SENDER_ID,
  APP_ID,
} from 'react-native-dotenv'
console.log(API_KEY);
var firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: "",
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let ref = database.ref().child('users');

// Manually add item to database on refresh
// let testDate = new Date().toString();
// firebase.database().ref().child('users/fzp60YzJu8YZ7NiRusJYfgsLndj2/tasks/').push({name: 'do stuff', eventDate: testDate})

export const fetchToDos = (uid) => async dispatch => {
  var userId = firebase.auth().currentUser.uid;
  database.ref().child('users/' + userId + '/tasks/').on('value', snapshot => {
    dispatch({
      type: 'FETCH_TASKS',
      payload: snapshot.val()
    });
  })
};

export const addTask = (taskObject) => async dispatch => {
  database.ref().child('users/' + taskObject.uid + '/tasks/').push({name: taskObject.name, eventDate: taskObject.startDate.toString()}, (snap) => {
    dispatch({
      type: 'ADD_TASK'
    });
  })
};

export const removeTask = (key) => async dispatch => {
  var userId = firebase.auth().currentUser.uid;
  database.ref().child('users/' + userId + '/tasks/' + key).remove((snap) => {
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
