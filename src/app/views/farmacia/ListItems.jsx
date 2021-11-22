
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
    Chip,
} from '@material-ui/core'

import Moment from 'moment';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ExportToCsv } from 'export-to-csv';


const ListItems = ({ openexport, closeexport, subscribarList }) => {
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
            })
            dataresultexport.push({
                Aperiodo: '2021' + event.getMonth(),
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
            <Table className="whitespace-pre" >
                <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell className="px-1">Componente</TableCell>
                        <TableCell className="px-2">Descripción</TableCell>
                        <TableCell className="px-3">Costo</TableCell>
                        <TableCell className="px-3">Precio</TableCell>
                        <TableCell className="px-4">Stock</TableCell>
                        <TableCell className="px-5">lote</TableCell>

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
                                    {subscriber.iditem.trim()}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {subscriber?.valor?.descripcionlocal}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <div>
                                        <Chip size="small" label={"S/."+subscriber?.valor?.CostoComercial_SinIGV.toFixed(2)} />
                                    </div>

                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <div>
                                        <Chip size="small" label={"S/."+subscriber?.valor?.PrecioBase_IncIGV.toFixed(2)} />
                                    </div>

                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {subscriber?.valor?.almacenlote?.stockactual}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {subscriber?.lote}
                                </TableCell>

                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 15, 25, 50]}
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
                            label="Seleecione Año y Mes"
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

export default ListItems
