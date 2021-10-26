import React, { Component } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import Highlight from 'react-highlight'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@material-ui/core/Card'

class settingsSystem extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'system', path: '/utilities' },
                            { name: 'Configuración' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">

                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                error
                                id="outlined-error"
                                label="Error"
                                defaultValue="Hello World"
                            />
                            <TextField
                                error
                                id="outlined-error-helper-text"
                                label="Error"
                                defaultValue="Hello World"
                                helperText="Incorrect entry."
                            />
                        </div>
                        <div>
                            <TextField
                                error
                                id="filled-error"
                                label="Error"
                                defaultValue="Hello World"
                                variant="filled"
                            />
                            <TextField
                                error
                                id="filled-error-helper-text"
                                label="Error"
                                defaultValue="Hello World"
                                helperText="Incorrect entry."
                                variant="filled"
                            />
                        </div>
                        <div>
                            <TextField
                                error
                                id="standard-error"
                                label="Error"
                                defaultValue="Hello World"
                                variant="standard"
                            />
                            <TextField
                                error
                                id="standard-error-helper-text"
                                label="Error"
                                defaultValue="Hello World"
                                helperText="Incorrect entry."
                                variant="standard"
                            />
                        </div>
                    </Box>

                </Card>
            </div>
        )
    }
}

export default settingsSystem
