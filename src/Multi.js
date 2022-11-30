import React, { Component } from "react";
import Select, { components } from "react-select";
import { colourOptions } from "./data";
import Checkbox from "react-custom-checkbox";


const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
export class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };
}



class CustomSelect extends Component {
  state = {
    values: []
  };


  handleChange = (values) => {
    this.setState({ values });
  };

  render() {
    const { values } = this.state;

    const selectedVals = values.map((x) => x.value);
    const hiddenOptions =
      selectedVals.length > 10 ? selectedVals.slice(0, 10) : [];
    const options = colourOptions.filter(
      (x) => !hiddenOptions.includes(x.value)
    );

    return (
      <div className="inputfield">
        <fieldset>
          <legend id="one" ><b>Procedure</b></legend>
          <Select

            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                boxShadow: state.isFocused ? '0' : '0',

                border: 'none',

                marginTop: '-1vh'
              }),
            }}


            placeholder='Select Multiple Procedures...'
            closeMenuOnSelect={false}
            isMulti
            options={options}
            onChange={this.handleChange}
            value={values}
            components={{ MultiValue, Option }}
            hideSelectedOptions={false}
            
            
            
          />
        </fieldset>
      </div>
    );
  }
}

export default CustomSelect;

const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",
    background: "#d4eefa",
    borderRadius: "4vh",
    fontFamily: "Open Sans",
    fontSize: "11px",
    padding: "3px",
    order: 99,
    color: 'blue',
  };

  const title = items.join("\n ");
  const length = items.length;
  const label = `+ ${length} item${length !== 1 ? "s" : ""} selected`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 1;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};

