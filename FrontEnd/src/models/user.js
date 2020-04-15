export default  class User{
    constructor(name, email, pw){
        this.name = name;
        this.email = email;
        this.password = pw;
        this.role = 'user'
    }
}