import React from 'react';
import { Breadcrumb, SimpleCard } from 'app/components'
import ListReclamos from './ListReclamos'
import ReclamoNuevo from './nuevo/ReclamoNuevoModal'
import {
    Icon,
    ButtonGroup,
    Button,
} from '@material-ui/core'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
//import ReclamoNuevoModal from './ReclamoNuevoModal'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


const Reclamos = () => {

    const [open, setOpen] = React.useState(false)
    const [scroll, setScroll] = React.useState('paper');
    function handleClickOpen() {
        setOpen(true)
        setScroll('paper');
    }

    function handleClose() {
        setOpen(false)
    }
    
           
        return (<div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Reclamos', path: '/material' },
                        { name: 'Listado' },
                    ]}
                />
            </div>
            <div className="y-center">
                <ButtonGroup variant="contained" aria-label="outlined button group">
                    <Button
                       onClick={handleClickOpen}
                    >
                        <Icon className="mr-2">add_circle_outline</Icon>
                        Nuevo
                    </Button>
                    <Button><Icon className="mr-2">cloud_download</Icon>Exportar</Button>
                </ButtonGroup>
            </div>

            
            <SimpleCard title="Listado de reclamos">
                <ListReclamos />
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
                        <Button color="inherit" onClick={handleClose}>
                        <Icon className="ml-3 mr-1">save</Icon>
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className="py-3" />
                
                <SimpleCard >
                    <ReclamoNuevo />
                </SimpleCard>
                   
                </DialogContentText>
        </DialogContent>
      </Dialog>

        </div>
        )
    }
export default Reclamos
