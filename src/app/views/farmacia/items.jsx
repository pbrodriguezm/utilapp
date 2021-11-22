import axios from '../../../api_cloud';
import React, {useEffect} from 'react';
import { Breadcrumb, SimpleCard } from 'app/components'
import ListItems from './ListItems'
import ReclamoNuevo from './nuevo/ReclamoNuevoModal'
import {
    Icon,
    ButtonGroup,
    Button,
    LinearProgress,
    CircularProgress,
    Backdrop
} from '@material-ui/core'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
//import ReclamoNuevoModal from './ReclamoNuevoModal'
import SearchBar from "material-ui-search-bar";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


const Reclamos = () => {

    const [open, setOpen] = React.useState(false)
    const [openConfirm, setOpenConfirm] = React.useState(false)
    
    const [openexport, setOpenExport] = React.useState(false)
    const [scroll, setScroll] = React.useState('paper');
    const [reaload, setReload] = React.useState('texto');
    const [loading, setLoading] = React.useState(false);
    const [subscribarList, setListItems] = React.useState([]);
    const [filterList, setFilterList] = React.useState(subscribarList);
    const [searched, setSearched] = React.useState('');

    

    function handleClickOpen() {
        setOpen(true)
        setScroll('paper');
    }

    function handleClose() {

        loadData()
        setOpen(false)
    }
    

/*Cargando data*/    
    function loadData() {
        setLoading(true);
        axios.get('/farmacia/items').then((response) => {
            setListItems(response.data)
            setFilterList(response.data)
            setLoading(false);
        })
    }

    // Busqueda 
    const requestSearch = (searchedVal) => {
        const filteredRows = subscribarList.filter(selectlist => {
            return selectlist.valor.descripcionlocal.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setFilterList(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    //Click Open Button Export Format
    function handleClickOpenExport() {
        console.log('abiertooo')
        setOpenExport(true)
    }
    //Click Close Dialog Export Format
    function handleCloseExport() {
        console.log('cerrado')
        setOpenExport(false)
    }
    function ExportDataCSV({parentToChild}) {
        console.log(parentToChild)
    }

    const handleConfirmClose = () => {
        setOpenConfirm(false);
      };

    const handleConfirmClickOpen = () => {
        setOpenConfirm(true);
     };


    const handleUpdateCloud = () => {
        handleConfirmClose()
        setLoading(true);
        axios.get('/farmacia/interface').then((response) => {
            setListItems(response.data)
            setFilterList(response.data)
            setLoading(false);

        })
     };

    useEffect(() => {
        loadData()
    }, []);
           
        return (<div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Farmacia', path: '/dashboard' },
                        { name: 'Listado Farmacia' },
                    ]}
                />
            </div>
            <div className="y-center">
                <ButtonGroup variant="contained" aria-label="outlined button group">
                    <Button
                        onClick={handleConfirmClickOpen}
                    >
                        <Icon className="mr-2">cloud_done</Icon>
                        Actualizar listado
                    </Button>
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                </ButtonGroup>
            </div>

            <div>
                {loading && <LinearProgress color="secondary" />}
            </div>
            <SimpleCard title="Productos">
                <ListItems 
                    openexport={openexport}
                    closeexport={handleCloseExport}
                    subscribarList={filterList}
                />
            </SimpleCard>


    {/* DIALOGO PONER EXTERNO EN MODAL */}
            <Dialog
                scroll={scroll}
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
        
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
                <AppBar >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Registro de reclamo
                        </Typography>
                        {/* <Button color="inherit" onClick={handleClose}>
                        <Icon className="ml-3 mr-1">save</Icon>
                            Guardar
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <div className="py-3" />
                
                <SimpleCard >
                    <ReclamoNuevo 
                        close={handleClose}
                    />
                </SimpleCard>
                   
                </DialogContentText>
        </DialogContent>

      </Dialog>



        {/* Dialog Alert UPLOAD ****/}

            <Dialog
                open={openConfirm}
                onClose={handleConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Desea actualizar la data?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Le recordamos que si acepta este mensaje, se borraran todos los datos de la aplicación, y serán actualizados desde el servidor SPRING local.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>cancelar</Button>
                    <Button onClick={handleUpdateCloud} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
        )
    }
export default Reclamos
