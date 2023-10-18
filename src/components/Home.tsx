import logo from '../logo.svg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const Home = () => {

  const [value, setValue] = React.useState('2');

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    console.log(parseInt(event.target.value))
    setValue((event.target as HTMLInputElement).value);
  };

  const valuetext = (value: number) => {
    return `${value}%`;
  }

  const valueLabelFormat = (value: number) => {
    return marks.findIndex((mark) => mark.value === value) * 10;
  }

  return (
    <div className="App">
      <header className="App-header">

        <FormControl component="fieldset">
          <FormLabel style={{ lineHeight: 2 }} component="legend">Number of dices</FormLabel>
          <RadioGroup aria-label="dices" name="dices" value={value} onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
          </RadioGroup>
        </FormControl>

        <div className="Rounds-slider" style={{ paddingTop: 30 }}>
          <Box sx={{ width: 300 }}>
            <Typography gutterBottom>Rounds ( 6/36 results per round )</Typography>
            <Slider
              aria-label="Restricted values"
              defaultValue={10}
              //valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={1}
              valueLabelDisplay="on"
              //marks={marks}
              max={30}
            />
          </Box>
        </div>

        <div style={{ paddingTop: 30 }}>
          <Box sx={{ width: 300 }}>
            <Typography gutterBottom>Variance % (removed dices)</Typography>
            <Slider
              aria-label="Restricted values"
              defaultValue={10}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              max={50}
            />
          </Box>
        </div>

      </header>
    </div>
  );
}
export default Home