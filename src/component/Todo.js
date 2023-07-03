import React, { useState } from "react";
import { Row, Tag, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import todoListSlice from "../redux/reducers/todoListSlice";
const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

const Todo = ({ id, name, priority, completed }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(todoListSlice.actions.toggleStatus(id));
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: "10px",
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  );
};

export default Todo;
