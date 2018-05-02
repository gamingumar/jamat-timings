import React, {Component} from 'react';

export default class MasjidForm extends Component {

  state = {
    newMasjid: {
      name: '',
      description: ''
    },
    masjids: []
  };

  componentDidMount() {
    this._fetchMasjids();
  }

  _fetchMasjids = async () => {
    const response = await axios.get('/masjids');

    this.setState({ masjids: response.data });
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

    try {
      const response = await axios.post('/masjids', {masjid: this.state.newMasjid});

      console.log('got res: ', response);

      this.setState(prevState => ({
        masjids: [...prevState.masjids, response.data]
      }))

    } catch (e) {
      console.error(e.response.data.message || e);
      alert(e.response.data.message || e);
    }
  };

  render() {
    return (
      <div>
        {
          this.state.masjids.map(masjid => <p key={masjid.id}>{masjid.name}</p>)
        }

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