import React, { Component } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector, change } from 'redux-form'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import ColorPickerField from 'material-ui-color-picker';
import ColorPicker from 'material-ui-color-picker'
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    
    <TextField hintText={label}
      floatingLabelText={label}
      label={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  const ColorPickerFieldd = ({ input, label, meta: { touched, error }, ...custom }) => (
    <ColorPicker hintText={label}
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
          label="Code Option"/>
        <Field 
          name={`${member}.nom`} 
          component={renderTextField} 
          label="Nom Option"/>
          &nbsp; &nbsp; &nbsp;
{/*
          <Field
  name="color"
  component={ColorPickerField}
/>
          
          <Field
            name={`${member}.color`}
            component={ColorPickerFieldd}
            label="hex"/>     
*/}
        <Fab aria-label="Delete"
            title="Remove Member"
            color="secondary"
            size="small" variant="contained"
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
const MyForm = ({ handleSubmit, pristine, reset, submitting }) => {

  return (
    
    <form onSubmit={handleSubmit}>
      <FieldArray name="options" component={renderMembers}/>
      <hr />
      <div>
        <Button type="button" size="small" variant="contained" color="primary" disabled={pristine || submitting} onClick={reset}>Supprimer tous les options</Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'MyForm',
})(MyForm)

