import React, {useRef, useState} from 'react';
import { Alert, Button, Form, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const RefineCreate = () => {


    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    const [refineData, setRefineData] = useState({
        name: '',
        why: '',
        image: '',
    });
    
    const history = useHistory();
    
    const handleBack = () => {
    history.goBack();
    }

    const [errors, setErrors] = useState({});

    const { name, why, image } = refineData;

    const imageInput = useRef(null);

    const handleChange = (event) => {
    setRefineData({
        ...refineData,
        [event.target.name]: event.target.value,
    });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length > 0){
            URL.revokeObjectURL(image);
            setRefineData({
            ...refineData,
            image: URL.createObjectURL(event.target.files[0])
          });
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('why', why)
        if (imageInput.current.files.length > 0) {
          formData.append('image', imageInput.current.files[0]);
        }
        try {
          const {data} = await axiosReq.post('/refine/', formData);
          setGlobalSuccessMessage("You have created a new refinement!");
          setShowGlobalSuccess(true);
          history.push(`/refine/${data.id}`);
        } catch(err){
          if (err.response?.status !== 401){
            setErrors(err.response?.data);
          }
        }
      };

    return (
    <div>
        <div>
        <h1>Create refinement</h1>
      </div>
      <div>
        <button aria-label="Click to return to the organiser" onClick={handleBack}>
          <i className="fa-solid fa-x"></i>
        </button>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Group>
              {errors.image?.map((message, idx) => (
                <Alert key={idx}>
                  {message}
                </Alert>
              ))}
              {image ? (
                <Image src='' alt="Chosen focus image"/>
              ) : (
                <div>
                  <div>
                    <Image src='' alt="Default refine image"/>
                  </div>
                  <p>Click below to add an image</p>
                </div>
              )}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                aria-label='Click to change the refinement image'
              />
            </Form.Group>
            <div>
              {errors.name?.map((message, idx) => (
                <Alert key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId="name">
                <Form.Label>Refine:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Give your refinement area a name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>

              {errors.why?.map((message, idx) => (
                <Alert key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId="why">
                <Form.Label>Why:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Why is this area important to you?"
                  name="why"
                  value={why}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx}>
                  {message}
                </Alert>
              ))}
            </div>
          </div>
          <div>
            <Button>
              <Link to={'/organise'}>
                Cancel
              </Link>
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div> 
  )
}

export default RefineCreate