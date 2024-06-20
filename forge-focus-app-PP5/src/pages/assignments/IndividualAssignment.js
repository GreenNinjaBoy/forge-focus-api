import React, {useState} from 'react'
import AssignmentView from './AssignmentView';
import AssignmentEdit from './AssignmentEdit';
import AssignmentDelete from './AssignmentDelete';

const IndividualAssignment = ( props ) => {
  const {
    assignment,
    refine_id,
    userGoal_id,
    assignments,
    setAssignments,
    type
  } = props;

  const [assignmentState, setAssignmentState] = useState("view");

  function AssignmentContext() {
    if (assignmentState==='view') {
      return <AssignmentView key={assignment.id} {...assignment} setAssignmentState={setAssignmentState}/>
    } else if (assignmentState==='edit') {
      return <AssignmentEdit {...assignment} type={type} setAssignmentState={setAssignmentState} assignments={assignments} setAssignments={setAssignments} refine_id={refine_id} userGoal_id={userGoal_id}/>
    } else if (assignmentState==='delete') {
      return <AssignmentDelete {...assignment} assignments={assignments} setAssignments={setAssignments} setAssignmentState={setAssignmentState}/>
    }
  };

  return (
    <div>
      <AssignmentContext/>  
    </div>
  )
}

export default IndividualAssignment