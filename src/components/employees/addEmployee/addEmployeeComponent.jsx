import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom'
import React from 'react'

function AddEmployeeComponent() {
    const history = useHistory();
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>ID:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth size="small" id="outlined-basic" placeholder='ID' variant="outlined" />
                </Grid>               
                <Grid item xs={12}>
                    <Typography>Name:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth size="small" id="outlined-basic" placeholder='Name' variant="outlined" />
                </Grid>                      
                <Grid item xs={12}>
                    <Button variant='contained' size='small' color='primary' onClick={() => history.push('/employees')}>Save</Button>
                </Grid>                          
            </Grid>
        </div>
    )
}

export default AddEmployeeComponent
