// icon set: https://www.iconfinder.com/iconsets/weather-color-2

const actions = new Map([
  [200, ['11', 'add_thunder_rain_descrease_font']],
  [201, ['11', 'add_thunder_rain_descrease_font']],
  [202, ['11', 'add_thunder_heavy_rain_descrease_font']],
  [210, ['11', 'add_thunder']],
  [211, ['11', 'add_thunder']],
  [212, ['11', 'add_thunder_decrease_font']],
  [221, ['11', 'add_thunder_decrease_font']],
  [230, ['11', 'add_thunder_rain_decrease_font']],
  [231, ['11', 'add_thunder_rain_decrease_font']],
  [232, ['11', 'add_thunder_rain_decrease_font']],

  [300, ['09', 'add_rain_decrease_font']],
  [301, ['09', 'add_rain']],
  [302, ['09', 'add_rain_decrease_font']],
  [310, ['09', 'add_rain_decrease_font']],
  [311, ['09', 'add_rain']],
  [312, ['09', 'add_rain_decrease_font']],
  [313, ['09', 'add_rain_decrease_font']],
  [314, ['09', 'add_rain_decrease_font']],
  [321, ['09', 'add_rain']],

  [500, ['10', 'add_rain']],
  [501, ['10', 'add_rain']],
  [502, ['10', 'increase_rain_width_descrease_font']],
  [503, ['10', 'increase_rain_width']],
  [504, ['10', 'increase_rain_width']],
  [511, ['13', 'increase_rain_width']],
  [520, ['09', 'increase_rain_width_descrease_font']],
  [521, ['09', 'increase_rain_width']],
  [522, ['09', 'increase_rain_width_descrease_font']],
  [531, ['09', 'increase_rain_width_descrease_font']],

  [/^[600-622]$/, ['13', 'add_snow']],

  [701, ['50', 'add_mist']],
  [711, ['50', 'add_mist']],
  [721, ['50', 'add_mist']],
  [731, ['50', 'add_mist']],
  [741, ['50', 'add_fog']],
  [751, ['50', 'add_fog']],
  [761, ['50', 'add_fog']],
  [762, ['50', 'add_fog']],
  [771, ['50', 'increase_rain_width']],
  [781, ['50', 'increase_rain_width']],

  [800, ['01', '']],

  [801, ['02', '']],
  [802, ['03', '']],
  [803, ['04', '']],
  [804, ['04', '']],

  ['default', ['01', '']]
])

var sunrise = 0
var sunset = 0
var isDay = false
var startOfDay = 0
var endOfDay = 0

function sunMove () {
  // set bg color and sun's position depend on time
  var bgColor = '#feefc7'
  var position = 0
  var roundLevel = 1e3
  var midnight = 0
  var now = Math.round(Date.now() / 1000)

  if (now < startOfDay) {
    while (now < startOfDay) {
      now += 86400
    }
  } else if (now > endOfDay) {
    while (now > startOfDay) {
      now -= 86400
    }
  }

  $('.sun').css('transition', 'transform 1s ease, background-color 1s ease')

  if (sunset < now) {
    // before mid night
    if (isDay) {
      $('.sun').css('transition', 'background-color 1s ease')
    }

    midnight = Math.round(endOfDay)

    isDay = false
    position = 180 - Math.round((now - sunset) * 90 * roundLevel / (midnight - sunset)) / roundLevel
  } else if (sunrise > now) {
    // after mid night
    midnight = Math.round(startOfDay)

    isDay = false
    position = 90 - Math.round((now - midnight) * 90 * roundLevel / (sunrise - midnight)) / roundLevel
  } else {
    if (!isDay) {
      $('.sun').removeClass('is-night')
      $('.sun').css('transition', 'background-color 1s ease')
    }

    isDay = true
    position = 180 - Math.round((now - sunrise) * 180 / (sunset - sunrise)) + 15
  }

  $('.sun').css('transform', 'rotate(-' + position + 'deg) translate(75vh) rotate(-' + position + 'deg)')

  if (isDay) {
    $('.sun').css('background-color', '#fde477')
    $('.datetime').css('color', '#010a3d')
    $('.google a').css('color', '#010a3d')
    $('.google path').css('fill', '#010a3d')

    if (position >= 150) {
      bgColor = '#efa18b'
    } else if (position >= 120) {
      bgColor = '#e3c498'
    } else if (position >= 60) {
      bgColor = '#f6e9d2'
    } else if (position >= 30) {
      bgColor = '#e3c498'
    } else {
      bgColor = '#efa18b'
    }
  } else {
    $('.sun').addClass('is-night')

    $('.sun').css('background-color', '#e6dde4')
    $('.datetime').css('color', '#e6dde4')
    $('.google a').css('color', '#e6dde4')
    $('.google path').css('fill', '#e6dde4')

    bgColor = '#010a3d'
  }

  if (position < 90) {
    $('.weather').css('left', '20%')
  } else {
    $('.weather').css('left', '80%')
  }

  $('.container').css('background-color', bgColor)

}

