import React, {useState} from 'react';
import { Alert, Form } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import {useSetGlobalSuccessMessage, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';

const AssignmentCreate = ( props) => {
  const {
    refine_id,
    usergoal_id,
    assignments,
    setAssignments,
    type
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  const assignmentList = assignments.results;

  const [assignmentData, setAssignmentData] = useState ({
    name:'',
    refine: refine_id,
    usergoal: usergoal_id,
    achieve_by: '',
  });

  const {
    name,
    refine,
    usergoal,
    achieve_by,
  } = assignmentData;

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    if (refine) {
      formData.append('refine', refine)
    };
    if (usergoal) {
      formData.append('usergoal', usergoal)
    }
    if (achieve_by) {
      const parts = achieve_by.split('-');
      const date = new Date(parts[0], parts[1] -1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate);
    }
    try {
      const {data} = await axiosReq.post(`/assignments/`, formData);
      setGlobalSuccessMessage("New assignment created");
      setShowGlobalSuccess(true);
      setAssignments(
        { results: [
          ...assignmentList,
          data
        ]}
      );
      setAssignmentData({
        name: '',
        refine: refine_id,
        usergoal: usergoal_id,
        achieve_by: '',
      });
    } catch(err){
      console.log(err);
      if (err.response?.status !==401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setErrors({});
    setAssignmentData({
      name: '',
      refine: refine_id,
      usergoal: usergoal_id,
      achieve_by: '',
    });
  };

  return (
    <div>
      <h4>Add {type} Assingment </h4>
      <Form onSubmit={handleSubmit}>
        <div>

          {errors.name?.map((message, idx) => (
            <Alert key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId={`name-${type}`}>
            <Form.Label>Assingment:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Assingment name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId={`deadline-${type}`}>
            <Form.Label>Deadline:</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              value={achieve_by}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx}>
              {message}
            </Alert>
          ))}
        </div>
        <div>
          <button type="submit" aria-label="save assignment">
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

export default AssignmentCreate