class DiaryListQuery{
    constructor(){
         this.data={};
         this.favourite_data={};
         localStorage.getItem('Data1')? this.setDiaryList(JSON.parse(localStorage.getItem('Data1'))):''
         localStorage.getItem('Favourite1') ? this.setFavouriteData(JSON.parse(localStorage.getItem('Favourite1'))) : ''
       
    }

    setDiaryList(diaryData){      
        for(var key in diaryData){
            this.data[key] = new DiaryQuery(diaryData[key]);
        }
    }

    getDiaryList(){
        return this.data;
    }

    setFavouriteData(data){
        console.log(data);
       Object.keys(data).forEach(element=>{
            this.favourite_data[element] = this.data[element];
       })  
    }

    updateFavouriteData(timestamp){
        var check = this.checkDataInFavourite(timestamp);
        if(check == undefined){
            this.favourite_data[timestamp] = this.data[timestamp];
        }
        else{
            delete this.favourite_data[timestamp];
        }
        localStorage.setItem('Favourite1',JSON.stringify(this.favourite_data));
    }

    checkDataInFavourite(timestamp){
        return this.favourite_data[timestamp];     
    }

    getFavouriteData(){
        return this.favourite_data;
    }

    updateDiary(key,data){
        this.data[key] = new DiaryQuery(data);
        var timestampData = localStorage.getItem("Data1") ? JSON.parse(localStorage.getItem("Data1")) : {};
        timestampData[key] = { ...data };
        localStorage.setItem("Data1",JSON.stringify(timestampData));
    }

    getMonthData(year,month){
        var month_array = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
        var keys = this.getTimeBasedKey(year,month,month_array);
        return this.getValueForKey(keys);
    }
    getYearData(year){
        var keys = this.getTimeBasedKey(year);
        return keys;
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

    getTimeBasedKey(years,month,month_array){
            var result = Object.keys(this.data).filter(key => {
            var current_month = new Date(parseInt(key)).getMonth();
            var year = new Date(parseInt(key)).getFullYear();
            if(month){
                var month_index = month_array[month];   
                return month_index == current_month && years == year;
            }
            return years == year;
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