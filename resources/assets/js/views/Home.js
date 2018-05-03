import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class Home extends Component {
  state = {
    masjids: []
  };

  componentDidMount() {
    this._fetchMasjids();
  }

  _fetchMasjids = async () => {
    const response = await axios.get('/masjids');

    this.setState({ masjids: response.data });
  };

  render() {
    return (
      <div>
        <h1>Masjids</h1>
        <hr/>
        {
          this.state.masjids.map(masjid =>
            <div key={masjid.id}>
              <p>
                <Link to={`/masjid/${masjid.id}`}>{masjid.name}</Link>
                {/*&nbsp;*/}
                {/*<a*/}
                  {/*onClick={ () => this._deleteMasjid(masjid.id) }*/}
                  {/*title={'delete'}*/}
                  {/*className={'btn text-danger'}>(x)</a>*/}
              </p>
            </div>
          )
        }

      </div>
    );
  }
}