import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import { TextValidator} from 'react-material-ui-form-validator';

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
          name={`${member}.attr`}
          component={renderTextField} 
          label="Nom du champ"/>
          &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
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

