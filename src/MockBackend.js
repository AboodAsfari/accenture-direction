class MockBackend {
    constructor() {
        this.users = {};
        this.addUser("Abood", "Asfari", "a", "a");
        let user = this.users["a"];
        user.addQualification("Victoria University of Wellington", "Bachelor of Engineering with Honours", ["Software Engineering"]);
        user.industries.push("Embedded Systems Engineering");
        user.industries.push("Full Stack Development");
        user.locations.push("Wellingon, New Zealand");
        user.locations.push("Auckland, New Zealand");
        user.cvs.push("Aboods_CV.pdf");
    }

    addUser(firstName, lastName, email, password) {
        this.users[email] = new User(
            firstName,
            lastName,
            email,
            password
        );
    }   

    emailTaken(email) {
        return !!this.users[email];
    }

    getUser(email) {
        return this.users[email];
    }
}

class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.qualifications = [];
        this.industries = []; 
        this.locations = []; 
        this.cvs = [];
    }

    addQualification(institute, degree, majors) {
        this.qualifications.push({institute, degree, majors});
    }
}

export default MockBackend;