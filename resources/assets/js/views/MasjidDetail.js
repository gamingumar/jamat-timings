import React, {Component} from 'react';
import Loader from '../components/Loader';

export default class MasjidDetail extends Component {
  state = {
    name: '',
    loading: true,
    error: false,
    timing: {
      masjid_id: '',
      fajr: '',
      zohar: '',
      asar: '',
      maghrib: '',
      isha: '',
      juma: '',
    }
  };

  componentDidMount() {
    this._fetchMasjidDetail();
  }

  _handleInput = (key, e) => {
    let timing = Object.assign({}, this.state.timing);

    timing[key] = e.target.value;

    this.setState({ timing });
  };

  _fetchMasjidDetail = async () => {
    try {
      this.setState({ error: false, loading: true });

      // extracting masjid id from url
      const masjid_id = this.props.match.params.id;

      let timing = Object.assign({}, this.state.timing);

      timing.masjid_id = masjid_id;

      this.setState({ timing });

      // fetching masjid detail
      const response = await axios.get(`/masjids/${masjid_id}`);

      let namazTimings = null;
      // fetch masjid timings
      try {
        namazTimings = await axios.get(`/timings/${masjid_id}`);
        namazTimings = namazTimings.data;
        console.log('namaz timing got: ', namazTimings);

        this.setState({ timing: namazTimings });

      } catch (e) {
        this.setState({ error: 'timings not found ', loading: false});
      }


      this.setState({ name: response.data.name, loading: false });

      console.log('res: ', response.data);
    } catch (e) {
      console.error(e.response.data || e);
      this.setState({ error: true, loading: false });
    }
  };

  _fetchTimings = async () => {

  };

  _updateTimings = async () => {
    try {
      this.setState({ error: false, loading: true });

      // const masjid_id = this.props.match.params.id;
      const response = await axios.post('/timings', { namaz: this.state.timing });

      this.setState({ loading: false });

      console.log('res: ', response.data);
    } catch (e) {
      console.log(e.response.data || e);
      alert(e.response.data || e);
      this.setState({ error: true, loading: false });
    }
  };

  _submitForm = (e) => {
    e.preventDefault();

    this._updateTimings();
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    const {
      name,
      error,
      timing
    } = this.state;

    const { fajr, zohar, asar, maghrib, isha, juma } = timing;

    const {id} = this.props.match.params;

    return (
      <div>

        <h1>{name !== '' ? name : `Masjid Detail (${id})`}</h1>
        <code>Updated At: {timing.updated_at || ''}</code>

        {error && <code>{error}</code>}


        <form onSubmit={this._submitForm}>
          <div className="form-group">
            <label>
              Fajr:
              <input type="time" value={fajr || ''} className="form-control" onChange={(e) => this._handleInput('fajr', e)} />
            </label>
          </div>

          <div className="form-group">
            <label>
              Zohar:
              <input type="time" value={zohar || ''} className="form-control" onChange={(e) => this._handleInput('zohar', e)} />
            </label>
          </div>


          <div className="form-group">
            <label>
              Asar:
              <input type="time" value={asar || ''} className="form-control" onChange={(e) => this._handleInput('asar', e)} />
            </label>
          </div>


          <div className="form-group">
            <label>
              Maghrib:
              <input type="time" value={maghrib || ''} className="form-control" onChange={(e) => this._handleInput('maghrib', e)} />
            </label>
          </div>

          <div className="form-group">
            <label>
              Isha:
              <input type="time" value={isha || ''} className="form-control" onChange={(e) => this._handleInput('isha', e)} />
            </label>
          </div>

          <div className="form-group">
            <label>
              Juma:
              <input type="time" value={juma || ''} className="form-control" onChange={(e) => this._handleInput('juma', e)} />
            </label>
          </div>


          <button type={'submit'} className="btn btn-primary">Update Masjid Timing</button>

        </form>


      </div>
    );
  }
}