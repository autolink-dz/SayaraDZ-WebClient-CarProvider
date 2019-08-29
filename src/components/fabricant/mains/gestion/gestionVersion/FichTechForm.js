import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector, change } from 'redux-form'
//import validate from './validate'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import gestionReducer  from './../../../../../reducers/gestionReducer'
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
      floatingLabelText={label}
      label={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

const renderMembers = ({ fields, meta: { touched, error } }) => (
  <div>

      {touched && error && <span>{error}</span>}
    { fields.map((member, index) =>
      <div key={index}>

        <Badge badgeContent={index + 1} color="primary">
        </Badge>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        <Field 
          name={`${member}.attr`}
          component={renderTextField} 
          label="Nom du champ"/>
        <Field 
          name={`${member}.val`} 
          component={renderTextField} 
          label="valeurs"/>
          &nbsp; &nbsp; &nbsp;
        <Fab aria-label="Delete"
            title="Remove Member"
            color="secondary"
            size="small" variant="round"
            onClick={() => fields.remove(index)}
            >
          <DeleteIcon />
        </Fab>
      </div>
    )}<br /><Button type="button" onClick={() => fields.push({})} size="small" variant="contained" color="primary">Add ligne</Button>
    {console.log(fields.getAll())
    }
  </div>
)

const FichTech = ({ handleSubmit, pristine, reset, submitting }) => {

  return (
    
    <form onSubmit={handleSubmit}>
      <FieldArray name="fiche_tech" component={renderMembers}/>
      <hr />
    </form>
  )
}

export default reduxForm({
  form: 'FichTech',
})(FichTech)

