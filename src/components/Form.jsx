import React, { Component } from "react";
import Joi from "joi-browser";
import DropDownList from "./dropDownList";
import Input from "./Input";
import Radios from "./Radios";
/* import AgreeBox from "./agreeBox"; */
import Button from "./Button";

class Form extends Component {
  validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //console.log(error);
    if (!error) return null;
    //console.log("22---" + error);
    const errors = {};
    if (error.details !== undefined)
      for (let item of error.details) errors[item.path[0]] = item.message;
    //console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }, dependon) => {
    let obj = { [name]: value };
    if (dependon) obj[dependon] = this.state.data[dependon];
    let schema = { [name]: this.schema[name] };
    if (dependon) schema[dependon] = this.schema[dependon];
    const { error } = Joi.validate(obj, schema);
    //if (error) console.log(error.details);
    return error ? error.details[0].message : null;
  };
  validateDropDownProperty = (value, selectedOption) => {
    const obj = { [value]: selectedOption };
    const schema = { [value]: this.schema[value] };
    const { error } = Joi.validate(obj, schema);
    //if (error) console.log(error.details);
    return error ? error.details[0].message : null;
  };
  validateRadioProperty = (value, selectedOption) => {
    const obj = { [value]: selectedOption };
    const schema = { [value]: this.schema[value] };
    const { error } = Joi.validate(obj, schema);
    //if (error) console.log(error.details);
    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    //console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = (dependon, { currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input, dependon);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }; /* <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button> */

  handleDropDownChange = (value, selectedOption) => {
    const errors = { ...this.state.errors };
    //console.log(errors);
    const errorMessage = this.validateDropDownProperty(value, selectedOption);

    if (errorMessage) errors[value] = errorMessage;
    else delete errors[value];

    const data = { ...this.state.data };
    //console.log(selectedOption);
    data[value] = selectedOption;
    this.setState({ data, errors });
  };

  handleRadioSelectionChange = (value, selectedOption) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateRadioProperty(value, selectedOption);

    if (errorMessage) errors[value] = errorMessage;
    else delete errors[value];

    const data = { ...this.state.data };
    data[value] = selectedOption;
    this.setState({ data, errors });
  };
  /* validateAgreed = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    //console.log(obj, schema, error);
    if (error)
      //console.log(error.message);
      //console.log(error.details);
      return error ? error.message : null;
  }; */
  /* handleAgreeBox = (error, { target: checkbox }) => {
    const errors = { ...this.state.errors };
    //const errorMessage = checkbox.checked ? "" : error;
    const errorMessage = this.validateAgreed(checkbox.name, checkbox.checked);

    if (errorMessage) errors[checkbox.name] = errorMessage;
    else delete errors[checkbox.name];

    const data = { ...this.state.data };
    data[checkbox.name] = checkbox.checked;
    this.setState({ data, errors });
  }; */

  renderButton(label, btnStyle, onClickHandler, disable) {
    // console.log(disable);
    // console.log(this.validate() || disable);
    return (
      <Button
        classProp={btnStyle}
        disabled={this.validate() || disable}
        onClick={onClickHandler}
        label={label}
      />
    );
  }
  renderInput(
    name,
    label,
    icon = "none",
    type = "text",
    disabled = false,
    dependon = null
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        onChange={this.handleChange.bind(this, dependon)}
        type={type}
        name={name}
        disabled={disabled}
        label={label}
        error={errors[name]}
        icon={icon}
      />
    );
  }
  renderDropDownList(name, label, options) {
    const { errors, data } = this.state;
    //console.log(data[name]);
    return (
      <DropDownList
        label={label}
        options={options}
        onChange={this.handleDropDownChange.bind(this, name)}
        error={errors[name]}
        value={data[name]}
      />
    );
  }

  renderRadios(name, label, options) {
    const { errors, data } = this.state;
    if (data[name] !== "" && data[name] !== null) {
      return (
        <Radios
          label={label}
          options={options}
          onChange={this.handleRadioSelectionChange.bind(this, name)}
          error={errors[name]}
          value={data[name]}
        />
      );
    } else {
      return (
        <Radios
          label={label}
          options={options}
          onChange={this.handleRadioSelectionChange.bind(this, name)}
          error={errors[name]}
        />
      );
    }
  }
  /* renderAgreeBox(name, label, errorMessage, options) {
    const { errors } = this.state;
    return (
      <AgreeBox
        label={label}
        id={name}
        options={options}
        onChange={this.handleAgreeBox.bind(this, errorMessage)}
        error={errors[name]}
        name={name}
      />
    );
  } */
}

export default Form;
