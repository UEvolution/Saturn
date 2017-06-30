const Sequelize = require('sequelize')
const sequelize = require('./index')
// 官方示例，测试使用
let User = sequelize.define('user', {
	firstName: {
		type: Sequelize.STRING,
		field: 'first_name'
	},
	lastName: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true
});

User.sync({force: true}).then(() => (
	User.create({
		firstName: 'John',
		lastName: 'Hancock'
	}
))

module.exports = User
