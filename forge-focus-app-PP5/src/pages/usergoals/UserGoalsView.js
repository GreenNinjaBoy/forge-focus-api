import React from 'react';
import styles from '../../styles/UserGoal.module.css';

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
      <div className={styles.GoalViewContainer}>
        <h3>{goaltitle}</h3>
        <p><span className={styles.label}>Description:</span>{description}</p>
        <p><span className={styles.label}>Value:</span>{value}</p>
        <p><span className={styles.label}>Success Criteria:</span>{criteria}</p>
        <div className={styles.ExtraDetails}>
          {achieve_by ? (
            <p><span className={styles.label}>Achieve by:</span>{achieve_by}</p>
          ) : (
            <p>No deadline</p>
          )}
        </div>
        {deadline_near && (
          <p className={styles.DeadlineWarning}>ACHIEVE BY DATE NEAR!! only {days_remaining} days remaining</p>
        )}
        <div className={styles.IconContainer}>
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