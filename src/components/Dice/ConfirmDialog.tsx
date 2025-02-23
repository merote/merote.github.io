import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Props {
    isDialogOpened: boolean;
    handleCloseDialog: (value: boolean) => void;
}

const ConfirmDialog = (props: Props) => {
    
    const handleClose = (value: boolean) => {
        props.handleCloseDialog(value);
      };

    return (
        
        <Dialog
        open={props.isDialogOpened}
        onClose={() => null}>
        <DialogTitle id="alert-dialog-title">
          {"Reset session"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Current session will be deleted.
            Do you really want to reset?              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleClose(false)}
           autoFocus>
            Cancel
          </Button>
        <Button onClick={() => handleClose(true)}
           autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      
    )

}
export default ConfirmDialog