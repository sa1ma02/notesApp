import React from 'react'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboaedArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {useHistory}  from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  btn: {
    marginBottom: 20
  }

})

export default function Create() {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('money')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)
    if (title == '') {
      setTitleError(true)
    } 
    if (details == '') {
      setTitleError(true)
    }
    if(title && details){
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, details, category})
      }).then(() => history.push('/'))
      
    }

  }

  return (
    <Container>
      <Typography 
      variant="h6"
      component="h2"
      gutterBottom
      color='textSecondary'
  
      >
        Create a New Note
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} >
          <TextField 
          onChange ={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          />
          <TextField 
          onChange ={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Note Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
          />
          <FormControl className={classes.field}>
            <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio/>} label="Money"  />
            <FormControlLabel value="todos" control={<Radio/>} label="Todos" color='textSecondary'/>
            <FormControlLabel value="reminders" control={<Radio/>} label="Reminders"  color='textSecondary'/>
            <FormControlLabel value="work" control={<Radio/>} label="Work" />
  
          </RadioGroup>
          </FormControl>

      <Button  
      className={classes.btn}
      type="submit" 
      color="secondary" 
      variant="contained"
      disableElevation
      endIcon={<KeyboaedArrowRightIcon/>}
      >
        Submit
      </Button>

        </form>
      
    </Container>
  )
}
