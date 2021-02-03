import { Grid, Typography, TextField, Button } from '@material-ui/core';
import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Employees from '../../assets/dummyData/employees'

function UpdateEmployeeComponent() {
    const location = useLocation();
    const history = useHistory();
    const id = String(location.pathname).split('/')[3];
    const [employee, setEmployee] = React.useState();

    React.useEffect(() => {
        Employees.map(employee => {
            if(parseInt(employee.id) === parseInt(id)) {
                setEmployee(employee)
            }
        })
    }, [employee])
    
    return (
        <div>
            {employee !== undefined ?
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>ID:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth size="small" id="outlined-basic" placeholder={employee.id} variant="outlined" />
                    </Grid>               
                    <Grid item xs={12}>
                        <Typography>Name:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth size="small" id="outlined-basic" placeholder={employee.name} variant="outlined" />
                    </Grid>                      
                    <Grid item xs={12}>
                       <Button variant='contained' size='small' color='primary' onClick={() => history.push('/employees')}>Save</Button>
                    </Grid>                          
                </Grid>
            </>
           : null}
        </div>
    )
}

export default UpdateEmployeeComponent
