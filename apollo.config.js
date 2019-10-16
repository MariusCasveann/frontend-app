module.exports = {
    client: {
        name: 'dp-ui',
        service: {
            name: 'dp-ui',
            url: 'http://localhost:8080/graphql'
        },
        excludes: ['node_modules/**'],
        includes: ['./src/**/*.graphql']
    }
};
