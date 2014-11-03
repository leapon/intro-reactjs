// DayForcast
var DayForcast = React.createClass({
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

// WeekForcast
var WeekForcast = React.createClass({
    render: function() {
        // set variables for display
        var data = this.props.data;
        var dayForcasts = [];
        for (var i = 0; i < data.dataItems.length; i++) {
            var dataItem = data.dataItems[i];
            var dataItemKey = 'dt-' + dataItem.dt;
            dayForcasts.push(
                <DayForcast data={ dataItem } key={ dataItemKey } />
            )
        }
        // render content
        return (
            <div className="week-forcast-container" >
                { dayForcasts }
                <div className="div-clear-both"></div>
            </div>
        );
    }
});

// Weather
var Weather = React.createClass({
    render: function() {
        // set variables for display
        var data = this.props.data;
        // render content
        return (
            <div className="weather-container" >
                weather for { data.location }
            </div>
        );
    }
});