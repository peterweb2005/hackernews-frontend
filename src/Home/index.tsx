import React from 'react';
import { AppBar, Button, CircularProgress, Toolbar } from '@material-ui/core';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useObserver } from "mobx-react-lite";
import List from './List';
import { Store } from './Store';
import { Title, SubTitle, SelectContainer } from '../Styled';
import { Options, Sort, FilterType } from '../data/index';

const store = new Store();

export { store };

const StyledToggleButtonGroup = withStyles((theme: Theme) => ({
  grouped: {
    color: 'white !important',
  }
}))(ToggleButtonGroup);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    center: {
      margin: 'auto'
    },
    toolbar: theme.mixins.toolbar,
  }),
);

function Progress() {

  const classes = useStyles();

  return useObserver(() => {
    if (store.progress) {
      return <CircularProgress className={classes.center} />;
    } else {
      return null;
    }
  });
}

function PageSelect() {
  const onChange = (event: any) => {
    store.options.page = Number(event.target.value);
  }
  return useObserver(() => (
    <SelectContainer>
      <SubTitle color="inherit">
        Page
      </SubTitle>
      <input type="number" min="1" value={store.options.page} onChange={onChange} />
    </SelectContainer>
  ));
}

function FilterSelect() {
  const onTypeChange = (event: any, value: FilterType) => {
    if (store.options.filter) store.options.filter.type = value;
  }
  const onAmountChange = (event: any) => {
    const value = Number(event.target.value);
    if (store.options.filter) {
      store.options.filter.amount = value;
    }
  }
  return useObserver(() => (
    <SelectContainer>
      <SubTitle color="inherit">
        Filter
      </SubTitle>
      <StyledToggleButtonGroup
        value={store.options.filter?.type}
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
      <input type="number" min="0" value={store.options.filter?.amount} onChange={onAmountChange} />
    </SelectContainer>
  ));
}

function SortSelect() {
  const onChange = (event: any, value: Sort) => {
    if (store.options.sort) store.options.sort = value;
  }
  return useObserver(() => (
    <SelectContainer>
      <SubTitle color="inherit">
        Sort
      </SubTitle>
      <StyledToggleButtonGroup
        value={store.options.sort}
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
  ));
}

export default function Home() {

  const onClick = () => {
    console.log('onClick()');
    console.log('store.options: ', store.options);
    store.updateItems();
  };

  const classes = useStyles();

  React.useEffect(
    () => {
      (async () => {
        store.updateItems();
      })();
    },
    [],
  );

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
      <div className={classes.container}>
        <Progress />
      </div>
      <List />
    </React.Fragment >
  );
}
