import React, { useRef, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Button, Form, Image } from 'react-bootstrap';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const RefineEdit = (props) => {
  const {
    id,
    name,
    why,
    image,
    setRefineState,
    setRefineData
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  


  const [newData, setNewData] = useState({
    newName: name,
    newWhy: why,
    newImage: image,
  });

  const { newName, newWhy, newImage } = newData;

  const [errors, setErrors] = useState({});

  const imageInput = useRef(null);

  const handleChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length > 0){
      URL.revokeObjectURL(image);
      setNewData({
        ...newData,
        newImage: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', newName)
    formData.append('why', newWhy)
    if (imageInput.current.files.length > 0) {
      formData.append('image', imageInput.current.files[0]);
    }
    try {
      const {data} = await axiosReq.put(`/refine/${id}`, formData);
      setGlobalSuccessMessage("You have edited your refinement");
      setShowGlobalSuccess(true);
      setRefineData(data);
      setRefineState('view');
    } catch(err){
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  const handleCancel = () => {
    setRefineState('view');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>

        <Form.Group controlId="refine-new-image">
          {errors.image?.map((message, idx) => (
            <Alert key={idx}>
              {message}
            </Alert>
          ))}
          <Image src={newImage} alt='refinement'/>
          <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleChangeImage}
            ref={imageInput}
            aria-label='Click to change the refinement image'
          />
        </Form.Group>
        <div>
          <div>

            <div>
              <div>
                {errors.name?.map((message, idx) => (
                  <Alert key={idx}>
                    {message}
                  </Alert>
                ))}
              </div>
              <Form.Group controlId="refinement-new-name">
                <Form.Label>Refinement:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name your Refinement"
                  name="newName"
                  value={newName}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div>
              <div>
                {errors.why?.map((message, idx) => (
                  <Alert key={idx}>
                    {message}
                  </Alert>
                ))}
              </div>
              <Form.Group controlId="refinement-new-why">
                <Form.Label> Why:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Why is this area important to you? Why do you want to refine it?"
                  name="newWhy"
                  value={newWhy}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
      
          <div>
            <div>
              {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx}>
                    {message}
                  </Alert>
                ))}
            </div>
            <div>
              <Button onClick={handleCancel}>
                <div>
                  Cancel
                </div>
              </Button>
              <Button type="submit">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}


export default RefineEdit