import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom:0,
    fontWeight: "bold",
    fontSize: "4.5em"
  },
  text: {
    fontSize: "1.75em",
  }
  })
)

const CompanyProfile = ({ companyInfo }) => {
  const classes = useStyles(); 
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="companyInfo">
          <TableHead>
            <TableRow>
            <TableCell>CompanyProfile</TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="industry">
              <TableCell component="th" scope="row">
                산업 분야
              </TableCell>
              <TableCell >{companyInfo.finnhubIndustry}</TableCell>
            </TableRow>
            <TableRow key="market">
              <TableCell component="th" scope="row">
                시가 총액
              </TableCell>
              <TableCell >{companyInfo.marketCapitalization}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>  
    )
};

export default CompanyProfile;