class Utility{
    constructor(){
        this.months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    get_months(year){
        var cur = new Date().getFullYear();
        var mon = new Date().getMonth();
        return  cur == year ? this.months.slice(0, mon + 1) : this.months;
    }
    get_timestamp(year,month,date){
        var newDate = new Date(year, this.months.indexOf(month), date);
        return newDate.getTime();
    }
    total_days_in_month(year,month){
        var month_number = this.months.indexOf(month);
        return new Date(year, month_number + 1, 0).getDate();
    }
}