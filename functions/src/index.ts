import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { FieldValue } from '@google-cloud/firestore';

// Firebase Admin;
const firebaseServiceAccount = require('../firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: 'https://adr-exchange-338c0.firebaseio.com'
});

const firestore = admin.firestore();

exports.onShoppingCreate = function () {
  return functions.firestore.document(`/live_shopping_lists/{orderId}`).onCreate(async (queryDocumentSnapshot) => {
    const values = {
      shopping_count: FieldValue.increment(1)
    };

    await firestore.collection('live_shopping_counters').doc('shopping_counters').update(values);
  });
};

exports.onShoppingDelete = function () {
  return functions.firestore.document(`/live_shopping_lists/{orderId}`).onDelete(async (queryDocumentSnapshot) => {
    const values = {
      shopping_count: FieldValue.increment(-1)
    };

    await firestore.collection('live_shopping_counters').doc('shopping_counters').update(values);
  });
};
