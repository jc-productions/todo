import React, { Component } from "react";

// Components //
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// Dependencies //
import uuid from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };

  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };
  handleSubmit = e => {
    const { id, item, items } = this.state;

    e.preventDefault();

    const newItem = {
      id,
      title: item
    };

    // console.log(newItem);

    const updatedItems = [...items, newItem];

    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false
    });
  };

  clearList = () => {
    this.setState({
      items: []
    });
  };

  handleDelete = id => {
    const { items } = this.state;
    const filteredItems = items.filter(item => item.id !== id);

    this.setState({
      items: filteredItems
    });
  };

  handleEdit = id => {
    const { items } = this.state;
    const filteredItems = items.filter(item => item.id !== id);

    const selectedItem = items.find(item => item.id === id);

    console.log(selectedItem);

    this.setState({
      id,
      items: filteredItems,
      item: selectedItem.title,
      editItem: true
    });
  };

  render() {
    const { item, items, editItem } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">Todo Input</h3>

            <TodoInput
              item={item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={editItem}
            />
            <TodoList
              items={items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
