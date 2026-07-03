export function isLoggedIn() {
    return !!localStorage.getItem(
        "accessToken"
    )
}

export function getUserRole() {
    return localStorage.getItem(
        "role"
    )
}

export function logoutLocally() {
    localStorage.removeItem(
        "accessToken"
    )

    localStorage.removeItem(
        "refreshToken"
    )

    localStorage.removeItem(
        "userId"
    )

    localStorage.removeItem(
        "role"
    )
}