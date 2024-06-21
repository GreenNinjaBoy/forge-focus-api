import React from 'react'
import assignmentStyles from '../../styles/Assignments.module.css'
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
    <div className={assignmentStyles.TaskContainer}>

      <Dropdown className={assignmentStyles.Choice}  drop="left">
        <Dropdown.Toggle as={Icon} />
        <Dropdown.Menu className={assignmentStyles.ChoiceMenu} popperConfig={{ strategy: "fixed" }}>
          <Dropdown.Item className={assignmentStyles.ChoiceOption}  onClick={handleEdit} aria-label="edit" >
            Edit Assignment
          </Dropdown.Item>
          <Dropdown.Item className={assignmentStyles.ChoiceOption} onClick={handleDelete} aria-label="edit" >
            Delete Assignment
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className={assignmentStyles.TaskDetails}>
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