
import React, { Component } from 'react';
import app from 'firebase/app';
import firebase from 'firebase'
import uuid from 'uuid';
const config = {
    apiKey: "AIzaSyC9V7TxzDGT0bHepP9W74qnbsB20UdjLKc",
    authDomain: "print3d-rj.firebaseapp.com",
    databaseURL: "https://print3d-rj.firebaseio.com",
    projectId: "print3d-rj",
    storageBucket: "print3d-rj.appspot.com",
    messagingSenderId: "902571557157",
    appId: "1:902571557157:web:7b0581b58566e370"
};


class Firebase extends Component {
    constructor(props){
        super(props);
        !firebase.apps.length ? app.initializeApp(config): firebase.app();

        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }

    doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email,password);
    
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
    
    addFile(file,uid,_callback){
        const perm_file_uuid = uuid.v4();
        const fileRef = this.storage.ref().child(`print_files/${uid}/${perm_file_uuid}`);
        if (uid == null){
            var ref = firebase.getAuth();
            uid = ref.uid;
        }
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var blob = new Blob([evt.target.result], {type:"model/stl"});
            var upload_task = fileRef.put(blob);
            const currentRef = app.database().ref(`users/${uid}`);
            var download_url;
            upload_task
                .then(uploadTaskSnapshot => {
                    
                   uploadTaskSnapshot.ref.getDownloadURL().then(function(downloadURL){
                    download_url = downloadURL;
                    currentRef.push({download_url: downloadURL}).then(() =>{
                        console.log("download_url")
                        return _callback(downloadURL);
                        
                    });
                    
                   });
                    
                    
                })
                
        }
        reader.onerror = function (e) {
            console.log("Failed file read: " + e.toString());
        };
        reader.readAsArrayBuffer(file);

       
    }
    getChildrenKeys(path="",amt=10, _callback){
        var tempArr = [];
        var ref = this.db.ref('users/'+path);
        ref.orderByKey().limitToLast(amt).on("value", function(snapshot){

            snapshot.forEach(function(data){
                tempArr.push(data.key);
            });
            return _callback(tempArr);
        });

    }

    getFile(file_uid, uid){
        

    }
    

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;