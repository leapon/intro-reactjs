// DayForecast
var DayForecast = React.createClass({
    getWeatherIconName: function(weather) {
        weather = weather.toLowerCase();
        switch(weather) {
            case 'clouds':
                weather = 'cloudy';
                break;
            case 'clear':
                weather = 'sunny';
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
            <div className="day-forecast-container" >
                <div className="day-forecast-day">{ date }</div>
                <div className="day-forecast-icon"><i className={ weatherClassName }></i></div>
                <div className="day-forecast-temperature">
                    { temperature }
                    <i className={ weatherUnitClassName }></i>
                </div>
            </div>
        );
    }
});

// WeekForecast
var WeekForecast = React.createClass({
    render: function() {
        // set variables for display
        var data = this.props.data;
        var dayForcasts = [];
        for (var i = 0; i < data.dataItems.length; i++) {
            var dataItem = data.dataItems[i];
            var dataItemKey = 'dt-' + dataItem.dt;
            dayForcasts.push(
                <DayForecast data={ dataItem } key={ dataItemKey } />
            )
        }
        // render content
        return (
            <div className="week-forecast-container" >
                { dayForcasts }
                <div className="div-clear-both"></div>
            </div>
        );
    }
});
