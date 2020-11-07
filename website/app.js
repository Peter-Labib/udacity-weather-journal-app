const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const APIKey = 'c245c55a62e7f68314803a5b7dd6f654'

const form = document.getElementById('dataEntry')
const dateEl = document.getElementById('date')
const tempEl = document.getElementById('temp')
const contentEl = document.getElementById('content')
const formSubmitionBtn = document.getElementById('generate')
formSubmitionBtn.addEventListener('click', generateData)

function generateData (e) {
  e.preventDefault()

  const zip = document.getElementById('zip').value
  const feeling = document.getElementById('feelings').value

  /* generate currently date instance dynamically with JS */
  const date = new Date()
  const dateFormat = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  getTemperature(baseURL, zip, APIKey)
    .then(data => {
      /* Add data to POST request */
      postData('/weatherData', { currentlyDate: dateFormat, temp: data.main.temp, feeling })
    })
    .then(() => {
      updateUI()
      form.reset()
    })
}

/*  get temperature from external API */
const getTemperature = async (url, zip, APIKey) => {
  const res = await fetch(url + zip + '&appid=' + APIKey)
  try {
    const data = await res.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/* store data in server */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  try {
    const newData = await req.json()
    return newData
  } catch (error) {
    console.log('Error', error)
  }
}

const updateUI = async () => {
  const res = await fetch('/all')
  try {
    const allData = await res.json()
    dateEl.innerHTML = `<span>Date today:</span> ${allData.date}`
    tempEl.innerHTML = `<span>Temperature in kelvin:</span> ${allData.temp}`
    contentEl.innerHTML = `<span>your feeling: </span>${allData.feeling}`
  } catch (error) {
    console.log('error', error)
  }
}
