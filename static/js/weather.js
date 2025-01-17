class Info {
  // do web requests
  static async getResponse(url) {
    let resp = await fetch(url);
    let json = await resp.json();
    return json;
  }

  // get users approximate city, latitude, and longitude based on IP
  static async getIpLoc() {
    let data = await this.getResponse(`{xor.encode("http://ip-api.com/json/" + ip)}`);
    let latlon = `${data.lat},${data.lon}`;
    let city = data.city;
    return { latlon, city };
  }

  // get weather.gov zone (not needed)
  static async getZone(latlon) {
    let data = await this.getResponse(`https://api.weather.gov/points/${latlon}`);
    return data.properties.forecastZone;
  }

  // return an array of city, latlon, and weather.gov zone
  static async getNearestZone() {
    let { city, latlon } = await this.getIpLoc();
    let zone = await this.getZone(latlon);
    return { city, latlon, zone };
  }
}

class Weather {
  // gets weather and returns the current.
  static async getCurrents(latlon) {
    let data = await Info.getResponse(`/currentw?lat=${latlon.replace(",", "&lon=")}`);
    let temp = data.observation.imperial.temp;
    let weather = data.observation.phrase_22char;
    let icn = data.observation.icon_code;
    return { temp, weather, icn };
  }

  // gets extended weather data and returns it.
  static async getAlert(latlon) {
    let data = await Info.getResponse(`/alertw&lat=${latlon.replace(",", "&lon=")}`);
    if (data instanceof Error) {
      return;
    } else {
      return data.alerts[0].eventDescription;
    }
  }
}

async function StartWeather() {
  let ipdat = await Info.getIpLoc();
  let weather = await Weather.getCurrents(ipdat.latlon);
  let alert = await Weather.getAlert(ipdat.latlon);

  document.getElementById("winfo").innerHTML = `<a id="wst" style="text-align: center;">${ipdat.city}</a><br><a id="wde">${weather.temp}&degF | ${weather.weather}</a>`;

  console.log(weather.alert.length);

  if (alert !== null) {
    document.getElementById('alerts').setAttribute('onclick', `location.href = '/fetch/aHR0cHM6Ly9mb3JlY2FzdC53ZWF0aGVyLmdvdg==/MapClick.php?&lat=${ipdat.latlon.replace(',', '&lon=')}'`);
    document.getElementById('alerts').innerHTML = `${alert}`;
  } else {
    return;
  }
}

window.onload = () => {
  StartWeather();
};
