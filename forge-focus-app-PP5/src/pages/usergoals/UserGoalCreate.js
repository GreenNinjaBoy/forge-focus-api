import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import styles from '../../styles/UserGoalCreate.module.css';
import btnStyles from '../../styles/Button.module.css';
import formStyles from '../../styles/Form.module.css';
import {axiosReq} from '../../api/axiosDefaults';
import {useSetGlobalSuccessMessage, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';

const UserGoalCreate = (props) => {
  const {
    usergoals,
    setUserGoals,
    setUserGoalsState,
    setKeyParameters,
    KeyParameters
  } = props

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
  
  const { refine_id } = KeyParameters;

  const goallist = usergoals.results;

  const [userGoalData, setUserGoalData] = useState ({
    title:'',
    description:'',
    value:'',
    criteria:'',
    achieve_by:'',
  });

  const {
    title,
    description,
    value,
    criteria,
    achieve_by,
  } = userGoalData;

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('criteria', criteria)
    formData.append('refine', refine_id)
    if (achieve_by) {
      const parts = achieve_by.split('-');
      const date = new Date(parts[0], parts[1] -1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate)
    }
    try {
      const {data} = await axiosReq.post('/usergoals/', formData);
      setGlobalSuccessMessage("Congratulations you have created a new Goal");
      setShowGlobalSuccess(true);
      setKeyParameters({
        ...KeyParameters,
        usergoal_id: data.id,
      });
      setUserGoals(
        { results: [
          ...goallist,
          data
        ]}
      );
      if (setUserGoalsState) {
        setUserGoalsState("view");
      } else {
        setUserGoalsState({
          title: '',
          description: '',
          value: '',
          criteria: '',
          achieve_by: '',
        })
      };
    } catch(err) {
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    setUserGoalData({
      ...userGoalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setUserGoalData({
      title:'',
      description:'',
      value:'',
      criteria:'',
      achieve_by: '',
    });
    if (setUserGoalsState) {
      setUserGoalsState("view");
    }
  };

  return (
    <div className={styles.CreateContainer}>
      <h3 className={styles.title}>Create a New Goal</h3>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>

          {errors.title?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="user-goal-title" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Goal</Form.Label>
            <Form.Control
              type="text"
              placeholder='What shall we call your Goal?'
              name='title'
              value={title}
              onChange={handleChange}
              className={styles.Input}
              />
          </Form.Group>

          {errors.description?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="user-goal-description" className={styles.Group}>
            <Form.Label>Goal Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe what you want to achieve?"
              name="description"
              value={description}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.value?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="user-goal-value" className={styles.Group}>
            <Form.Label>Goal Value:</Form.Label>
            <Form.Control
              type="text"
              placeholder="What will you gain by achieving this goal?"
              name="value"
              value={value}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.criteria?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="user-goal-criteria" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Goal Criteria:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Criteria to be met to achieve this goal?"
              name="criteria"
              value={criteria}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="user-goal-achieve-by" className={styles.Group}>
            <Form.Label className={styles.FormLabel}> Goal Achieved by:</Form.Label>
            <Form.Control
              type="date"
              name="achieve_by"
              value={achieve_by}
              onChange={handleChange}
              className={styles.DateInput}
            />
          </Form.Group>

          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
        </div>
        <div className={styles.Buttons}>
          <Button className={btnStyles.Button} onClick={handleCancel}>
              Cancel Goal
          </Button>
          <Button className={btnStyles.Button} type="submit">
            Save Goal
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UserGoalCreate