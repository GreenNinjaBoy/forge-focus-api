import React, {useState} from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Form } from 'react-bootstrap';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const AssignmentEdit = (props) => {
  const {
    id,
    name,
    refine,
    usergoal,
    achieve_by,
    assignments,
    setAssignments,
    setAssignmentState,
    type
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const convertedDate = () => {
    if (achieve_by !== null){
      const dateWithTime = new Date(achieve_by).toISOString()
      return dateWithTime.split('T')[0];
    } else {
      return '';
    } 
  };

  const assignmentList = assignments.results;

  const [taskData, setAssignmentData] = useState({
    newName: name,
    newRefine: refine,
    newUserGoal: usergoal,
    newAchieve_by: convertedDate(),
  })

  const {
    newName,
    newRefine,
    newUserGoal,
    newAchieve_by,
  } = taskData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setAssignmentData({
      ...setAssignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setAssignmentState("view");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', newName)
    if (refine) {
      formData.append('refine', newRefine)
    };
    if (usergoal) {
      formData.append('usergoal', newUserGoal)
    }
    if (newAchieve_by) {
      const parts = newAchieve_by.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate);
    }
    try {
      const {data} = await axiosReq.put(`/assignments/${id}`, formData);
      setGlobalSuccessMessage("Assignment Edit Successful");
      setShowGlobalSuccess(true);
      const assignmentIndex = assignmentList.findIndex(assignment => assignment.id === id);
      assignmentList[assignmentIndex] = data;
      setAssignments(
        { results: [
          ...assignmentList
        ]}
      );
      setAssignmentState("view");
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>

          {errors.name?.map((message, idx) => (
            <Alert key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId={`new-name-${type}`}>
            <Form.Label >Assignment:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task name"
              name="newName"
              value={newName}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId={`new-deadline-${type}`}>
            <Form.Label>Achieve By:</Form.Label>
            <Form.Control
              type="date"
              name="newDeadline"
              value={newAchieve_by}
              onChange={handleChange}
            />
          </Form.Group>

        </div>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <button type="submit" aria-label="Click to save assignment">
          <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button onClick={handleCancel} aria-label="Click to cancel">
            <i className="fa-regular fa-rectangle-xmark"></i>
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AssignmentEdit