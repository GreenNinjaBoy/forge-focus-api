import React, {useState} from 'react';
import { Alert, Button, Form } from 'bootstrap';
import btnStyles from '../../styles/Button.module.css';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/UserGoal.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const UserGoalEdit = (props) => {
  const{
    id,
    refine,
    title,
    description,
    value,
    criteria,
    achieve_by,
    usergoals,
    setUserGoals,
    setUserGoalState
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useGlobalSuccessMessage();

  const convertedDate = () => {
    if (achieve_by !== null){
      return new Date(achieve_by).toISOString().split('T')[0];
    } else {
      return '';
    }
  };

  const userGoalList = usergoals.results;

  const [userGoalData, setUserGoalData] = useState ({
    newTitle: title,
    newDescription: description,
    newValue: value,
    newCriteria: criteria,
    newAchieve_By: convertedDate(),
  });

  const [errors, setErrors] = useState({});

  const {
    newTitle,
    newDescription,
    newValue,
    newCriteria,
    newAchieve_By,
  } = userGoalData;

  const handleChange = (event) => {
    setUserGoalData({
      ...userGoalData,
      [event.target.name]: event.target.value,
    });
    };

  const handleCancel = () => {
    setUserGoalState("view");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', newTitle)
    formData.append('description', newDescription)
    formData.append('value', newValue)
    formData.append('criteria', newCriteria)
    formData.append('refine', refine)
    if (newAchieve_By) {
      const parts = newAchieve_By.spit('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate)
    }
    try {
      const{data} = await axiosReq.put(`/userGoals/${id}`, formData);
      setGlobalSuccessMessage('Goal edited successfully!')
      setShowGlobalSuccess(true);
      const userGoalIndex = userGoalList.findIndex(goal => userGoalData.id === id);
      userGoalList[userGoalIndex] = data;
      setUserGoals(
        { results:{
          ...userGoalList
        }}
      );
      setUserGoalState("view");
    } catch(err){
      console.log(err);
      if (err.response?.status !==401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className={styles.CreateContainer}>
      <h3 lassName={styles.title}>Edit Goal Details</h3>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>
          {errors.title?.map((message, idx) => (
            <Alert key={idx}  className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="new-user-goal-title" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Goal:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Goal Name"
              name="newTitle"
              value={newTitle}
              onChange={handleChange}
              className={styles.Input}
              />
          </Form.Group>

          {errors.description?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
            {message}
            </Alert>
          ))}

          <Form.Group controlId="new-user-goal-description" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Description</Form.Label>
            <Form.Control
            type="text"
            placeholder="What do you wish to achieve?"
            name="newDescription"
            onChange={handleChange}
            className={styles.Input}
            />
          </Form.Group>

          {errors.value?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
            {message}
            </Alert>
          ))}
          <Form.Group controlId="new-user-goal-value" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Value:</Form.Label>
            <Form.Control
            type="text"
            placeholder="What will you gain by achievbeing this goal?"
            name="newValue"
            value={newValue}
            onChange={handleChange}
            className={styles.Input}
            />
          </Form.Group>

          {errors.criteria?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="new-user-goal-criteria" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Criteria:</Form.Label>
            <Form.Control
              type="text"
              placeholder="How will you know when this goal is achieved?"
              name="newCriteria"
              value={newCriteria}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.achieve_by?.map((message, idx) => (
            <Alert key={idx}  className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="new-goal-acheive-date">
            <Form.Label>Achieve by:</Form.Label>
            <Form.Control
              type="date"
              name="newAchieve_by"
              value={newAchieve_By}
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
              Cancel
          </Button>
          <Button className={btnStyles.Button} type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
  </div>
  )
};

export default UserGoalEdit