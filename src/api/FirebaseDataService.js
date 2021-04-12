import firebase from "../api/firebaseConfig.js";
const db = firebase.firestore();

const collection = db.collection("bookings");

class FirebaseDataService {
  async addReservation(name, email, nbPerson, date, hours, message, restaurantName) {
    try {
      const document = await collection
        .add({
          name: name,
          email: email,
          nbPerson: nbPerson,
          date: date,
          hours: hours,
          message: message,
          restaurantName: restaurantName,
          is_checkout: false,
        });
      console.log("Wrinting into document id : ", document.id);
      return document.id;
    } catch (error) {
      return console.error("Error writing document: ", error);
    }
  }

  async updateCheckout(docId) {
    await collection
      .doc(docId)
      .update({ is_checkout: true });
      console.log("Update checkout from document id ", docId);
  }
}

export default new FirebaseDataService();