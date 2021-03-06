import React, { Component } from "react";
import Joi from "joi-browser";
import DropDownList from "./dropDownList";
import Input from "./Input";
import TextArea from "./TextArea";
import Radios from "./Radios";
import Dates from "./Dates";
import AgreeBox from "./agreeBox";
import Button from "./Button";
import _ from "lodash";

class Form extends Component {
  validate = () => {
    /* const schema = Joi.object({
      a: Joi.number(),
      b: Joi.number().max(Joi.ref("a")),
      c: Joi.number().required()
    });
    const err = schema.validate({ c: 9 });
    console.log("err=====" + err.error); */
    const options = {
      //abortEarly: false
      allowUnknown: true
    };
    //console.log(this.state.data);
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    if (error.details !== undefined)
      for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }, dependon) => {
    const options = {
      //abortEarly: false,
      allowUnknown: true
    };
    let obj = { [name]: value };
    if (dependon) obj[dependon] = Number(this.state.data[dependon]);
    let schema = { [name]: this.schema[name] };
    if (dependon) schema[dependon] = this.schema[dependon];
    const { error } = Joi.validate(obj, schema, options);
    //console.log(error);
    //if (error) console.log(error.details);
    return error ? error.details[0].message : null;
  };
  validateTextAreaProperty = ({ name, value }, dependon) => {
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
    //console.log(this.schema);
    const obj = { [value]: selectedOption };
    const schema = { [value]: this.schema[value] };
    const { error } = Joi.validate(obj, schema);
    //if (error) console.log(error.details);
    return error ? error.details[0].message : null;
  };
  validateDateProperty = (value, selectedOption) => {
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

  createOption = (label, value) => ({
    label,
    value: value //label.toLowerCase().replace(/\W/g, "")
  });
  handleCreateDDList = (name, inputValue) => {
    //this.setState({ isLoading: true });
    //console.group("Option created");
    //console.log("Wait a moment...");
    setTimeout(() => {
      const dataobject = this.state[name];
      console.log(dataobject);
      const newOption = this.createOption(
        inputValue,
        String(dataobject.length)
      );
      //console.log(newOption);
      //console.groupEnd();
      this.setState({
        //isLoading: false,
        [name]: [...dataobject, newOption]
      });
      const { data } = this.state;
      data[name] = newOption;
      this.setState({
        //isLoading: false,
        data: data
      });
      let { errors } = this.state;
      //console.log(errors);
      const newError = _.omit(errors, [name]);

      this.setState({ errors: newError }, () => {
        //console.log(this.state.errors);
      });
    }, 1000);
  };

  handleChange = (dependon, { currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input, dependon);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    //console.log(data[input.name] + 1);
    this.setState({ data, errors });
  };

  handleTextAreaChange = (dependon, { currentTarget: textarea }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateTextAreaProperty(textarea, dependon);
    if (errorMessage) errors[textarea.name] = errorMessage;
    else delete errors[textarea.name];

    const data = { ...this.state.data };
    data[textarea.name] = textarea.value;
    this.setState({ data, errors });
  };

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

  handleDateSelectionChange = (value, selectedOption) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateDateProperty(value, selectedOption);

    if (errorMessage) errors[value] = errorMessage;
    else delete errors[value];

    const data = { ...this.state.data };
    selectedOption !== null
      ? (data[value] = selectedOption.toDateString())
      : (data[value] = null);
    this.setState({ data, errors });
  };
  validateAgreed = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    //console.log(obj, schema, error);
    if (error)
      //console.log(error.message);
      //console.log(error.details);
      return error ? error.message : null;
  };
  handleAgreeBox = (error, { target: checkbox }) => {
    const errors = { ...this.state.errors };
    //const errorMessage = checkbox.checked ? "" : error;
    const errorMessage = this.validateAgreed(checkbox.name, checkbox.checked);

    if (errorMessage) errors[checkbox.name] = errorMessage;
    else delete errors[checkbox.name];

    const data = { ...this.state.data };
    data[checkbox.name] = checkbox.checked;
    this.setState({ data, errors });
  };

  renderButton(label, btnStyle, onClickHandler, disable) {
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
    disabled = false,
    icon = "none",
    type = "text",
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

  renderTextArea(
    name,
    label,
    disabled = false,
    type = "text",
    dependon = null
  ) {
    const { data, errors } = this.state;
    return (
      <TextArea
        value={data[name]}
        onChange={this.handleTextAreaChange.bind(this, dependon)}
        type={type}
        name={name}
        disabled={disabled}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderDropDownList(name, label, options, edit = false) {
    // console.log(edit);
    const { errors, data } = this.state;
    //console.log(data[name]);
    return (
      <DropDownList
        label={label}
        options={options}
        onChange={this.handleDropDownChange.bind(this, name)}
        error={errors[name]}
        value={data[name]}
        onCreateOption={edit ? this.handleCreateDDList.bind(this, name) : null}
        edit={edit}
      />
    );
  }

  renderRadios(name, label, options, type) {
    const { errors, data } = this.state;
    if (data[name] !== "" && data[name] !== null) {
      return (
        <Radios
          label={label}
          options={options}
          onChange={this.handleRadioSelectionChange.bind(this, name)}
          error={errors[name]}
          value={data[name]}
          type={type}
        />
      );
    } else {
      return (
        <Radios
          label={label}
          options={options}
          onChange={this.handleRadioSelectionChange.bind(this, name)}
          error={errors[name]}
          type={type}
        />
      );
    }
  }
  renderDates(name, label, disabled) {
    const { errors, data } = this.state;
    if (data[name] !== "" && data[name] !== null) {
      return (
        <Dates
          label={label}
          onChange={this.handleDateSelectionChange.bind(this, name)}
          error={errors[name]}
          selected={new Date(data[name])}
          disabled={disabled}
        />
      );
    } else {
      return (
        <Dates
          label={label}
          onChange={this.handleDateSelectionChange.bind(this, name)}
          error={errors[name]}
          disabled={disabled}
        />
      );
    }
  }
  renderAgreeBox(name, label, errorMessage, options) {
    const { errors, data } = this.state;
    return (
      <AgreeBox
        label={label}
        id={name}
        options={options}
        onChange={this.handleAgreeBox.bind(this, errorMessage)}
        error={errors[name]}
        name={name}
        checked={data[name]}
      />
    );
  }
}

export default Form;
