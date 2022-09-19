import {faker} from '@faker-js/faker'

export async function userFactory () {
    const password = faker.internet.password()
    return {
        email:faker.internet.email(),
        password,
        confirmPassword:password
    }
}