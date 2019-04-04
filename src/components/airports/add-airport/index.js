import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import sendAirportData from '.././../../redux/airports/actions';
import TextField from '../../material-components/text-field';

class AddAirportForm extends React.Component {
  static propTypes = {
  };

  addAirport = async (values) => sendAirportData(values);

  render() {
    return (
      <div className="add-airport">
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit }) => (
            <form className="add-airport__form" onSubmit={handleSubmit}>
              <div className="passengers-counters">
                <Field
                  name="code"
                  label="Code"
                  className="add-airport__textfield"
                  component={TextField}
                  variant="outlined"
                />
                <Field
                  name="name"
                  label="Name"
                  className="add-airport__textfield"
                  component={TextField}
                  variant="outlined"
                />
              </div>

              <button className="button" type="submit" onCLick={}>Add</button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendAirportData: airportInfo => dispatch(sendAirportData),
});

export default connect(mapDispatchToProps)(AddAirportForm);
