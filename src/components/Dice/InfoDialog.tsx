import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Props {
    isDialogOpened: boolean;
    handleCloseDialog: (value: React.SetStateAction<boolean>) => void;
}

const InfoDialog = (props: Props) => {
    
    const handleClose = () => {
        props.handleCloseDialog(false);
      };

    return (

        <Dialog
        open={props.isDialogOpened}
        onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Don't you hate when you lose board game because dice don't "work" properly for you.
            Well, here is the solution, dice luck minimizer.
            <br /><br />
            You can set here amount of rounds and variance.           
            One round means all possible outcomes in random order, so with two dice all possible outcomes are 36 per round.
            If you know that a game consist of about 100 dice roll, you could set 3 rounds and adjust the variance.
            Variance setting removes % amount of outcomes to add some variance/luck, so that nobody can calculate which
            outcomes are still left.
            <br /><br />
            If you still can't win, you can't blaim dices anymore. Then you lose because you really are loser...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
           autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )

}
export default InfoDialog