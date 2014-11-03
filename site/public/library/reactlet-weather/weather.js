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
        if (data.dataItems && data.dataItems.length > 0) {
            for (var i = 0; i < data.dataItems.length; i++) {
                var dataItem = data.dataItems[i];
                var dataItemKey = 'dt-' + dataItem.dt;
                dayForcasts.push(
                    <DayForcast data={ dataItem } key={ dataItemKey } />
                )
            }
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
    getInitialState: function() {
        return { data:{ location:'', dataItems:null } };
    },
    componentDidMount: function() {
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily'
        var parameter = { q:this.props.data.location, mode:'json', units:'metric', cnt:7 };
        $.get(url, parameter, function(data) {
            this.state.data = {
                location: this.props.data.location,
                dataItems: data.list
            };
            this.forceUpdate();
        }.bind(this));
    },
    
    render: function() {
        // set variables for display
        var data = this.props.data;
        // render content
        return (
            <div className="weather-container" >
                <WeekForcast data={ this.state.data } />
            </div>
        );
    }
});