import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector, change } from 'redux-form'
//import validate from './validate'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import gestionReducer  from './../../../../../reducers/gestionReducer'
import DeleteIcon from '@material-ui/icons/Delete';
/*const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)*/
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
  <ul>

      {touched && error && <span>{error}</span>}
    { fields.map((member, index) =>
      <li key={index}>

        <h4>Option #{index + 1}</h4>
        
        <Field 
          name={`${member}.code`}
          component={renderTextField} 
          label="Code Option"/>
        <Field 
          name={`${member}.nom`} 
          component={renderTextField} 
          label="Nom Option"/>
          <Button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
          size="small" variant="contained"
          color="secondary"><DeleteIcon fontSize="large" /></Button>
        <hr />
       {/*  <FieldArray name={`${member}.hobbies`} component={renderHobbies}/>*/ }
       
      </li>
    )}<Button type="button" onClick={() => fields.push({})} size="small" variant="contained" color="primary">Add option</Button>
    {console.log(fields.getAll())
    }
  </ul>
)
/*
const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}/>
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}/>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)*/

const MyForm = ({ handleSubmit, pristine, reset, submitting }) => {

  return (
    
    <form onSubmit={handleSubmit}>
   {/*
     <Field
     name="clubName"
     type="text"
     component={renderField}
     label="Club Name"
   />

   */} 
      <FieldArray name="options" component={renderMembers}/>
      <div>
        
      <button>initialize from form</button>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'MyForm',
  //validate,
 /* initialValues: {
    options: [{'code':'Axl Rose', 'nom':'Brian Johnson'}]
  },*/
})(MyForm)

