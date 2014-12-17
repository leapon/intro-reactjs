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
    getInitialState: function() {
        return { data:{ location:'', forecastList:null } };
    },
    componentDidMount: function() {
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily'
        var parameter = { q:this.props.data.location, mode:'json', units:'metric', cnt:7 };
        $.get(url, parameter, function(data) {
            this.state.data = {
                location: this.props.data.location,
                forecastList: data.list
            };
            this.forceUpdate();
        }.bind(this));
    },
    render: function() {
        // set variables for display
        var data = this.state.data;
        var dayForcasts = [];
        if (data.forecastList && data.forecastList.length > 0) {
            for (var i = 0; i < data.forecastList.length; i++) {
                var forecastItem = data.forecastList[i];
                var forecastItemKey = 'dt-' + forecastItem.dt;
                dayForcasts.push(
                    <DayForecast data={ forecastItem } key={ forecastItemKey } />
                )
            }
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

// WeatherCurrent
var WeatherCurrent = React.createClass({
    getInitialState: function() {
        return { data:{ location:'', forecastList:null } };
    },
    componentDidMount: function() {
        var url = 'http://api.openweathermap.org/data/2.5/weather'
        var parameter = { q:this.props.data.location, mode:'json', units:'metric' };
        $.get(url, parameter, function(data) {
            console.log('current weather:', data);
            this.state.data = {
                location: this.props.data.location,
                weather: data
            };
            this.forceUpdate();
        }.bind(this));
    },
    render: function() {
        // set variables for display
        var data = this.state.data.weather;
        var summary = {
            location: '',
            temperature: '',
            currentMonth: '',
            currentDay: ''
        }
        if (data) {
            summary.location = data.name;
            summary.temperature = Math.round(data.main && data.main.temp || 0);
            summary.currentMonth = moment.unix(data.dt).format('MMM');
            summary.currentDay = moment.unix(data.dt).format('DD');
        }
        var weatherUnitClassName = 'wi wi-celsius';
        // render content
        return (
            <div className="weather-current-container" >
                <div className="weather-current-date">
                    <div className="weather-current-month">{ summary.currentMonth }</div>
                    <div className="weather-current-day">{ summary.currentDay }</div>
                </div>
                <div className="weather-current-location">{ summary.location }</div>
                <div className="weather-current-temperature">
                    { summary.temperature }
                    <i className={ weatherUnitClassName }></i>
                </div>
                <div className="div-clear-both"></div>
            </div>
        );
    }
});

// Weather
var Weather = React.createClass({
    render: function() {
        // render content
        return (
            <div className="weather-container" >
                <WeatherCurrent data={ this.props.data } />
                <WeekForecast data={ this.props.data } />
            </div>
        );
    }
});