export async function register(user) {
    return (await firebase.auth().createUserWithEmailAndPassword(user.email, user.password));
}

export async function login(user) {
    return (await firebase.auth().signInWithEmailAndPassword(user.email, user.password));
}

export async function logout() {
    return await firebase.auth().signOut();
}

export async function createEvent(event) {
    return (await firebase.firestore().collection('events').add(event));
}

export async function getAllEvents() {
    return (await firebase.firestore().collection('events').get());
}

export async function getEventById(eventId) {
    return (await firebase.firestore().collection('events').doc(eventId).get());
}

export async function editEvent(eventId, event) {
    return (await firebase.firestore().collection('events').doc(eventId).update(event));
}

export async function deleteEvent(eventId) {
    return (await firebase.firestore().collection('events').doc(eventId).delete());
}

export async function joinEvent(eventId) {
    const event = await getEventById(eventId);

    if (event.data().organizer === localStorage.email) {
        throw new Error('You can not join your event!');
    }

    const eventUpdate = Object.assign({}, event.data());
    eventUpdate.participants = Number(eventUpdate.participants) + 1;

    return editEvent(eventId, eventUpdate);
}

export async function getMyEvents(email) {
    return await (await firebase.firestore().collection('events').where('organizer', '==', email).get());
}