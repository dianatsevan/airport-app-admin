import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import MaterialDialog from '../../material-components/dialog';
import Select from '../../material-components/select';

const styles = {
  selectField: {
    backgroundColor: 'lightblue',
    width: '150px'
  }
}

class AddAirportPopup extends React.Component {
  onSubmit = values => {
    return localStorage.setItem('ex', JSON.stringify(values));
  };

  render () {
    const { classes } = this.props;
    const airports = ['Andorra', 'Abakan', 'Anna'];

    return (
      <div className="wrapper">
        <MaterialDialog title='Add airport'>
          <Form
            onSubmit={this.onSubmit}
            // validate={validate}
            render={({ handleSubmit }) => (
              <form className="search-form" onSubmit={handleSubmit}>
                <Field
                  name="from"
                  label="From"
                  className={classes.selectField}
                  component={Select}
                  items={airports}
                />

                <Field
                  name="to"
                  label="To"
                  className={classes.selectField}
                  component={Select}
                  items={airports}
                />

                <button className={classes.button} type="submit">
                  Search
                </button>
              </form>
            )}
          />
        </MaterialDialog>
        
      </div>
    )
  }
}

export default withStyles(styles)(AddAirportPopup);
