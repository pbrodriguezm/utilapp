import axios from '../../../api';
import React, { useState, useEffect } from 'react';

import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    ButtonGroup,
    Button,
} from '@material-ui/core'

let subscribarList = [];

const ListReclamos = () => {
    const [subscribarList, setListReclamos] = useState([]);

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


    useEffect(() => {
        setLoading(true);
            axios.get('/api/util/reclamos').then((response) => {
            setListReclamos(response.data)
            console.log('------------------->',response.data);
            setLoading(false);
           })
    }, []);

    return (
    
        <div className="w-full overflow-auto" >
            <div >
                {/* {loading && <LinearProgress />} */}
            </div>

            <Table className="whitespace-pre" >
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Documento</TableCell>
                        <TableCell className="px-0">Nombre</TableCell>
                        <TableCell className="px-0">Fecha</TableCell>
                        <TableCell className="px-0">Detalle</TableCell>
                        <TableCell className="px-0">Numero Reclamo</TableCell>
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
                                    {subscriber.id}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {subscriber.value?.usuario?.razon}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {subscriber.value?.fechad}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {subscriber.value?.detalle}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {subscriber.value?.numreclamo}
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
                rowsPerPageOptions={[5, 10, 25]}
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
        </div>
    )
}

export default ListReclamos
