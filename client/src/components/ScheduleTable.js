import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ScheduleTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Stop Name</TableCell>
            <TableCell align="right">Day</TableCell>
            <TableCell align="right">Arrival Time</TableCell>
            <TableCell align="right">Departure Time</TableCell>
            <TableCell align="right">Distance (Kms)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.day}</TableCell>
              <TableCell align="right">
                {row.arr ? row.arr : "--"}
              </TableCell>
              <TableCell align="right">
                {row.dep ? row.dep : "--"}
              </TableCell>
              <TableCell align="right">{row.dist}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}