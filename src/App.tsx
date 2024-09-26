const App = () => {
  return (
    <>
    <div className="header">
      <h1>IP Address Tracker</h1>
      <div className="input-field">
        <input type="text" id="ip-address" placeholder="192.212.174.101"/>
        <button className="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
    <section>
      <div className="container">
        <span className="data">
          <small>IP ADDRESS</small>
          <h4 className="ip-address">192.212.174.101</h4>
        </span>
        <span className="data">
          <small>LOCATION</small>
          <h4 className="location">Brooklyn, NY 10001</h4>
        </span>
        <span className="data">
          <small>TIMEZONE</small>
          <h4 className="timezone">UTC -05:00</h4>
        </span>
        <span className="data">
          <small>ISP</small>
          <h4 className="isp">SpaceX Starlink</h4>
        </span>
      </div>

      <div id="map">
        <h1>MAP</h1>
      </div>
    </section>
    </>
  )
}

export default App