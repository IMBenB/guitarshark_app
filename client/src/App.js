import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Badge } from 'reactstrap';
import iconUrl from './v_icon.svg'
import './App.css';



const myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -30],


});
const sampleIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -30],


});

class App extends Component {
  constructor(props) { //props crush my web????why???
    super(props);

    this.
      state = {
      location: {
        lat: 32.30,
        lng: 34.85,
      },
      haveUserLocation: false,
      zoom: 2,
      counter: 0,
      samplePosition: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/getData', {
      method: 'POST',
      body: JSON.stringify(), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(samplePosition => {

        this.setState({
          samplePosition
          // })

        })
        console.log('bbb')
        console.dir(samplePosition);


      }).catch(err => {
        console.error(err)
      })



    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUserLocation: true,
        zoom: 10
      })
      console.log(position)
    },
      () => {
        console.log('no location')
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            console.log(location);
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUserLocation: true,
              zoom: 10,

            })
          })
        // alert('please confirm your location')
      }
    );
  }

  counterAndLocation = (e) => {
    // this.setState({ counter: this.state.counter + 1 })
    // e.preventDefault();

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        counter: this.state.counter + 1,
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUserLocation: true,
        zoom: 10,


      })
      // console.log(position)
      console.log(`lat: ${this.state.location.lat}`)
      console.log(`lng: ${this.state.location.lng}`)

    });
    let data = {
      latitude: this.state.location.lat,
      longitude: this.state.location.lng
    };
    fetch('http://localhost:5000/addData', {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        res.json()
          .then(resJson => {
            // console.dir(resJson)
            console.log('ben')
            console.log(resJson[10].latitude)
            console.log(resJson[10].longitude)
            // this.setState({samplePosition:{sampleLat : resJson[0].latitude,
            // sampleLng:resJson[0].longitude}

            // })

          })
      }).catch(err => {
        console.error(err)
      })



  }

  render() {


    const position = [this.state.location.lat, this.state.location.lng];
    const position2 = [32.111, 35.1111]
    return (
      <div className="map" >
        <Map className="map" center={[this.state.location.lat, this.state.location.lng]} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            this.state.haveUserLocation ?
              <Marker
                position={position}
                icon={myIcon}>
                <Popup>
                  you start here
         </Popup>
              </Marker> : ''
          }
          {/* {this.state.samplePosition.map(sample =>{
            <Marker
              position={sample.latitude,sample.longitude}
              icon={sampleIcon}>
              <Popup>
                {this.state.samplePosition.sampleLat}
              </Popup>
            </Marker>
          })
            
          } */}
          {
            <Marker
              position={position2}
              icon={sampleIcon}>
              <Popup>
                {this.state.samplePosition.latitude}
                {console.log(this.state.samplePosition[0])}
              </Popup>
            </Marker>
          }

        </Map>
        <div className="box"  >
          <h1> <Badge color="secondary">{this.state.counter}</Badge></h1>
        </div>
        <Button className='button' color="primary" onClick={this.counterAndLocation}>FISH</Button>{' '}

      </div>

    );
  }
}

export default App;

// npm start
