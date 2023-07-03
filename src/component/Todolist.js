import React, { useState } from "react";
import { Row, Col, Select, Input, Tag, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { todoRemainingSelector } from "../redux/selectors/todoListSelector";
import todoListSlice from "../redux/reducers/todoListSlice";

import Todo from "./Todo";
const Todolist = () => {
  const todoList = useSelector(todoRemainingSelector);

  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const handleAddButtonClick = () => {
    dispatch(
      todoListSlice.actions.addTodo({
        id: uuid(),
        name: todoName,
        priority: priority,
        completed: false,
      })
    );
  };

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };
  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList?.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              name={todo.name}
              completed={todo.completed}
              priority={todo.priority}
            ></Todo>
          );
        })}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input onChange={handleInputChange} />
          <Select defaultValue="Medium" onChange={handlePriorityChange}>
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
};

export default Todolist;
