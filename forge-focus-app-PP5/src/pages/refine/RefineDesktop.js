import React, {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UserGoalSection from '../usergoals/UserGoalSection';
import RefineArea from './RefineArea';
import AssignmentList from '../assignments/AssignmentList';

const RefineDesktop = ({ id }) => {
  const [keyParameters, setKeyParameters] = useState({
    refine_id: id,
    userGoal_id: '',
  })

  const { refine_id } = keyParameters;

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }

  return (
    <div>
      <button aria-label="Click to return to the plan" onClick={handleBack}>
        <i className="fa-solid fa-x"></i>
      </button>

      <RefineArea id={refine_id} />

      <div>
        <UserGoalSection keyParameters={keyParameters} setKeyParameters={setKeyParameters}/>
        <div>
          <div>
            <h3>Day to day steps</h3>
            <p>(Those jobs that just need doing)</p>
          </div>
          <AssignmentList refine_id={refine_id} type="daytoday"/>
        </div>
      </div>
    </div>
  )
}

export default RefineDesktop