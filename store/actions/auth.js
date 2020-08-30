import ActionTypes from '../constant/auth';
import firebase from '../../config';
import { firestore } from 'firebase';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
// import firebaseConfig from '../../config';
// firebase.initializeApp(firebaseConfig);
// require("firebase/firestore");
const db = firebase.firestore();

//login user 
export function authChange(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var email = user.email;
                    var uid = user.uid;
                    dispatch({ type: ActionTypes.user, payload: { email: user.email, username: '' } })
                    setTimeout(() => {
                        resolve();
                    }, 3000)
                } else {
                    setTimeout(() => {
                        reject();
                    }, 3000)
                }
            });
        })
    }
}

export function register({ email, password, username }) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((data) => {
                    db.collection('users').doc(data.user.uid).set({ email, username })
                        .then(() => {
                            resolve();
                            dispatch({ type: ActionTypes.user, payload: { email: email, username: '' } })
                            console.log('Data Done******');
                        })
                        .catch((e) => {
                            console.log('Error*****', e.message);
                        })
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

export function login({ email, password }) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    dispatch({ type: ActionTypes.user, payload: { email: email, username: '' } })
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

export function logout() {
    return dispatch => {
        return new Promise(async function (resolve, reject) {
            await firebase.auth().signOut();
            resolve();
        })
    }
}

export function viewCounter() {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            const increament = firestore.FieldValue.increment(1);

            const viewRef = db.collection('views').doc('counter');
            const response  = await viewRef.update({ count: increament });
            db.collection("views").doc("counter")
                .onSnapshot(function (doc) {
                    console.log("Current data: ", doc.data());
                    dispatch({ type: ActionTypes.counter, payload: doc.data()  })
                });
            console.log('respose',response);
            resolve();
        })
    }
}

export function getViews() {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            db.collection("views").doc("counter")
                .onSnapshot(function (doc) {
                    console.log("Current data: ", doc.data());
                    dispatch({ type: ActionTypes.counter, payload: doc.data()  })
                });
            resolve();
        })
    }
}