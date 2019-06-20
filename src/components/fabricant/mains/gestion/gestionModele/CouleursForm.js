import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector, change } from 'redux-form'
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
          name={`${member}.code`}
          component={renderTextField} 
          label="Code Couleur"/>
        <Field 
          name={`${member}.nom`} 
          component={renderTextField} 
          label="Nom Couleur"/>
          &nbsp; &nbsp; &nbsp;
        <Fab aria-label="Delete"
            title="Remove Member"
            color="secondary"
            size="small" variant="contained"
            onClick={() => fields.remove(index)}
            >
          <DeleteIcon />
        </Fab>
      </div>
    )}<br /><Button type="button" onClick={() => fields.push({})} size="small" variant="contained" color="primary">Add couleur</Button>
    {console.log(fields.getAll())
    }
  </div>
)

const CouleursForm = ({ handleSubmit, pristine, reset, submitting }) => {

  return (
    
    <form onSubmit={handleSubmit}>
      <FieldArray name="couleurs" component={renderMembers}/>
      <hr />
      <div>
        <Button type="button" size="small" variant="contained" color="primary" disabled={pristine || submitting} onClick={reset}>Supprimer tous les couleurs</Button>
          
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'CouleursForm',
})(CouleursForm)

