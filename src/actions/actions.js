import firebase from 'react-native-firebase';

let database = firebase.database();
let ref = database.ref().child('users');

// Manually add item to database on refresh
// let testDate = new Date().toString();
// firebase.database().ref().child('users/fzp60YzJu8YZ7NiRusJYfgsLndj2/tasks/').push({name: 'do stuff', eventDate: testDate})

// firebase.database().ref().child('users').once('value')
// .then((snap) => {
//   console.log(snap.val());
// })
// .catch((err) => {
//   console.log(err);
// })

// export const fetchToDos = (uid) => async dispatch => {
//   var userId = firebase.auth().currentUser.uid;
//   console.log(userId);
//   firebase.database().ref().child('users/' + userId + '/tasks/').once('value')
//   .then((snapshot) => {
//     console.log('INSIDE');
//     dispatch({
//       type: 'FETCH_TASKS',
//       payload: snapshot.val()
//     });
//   })
// };

export const fetchToDos = (uid) => async dispatch => {
  var userId = firebase.auth().currentUser.uid;
  database.ref().child('users/' + userId + '/tasks/').on('value', snapshot => {
    console.log('INSIDE');
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
