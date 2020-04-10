
/* HOSPITALS REGISTRATIONS */

// Intro //

/*
  We currently have a database with data about hospitals that don't have an account, and/or
  have not been contacted by an administrator to confirm that there is a contact person
  who can/is willing to use an account.

  So in terms of registration and authentication for hospitals, we have three main scenarios:

  1. A hospital exists in the database, but does not have an associated account or contacts
  2. A hospital does not exist in the database, but someone wants to add it
  3. A hospital exists in the database, and has an associated account (consequence of 1 or 2)
*/

/* CASE 1: A HOSPITAL EXISTS IN THE DATABASE WITHOUT A CONTACT */

/* Nothing to do here, we just display the data */


/////* CASE 2: A HOSPITAL DOES NOT EXIST IN THE DATABASE, BUT SOMEONE WANTS TO ADD IT */////

/*
  1. Registration form with fields for:
    - hospital name,
    - location: city (no need for precise address, we can get this ourselves),
    - contact who requested it:
      - name (required)
      - position
      - phone (required)
      - email

  This should map to the DB as:
*/

const fields_hospital = {
  hospital_name: '',
  description: '',
  address: '', // for now the user input string, as an administrator has to find the exact address

  // COLLECTION !
  contacts: [
    {
      name: 'Name Surname',
      position: '',
      phone_numbers: ['012345678'],
      emails: []
    }
  ],

  // COLLECTION !
  timestamp: {
    created_by: '', // not sure here
    created_date: Date(), // normal timestamp
    modified_reason: 'INITIAL_INSERT' // we need to define those
  },

  registrationStatus: 'PENDING' // is not displayed in main list
}

/////* CASE 3: A HOSPITAL EXISTS IN THE DATABASE WITHOUT AN ACCOUNT, AND A USER WANTS TO "CLAIM" IT */////

/*
  1. Registration form with fields for:
    - contact who requested it:
      - name (required)
      - position
      - phone (required)
      - email

  This should map to the DB as:
*/

const fields_hospital = {
  // name, description, address don't change

  // A contact is added to the collection
  contacts: [
    {
      name: 'Name Surname',
      position: '',
      phone_numbers: ['012345678'],
      emails: []
    }
  ],

  // COLLECTION !
  timestamp: {
    modified_by: '', // not sure here
    modified_date: Date(), // normal timestamp
    modified_reason: 'CLAIMED_ACCOUNT' // we need to define those
  },

  registrationStatus: 'CLAIMED' // is not displayed in main list
}
