import React from 'react';
import styles from '../../styles/UserGoal.module.css';
import cardStyles from '../../styles/Cards.module.css';

const UserGoalHighlight = (props) => {

  const {
    title,
    achieve_by,
    achieve_by_near,
    time_remaining,
    description,
  } = props;


  return (
    <div className={cardStyles.Goal}>
      <div className={cardStyles.GoalTitle}>
        <h3>{title}</h3>
        <span>{achieve_by}</span>
      </div>
      {description && <p>{description}</p>}
      {achieve_by_near && (
        time_remaining===0 || time_remaining===1 ? (
          <p className={styles.HighlightDeadlineWarning}>Closing in on Achieve By Date</p>
        ) : (
          time_remaining<0 ? (
            <p className={styles.HighlightDeadlineWarning}>You hav passed your set Achieve by date!!!!!</p>
          ) : (
            <p className={styles.HighlightDeadlineWarning} >Closing in on Achievement date only {time_remaining} days remaining!</p>
          )
        )
      )}
    </div>
  )
}

export default UserGoalHighlight