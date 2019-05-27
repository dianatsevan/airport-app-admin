import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class SimpleSelect extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired
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
        name, onChange, value, multiple, children, ...restInput
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
          multiple={multiple}
          name={name}
          inputProps={restInput}
          value={value || []}
          onChange={onChange}
          input={(
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={name}
              id="outlined-age-simple"
            />
          )}
        >
          {this.props.kids}
        </Select>
        {meta.touched && meta.error && <FormHelperText margin="dense">{meta.error}</FormHelperText>}
      </FormControl>
    );
  }
}

export default SimpleSelect;
