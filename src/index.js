import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      editing: false,
      editText: this.props.item // Store the original text for editing
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
  }

  handleChecked(e) {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));
  }

  handleEditClick() {
    this.setState({
      editing: true
    });
  }

  handleEditChange(e) {
    this.setState({
      editText: e.target.value
    });
  }

  handleEditSave() {
    this.setState({
      editing: false
    });
    // Pass the updated text and index to the parent component
    this.props.onEdit(this.props.index, this.state.editText);
  }

  render() {
    return (
      <ul>
        <li>
          <input type="checkbox" onChange={this.handleChecked} />
          {this.state.editing ? (
            <input
              type="text"
              value={this.state.editText}
              onChange={this.handleEditChange}
            />
          ) : (
            <span className={this.state.checked ? 'checked' : ''}>
              {this.props.item}
            </span>
          )}
          {this.state.editing ? (
            <button className="btn-Save" onClick={this.handleEditSave}>
              Save
            </button>
          ) : (
            <button className="btn-Edit" onClick={this.handleEditClick}>
              Edit
            </button>
          )}
          <button
            className="btn-Delete"
            onClick={() => this.props.onDelete(this.props.index)}
          >
            X DELETE
          </button>
        </li>
      </ul>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['Design', 'Develop', 'Test', 'Deploy'],
      newtask: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.inputItem = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    let inputValue = this.inputItem.current.value;

    if (inputValue.trim().length > 0) {
      this.setState({ items: this.state.items.concat(inputValue) });
      this.inputItem.current.value = '';
    }
  }

  handleDelete(index) {
    this.setState(prevState => ({
      items: prevState.items.filter((_, i) => i !== index)
    }));
  }

  handleEdit(index, newText) {
    const items = [...this.state.items];
    items[index] = newText;
    this.setState({ items });
  }

  render() {
    let display = this.state.items.map((item, index) => {
      return (
        <Display
          key={index}
          item={item}
          index={index}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      );
    });

    return (
      <div>
        <h2>Todo List Application</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="todo_text"
            placeholder="Enter a To do item..."
            ref={this.inputItem}
          />

          <button className="btn-Add">+ ADD ITEM</button>
        </form>

        <hr />
        {display}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
