export default {
    userId : 1,

    activities: {
        add: 'http://localhost:9090/activities/add/',
        all: 'http://localhost:9090/activities/all/',
        pending: 'http://localhost:9090/activities/pending/',
        done: 'http://localhost:9090/activities/done/',
        completed: 'http://localhost:9090/activities/completed/',
        deleteativity: 'http://localhost:9090/activities/deleteactivity/'
    }, 

    users: {
        profile: 'http://localhost:9090/users/profile/',
        changePW: 'http://localhost:9090/users/changepw/',
        register: 'http://localhost:9090/users/register',
        login: 'http://localhost:9090/users/login'
    },

    boredAPI: {
        randomActivity: 'http://www.boredapi.com/api/activity/',
        type: 'http://www.boredapi.com/api/activity?type='
    }
}