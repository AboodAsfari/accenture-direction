class MockBackend {
    constructor() {
        this.users = {"a": {name: "a", email: "a", password: "a"}};
    }

    addUser(name, email, password) {
        this.users[email] = {
            name,
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