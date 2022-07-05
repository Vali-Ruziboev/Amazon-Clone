import { buffer } from "micro";
import * as admin from "firebase-admin";
import { addDoc, collection } from "firebase/firestore";
import { initializeApp, apps, app, credential, firestore, } from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";

// Secure a connection to FIREBASE from the backend
const serviceAccount = require("../../../permission.json");

const appp = !apps.length
  ? initializeApp({
      credential: credential.cert(serviceAccount),
    })
  : app();
const db = getDatabase(appp)

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  return set(ref(db, 'users/' + session.metadata.email + 'orders/' + session.id ), {
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: firestore.FieldValue.serverTimestamp(),
  })
  // return app
  //   .firestore()
  //   .collection("users")
  //   .doc(session.metadata.email)
  //   .collection("orders")
  //   .doc(session.id)
  //   .set({
  //     amount: session.amount_total / 100,
  //     amount_shipping: session.total_details.amount_shipping / 100,
  //     images: JSON.parse(session.metadata.images),
  //     timestamp: admin.firestore.FieldValue.serverTimestamp(),
  //   })
  //   .then(() => {
  //     console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
  //   });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // verify that the EVENT posted from  stripe

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Handle the checkout.session.completed event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error ${err.message}`));
    }
  }
};


export const config = {
    api:{
        bodyParser:false,
        externalResolver:true
    }
}