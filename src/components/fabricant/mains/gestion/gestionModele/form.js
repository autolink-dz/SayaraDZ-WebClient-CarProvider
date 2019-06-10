import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { Field, FieldArray, reduxForm } from 'redux-form'
class Form extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            open: false,
            snack:null,
        };
    }
    componentDidMount() {

    };

    render() {
        const { classes } = this.props;
        
          
        return (
            <div>
                <form onSubmit>
                    <Field name="clubName" type="text"  label="Club Namee"/>--
                    <FieldArray name="members" />
                  { /* <div>
                        <button type="submit">Submit</button>
                        <button type="button" >Clear Values</button>
                  </div>*/}
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default Form;