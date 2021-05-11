export const getContacts = () => {

    return async (dispatch, getState) => {
        console.log(getState())

        dispatch(getContactsRequest());
        //Get all the messages from inbox (only message ids and some other info)
        const messagesResult = await window.gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'q': 'in:inbox category:primary'
        }).then(r => r)//Machetazo porque ni idea porque no dejar hacer el catch directamente
            .catch(err => dispatch(getContactsFailure(err)));

        const messages = messagesResult.result.messages;


        //With each message id, make we look for their details (message,from who, date, etc.)
        const messagesDetails = await Promise.all(
            messages.map(async message => {
                const messageResult = await window.gapi.client.gmail.users.messages.get({
                    'userId': 'me',
                    'id': message.id
                }).then(r => r)//Machetazo porque ni idea porque no dejar hacer el catch directamente
                    .catch(err => dispatch(getContactsFailure(err)));

                return messageResult.result;
            })
        );


        //With every message, we filter them looking for only the sender info(name and email)
        let contacts = messagesDetails.map(messagesDetails => {
            const contact = messagesDetails.payload.headers.filter(header => header.name === "From")[0].value;

            return {
                name: contact.includes('<') ? contact.substr(0, contact.indexOf('<')) : contact,
                email: contact.includes('<') ? contact.substring(contact.indexOf('<') + 1, contact.indexOf('>')) : contact,
            };
        });

        // Delete duplicates
        contacts = Array.from(new Set(contacts.map(contact => contact.email))).map(email => {
            return contacts.find(contact => contact.email === email)
        })

        dispatch(getContactsSuccess(contacts));

    }
}


export const getContactsRequest = () => {
    return {
        type: 'GET_CONTACTS_REQUEST',
    }
}

export const getContactsSuccess = messages => {
    return {
        type: 'GET_CONTACTS_SUCCESS',
        payload: messages
    }
}

export const getContactsFailure = error => {
    return {
        type: 'GET_CONTACTS_FAILURE',
        payload: error,
    }
}