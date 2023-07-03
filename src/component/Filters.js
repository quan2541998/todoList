import { Col, Row, Input, Typography, Radio, Select, Tag } from "antd";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import filterSlice from "../redux/reducers/filtersSlice";
import debounce from "lodash/debounce";

const { Search } = Input;

export default function Filters() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [statusTodo, setStatusTodo] = useState("All");

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(filterSlice.actions.searchFilterChange(value));
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSearchChange = (e) => {
    const { value: text } = e.target;
    setSearchText(text);
    debouncedSearch(text);
  };
  const handleStatusChange = (e) => {
    const { value: status } = e.target;
    setStatusTodo(status);
    dispatch(filterSlice.actions.statusFilterChange(status));
  };
  const handlePriorityChange = (value) => {
    console.log(value);
    dispatch(filterSlice.actions.priorityFilterChange(value));
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <Typography.Paragraph style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}>Search</Typography.Paragraph>
        <Search placeholder="input search text" value={searchText} onChange={handleSearchChange} />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}>Filter By Status</Typography.Paragraph>
        <Radio.Group defaultValue={statusTodo} onChange={handleStatusChange}>
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Todo">To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}>Filter By Priority</Typography.Paragraph>
        <Select mode="multiple" allowClear placeholder="Please select" style={{ width: "100%" }} onChange={handlePriorityChange}>
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
      </Col>
    </Row>
  );
}
