export class UserAlreadyExsistsError extends Error {
    constructor() {
        super('Já existe um usuário cadastrado com esse email')
    }
}