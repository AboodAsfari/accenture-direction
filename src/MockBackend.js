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
        user.bio = "I'm a software engineering student in my penultimate year of study. I am specializing in embedded systems as well as networked applications and am passionate about technology. I'm eager to get into the industry but feel like I require some guidance.";
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
        this.bio = "";
        this.qualifications = [];
        this.industries = []; 
        this.locations = []; 
        this.cvs = [];
        this.profilePic = null;
        this.memberSince = this.formatDate(new Date());
    }

    addQualification(institute, degree, majors) {
        this.qualifications.push({institute, degree, majors});
    }

    formatDate(inputDate) {
        let date, month, year;
        
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();
        
            date = date
                .toString()
                .padStart(2, '0');
        
            month = month
                .toString()
                .padStart(2, '0');
        
        return `${date}/${month}/${year}`;
    }

    clone() {
        let user = new User(
            this.firstName,
            this.lastName,
            this.email,
            this.password
        );
        user.bio = this.bio;
        this.qualifications.forEach((item) => user.addQualification(item.institute, item.degree, [...item.majors]));
        user.industries = this.industries;
        user.locations = this.locations;
        user.cvs = this.cvs;
        user.profilePic = this.profilePic;
        user.memberSince = this.memberSince;
        return user;
    }
}

export default MockBackend;