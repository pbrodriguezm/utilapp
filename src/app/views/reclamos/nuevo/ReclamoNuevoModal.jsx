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
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { SimpleCard } from 'app/components'


const ReclamoNuevo = () => {
    const [clasifList, setListClasificaciones] = useState([]);
    const [etapaList, setListEtapaReclamo] = useState([]);
    const [estadoList, setListEstoReclamo] = useState([]);
    const [medidasList, setListMedidasReclamo] = useState([]);
    const [procesosList, setListProcesoReclamo] = useState([]);
    const [origenList, setListOrigenReclamo] = useState([]);
    
   
    const [state, setState] = useState({
        date: new Date(),
    })
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

        })

        axios.get('/api/util/reclamos/masters/ESTADO_RECLAMO').then((response) => {
            setListEstoReclamo(response.data)

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
           
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleSubmit = (event) => {
         console.log("submitted", 
         username,
        firstName,
        creditCard,
        mobile,
        password);


        console.log(state); 
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }

    const GMediopresentacion='2'
    let root = {AlResultado};
    
    const {
        SSquienPresenta=0,
        SSDomicilio,
        VEmail,
        XMobile,
        ZFechaPresentacion,
        ANFechaPresentacion,
        AlResultado='',
        AOComunicacion='',
        Ymetodoreclamo='',
        JNumDocumento,
        MApellidoPa,
        LNombre,
        NApellidoMa,
        KRazonSocial,
        OTipoDocumento=1,
        SSHora,
        JDocunmento,
        etapaListSelect='',
        estadoListSelect,
        procesossListSelect,
        medidasListSelect,
        ADclasificacion,
        ADclasificacion2,
        ADclasificacion3,
        ABservlugar,
        username,
        age,
        firstName,
        creditCard,
        mobile,
        password,
        date,
        email,
    } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <SimpleCard title="1 Identificación del usuario o tercero legitimado">
                    <Grid container spacing={6}>
                        <Grid item xs>

                        <InputLabel id="quienreclamo">Quién presenta el reclamo</InputLabel>
                            <Select
                                labelId="quienreclamo"
                                className="mb-4 w-full"
                                value={SSquienPresenta}
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

                            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"dd/mm/yyyy"} 
                                    id="mui-pickers-date"
                                    label="Fecha de presentación de reclamo"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={ZFechaPresentacion}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>


                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"dd/mm/yyyy"} 
                                    id="mui-pickers-date"
                                    label="Fecha de resultado"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={ANFechaPresentacion}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>
                         <Grid item xs>
                        {JNumDocumento === 6 ? (
                        <div>
                        <Grid container spacing={4}>

                                        <Grid item xs>
                                            <TextValidator
                                                className="mb-4 w-full"
                                                label="Nombres"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                type="text"
                                                name="LNombre"
                                                value={LNombre}
                                                validators={[
                                                    'required'
                                                ]}
                                                errorMessages={['Es requerido este campo']}
                                            />
                                        </Grid> 
                                        <Grid item xs>
                                                <TextValidator
                                                    className="mb-4 w-full"
                                                    label="Ape. Paterno"
                                                    autoComplete="off"
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="MApellidoPa"
                                                    value={MApellidoPa}
                                                    validators={[
                                                        'required'
                                                    ]}
                                                    errorMessages={['Es requerido este campo']}
                                                />
                                        </Grid>  
                                        <Grid item xs>
                                                <TextValidator
                                                    className="mb-4 w-full"
                                                    label="Ape. Materno"
                                                    autoComplete="off"
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="NApellidoMa"
                                                    value={NApellidoMa || ''}
                                                    validators={[
                                                        'required'
                                                    ]}
                                                    errorMessages={['Es requerido este campo']}
                                                /> 
                                        </Grid>
                            </Grid>
 
                            </div>):( <TextValidator
                                        className="mb-4 w-full"
                                        label="Nombre o Razón social"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        type="text"
                                        name="KRazonSocial"
                                        value={KRazonSocial}
                                        validators={[
                                            'required'
                                        ]}
                                        errorMessages={['Es requerido este campo']}
                                    />) }
                            <TextValidator
                                className="mb-4 w-full"
                                label="Hora"
                                autoComplete="off"
                                onChange={handleChange}
                                name="SSHora"
                                type="time"
                                value={SSHora}
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="N° Documento"
                                autoComplete="off"
                                name="JDocunmento"
                                type="text"
                                value={JDocunmento}
                                onChange={handleChange}
                                validators={[
                                     'required'
                                ]}
                            />
                           

                           
                           <InputLabel id="estadoreclamo">Estado del Reclamo</InputLabel>
                            <Select
                                labelId="estadoreclamo"
                                className="mb-4 w-full"
                                value={estadoListSelect}
                                label="Etapa"
                                onChange={handleChange}
                            >
                               
                                {estadoList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name.value.DETALLE}
                                    >
                                        {name.value.DETALLE}
                                    </MenuItem>
                                     ))}
                            </Select>

                        



                            <InputLabel id="etapareclamo">Etapa del Reclamo</InputLabel>
                            <Select
                                labelId="etapareclamo"
                                className="mb-4 w-full"
                                value={etapaListSelect}
                                label="Etapa"
                                onChange={handleChange}
                            >
                                <MenuItem value=''><em>Seleccione Etapa</em></MenuItem>
                                {etapaList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name.value.DETALLE}
                                    >
                                        {name.value.DETALLE}
                                    </MenuItem>
                                     ))}
                            </Select>



                            <InputLabel id="resultadoreclamo">Resultado del Reclamo</InputLabel>
                            <Select
                                labelId="resultadoreclamo"
                                className="mb-4 w-full"
                                label="Resultado de documento"
                                value={AlResultado}
                                name="AlResultado"
                                variant="filled"
                                required
                                onChange={handleChange}
                            >
                                <MenuItem value=''><em>Seleccione Resultado</em></MenuItem>
                                <MenuItem value={1}>FUNDADO</MenuItem>
                                <MenuItem value={3}>INFUNDADO</MenuItem>
                                <MenuItem value={4}>IMPROCEDENTE</MenuItem>
                                <MenuItem value={0}>PENDIENTE</MenuItem>
                                <MenuItem value={2}>FUNDADO PARCIAL</MenuItem>
                                <MenuItem value={5}>CONCLUIDO ANTICIPADAMENTE</MenuItem>
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
{/* 
                        <Grid item xs>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Tipo Documento
                            </InputLabel>
                            <Select
                                className="mb-4 w-full"
                                label="Tipo Documento"
                                value={OTipoDocumento}
                                name="Documento"
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
                            >
                                <MenuItem value=''><em>Seleccione Método</em></MenuItem>
                                <MenuItem value={1}>LIBRO DE RECLAMACCION VIRTUAL</MenuItem>
                                <MenuItem value={2}>LIBRO DE RECLAMACION FISICCO</MenuItem>
                                <MenuItem value={3}>LLAMADA TELEFONICA</MenuItem>
                                <MenuItem value={4}>RECLAMO PRESENCIAL</MenuItem>
                                <MenuItem value={5}>DOCUMENTO ESCRITO</MenuItem>
                                <MenuItem value={6}>RECLAMO TRASLADADO DE OTRA ADMINISTRADA</MenuItem>
                                <MenuItem value={7}>RECLAMO COPARTICIPADO CON OTRA ADMINISTRADA</MenuItem>
                            </Select>


                            <Autocomplete
                                className="mb-4 w-full"
                                value={ABservlugar}
                                onChange={handleChange}
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
                                 onChange={(event, value) => console.log(value)} 
                                className="mb-4 w-full"
                                value={ADclasificacion}
                                onChange={handleChange}
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
                                        label="Clasificación de reclamo 1"
                                        variant="standard"
                                        fullWidth
                                    />
                                )}
                            />

                            <Autocomplete
                                className="mb-4 w-full"
                                value={ADclasificacion2}
                                onChange={handleChange}
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
                                onChange={handleChange}
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


                        </Grid>  */}
                    </Grid>

                <TextValidator
                            className="mb-8 w-full"
                            label="Detalle del reclamo"
                            type="text"
                            autoComplete="off"
                            name="detalleReclamo"
                        />
                </SimpleCard>

                {/* <div className="py-3" />
                <SimpleCard title="2 información de medidas tomadas">
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <InputLabel id="comunicacionreclamo">Comunicación de resuelto el reclamo</InputLabel>
                            <Select
                                labelId="comunicacionreclamo"
                                className="mb-4 w-full"
                                label="Comunicación de resuelto el reclamo"
                                value={AOComunicacion}
                                name="AOComunicacion"
                                onChange={handleChange}
                            >
                                
                                <MenuItem value={1}>DOMICILIO CONSIGNADO EN EL LIBRO DE RECLAMACIONES</MenuItem>
                                <MenuItem value={2}>CORREO ELECTRONICO</MenuItem>
                                <MenuItem value={3}>OTRA DIRECCION</MenuItem>
                            </Select>

                            <InputLabel id="medidasreclamo">Naturaleza de la medida adoptada</InputLabel>
                            <Select
                                labelId="medidasreclamo"
                                className="mb-4 w-full"
                                value={medidasListSelect}
                                label="medidas"
                                onChange={handleChange}
                            >
                                {medidasList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name.value.DETALLE}
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
                                label="medidas"
                                onChange={handleChange}
                            >
                                {procesosList.map((name) => (
                                    <MenuItem
                                        key={name.value.CODIGO}
                                        value={name.value.DETALLE}
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
                                    format={"yyyy/mm/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha de notificación"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={date}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"yyyy/mm/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha inicio de la implementación"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={date}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>


                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    format={"yyyy/mm/dd"}
                                    id="mui-pickers-date"
                                    label="Fecha de culminación prevista"
                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={date}
                                    onChange={handleDateChange}
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
                                type="text"
                                name="medida"
                                validators={[
                                    'required',
                                ]}
                                errorMessages={['Requerimos medidas']}
                            />
                </SimpleCard> */}


                 <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Guardar</span>
                </Button> 
            </ValidatorForm>
        </div>
    )
}

export default ReclamoNuevo
