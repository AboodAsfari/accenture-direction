class MockBackend {
    constructor() {
        this.users = {"a": {firstName: "Abood", lastName: "Asfari", email: "a", password: "a"}};
    }

    addUser(firstName, lastName, email, password) {
        this.users[email] = {
            firstName,
            lastName,
            email,
            password
        }
    }   

    emailTaken(email) {
        return !!this.users[email];
    }

    getUser(email) {
        return this.users[email];
    }
}

export default MockBackend;