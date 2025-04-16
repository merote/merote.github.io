import logo from '../logo.svg';
import React from 'react';
import Button from '@mui/material/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';
import DiceComponent from './Dice/Dice';
import InfoDialog from './Dice/InfoDialog';
import ConfirmDialog from './Dice/ConfirmDialog';
import InfoIcon from '@mui/icons-material/Info';


const Home = () => {

  const marks = [
    {
      value: 0,
      label: '0 %',
    },
    {
      value: 10,
      label: '10 %',
    },
    {
      value: 20,
      label: '20 %',
    },
    {
      value: 30,
      label: '30%',
    },
    {
      value: 40,
      label: '40%',
    },
    {
      value: 50,
      label: '50%',
    }
  ];

  const roundMarks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    }
  ]

  //So far only 6 sided dice
  type diceValue = 1 | 2 | 3 | 4 | 5 | 6 | undefined

  interface Values {
    value1: diceValue;
    value2: diceValue;
  }

  const [dices, setDices] = React.useState('2');
  const [rounds, setRounds] = React.useState(2);
  const [variance, setVariance] = React.useState(10);
  const [values, setValues] = React.useState<Values[]>([]);
  const [nextValue, setNextValue] = React.useState<Values>({value1: undefined, value2: undefined});
  const [isOpen, setIsOpen] = React.useState({ infoDialog: false, confirmDialog: false });
  const [state, setState] = React.useState('reset');


  const generateValues = () => {
    setValues([]);
    const newValues: Values[] = []
    const diceValues: diceValue[] = [1, 2, 3, 4, 5, 6];

    if (dices === '2') {
      for (let i = 0; i < rounds; i++) {
        diceValues.forEach(value => {
          diceValues.forEach(value2 => {
            newValues.push({ value1: value, value2: value2 });
          })
        })
      }
    } else {
      for (let i = 0; i < rounds; i++) {
        diceValues.forEach(value => {
          newValues.push({ value1: value, value2: undefined });
        })
      }
    }
    // CODE IF RANDOM ORDER OF VALUES DONE FIRST
    /*  const randomOrderValues: Values[] = [];
      const amountOfValues: number = Math.round(newValues.length * ((100 - variance) / 100));

      for (let i = 0; i < amountOfValues; i++) {
      const index: number = Math.floor(Math.random() * newValues.length);
      randomOrderValues.push(newValues[index]);
      newValues.splice(index, 1);
    }
    setValues([...randomOrderValues]); */
    const index: number = Math.floor(Math.random() * newValues.length);
    setNextValue(newValues[index]);
    setValues(newValues.filter((v, i) => i !== index));
    console.log(values)
    console.log(index)
    //randomNextValue();
    setState('started');
  }

  const rollDices = () => {
    setValues(values.filter((v, i) => i !== 0));

    (document.querySelector("#Dice1 button") as HTMLButtonElement).click();
    if (dices === '2') {
      (document.querySelector("#Dice2 button") as HTMLButtonElement).click();
    }
  }

  const randomNextValue = () => {
    (document.querySelector("#Dice1 button") as HTMLButtonElement).click();
    if (dices === '2') {
      (document.querySelector("#Dice2 button") as HTMLButtonElement).click();
    }
    if (values.length === 0) {
      setState("finished");
      return
    }
    const index: number = Math.floor(Math.random() * values.length);
    setNextValue(values[index]);
    setValues(values.filter((v, i) => i !== index));

    console.log(index)
    console.log(values)
  }

  const handleChange = (value: any, type: string) => {
    if (type === 'dices') {
      setDices(value);
    } else if (type === 'rounds') {
      setRounds(value);
    } else if (type === 'variance') {
      setVariance(value);
    }
  };

  const openInfoDialog = () => {
    setIsOpen({ ...isOpen, infoDialog: true });
  }

  const openConfrimDialog = () => {
    setIsOpen({ ...isOpen, infoDialog: false });
  }

  const handleConfirmDialog = (value: boolean) => {
    if (value) {
      setValues([]);
      setState('reset');
    }
    setIsOpen({ ...isOpen, confirmDialog: false });
  }

  const valueLabelFormat = (value: number, type: string) => {
    return `${value} ${type === 'rounds' ? '' : ' %'}`;
  }

  return (
    <div className="App">
      <div className="App-header">
        <b>Dice luck minimizer</b>
        <InfoIcon className='InfoIcon'
          color='primary'
          onClick={() => openInfoDialog()}
          fontSize='large'>
        </InfoIcon>
      </div>

      <div className='Container'>

        <span style={{ paddingBottom: 60, pointerEvents: 'none' }}>
          <span id='Dice1'>
            <DiceComponent value={nextValue.value1}></DiceComponent>
          </span>
          {dices === '2' ? (
            <span id='Dice2' style={{ paddingLeft: 50 }}>
              <DiceComponent value={nextValue.value2}></DiceComponent>
            </span>)
            : undefined}
        </span>

        <div>
          <div style={{ paddingBottom: 30 }}>
            <Button variant="contained"
              disabled={state !== 'started' && values.length === 0}
              onClick={() => randomNextValue()}>
              Roll
            </Button>
          </div>

          <div>
            <FormControl component="fieldset" disabled={state === 'started'}>
              <FormLabel style={{ lineHeight: 2 }} component="legend" disabled={state === 'started'}>Number of dice</FormLabel>
              <RadioGroup aria-label="dices" name="dices"
                value={dices}
                onChange={(event, value) => handleChange(value, 'dices')}>
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="Rounds-slider" style={{ paddingTop: 20 }}>
            <Box sx={{ width: 300 }}>
              <Typography gutterBottom>Rounds ( {dices === '1' ? '6' : '36'} outcomes per round )</Typography>
              <Slider
                aria-label="Restricted values"
                defaultValue={2}
                valueLabelFormat={(e) => valueLabelFormat(e, 'rounds')}
                step={1}
                onChange={(event, value) => handleChange(value, 'rounds')}
                valueLabelDisplay="on"
                marks={roundMarks}
                disabled={state === 'started'}
                min={1}
                max={10}
              />
            </Box>
          </div>

          <div style={{ paddingTop: 30 }}>
            <Box sx={{ width: 300 }}>
              <Typography gutterBottom>Variance (randomly removed outcomes)</Typography>
              <Slider
                aria-label="Restricted values"
                defaultValue={10}
                valueLabelFormat={(value) => valueLabelFormat(value, 'variance')}
                onChange={(event, value) => handleChange(value, 'variance')}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                max={50}
                disabled={state === 'started'}
              />
            </Box>
          </div>

          <div style={{ paddingTop: 25, paddingBottom: 30, fontSize: 20 }}>
            Total outcomes: {Math.floor(Math.pow(6, parseInt(dices)) * rounds * ((100 - variance) / 100))}
          </div>

          <div>
            <Button variant="contained"
              //disabled={!(state === 'generated')} 
              onClick={() => state === 'started' ? setIsOpen({ ...isOpen, confirmDialog: true }) : generateValues()}>
              {state === 'started' ? 'Reset' : 'Start'}
            </Button>
          </div>
        </div>

        <ConfirmDialog
          isDialogOpened={isOpen.confirmDialog}
          handleCloseDialog={(value: boolean) => handleConfirmDialog(value)}/>

        <InfoDialog
          isDialogOpened={isOpen.infoDialog}
          handleCloseDialog={() => setIsOpen({ ...isOpen, infoDialog: false })}/>

      </div>
    </div>
  );
}
export default Home