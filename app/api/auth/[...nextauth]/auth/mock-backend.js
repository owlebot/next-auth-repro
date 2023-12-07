const increment = 0

const users = new Map()

export const back_createUser = async () => {
    const id = increment++;
    const data = {
        id, 
        accounts: []
    }
    users.set(id, { id, accounts: [] })

    return {
        data,
        ok: true
    }
}
export const back_getUserById = async (id) => {
    return {
        data: users.get(id),
        ok: true
    }
}
export const back_getUserByAccount = async (id) => {
    for (const user in Object.values(users)) {
        if (user.accounts.find(e => e.id === id)) {
            return user
        }
    }

}
export const back_linkAcount = async (id, data) =>{
    const user = users.get(id)
    if (!user.accounts) {
        user.accounts = []
    }
    user.accounts.push(data)
    
    return;
}
