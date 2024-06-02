class DiaryListQuery{
    constructor(data){
        this.data = this.setDiaryList(data);
       
    }
    setDiaryList(diaryData){
        var res = {};        
        for(var key in diaryData){
            res[key] = new DiaryQuery(diaryData[key]);
        }
        return res;
    }
    getDiaryList(){
        return this.data;
    }
    updateDiary(key,data){
        this.data[key] = new DiaryQuery(data);
    }
    getMonthData(year,month){
        var month_array = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
        var keys = this.getMonth_based_key(year,month,month_array);
        return this.getValueForKey(keys);
    }
    get_lastday(year,month,month_array){
        var last_day = new Date(year,month_array[month]+1,0).getDate()
        return last_day; 
    }
    get_timestamp(year,month,date,month_array){
        var month_array = { "Jan" : 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
        var newDate = new Date(year, month_array[month], date);
        return newDate.getTime();
    }
    getMonth_based_key(years,month,month_array){
        var month_index = month_array[month];
        var result = Object.keys(this.data).filter(key => {
            var month = new Date(parseInt(key)).getMonth();
            var year = new Date(parseInt(key)).getFullYear();
            return month_index == month && years == year;
        });
        return result;
    }
    getValueForKey(keys){
        var filteredObject = {};
        keys.forEach(key => {
            var date = new Date(parseInt(key)).getDate();
            filteredObject[date] ={...this.data[key].get_data()};
        });
        return filteredObject;
    }
    currentDateData(timestamp){
        return this.data[timestamp] ? this.data[timestamp].get_data() :{} ;
    }

}