import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';

export default class Home extends Component {
  state = {
    masjids: [],
    loading: true
  };

  componentDidMount() {
    this._fetchMasjids();
  }

  _fetchMasjids = async () => {
    this.setState({ loading: true });
    const response = await axios.get('/masjids');

    this.setState({ masjids: response.data, loading: false });
  };

  render() {
    if (this.state.loading) {
      return <Loader/>;
    }
    return (
      <div>
        <h1>Masjids</h1>
        <hr/>
        {
          this.state.masjids.map(masjid =>
            <div key={masjid.id}>
              <p>
                <Link to={`/masjid/${masjid.id}`}><b style={{ fontSize: 20 }}>{masjid.name}</b></Link>
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