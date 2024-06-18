import React from 'react'

const UserGoalHighlight = (props) => {

  const {
    title,
    achieve_by,
    achieve_by_near,
    time_remaining,
    description,
  } = props;


  return (
    <div>
      <div>
        <h3>{title}</h3>
        <span>{achieve_by}</span>
      </div>
      {description && <p>{description}</p>}
      {achieve_by_near && (
        time_remaining===0 || time_remaining===1 ? (
          <p>Closing in on Achieve By Date</p>
        ) : (
          time_remaining<0 ? (
            <p>You hav passed your set Achieve by date!!!!!</p>
          ) : (
            <p>Closing in on Achievement date only {time_remaining} days remaining!</p>
          )
        )
      )}
    </div>
  )
}

export default UserGoalHighlight