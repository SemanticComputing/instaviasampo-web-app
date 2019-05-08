import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  textSearch: {
    margin: theme.spacing.unit,
  },
});

class TextFacet extends React.Component {
  state = {
    value: '',
  };

  // componentDidUpdate = prevProps => {
  //   if (prevProps.search.query != this.props.search.query) {
  //     this.setState({
  //       value: this.props.search.query
  //     });
  //   }
  // }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleMouseDown = (event) => {
    event.preventDefault();
  };

  // handleOnKeyDown = (event) => {
  //   if (event.key === 'Enter' && this.hasDatasets() && this.hasValidQuery()) {
  //     this.props.clearResults();
  //     this.props.updateQuery(this.state.value);
  //     this.props.fetchResults('text', this.state.value);
  //   }
  // };

  // handleClick = () => {
  //   if (this.hasDatasets() && this.hasValidQuery()) {
  //     this.props.clearResults();
  //     this.props.updateQuery(this.state.value);
  //     this.props.fetchResults('text', this.state.value);
  //   }
  // };

  // hasDatasets = () => {
  //   let hasDs = false;
  //   Object.values(this.props.datasets).forEach(value => {
  //     if (value.selected) {
  //       hasDs = true;
  //     }
  //   });
  //   return hasDs;
  // }

  hasValidQuery = () => {
    return this.state.value.length > 2;
  }

  render() {
    const { classes } = this.props;
    let searchButton = null;
    const textResultsFetching = false;
    if (textResultsFetching) {
      searchButton = (
        <IconButton
          aria-label="Search places"
        >
          <CircularProgress size={24} />
        </IconButton>
      );
    } else {
      searchButton = (
        <IconButton
          aria-label="Search"
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
        >
          <SearchIcon />
        </IconButton>
      );
    }

    return (
      <div className={classes.root}>
        <FormControl className={classes.textSearch}>
          <InputLabel htmlFor="adornment-search">Search</InputLabel>
          <Input
            id="adornment-search"
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleOnKeyDown}
            endAdornment={
              <InputAdornment position="end">
                {searchButton}
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    );
  }
}

TextFacet.propTypes = {
  classes: PropTypes.object.isRequired,
  facetID: PropTypes.string.isRequired,
  facet: PropTypes.object.isRequired,
  facetClass: PropTypes.string,
  resultClass: PropTypes.string,
  fetchFacet: PropTypes.func,
  updateFacetOption: PropTypes.func,
  facetUpdateID: PropTypes.number,
  updatedFilter: PropTypes.object,
  updatedFacet: PropTypes.string,
};

export default withStyles(styles)(TextFacet);
