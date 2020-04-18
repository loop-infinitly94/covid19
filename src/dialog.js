import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Typography from '@material-ui/core/Typography';


import Table from './table'

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  console.log(props);
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.tableSelection([])
    setOpen(false);
    props.onCloseDialog()
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Country Details
        </DialogTitle>
        <DialogContent> 
          <div className = "Summary">
              <Typography className={"summaryCommon"} color="textSecondary">
                  Total Cases
              </Typography>
              <Typography className={"Total"} variant="h5" component="h2">
              {props.currentRow.TotalConfirmed}
              </Typography>
              <Typography className={"summaryCommon"} color="textSecondary">
              Total Deaths
              </Typography>
              <Typography className={"Deaths"} variant="h5" component="h2">
              {props.currentRow.TotalDeaths}
              </Typography>
              <Typography className={"summaryCommon"} color="textSecondary">
              Total Recovered
              </Typography>
              <Typography className={"Recovered"} variant="h5" component="h2">
                  {props.currentRow.TotalRecovered}
              </Typography>
          
          </div>
          { props.rows.length > 2 ? <Table rows = {props.rows} columns = {props.columns} defaultSort = {"Cases"}/> : null}

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
