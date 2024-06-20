import React from 'react'
import { Dropdown } from 'react-bootstrap'

const AssignmentView = ( props ) => {
  const {
    name,
    achieve_by_info,
    setAssignmentState
  } = props;

  const Icon = React.forwardRef(({ onClick }, ref) => (
    <i
      className={`fa-solid fa-ellipsis-vertical`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  const handleEdit = () => {
    setAssignmentState('edit');
  }

  const handleDelete = () => {
    setAssignmentState('delete');
  }

  return (
    <div>

      <Dropdown drop="left">
        <Dropdown.Toggle as={Icon} />
        <Dropdown.Menu  popperConfig={{ strategy: "fixed" }}>
          <Dropdown.Item  onClick={handleEdit} aria-label="edit" >
            Edit Assignment
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDelete} aria-label="edit" >
            Delete Assignment
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div>
        <h4>{name}</h4>
        {achieve_by_info ? (
          <p>{achieve_by_info}</p>
        ) : (
          <p>No Achieve By Date</p>
        )}
      </div>
    </div>
  )
}

export default AssignmentView