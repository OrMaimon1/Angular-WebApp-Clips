import firebase from 'firebase/compat/app'


export default interface IPic {
    docID?: string;
    uid: string;
    displayName: string;
    title: string;
    fileName: string;
    url: string;
    timestamp: firebase.firestore.FieldValue;
}