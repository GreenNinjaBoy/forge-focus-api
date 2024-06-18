import React from 'react';
import { Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const RefineDelete = (props) => {
  const {
    id,
    name,
    image,
    setRefineState,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const history = useHistory();

  const handleCancel = () => {
    setRefineState('view');
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/refine/${id}`);
      setGlobalSuccessMessage("You have deleted your refinement");
      setShowGlobalSuccess(true);
      history.push('/organise')
    } catch(err){
      //console.log(err)
    }
  };
  return (
    <div>
      <img src={image} alt='Refinement'/>
      <div>
        <p>Are you sure you wish to delete your refinement: {name}?</p>
        <p>Deleting it will also result in all assignments and steps within this refinement being deleted!</p>
        <div>
          <Button onClick={handleCancel}>
            <div>
              Cancel
            </div>
          </Button>
          <Button onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RefineDelete