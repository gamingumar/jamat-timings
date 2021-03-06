import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default class MasjidForm extends Component {

  state = {
    newMasjid: {
      name: '',
      description: ''
    },
    masjids: [],
    loading: true,
  };

  componentDidMount() {
    this._fetchMasjids();
  }

  _fetchMasjids = async () => {
    this.setState({ loading: true });
    const response = await axios.get('/masjids');

    this.setState({ masjids: response.data, loading: false });
  };

  /**
   * Update Input State
   *
   * @param key
   * @param e
   * @private
   */
  _handleInput = (key, e) => {
    let newMasjid = Object.assign({}, this.state.newMasjid);

    newMasjid[key] = e.target.value;

    this.setState({ newMasjid });
  };

  _submitForm = async (e) => {
    e.preventDefault();

    console.log('sending: ', this.state.newMasjid);

    this.setState({ loading: true });
    try {
      const response = await axios.post('/masjids', {masjid: this.state.newMasjid});

      console.log('got res: ', response);

      this.setState(prevState => ({
        masjids: [...prevState.masjids, response.data]
      }))

    } catch (e) {
      console.error(e.response.data || e);
      alert(e.response.data || e);
    }

    this.setState({ loading: false });
  };

  _deleteMasjid = async (id) => {
    try {
      const response = await axios.delete(`/masjids/${id}`);
      console.log('delete response: ', response.data);

      this._fetchMasjids();
    } catch (e) {
      console.error(e.response.data || e);
      alert(e.response.data || e);
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <div>
        {
          this.state.masjids.map(masjid =>
            <div key={masjid.id}>
              <p>
                <Link to={`/masjid/${masjid.id}`}>{masjid.name}</Link>
                &nbsp;
                <a
                  onClick={ () => this._deleteMasjid(masjid.id) }
                  title={'delete'}
                  className={'btn text-danger'}>(x)</a>
              </p>
            </div>
          )
        }
        <hr/>


        <h3>Add Masjid</h3>

        <form onSubmit={this._submitForm}>
          <div className="form-group">
            <label>
              Masjid Name:
              <input type="text" className="form-control" onChange={(e) => this._handleInput('name', e)} />
            </label>
          </div>

          <div className="form-group">
            <label>
              Description:
              <input type="text" className="form-control" onChange={(e) => this._handleInput('description', e)} />
            </label>
          </div>

          <button type={'submit'} className="btn btn-primary">Add Masjid</button>

        </form>
      </div>
    );
  }
}