import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };

    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChecked(e) {

    if (this.state.checked === false) {
      this.setState({ checked: false });
      this.setState({ checked: true });

    }
    else {
      this.setState({ checked: false });
    }
  }

  handleDelete = index => {
    this.setState(prevState => ({
      items: prevState.items.filter((_, i) => i !== index)
    }));
  };

  render() {
    return (
      <ul>
        <li>
          <input type="checkbox" onChange={this.handleChecked} />
          <span className={this.state.checked ? "checked" : ""}>{this.props.item}</span>
          <button onClick={() => this.props.onDelete(this.props.index)}>X DELETE</button>
        </li>
      </ul>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputItem = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    let inputValue = this.inputItem.current.value;

    if (inputValue.trim().length > 0) {
      this.setState({ items: this.state.items.concat(inputValue) });
      this.inputItem.current.value = "";
    }
  }

  handleDelete = index => {
    this.setState(prevState => ({
      items: prevState.items.filter((_, i) => i !== index)
    }));
  };

  render() {
    let display = this.state.items.map(
      (item, index) => {

        return (<Display key={index} item={item} index={index} onDelete={this.handleDelete} />)
      });

    return (
      <div>
        <h2>Todo List Application</h2>

        <form onSubmit={this.handleSubmit}>
          <input type="text" className="todo_text" placeholder="Enter a To do item..." ref={this.inputItem} />

          <button className="btn-Add">+ ADD</button>
        </form>

        <hr />
        {display}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));