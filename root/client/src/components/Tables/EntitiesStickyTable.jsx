import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'name', label: 'Name', minWidth: 26 },
    { id: 'brand', label: 'Brand', minWidth: 26 },
    { id: 'size', label: 'Size', minWidth: 10, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'quantity', label: 'Quantity', align: 'right', minWidth: 10 },
    { id: 'weight', label: 'Weight', align: 'right', minWidth: 10, format: (value) => value.toFixed(2) },
    { id: 'currentLocation', label: 'Current Location', align: 'right', minWidth: 26 }
];

export const EntityTable = ({entityList}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigate = useNavigate();

    let data = [];
    const makeData = () => {
        entityList.forEach((element, index) => {
            data[index] = {
                name: element.name,
                brand: element.brand,
                size: element.size.$numberDecimal,
                quantity: element.quantity,
                weight: element.weight,
                currentLocation: element.currentLocation[0].name,
                id: element._id
            };
        });
    };
    if (data.length === 0) {makeData();}

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className='table-header'>
                            {columns.map((column) => (
                                <TableCell className='table-cell'
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow 
                                        className='table-row' 
                                        role="checkbox" 
                                        tabIndex={-1} 
                                        key={row.id}
                                        onDoubleClick={() => {navigate(`/item/info/${row.id}`)}}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
