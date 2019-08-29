import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector, change } from 'redux-form'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import ColorPickerField from 'material-ui-color-picker';
import ColorPicker from 'material-ui-color-picker'
import Grid from '@material-ui/core/Grid';


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
      <Grid container spacing={3} key={index}>

        <Grid item xs={4}>
        <Badge badgeContent={index + 1} color="primary">
        </Badge>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        <Field 
          name={`${member}.code`}
          component={renderTextField} 
          label="Code Couleur"/>
        </Grid>
        <Grid item xs={4}>
        <Field 
          name={`${member}.nom`} 
          component={renderTextField} 
          label="Nom Couleur"/>
          &nbsp; &nbsp; &nbsp;
          </Grid> 
<Grid item xs={2}>
          <Field
            name={`${member}.color`}
            component={ColorPickerFieldd}
            label="hex"
            />   
            </Grid>
            <Grid item xs={1}>
            <div id="color-changer" style={{
                background: `${fields.get(index).color}`,
           //     display: 'inline-block',
                width:40,
                height:40,
                borderRadius:15
              }}>
                </div>  
                </Grid>
                <Grid item xs={1}>
        <Fab aria-label="Delete"
            title="Remove Member"
            color="secondary"
            size="small" variant="round"
            onClick={() => fields.remove(index)}
            >
          <DeleteIcon />
        </Fab>
        </Grid>
        </Grid>
    )}
    
    <br /><Button type="button" onClick={() => fields.push({})} size="small" variant="contained" color="primary">Add couleur</Button>
  </div>
)

const CouleursForm = ({ handleSubmit, pristine, reset, submitting }) => {

  return (
    
    <form onSubmit={handleSubmit}>
      <FieldArray name="couleurs" component={renderMembers}/>
      <hr />
    </form>
  )
}

export default reduxForm({
  form: 'CouleursForm',
})(CouleursForm)

