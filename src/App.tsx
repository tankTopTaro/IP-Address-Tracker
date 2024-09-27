import { useState } from "react"
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import { Icon } from "leaflet"
import pin from './assets/images/pin.png'
/* import dotenv from 'dotenv'

dotenv.config() */
interface Location {
  city: string
  country: string
  geonameId: number
  lat: number
  lng: number
  postalCode?: string
  region: string
  timezone: string
}

const App = () => {
  const [ip, setIP] = useState('')
  const [lastIP, setLastIP] = useState('')
  const [location, setLocation] = useState<Location | null>(null)
  const [isp, setISP] = useState('')

  const getCoord = async (ip: any) => {
    // const apiKey = process.env.REACT_APP_API_KEY
    const apiKey = 'at_A8YHRwB8SzUdZpEUyO3dV25ayk0dB'
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
    
    try {
      const response = await fetch(url)
      const data = response.json()
      return data
    } catch (err) {
      console.error('Error @ getUserCoord:', err)
      return null
    }
  }

  const handleSubmit = async () => {
    if (ip) {
      const coordData = await getCoord(ip)
      setLastIP(ip)
      if (coordData) {
        setLocation(coordData.location)
        setISP(coordData.isp)
      }
    }
  }

  const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [38, 38]
  })

  return (
    <>
    <div className="header">
      <h1>IP Address Tracker</h1>
      <div className="input-field">
        <input 
          type="text" 
          id="ip-address" 
          value={ip}
          onChange={ev => setIP(ev.target.value)}
          placeholder="Search for any IP address or domain"/>
        <button className="submit" onClick={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
    <section>
      {location && (
        <div className="container">
        <span className="data">
          <small>IP ADDRESS</small>
          <h4 className="ip-address">{lastIP}</h4>
        </span>
        <span className="data">
          <small>LOCATION</small>
          <h4 className="location">
            {location?.city}, {location?.region} {location?.postalCode}
          </h4>
        </span>
        <span className="data">
          <small>TIMEZONE</small>
          <h4 className="timezone">
            {`UTC ${location?.timezone}`}
          </h4>
        </span>
        <span className="data">
          <small>ISP</small>
          <h4 className="isp">
            {isp}
          </h4>
        </span>
      </div>
      )}
      {location?.lat && location.lng && (
        <MapContainer center={[location.lat, location.lng]} zoom={13} key={`${location.lat}-${location.lng}`}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>
              <small>You are somewhere in this area.</small>
            </Popup>
          </Marker>
          <Circle center={[location.lat, location.lng]} radius={15000} />
        </MapContainer>
      )}
    </section>
    </>
  )
}

export default App