function doWeather (action) {
  switch (action) {
    case 'add_thunder_rain_descrease_font':
      $('.lightning').css('display', 'block')
      $('.layer-1 .rain-drop').css('display', 'block')
      $('.weather .description').css('font-size', '1.5em')
      break
    case 'add_thunder_rain':
      $('.lightning').css('display', 'block')
      $('.layer-1 .rain-drop').css('display', 'block')
      break
    case 'add_thunder_heavy_rain_descrease_font':
      $('.thunder').css('display', 'block')
      $('.rain-drop').css('display', 'block')
      $('.rain-drop').css('width', '2px')
      $('.weather .description').css('font-size', '1.5em')
      break
    case 'add_thunder_heavy_rain':
      $('.thunder').css('display', 'block')
      $('.rain-drop').css('display', 'block')
      $('.rain-drop').css('width', '2px')
      break
    case 'add_thunder':
      $('.thunder').css('display', 'block')
      break
    case 'add_rain_decrease_font':
      $('.layer-1 .rain-drop').css('display', 'block')
      $('.weather .description').css('font-size', '1.5em')
      break
    case 'add_rain':
      $('.layer-1 .rain-drop').css('display', 'block')
      break
    case 'increase_rain_width_descrease_font':
      $('.rain-drop').css('display', 'block')
      $('.rain-drop').css('width', '2px')
      $('.weather .description').css('font-size', '1.5em')
      break
    case 'increase_rain_width':
      $('.rain-drop').css('display', 'block')
      $('.rain-drop').css('width', '2px')
      break
    case 'add_snow':
      $('.snowflakes .snowflake').css('display', 'block')
      break
    case 'add_mist':
      $('.fog').css('display', 'block')
      break
    case 'add_fog':
      $('.fog').css('display', 'block')
      $('.fog').css('filter', 'blur(20px)')
      break
    default:
      $('.sakuras .snowflake').css('display', 'block')
  }
}

function loadWeather () {
  return $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=8abd04009b0b784352dd637c0ecb8668&units=metric',
    success: function (data) {
      sunrise = data.sys.sunrise
      sunset = data.sys.sunset

      var today = new Date(sunrise * 1000)
      startOfDay = today.setHours(0, 0, 0, 0) / 1000
      endOfDay = today.setHours(23, 59, 59, 999) / 1000
      var now = Math.round(Date.now() / 1000)

      if (now < startOfDay) {
        while (now < startOfDay) {
          now += 86400
        }
      } else if (now > endOfDay) {
        while (now > startOfDay) {
          now -= 86400
        }
      }

      let action = actions.get(data.weather[0].id) || actions.get('default')

      if (sunset < now || sunrise > now) {
        isDay = false
      } else {
        isDay = true
      }

      $('.weather .icon').html($('<img/>').attr({
        src: '../images/weather/' + action[0] + (isDay ? 'd' : 'n') + '.png',
        alt: data.weather[0].description
      }))

      doWeather(action[1])

      $('.weather .city').html(data.name)
      $('.weather .curr-temp span').html(data.main.temp)
      $('.weather .description').html(data.weather[0].description)
      $('.weather .feel').html(data.main.feels_like)
      $('.weather .max a').html(data.main.temp_max)
      $('.weather .min a').html(data.main.temp_min)

      $('body').show()
    }
  })
}

function updateTime () {
  // get date
  var today = new Date()

  var date = today.toLocaleString('en-us', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  var time = today.toLocaleTimeString('en-us', {
    'hour12': false,
    'hour': '2-digit',
    'minute': '2-digit',
    'second': '2-digit'
  })

  // Fill current date time
  $('.date').text(date)
  $('.time').text(time)
}

// get weather
$(document).ready(function () {
  updateTime()
  loadWeather().then(() => {
    sunMove()
  })

  setInterval(loadWeather, 300000)
  setInterval(sunMove, 1000)
  setInterval(updateTime, 1000)
})
