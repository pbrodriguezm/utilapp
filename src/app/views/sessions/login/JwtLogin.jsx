import React, { useState, useEffect } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import axios from '../../../../apiSpring'


const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))


const JwtLogin = () => {
    const [loading, setLoading] = useState(false)
    const [statusSpring, setStatusSpring] = useState(false)
    const [dataSpring, setDataSpring] = useState(false)
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    })
    const [message, setMessage] = useState('')
    const { login, loginGoogle } = useAuth()

    const classes = useStyles()

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    /*Cargando data*/
    function loadData() {
        setLoading(true)
        axios.get('/ping').then((response) => {
            setDataSpring(response.data)
            setStatusSpring(true);
            setLoading(false)
        })
    }


    useEffect(() => {
        loadData()
    }, []);

    const CLIENT_ID =
        "546043514231-snk9kivtgljiuqtgvrbjvd9qt5sr1tfa.apps.googleusercontent.com";
    
        // Success Handler GOOGLE
    const responseGoogleSuccess = async (response) => {
        console.log(response);
        let userInfo = {
            name: response.profileObj.name,
            emailId: response.profileObj.email,
        };
        //this.setState({ userInfo, isLoggedIn: true });

        setLoading(true)
        try {
            await loginGoogle(userInfo.emailId, userInfo)
            history.push('/')
        } catch (e) {
            console.log(e)
            setMessage(e.message)
            setLoading(false)
        }

    };


    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            await login(userInfo.username, userInfo.password)
            history.push('/')
        } catch (e) {
            console.log(e)
            setMessage(e.message)
            setLoading(false)
        }
    }

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <img
                                className="w-200"
                                src="https://media3.giphy.com/media/1BcSawJYHPjfHekFYe/giphy.gif"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Usuario"
                                    onChange={handleChange}
                                    name="username"
                                    type="text"
                                    value={userInfo.username}
                                    validators={['required']}
                                    errorMessages={[
                                        'Campo requerido y obligatorio',
                                    ]}

                                />
                                <TextValidator
                                    className="mb-3 w-full"
                                    label="Contraseña"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={['Requiere clave']}
                                />

                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex flex-wrap items-center mb-4">
                                    <div className="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading || !statusSpring}
                                            type="submit"
                                        >
                                        {statusSpring ? (
                                           'Login Spring'
                                        ): ('Spring OFF')}
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>
                                    <span className="mr-2 ml-5">o</span>
                                    <GoogleLogin
                                        clientId={CLIENT_ID}
                                        buttonText="Login Gmail"
                                        onSuccess={responseGoogleSuccess}
                                        //onFailure={responseGoogleError}
                                        isSignedIn={true}
                                        cookiePolicy={"single_host_origin"}
                                    />
                                </div>
                                <div className="text-small">Clínica Arequipa 2021</div>
                                <div className="text-small">Server Spring  {statusSpring ? (
                                           'online'
                                        ): ('offline')} | versión {dataSpring?.version} </div>
                                <span className="text-small">{dataSpring?.autor}</span>
                                 
                                
                                {/* <Button
                                    className="text-primary"
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    olvidé mi clave
                                </Button> */}
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtLogin
