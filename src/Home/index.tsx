import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import List from './List';
import { Title, SubTitle, SelectContainer } from '../Styled';

// ENHANCE values mirrored (duplicated)
// inputs need event to read / write seems redundant
let page: number = 1;
let filterType: string = 'ge';
let filterAmount: number = 100;
let sort: string = 'asc';

const StyledToggleButtonGroup = withStyles((theme: Theme) => ({
  grouped: {
    color: 'white !important',
  }
}))(ToggleButtonGroup);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  }),
);

function PageSelect() {
  const [value, setValue] = React.useState<number>(page);
  const onChange = (event: any) => {
    page = Number(event.target.value);
    setValue(page);
  }
  return (
    <SelectContainer>
      <SubTitle color="inherit">
        Page
      </SubTitle>
      <input type="number" min="1" value={value} onChange={onChange} />
    </SelectContainer>
  );
}

function FilterSelect() {
  const [type, setType] = React.useState<string>(filterType);
  const [amount, setAmount] = React.useState<number>(filterAmount);
  const onTypeChange = (event: any, value: string) => {
    filterType = value;
    setType(value);
  }
  const onAmountChange = (event: any) => {
    filterAmount = Number(event.target.value);
    setAmount(filterAmount);
  }
  return (
    <SelectContainer>
      <SubTitle color="inherit">
        Filter
      </SubTitle>
      <StyledToggleButtonGroup
        value={type}
        exclusive
        aria-label="filter"
        onChange={onTypeChange}
      >
        <ToggleButton value="eq">
          {'='}
        </ToggleButton>
        <ToggleButton value="ge">
          {'>='}
        </ToggleButton>
        <ToggleButton value="gt">
          {'>'}
        </ToggleButton>
        <ToggleButton value="le">
          {'<='}
        </ToggleButton>
        <ToggleButton value="lt">
          {'<'}
        </ToggleButton>
      </StyledToggleButtonGroup>
      <input type="number" min="0" value={amount} onChange={onAmountChange} />
    </SelectContainer>
  );
}

function SortSelect() {
  const [value, setValue] = React.useState<string>(sort);
  const onChange = (event: any, value: string) => {
    sort = value;
    setValue(value);
  }
  return (
    <SelectContainer>
      <SubTitle color="inherit">
        Sort
      </SubTitle>
      <StyledToggleButtonGroup
        value={value}
        exclusive
        aria-label="sort"
        onChange={onChange}
      >
        <ToggleButton value="asc">
          {'ASC'}
        </ToggleButton>
        <ToggleButton value="desc">
          {'DESC'}
        </ToggleButton>
      </StyledToggleButtonGroup>
    </SelectContainer>
  );
}

export default function Home() {

  const [date, setDate] = React.useState<any>(Date.now());

  const onClick = () => {
    console.log('onClick()');
    console.log('page: ', page);
    console.log('filterType: ', filterType);
    console.log('filterAmount: ', filterAmount);
    console.log('sort: ', sort);
    setDate(Date.now());
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Title color="inherit">
            Hack News
          </Title>
          <PageSelect />
          <FilterSelect />
          <SortSelect />
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={onClick}
          >
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <List page={page} filterType={filterType} filterAmount={filterAmount} sort={sort} />
    </React.Fragment >
  );
}
