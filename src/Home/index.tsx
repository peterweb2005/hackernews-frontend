import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import List from './List';
import { Title, SubTitle, SelectContainer } from '../Styled';
import { Options, Sort, FilterType } from '../data/index';

// ENHANCE values mirrored (duplicated)
// inputs need event to read / write seems redundant
//let page: number = 1;
//let filterType: string = 'ge';
//let filterAmount: number = 100;
//let sort: string = 'asc';
const options: Options = {
  page: 1,
  filter: {
    type: FilterType.ge,
    amount: 100,
  },
  sort: Sort.asc,
};

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
  const [value, setValue] = React.useState<number>(options.page as number);
  const onChange = (event: any) => {
    options.page = Number(event.target.value);
    setValue(options.page);
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
  const [type, setType] = React.useState<FilterType>(options.filter?.type as FilterType);
  const [amount, setAmount] = React.useState<number>(options.filter?.amount as number);
  const onTypeChange = (event: any, value: FilterType) => {
    if (options.filter) options.filter.type = FilterType[value];
    setType(value);
  }
  const onAmountChange = (event: any) => {
    if (options.filter) options.filter.amount = Number(event.target.value);
    if (options.filter) setAmount(options.filter.amount);
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
  const [value, setValue] = React.useState<Sort>(options.sort as Sort);
  const onChange = (event: any, value: Sort) => {
    options.sort = Sort[value];
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
    /*console.log('page: ', page);
    console.log('filterType: ', filterType);
    console.log('filterAmount: ', filterAmount);
    console.log('sort: ', sort);*/
    console.log('options: ', options);
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
      <List options={options} />
    </React.Fragment >
  );
}
