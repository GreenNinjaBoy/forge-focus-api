import React from 'react'

const UserGoalsView = (props) => {
  const {
    goaltitle,
    description,
    value,
    criteria,
    achieve_by,
    deadline_near,
    days_remaining,
    setUserGoalState
  } = props;

  const handleEdit = () => {
    setUserGoalState('edit');
  }

  const handleDelete = () => {
    setUserGoalState('delete');
  }

  return (
    <>
      <div>
        <h3>{goaltitle}</h3>
        <p><span>Description:</span>{description}</p>
        <p><span>Value:</span>{value}</p>
        <p><span>Success Criteria:</span>{criteria}</p>
        <div>
          {achieve_by ? (
            <p><span>Achieve by:</span>{achieve_by}</p>
          ) : (
            <p>No deadline</p>
          )}
        </div>
        {deadline_near && (
          <p>DEADLINE NEAR only {days_remaining} days remaining</p>
        )}
        <div>
          <button onClick={handleEdit} aria-label="Click to edit focus">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={handleDelete}aria-label="Click to delete focus">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default UserGoalsView