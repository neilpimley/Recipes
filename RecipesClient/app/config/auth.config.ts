interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: 'D1WcmXHjtc4v4QsgeetF9hrxE6EXReoX',
    domain: 'neilpimley.eu.auth0.com',
    callbackURL: 'http://localhost:3000/recipes-list'
};