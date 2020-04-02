"use strict";
const users = [
    {
        id: "1",
        name: "elliotti",
        email: "elli@otti.fi",
        password: "12345"
    }
];


const getUser = (id) => {
    const user = users.filter((usr) => {
        if (usr.id === id) {
            return usr;
        }
    });
    return user[0];
};

const getUserLogin = (email) => {
    const user = users.filter((usr) => {
        if (usr.email === email) {
            return usr;
        }
    });
    return user[0];
};

module.exports = {
    users,
    getUser,
    getUserLogin,
};
