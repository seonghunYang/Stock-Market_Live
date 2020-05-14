import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import TutorialCard from './TutorialCard';
import Tutorial_content from '../util/Tutuorial_content';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

function getSteps() {
  return ['Search for company you want in the list!', 'Get stock information', 'Register on your wishlist!'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      const one = Tutorial_content(0);
      const two = Tutorial_content(1);
      const three = Tutorial_content(2);
      return (
        <Grid container spacing={5} >
          <Grid item md={4}>
            <TutorialCard data={one} />
          </Grid>
          <Grid item md={4}>
            <TutorialCard data={two} />
          </Grid>
          <Grid item md={4}>
            <TutorialCard data={three} />
          </Grid>
        </Grid>
      );
    case 1:
      const four = Tutorial_content(3);
      const five = Tutorial_content(4);
      const six = Tutorial_content(5);
      return (
        <Grid container spacing={5} >
          <Grid item md={4}>
            <TutorialCard data={four} />
          </Grid>
          <Grid item md={4}>
            <TutorialCard data={five} />
          </Grid>
          <Grid item md={4}>
            <TutorialCard data={six} />
          </Grid>
        </Grid>
      );  
    case 2:
      const seven = Tutorial_content(6);
      const eight = Tutorial_content(7);
      const nine = Tutorial_content(8);
      return (
        <Grid container spacing={5} >
          <Grid item md={4}>
            <TutorialCard data={seven} />
          </Grid>
          <Grid item md={4}>
            <TutorialCard data={eight} />
          </Grid>
          <Grid item md={4}>
            <TutorialCard data={nine} />
          </Grid>
        </Grid>
      );
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div className={classes.content}>
            {getStepContent(activeStep)}
            <div className={classes.content}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}