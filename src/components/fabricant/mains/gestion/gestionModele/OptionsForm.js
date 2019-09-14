import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import { TextValidator } from 'react-material-ui-form-validator';
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    
    <TextValidator hintText={label}
      floatingLabelText={label}
      label={label}
      errorText={touched && error}
      validators={['required','matchRegexp:[A-Za-z0-9_*-]']}
      errorMessages={['Ce champ est obligatoire', 'Vous devez saisir un nom valide']}
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
        </Badge> &nbsp; &nbsp; &nbsp; 
        <Field 
          name={`${member}.code`}
          component={renderTextField} 
          label="Code Option"/>
           &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        <Field 
          name={`${member}.nom`} 
          component={renderTextField} 
          label="Nom Option"/>
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
    )}<br /><Button type="button" onClick={() => fields.push({})} size="small" variant="contained" color="primary">Add option</Button>
    {console.log(fields.getAll())
    }
  </div>
)
const OptionsForm = ({ handleSubmit, pristine, reset, submitting }) => {

  return (
    
    <form onSubmit={handleSubmit}>
      <FieldArray name="options" component={renderMembers}/>
      <hr />
    {/*  <div>
        <Button type="button" size="small" variant="contained" color="primary" disabled={pristine || submitting} onClick={reset}>Supprimer tous les options</Button>
    </div>*/}
    </form>
  )
}

export default reduxForm({
  form: 'OptionsForm',
})(OptionsForm)

