import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Select,
    MenuItem,
    TextField,
    InputLabel,
} from '@material-ui/core'
import axios from '../../../../api';
import reniec from '../../../../apiReniec';
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { SimpleCard } from 'app/components'
import { LinearProgress, CircularProgress } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import { v4 as uuidv4 } from 'uuid';

const ReclamoNuevo = ({close}) => {
    const [clasifList, setListClasificaciones] = useState([]);
    const [etapaList, setListEtapaReclamo] = useState([]);
    const [estadoList, setListEstoReclamo] = useState([]);
    const [medidasList, setListMedidasReclamo] = useState([]);
    const [procesosList, setListProcesoReclamo] = useState([]);
    const [origenList, setListOrigenReclamo] = useState([]);
    const [resultadoList, setListResultadoReclamo] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [loadingdni, setLoadingDNI] = useState(false);  
    
    const [state, setState] = useState({
        ZFechaPresentacion: new Date(),
        ANFechaPresentacion: new Date(),
        OTipoDocumento: 1,
        Ymetodoreclamo: 2,
        SSquienPresenta: 0,
        estadoListSelect: 6,
        etapaListSelect: 4
    })

    
    const [statesave, setStateSave] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
        message:''
    })
    const { vertical, horizontal, open ,message } = statesave

        
    function handleClose() {
        setStateSave({ ...statesave, open: false })
    }

    const filter = createFilterOptions()
    const filterOptions = (options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
            })
        }
        return filtered
    }




    useEffect(() => {

        axios.get('/api/util/reclamos/masters/RECLAMOS_IPRESS').then((response) => {
            setListClasificaciones(response.data)
        })


        axios.get('/api/util/reclamos/masters/ETAPA_RECLAMO').then((response) => {
            setListEtapaReclamo(response.data)
            state.etapaListSelect = response.data[3]

        })

        axios.get('/api/util/reclamos/masters/ESTADO_RECLAMO').then((response) => {
            setListEstoReclamo(response.data)
            state.estadoListSelect = response.data[5]
        })


        axios.get('/api/util/reclamos/masters/NATURALEZA_MEDIDAS').then((response) => {
            setListMedidasReclamo(response.data)

        })


        axios.get('/api/util/reclamos/masters/PROCESO_MEDIDAS').then((response) => {
            setListProcesoReclamo(response.data)

        })

        axios.get('/api/util/reclamos/masters/ORIGEN_RECLAMO').then((response) => {
            setListOrigenReclamo(response.data)
        })

        axios.get('/api/util/reclamos/masters/RESULTADO_RECLAMO').then((response) => {
            setListResultadoReclamo(response.data)
        })

            
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    
    //Save document and send REST post
    const handleSubmit = (event) => {
        setLoading(true);
        axios.post('/api/util/reclamos',{id: uuidv4(), value: state})
        .then(response => {
            console.log()
            setLoading(false);
            setStateSave({ ...statesave, open: true, message:'Se guardó correctamente.' })
            close();
        })
        .catch(error => {
            setLoading(false);
            console.log(error)
            setStateSave({ ...statesave, open: true, message:'Error al guardar.' })            
        })
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }


    const handleChangeDocumento = (event) => {
        
        setLoadingDNI(true);
        event.persist()
        let documentonumber=event.target.value;
        if(documentonumber.length === 8 ) {
            reniec.get('api/v1/dni/'+documentonumber+'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBiLnJvZHJpZ3Vlei5tQGdtYWlsLmNvbSJ9.dIBoAj4HXLr7ltx0C1rDLbkNzIV1kAhmW1lLPW4IDb0').then((response) => {           
                setState({
                    ...state,
                    ['MApellidoPa']: response.data.apellidoPaterno,
                    ['LNombre']: response.data.nombres,
                    ['NApellidoMa']: response.data.apellidoMaterno,
                    [event.target.name]: documentonumber,
                })
                setLoadingDNI(false);
            })
        }
    }

    const handleChangeClasificacion1 = (event, value) => {
        if(value){
            let objData = {
                ...state,
                ['ADclasificacion']: value.value.CODIGO,
            }

            if(state.ADclasificacion2 == undefined) {
                objData.ADclasificacion2= value.value.CODIGO
               
            }
            if(state.ADclasificacion3 == undefined) {
                objData.ADclasificacion3= value.value.CODIGO
            }
            setState(objData)
        }
        
    }

    const handleChangeClasificacion2 = (event, value) => {
        if(value){
        setState({
            ...state,
            ['ADclasificacion2']: value.value.CODIGO,
        })
    }
    }

    const handleChangeClasificacion3 = (event, value) => {
        if(value){
            setState({
                ...state,
                ['ADclasificacion3']: value.value.CODIGO,
            })
        }
    }


    const handleChangeOrigen = (event, value) => {
        if(value){
            setState({
                ...state,
                ['ABservlugar']: value.value.CODIGO,
            })
        }
    }

    const handleDateSet =  (name, value) => {
        setState({
            ...state,
            [name]: value,
        })
    }
    

    const handleCamboSet =  (name, value) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const {
        NumReclamo,
        SSquienPresenta,
        SSDomicilio,
        VEmail,
        XMobile,
        ZFechaPresentacion,
        ANFechaPresentacion,
        AlResultado,
        AOComunicacion,
        Ymetodoreclamo,
        MApellidoPa,
        LNombre,
        NApellidoMa,
        KRazonSocial,
        OTipoDocumento,
        SSHora,
        JDocunmento,
        etapaListSelect,
        estadoListSelect,
        procesossListSelect,
        medidasListSelect,
        ADclasificacion,
        ADclasificacion2,
        ADclasificacion3,
        ABservlugar,
        APFechaNotificacion,
        GFechaInicioImplementacion,
        HFechaCulminacion,
        DMedidas,
        detalleReclamo,
        Uautoriza_por_corre

    } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <SimpleCard title="1 Identificación del usuario o tercero legitimado">
                    <Grid container spacing={6}>
                        <Grid item xs>
                            <TextValidator
                                className="mb-4 w-full"
                                label="Número de Reclamo"
                                onChange={handleChange}
                                type="number"
                                name="NumReclamo"
                                autoComplete="off"
                                value={NumReclamo}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <InputLabel id="quienreclamo">Quién presenta el reclamo</InputLabel>
                            <Select
                                labelId="quienreclamo"
                                className="mb-4 w-full"
                                value={SSquienPresenta}
                                name="SSquienPresenta"
                                label="Etapa"
                                onChange={handleChange}
                            >

                                <MenuItem value={0}>Usuario afectado</MenuItem>
                                <MenuItem value={1}>Tercero legitimado</MenuItem>
                            </Select>

                            <TextValidator
                                className="mb-4 w-full"
                                label="Domicilio"
                                onChange={handleChange}
                                type="text"
                                name="domicilio"
                                autoComplete="off"
                                value={SSDomicilio}
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Email"
                                onChange={handleChange}
                                type="text"
                                autoComplete="off"
                                name="email"
                                value={VEmail}
                            />

                            <TextValidator
                                className="mb-4 w-full"
                                label="Teléfono"
                                onChange={handleChange}
                                autoComplete="off"
                                type="number"
                                name="mobile"
                                value={XMobile}
                            />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"yyyy/MM/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha de presentación de reclamo"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    name="ZFechaPresentacion"
                                    value={ZFechaPresentacion}
                                    onChange={(e, value) => handleDateSet('ZFechaPresentacion', value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>




                        </Grid>
                        <Grid item xs>
                            <TextValidator
                                className="mb-4 w-full"
                                label="N° Documento Identidad"
                                loading={loadingdni}
                                autoComplete="off"
                                name="JDocunmento"
                                type="text"
                                value={JDocunmento}
                                onChange={handleChangeDocumento}
                                required
                            />
                            {loadingdni && <LinearProgress color="secondary" />}

                            {OTipoDocumento === 1 ? (
                                <div>
                                    <Grid container spacing={4}>

                                        <Grid item xs>

                                            <TextValidator

                                                className="mb-4 w-full"

                                                autoComplete="off"
                                                onChange={handleChange}
                                                type="text"
                                                name="LNombre"
                                                value={LNombre}
                                                required
                                                label="Nombre"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                errorMessages={['Es requerido este campo']}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <TextValidator
                                                className="mb-4 w-full"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                type="text"
                                                name="MApellidoPa"
                                                value={MApellidoPa}
                                                required
                                                label="Ape. Paterno"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                errorMessages={['Es requerido este campo']}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <TextValidator
                                                className="mb-4 w-full"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                type="text"
                                                name="NApellidoMa"
                                                value={NApellidoMa}
                                                required
                                                label="Ape. Materno"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                errorMessages={['Es requerido este campo']}
                                            />
                                        </Grid>
                                    </Grid>

                                </div>) : (<TextValidator
                                    className="mb-4 w-full"
                                    label="Nombre o Razón social"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    type="text"
                                    name="KRazonSocial"
                                    value={KRazonSocial}
                                    required
                                    errorMessages={['Es requerido este campo']}
                                />)}
                            <TextValidator
                                className="mb-4 w-full"
                                label="Hora"
                                autoComplete="off"
                                onChange={handleChange}
                                name="SSHora"
                                type="time"
                                value={SSHora}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />


                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Autoriza notificación de reclamo por correo
                            </InputLabel>
                            <Select
                                className="mb-4 w-full"
                                label="Tipo Documento"
                                value={Uautoriza_por_corre}
                                name="Uautoriza_por_corre"
                                onChange={handleChange}

                            >
                                <MenuItem value={1}>Si</MenuItem>
                                <MenuItem value={2}>No</MenuItem>

                            </Select>



                            <InputLabel id="estadoreclamo">Estado del reclamo</InputLabel>
                            <Select
                                labelId="estadoreclamo"
                                className="mb-4 w-full"
                                value={estadoListSelect}
                                name="estadoListSelect"
                                label="Estado"
                                onChange={handleChange}
                            >

                                {estadoList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name}
                                    >
                                        {name.value.DETALLE}
                                    </MenuItem>
                                ))}
                            </Select>





                            <InputLabel id="etapareclamo">Etapa del reclamo</InputLabel>
                            <Select
                                labelId="etapareclamo"
                                className="mb-4 w-full"
                                value={etapaListSelect}
                                name="etapaListSelect"
                                label="Etapa"
                                onChange={handleChange}
                            >
                                {etapaList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name}
                                    >
                                        {name.value.DETALLE}
                                    </MenuItem>
                                ))}
                            </Select>






                            {/* 
                            {AlResultado === 5 ? (
                                <div>
                                    <InputLabel id="motivoconclusion">Motivo de conclusión anticipada</InputLabel>
                                    <Select
                                        labelId="motivoconclusion"
                                        className="mb-4 w-full"
                                        value={conclusionListSelect}
                                        label="Etapa"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value=''><em>Seleccione conclusión</em></MenuItem>
                                        {estadoList.map((name) => (
                                            <MenuItem
                                                key={name.value.CODIGO}
                                                value={name.value.DETALLE}
                                            >
                                                {name.value.DETALLE}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>): ( <span></span>)
                            } */}



                        </Grid>
                        <Grid item xs>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Tipo documento
                            </InputLabel>
                            <Select
                                className="mb-4 w-full"
                                label="Tipo Documento"
                                value={OTipoDocumento}
                                name="OTipoDocumento"
                                onChange={handleChange}

                            >
                                <MenuItem value={1}>DNI</MenuItem>
                                <MenuItem value={2}>CARNÉ DE EXTRANJERIA</MenuItem>
                                <MenuItem value={3}>PASSAPORTE</MenuItem>
                                <MenuItem value={4}>DOCUMENTO DE IDENTIDAD EXTRANJERO</MenuItem>
                                <MenuItem value={5}>CÓDIGO RECIEN NACIDO</MenuItem>
                                <MenuItem value={6}>RUC</MenuItem>
                                <MenuItem value={7}>OTROS</MenuItem>

                            </Select>


                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Método de recepción de reclamo
                            </InputLabel>
                            <Select
                                className="mb-4 w-full"
                                label="METODO DE RECEPCIÓN DEL RECLAMO"
                                value={Ymetodoreclamo}
                                name="Ymetodoreclamo"
                                onChange={handleChange}
                                label="Método de recepción de reclamo"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value={1}>LIBRO DE RECLAMACCION VIRTUAL</MenuItem>
                                <MenuItem value={2}>LIBRO DE RECLAMACION FÍSICO</MenuItem>
                                <MenuItem value={3}>LLAMADA TELEFONICA</MenuItem>
                                <MenuItem value={4}>RECLAMO PRESENCIAL</MenuItem>
                                <MenuItem value={5}>DOCUMENTO ESCRITO</MenuItem>
                                <MenuItem value={6}>RECLAMO TRASLADADO DE OTRA ADMINISTRADA</MenuItem>
                                <MenuItem value={7}>RECLAMO COPARTICIPADO CON OTRA ADMINISTRADA</MenuItem>
                            </Select>


                            <Autocomplete
                                className="mb-4 w-full"
                                value={ABservlugar}
                                name="ABservlugar"
                                onChange={handleChangeOrigen}
                                filterOptions={filterOptions}
                                options={origenList}
                                getOptionLabel={(option) => {
                                    // e.g value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option
                                    }
                                    if (option.inputValue) {
                                        return option.inputValue
                                    }
                                    return option.value.DETALLE
                                }}


                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Donde se originó el reclamo"
                                        variant="standard"
                                        fullWidth
                                    />
                                )}
                            />

                            <Autocomplete
                                className="mb-4 w-full"
                                value={ADclasificacion}
                                name="ADclasificacion"
                                onChange={handleChangeClasificacion1}
                                filterOptions={filterOptions}
                                options={clasifList}
                                getOptionLabel={(option) => {
                                    // e.g value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option
                                    }
                                    if (option.inputValue) {
                                        return option.inputValue
                                    }
                                    return option.value.CODIGO + ' ' + option.value.CAUSA_ESPECIFICA
                                }}

                                // renderOption={(option) => option.value.CAUSA_ESPECIFICA}

                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        label="Clasificación de reclamo 1"
                                        variant="standard"
                                        fullWidth
                                    />
                                )}
                            />

                            <Autocomplete
                                className="mb-4 w-full"
                                value={ADclasificacion2}

                                onChange={handleChangeClasificacion2}
                                filterOptions={filterOptions}
                                options={clasifList}
                                getOptionLabel={(option) => {
                                    // e.g value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option
                                    }
                                    if (option.inputValue) {
                                        return option.inputValue
                                    }
                                    return option.value.CODIGO + ' ' + option.value.CAUSA_ESPECIFICA
                                }}
                                // renderOption={(option) => option.value.CAUSA_ESPECIFICA}

                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Clasificación de reclamo 2"
                                        variant="standard"
                                        fullWidth
                                    />
                                )}
                            />

                            <Autocomplete

                                className="mb-4 w-full"
                                value={ADclasificacion3}
                                onChange={handleChangeClasificacion3}
                                filterOptions={filterOptions}
                                options={clasifList}

                                getOptionLabel={(option) => {
                                    // e.g value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option
                                    }
                                    if (option.inputValue) {
                                        return option.inputValue
                                    }
                                    return option.value.CODIGO + ' ' + option.value.CAUSA_ESPECIFICA
                                }}
                                // renderOption={(option) => option.value.CAUSA_ESPECIFICA}

                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Clasificación de reclamo 3"
                                        variant="standard"
                                        fullWidth
                                    />
                                )}
                            />

                        </Grid>
                    </Grid>


                    <TextValidator
                                className="mb-8 w-full"
                                label="Detalle del reclamo"
                                type="text"
                                autoComplete="off"
                                name="detalleReclamo"
                                value={detalleReclamo}
                                onChange={handleChange}
                                required
                            />
  
                </SimpleCard>
                <div className="py-3" />
            {/* Segunda parte */}
                <SimpleCard title="2.- Resultado de reclamo">
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"yyyy/MM/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha de resultado de reclamo"
                                    inputVariant="standard"
                                    type="text"
                                    name="ANFechaPresentacion"
                                    autoOk={true}
                                    value={ANFechaPresentacion}
                                    onChange={(e, value) => handleDateSet('ANFechaPresentacion', value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                            <InputLabel id="comunicacionreclamo">Comunicación de resuelto el reclamo</InputLabel>
                            <Select
                                labelId="comunicacionreclamo"
                                className="mb-4 w-full"
                                label="Comunicación de resuelto el reclamo"
                                value={AOComunicacion}
                                name="AOComunicacion"
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            >

                                <MenuItem value={1}>DOMICILIO CONSIGNADO EN EL LIBRO DE RECLAMACIONES</MenuItem>
                                <MenuItem value={2}>CORREO ELECTRONICO</MenuItem>
                                <MenuItem value={3}>OTRA DIRECCION</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <InputLabel id="resultadoreclamo">Resultado del reclamo</InputLabel>
                            <Select
                                labelId="resultadoreclamo"
                                className="mb-4 w-full"
                                label="Resultado de documento"
                                value={AlResultado}
                                name="AlResultado"

                                required
                                onChange={handleChange}
                            >

                                {resultadoList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name}
                                    >
                                        {name.value.DETALLE}
                                    </MenuItem>
                                ))}
                            </Select>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"yyyy/MM/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha de notificación"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={APFechaNotificacion}
                                    onChange={(e, value) => handleDateSet('APFechaNotificacion', value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </SimpleCard>

                {/* Tercera parte */}
                <div className="py-3" />
                <SimpleCard title="3 Medidas tomadas">
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          

                            <InputLabel id="medidasreclamo">Naturaleza de la medida adoptada</InputLabel>
                            <Select
                                labelId="medidasreclamo"
                                className="mb-4 w-full"
                                value={medidasListSelect}
                                name="medidasListSelect"
                                label="medidas"
                                onChange={handleChange}
                            >
                                {medidasList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name}
                                    >
                                        {name.value.DETALLE}
                                    </MenuItem>
                                ))}
                            </Select>




                        <InputLabel id="procesosreclamo">Proceso sobre el cual recae la medida adoptada</InputLabel>
                            <Select
                                labelId="procesosreclamo"
                                className="mb-4 w-full"
                                value={procesossListSelect}
                                label="proceso"
                                name="procesossListSelect"
                                onChange={handleChange}
                                required 
                            >
                                {procesosList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name.value.CODIGO}
                                    >
                                        {name.value.DETALLE}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Grid>
                        
                        <Grid item lg={6} md={6} sm={12} xs={12}>


                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"yyyy/MM/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha inicio de la implementación"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    name="GFechaInicioImplementacion"
                                    value={GFechaInicioImplementacion}
                                    onChange={(e, value) => handleDateSet('GFechaInicioImplementacion', value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>


                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"yyyy/MM/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha de culminación prevista"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={HFechaCulminacion}
                                    name="HFechaCulminacion"
                                    onChange={(e, value) => handleDateSet('HFechaCulminacion', value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>
                    </Grid>

                    <TextValidator
                                className="mb-4 w-full"
                                label="Breve descripción de la medida adoptada"
                                onChange={handleChange}
                                name="DMedidas"
                                type="text"
                                value={DMedidas}
                                name="medida"
                                required
                               
                            />
                </SimpleCard> 
                
                <div className="py-3" />
                <Button color="primary" variant="contained" type="submit" disabled={loading}>                   
                    {loading ?(<CircularProgress size={16} />):( <Icon>save</Icon>)}<span className="pl-2 capitalize"> Guardar</span>
                    
                </Button>

            </ValidatorForm>


            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
            />
            
        </div>
    )
}

export default ReclamoNuevo
