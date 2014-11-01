// WeekForcast
var WeekForcast = React.createClass({
    render: function() {
        // set variables for display
        var data = this.props.data;
        
        // render content
        return (
            <div className="week-forcast-container" >
            
            </div>
        );
    }
});

// DayForcast
var DayForcast = React.createClass({
    getWeatherIconName: function(weather) {
        weather = weather.toLowerCase();
        switch(weather) {
            case 'clouds':
                weather = 'cloudy';
                break;
        }
        return weather;
    },
    render: function() {
        // set variables for display
        var data = this.props.data;
        var date = moment.unix(data.dt).format('DD');
        var temperature = Math.round(data.temp.day);
        var humidity = data.humidity;
        var weatherClassName = 'wi wi-day-' + this.getWeatherIconName(data.weather[0].main);
        var weatherUnitClassName = 'wi wi-celsius';
        // render content
        return (
            <div className="day-forcast-container" >
                <div className="day-forcast-day">{ date }</div>
                <div className="day-forcast-icon"><i className={ weatherClassName }></i></div>
                <div className="day-forcast-temperature">
                    { temperature }
                    <i className={ weatherUnitClassName }></i>
                </div>
            </div>
        );
    }
});