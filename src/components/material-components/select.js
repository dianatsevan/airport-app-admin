import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class SimpleSelect extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  };

  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    const {
      input: {
        name, onChange, value, ...restInput
      }, meta, ...rest
    } = this.props;

    return (
      <FormControl
        variant="outlined"
        error={meta.error && meta.touched}
      >
        <InputLabel
          ref={(ref) => {
            this.InputLabelRef = ref;
          }}
          htmlFor="outlined-age-simple"
        >
          {this.props.label}
        </InputLabel>
        <Select
          {...rest}
          name={name}
          inputProps={restInput}
          value={value}
          onChange={onChange}
          input={(
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={name}
              id="outlined-age-simple"
            />
)}
        >
          {this.props.items.length && this.props.items.map(({label, id}, index) => <MenuItem key={id} value={id}>{label} {id}</MenuItem>)}
        </Select>
        {meta.touched && meta.error && <FormHelperText margin="dense">{meta.error}</FormHelperText>}
      </FormControl>
    );
  }
}

export default SimpleSelect;
