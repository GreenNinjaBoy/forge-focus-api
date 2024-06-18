import React from 'react';
import {axiosReq} from '../../api/axiosDefaults';
import {link} from 'react-router-dom/cjs/react-router-dom';
import {useSetGlobalSuccessMessage, useSetGlobalSuccessMessage, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';

const StepsTask = (props) => {
  const {
    id,
    name,
    image,
    context,
    today,
    achieved,
    refine,
    achieve_by_info,
    usergoal_achieve_by_info,
    type,
    activeTasks,
    setActiveTasks,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
  return (
    <div>StepsTask</div>
  )
}

export default StepsTask