class CurrentUser{
    static SetUser(Employer, id){
        this.Empl = Employer;
        this.id = id;
    }
    static GetMail(){
        var curr = {Empl = this.Empl, id = this.id};
        return curr;
    }
}