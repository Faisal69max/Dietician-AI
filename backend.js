const USERS_KEY = 'ai_diet_users';
const CURRENT_USER_KEY = 'ai_diet_current_user';

function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
}

function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function removeCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

function registerUser(email, password, name) {
    const users = getUsers();

    if (users[email]) {
        return { success: false, message: 'An account with this email already exists.' };
    }

    users[email] = { password, name };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true, message: 'Registration successful.' };
}

function authenticateUser(email, password) {
    const users = getUsers();
    const user = users[email];

    if (!user) {
        return { success: false, message: 'User not found.', user: null };
    }

    if (user.password === password) {
        const sessionUser = { email: email, name: user.name };
        saveCurrentUser(sessionUser);
        return { success: true, message: 'Sign in successful.', user: sessionUser };
    } else {
        return { success: false, message: 'Invalid password.', user: null };
    }
}