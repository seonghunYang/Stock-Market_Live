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
    fontSize: "0.9em"
  },
  greytext: {
    color: "#95a5a6",
    fontSize: "0.9em"
  }
  })
)

const CompanyStats = ({ stockInfo }) => {
  const classes = useStyles(); 
  if(!stockInfo) {
    return <div></div>
  }
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="companyInfo">
          <TableHead>
            <TableRow>
            <TableCell>Stats</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="currentInfo">
              <TableCell className={classes.greytext} component="th" scope="row">
                CURR
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.c}</TableCell>
              <TableCell className={classes.greytext} component="th" scope="row">
                PREV
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.pc}</TableCell>
            </TableRow>
            <TableRow key="previousInfo">
              <TableCell className={classes.greytext} component="th" scope="row">
                OPEN
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.o}</TableCell>
              <TableCell className={classes.greytext} component="th" scope="row">
                TG/MN
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.targetMean}</TableCell>
            </TableRow>
            <TableRow key="HighInfo">
              <TableCell className={classes.greytext} component="th" scope="row">
                HIGH
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.h}</TableCell>
              <TableCell className={classes.greytext} component="th" scope="row">
                TG/HG
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.targetHigh}</TableCell>
            </TableRow>
            <TableRow key="LowInfo">
              <TableCell className={classes.greytext} component="th" scope="row">
                LOW
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.l}</TableCell>
              <TableCell className={classes.greytext} component="th" scope="row">
                TG/LW
              </TableCell>
              <TableCell className={classes.text} align="right">{stockInfo.targetLow}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>  
    )
};

export default CompanyStats;