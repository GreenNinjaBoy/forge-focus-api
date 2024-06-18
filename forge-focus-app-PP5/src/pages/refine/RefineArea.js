import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import RefineView from './RefineView';
import { Spinner } from 'react-bootstrap';
import RefineEdit from './RefineEdit';
import RefineDelete from './RefineDelete';




const RefineArea = ( {id} ) => {

  const [refineData, setRefineData] = useState({
    name: "",
    why: "",
    image: "",

  });

  const [refineState, setRefineState] = useState("view");

  const [hasLoaded, setHasLoaded] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchRefine = async () => {
      try {
        const { data } = await axiosReq.get(`/Refine/${id}`)
        const {name, why, image} = data;
        setRefineData({name, why, image});
        setHasLoaded(true);
      } catch(err){
        if (err.response?.status === 401) {
          history.push(`/signin`);
        } else if (err.response?.status === 403) {
          history.push(`/organise`);
        } else if (err.response?.status === 404) {
          history.push('/organise');
        }
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchRefine();
  }, [history, id])

  function RefineContext() {
    if (RefineState==='view') {
      return <RefineView {...refineData} setRefineData={setRefineData} setRefineState={setRefineState}/>
    } else if (refineState==='edit') {
      return <RefineEdit {...refineData} id={id} setRefineData={setRefineData} setRefineState={setRefineState}/>
    } else if (RefineState==='delete') {
      return <RefineDelete {...refineData} id={id} setRefineState={setRefineState}/>
    }
  };

  
  return (
    <div>
      {hasLoaded ? (
        <FocusContext />
      ) : (
        <div>
          <Spinner animation="border" />
          <p>Loading Refinement details ...</p>
        </div>
      )}
    </div>
  )
}

export default RefineArea