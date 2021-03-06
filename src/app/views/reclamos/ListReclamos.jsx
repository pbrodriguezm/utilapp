
import React, { useState, useEffect } from 'react';
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    MenuItem,
    Menu,
} from '@material-ui/core'
import Moment from 'moment';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ExportToCsv } from 'export-to-csv';


const ListReclamos = ({openexport,closeexport,subscribarList}) => {
    const [selectedDate, handleDateChange] = useState(new Date('2021-05-01'));
    
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [loading, setLoading] = useState(false);
    const [dataresult, setDataResult] = useState([{}]);
    const [dataresultexport, setDataResultExport] = useState([]);
    const [dataresultmedidas, setDataResultMedidas] = useState([]);
    const [options, setNameFiles] = useState({
        fieldSeparator: '|',
        quoteStrings: '',
        decimalSeparator: '.',
        showLabels: false, 
        showTitle: false,
        title: 'Mi Reporte SUSALUD CSV',
        useTextFile: false,
        useBom: false,
        useKeysAsHeaders: false,
        filename: 'Reporte_solicitado_reclamos',
        useTextFile: true
    })
    const [page, setPage] = React.useState(0)
    Moment.locale('es');



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const generateData = (event, value) => {

        handleDateChange(event)

        setDataResult(subscribarList.filter(filtrarPorFecha));
        subscribarList.forEach(element => {
            dataresultmedidas.push({
                Atipo_codigo_reclamo: '2',
                Bcodigo_unico_registro: '00013722-' + element?.value?.NumReclamo,
                Ccodigo_medida_adoptada: '01',
                Dbreve_descripcion_medida: element?.value?.medida,
                Enaturaleza_medida: element?.value?.medidasListSelect?.value?.CODIGO,
                Fproceso_sobre_cual_recae: element?.value?.procesossListSelect,
                Gfecha_inicio_implementecion: Moment(element?.value?.GFechaInicioImplementacion).format('yyyyMMDD'),
                Hfecha_culminacion: Moment(element?.value?.HFechaCulminacion).format('yyyyMMDD'),
            })

            dataresultexport.push({
                Aperiodo: '2021' + event.getMonth(),
                Btipo_administrado: '1',
                Ccodigo_administrado_declarante: '00013722',
                Dcodigo_UGIPRES: '00013722',
                Etipo_institucion: '1',
                Fcodigo_administrado_donde_presento: '00013722',
                Gmedio_presentacion: '2',
                Hcodigo_unico: '1234567',
                Itipo_documento: element.value.OTipoDocumento,
                Jnumero_documento: element.value.JDocunmento,
                KrazonSocial: ((JSON.stringify(element?.value?.KRazonSocial, function (key, value) { return (value === undefined) ? '' : value })).replace('"', "")).replace('"', ""),
                Lnombres: element?.value?.LNombre,
                Mapellidopa: element?.value?.MApellidoPa,
                Napellidoma: element?.value?.NApellidoMa,
                Otipo_documento: element.value.OTipoDocumento,
                Pnumero_documento: element.value.JDocunmento,
                QrazonSocial: ((JSON.stringify(element?.value?.KRazonSocial, function (key, value) { return (value === undefined) ? '' : value })).replace('"', "")).replace('"', ""),
                Rnombres: element?.value?.LNombre,
                Sapellidopa: element?.value?.MApellidoPa,
                Tapellidoma: element?.value?.NApellidoMa,
                Uautoriza_por_corre: element?.value?.Uautoriza_por_corre,
                Vcorreo: element?.value?.email,
                Wdomicilio: element?.value?.domicilio,
                Vtelefono: element?.value?.mobile,
                Ymetodo: element?.value?.Ymetodoreclamo,
                Zfechapresentacion: Moment(element.value?.ZFechaPresentacion).format('yyyyMMDD'),
                AAdetalle_reclamo: element?.value?.detalleReclamo,
                ABservicio_donde_efectuo: element?.value?.ABservlugar,
                ACcompetencia: '1',
                ADclasificacion1: element?.value?.ADclasificacion,
                AEclasificacion2: element?.value?.ADclasificacion2,
                AFclasificacion3: element?.value?.ADclasificacion3,
                AGestadoreclamo: element?.value?.estadoListSelect?.value?.CODIGO,
                AHcodigoreclamo: '',
                AIetapareclamo: element?.value?.etapaListSelect?.value?.CODIGO,
                AJtipoadministrado: '1', //IPRESS
                AKcodigoadministrado: '00017322',
                ALResultadoreclamo: element?.value?.AlResultado?.value?.CODIGO,
                AMmotivoanticipada: '',
                ANfecharesultado: Moment(element.value?.ANFechaPresentacion).format('yyyyMMDD'),
                AOcomunicacionresultado: element?.value?.AOComunicacion,
                APfechanotificacion: Moment(element.value?.ANFechaPresentacion).format('yyyyMMDD'),
            })

        });
        console.log(dataresultexport)
    }


    function filtrarPorFecha(obj) {
        //console.log('___>', obj.createdate, selectedDate);
        if (new Date(obj.createdate).getMonth() === new Date(selectedDate).getMonth()) {
          return true;
        } else {
          return true;
        }
      }


  
  
    
    useEffect(() => {
        
    }, []);

    return (
        
        <div className="w-full overflow-auto" >
            <div >
                {/* {loading && <LinearProgress />} */}
            </div>

            <Table className="whitespace-pre" >
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">N?? Reclamo</TableCell>
                        <TableCell className="px-0">Nombre</TableCell>
                        <TableCell className="px-0">Fecha Presen.</TableCell>
                        <TableCell className="px-0">Clasificaci??n</TableCell>
                        <TableCell className="px-0">Estado</TableCell>
                        <TableCell className="px-0">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscribarList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {subscriber.value.NumReclamo}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {subscriber.value?.MApellidoPa+' '+subscriber.value?.NApellidoMa+', '+subscriber.value?.LNombre}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                 {Moment(subscriber.value?.ZFechaPresentacion).format('DD/MMM/yyyy')} 
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {subscriber.value?.ADclasificacion}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {subscriber.value?.estadoListSelect?.value?.DETALLE}
                                </TableCell>
                                <TableCell className="px-0">
                                    <IconButton>
                                        <Icon color="default">more_vert</Icon>
                                    </IconButton>

                                    <IconButton>
                                        <Icon color="default">delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5,15, 25, 50]}
                component="div"
                count={subscribarList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />


            {/* //Exportador de CSV */}

            <Dialog
                open={openexport}
                onClose={closeexport}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Generar reporte CSV</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        El formato a exportar .csv cuenta con el estardar solicitado por SUSALUD
                    </DialogContentText>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            className="mb-4 w-full"
                            variant="inline"
                            openTo="month"
                            views={["year", "month"]}
                            label="Seleecione A??o y Mes"
                            inputVariant="standard"

                            value={selectedDate}
                            onChange={generateData}
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        //onClick={closeexport}
                        onClick={generateData}
                        
                    >
                        Cancelar
                    </Button>
                    
                    <Button
                        id="demo-positioned-button"
                        aria-controls="demo-positioned-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color="primary"
                        variant="outlined"
                        disabled={dataresultexport.length === 0}
                    >
                        Generar
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >

                        <MenuItem onClick={() => {
                            try {
                                options.filename = '00013722_' + selectedDate.getFullYear() + '_' + selectedDate.getMonth() + '_' + 'RECLAMOS.TXT';
                                const csvExporter = new ExportToCsv(options);
                                csvExporter.generateCsv(dataresultexport)
                                return true;
                            } catch (e) {

                            }

                        }}>Inf. de Reclamo</MenuItem>
                        <MenuItem onClick={data => {
                            options.filename = '00013722_' + selectedDate.getFullYear() + '_' + selectedDate.getMonth() + '_' + 'MEDIDAS.TXT';                        
                            const csvExporter = new ExportToCsv(options);
                            csvExporter.generateCsv(dataresultmedidas)
                        }}>Inf. de Medidas</MenuItem>
                    </Menu>


                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ListReclamos
