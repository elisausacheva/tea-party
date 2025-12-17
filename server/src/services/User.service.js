const { User } = require('../../db/models')

class UserController {

    static async getAllUsers() {
        const users = await User.findAll()
        console.log("=====Service======", users);
        const result = users.map((el) => el.get({ plain: true }))
        return result
    }

    static async getOneUser(id){
        const user = await User.findByPk(id)
        console.log("=====Service111======", user); 
        const result = user.get({ plain: true }) 
        return result    
    }
    
    static async registerUser({name, email, password}) {
        const user = await User.create({
        name,
        email,
        password,
        });
        const result = user.get({ plain: true })
        return result
    }

    static async getByEmail(email) {
        const user = await User.findOne({ where: {email} })
        if (!user) {
            return null
        } else {
            const result = user.get({ plain: true })
            return result
        }

    }

    static async updateUser(id, data) {
        const user = await User.update(data, { where: { id } })
        if (user) {
            return user
        } else {
            return false
        }
    }

    static async deleteUser(id) {
        const user = await User.findByPk(id)
        user.destroy()
        return id
    }

}
module.exports = UserController