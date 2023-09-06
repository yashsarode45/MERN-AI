import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import  FormField from '../components/FormField';
import Loader from '../components/Loader'
import { BiSolidError } from 'react-icons/bi'
import CreatePageDropDown from '../components/CreatePageDropDown';

const CreatePost = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const POST_DATA_API = BASE_URL + "/post"
  console.log("POST_DATA_API IS", POST_DATA_API)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
    model: 'stable-diffusion-2-1',
    blobObj: ''
  })
  console.log("Form at start is", form)
  const [loading, setLoading] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false)
  const [errorHandler, setErrorHandler] = useState({
    isError: false,
    status: ''
  })
 
  const [models, setModels] = useState(['stable-diffusion-2-1', 'sdxl-wrong-lora'])

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})
  
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt:randomPrompt});
  }

  const generateImage = async () => {
    console.log("In generate image", form)
    
    if (form.prompt && form.model) {
      setGeneratingImg(true)
      try {
        
        if (form.model == "stable-diffusion-2-1") {

          async function query(data) {
            const response = await fetch(
              "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
              {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
              }
            );
            if (!response.ok) {
              setErrorHandler({
                isError:true,
                status:response.status
              })
            } else {
              setErrorHandler({
                isError:false,
                status:""
              })
            }
            console.log("Response is", response)
            const result = await response.blob();
            return result;
          }

          query({"inputs": `${form.prompt}`}).then((response) => {
            // Use image
            console.log("response is", response)
            const imageUrl = URL.createObjectURL(response);
            setForm({...form, photo: imageUrl})
            setGeneratingImg(false)
          });

        }
        else if(form.model == "sdxl-wrong-lora"){

          async function query(data) {
            const response = await fetch(
              "https://api-inference.huggingface.co/models/minimaxir/sdxl-wrong-lora",
              {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
              }
            );
            console.log("Response in query is", response)
            if (!response.ok) {
              setErrorHandler({
                isError:true,
                status:response.status
              })
            } else {
              setErrorHandler({
                isError:false,
                status:""
              })
            }
            
            
            return response;
          }

          query({"inputs": `${form.prompt}`}).then(async (response) => {
            const result = await response.blob();
            // Use image
            console.log("Result after converting to blob is", result)
            const imageUrl = URL.createObjectURL(result);
            // const reader = new FileReader();
            // reader.onload = function(event) {
            //   const dataURL = event.target.result;
            //   console.log(dataURL);
            // };
            // reader.readAsDataURL(response);
            console.log("imageUrl", imageUrl)
            if (response.ok) {
              setForm({...form, photo: imageUrl})
            }
            setGeneratingImg(false)
          });
        }
        else{
          toast.error("Give prompt and select model")
        }
      } 
      catch (error) {
        toast.error(error)
      } 
    } 
    else {
      toast.error('Please provide proper prompt');
    }
    
  }

  const handleSubmit = async (e)=> {
    e.preventDefault()
    
    if (form.prompt && form.photo && form.name) {
      setLoading(true)

      try {
        fetch(form.photo)
        .then(response => response.blob())
        .then(blob => {
          // Create a File from the Blob
          const convertedFile = new File([blob], `${form.name}.jpg`, { type: 'image/*' });

          // Create a FormData object and append the file
          const formData = new FormData();
          formData.append('photoFile', convertedFile);
          formData.append('name', form.name);
          formData.append('prompt', form.prompt);
          formData.append('model', form.model);
          console.log('formData', formData)
          // Send the FormData to the backend via a POST request
          fetch(POST_DATA_API, { 
            method: 'POST',
            body: formData
          })
          .then(response => {
            // Handle the backend response here
             toast.success("Shared Successfully!")
            setLoading(false);
            navigate('/');
            console.log('Backend Response:', response);
          })
          .catch(error => {
            toast.error(error)
            setLoading(false);
            console.error('Error:', error);
          });
        });
      } catch (error) {
        console.log("Error while sharing", error)
        toast.error(error)
      }
      
    }else {
      alert('Please generate an image with proper details');
    }
  }

  return (
    <>
         
     <section className="max-w-7xl mx-auto ">
        
        
        <div className=' mb-3'>
          <h1 className="font-extrabold text-[#222328] text-4xl">Create</h1>
          <p className="mt-2 text-[#666e75] text-lg max-w-[500px]">Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
        </div>

        <form className='mt-10 max-w-3xl' onSubmit={handleSubmit}>

          {/* Name, prompt, model, image display */}
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
              
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className='flex items-center gap-2 mb-2'>
                <p className="block text-lg font-medium text-gray-900">Choose Model:</p>
                <CreatePageDropDown data={models} handleChange={handleChange} form={form} setForm={setForm} />
            </div>
            {/* Info About Models */}
            <div className='flex flex-col bg-lime-300 p-6 gap-2  text-black rounded-md'>
              <h1 className=' font-bold text-lg'>Note:</h1>
              <div className='flex flex-col lg:flex-row gap-4'>
                <div className='  mt-1 border border-black p-2'>
                  <h2 className=' font-medium'>stable-diffusion-2-1</h2>
                  <p>
                    This is a lighter model, hence generates output comparitively faster but compromises on quality of the image.
                  </p>
                </div>
                <div className=' mt-1 border border-black p-2'>
                  <h2 className=' font-medium'>sdxl-wrong-lora</h2>
                  <p>
                    This is a heavier model, which improves output image quality but takes bit more time.
                    High demand may result in error or higher delay.
                  </p>
                </div>
              </div>
              
            </div>

            {/* {console.log("Error handler is", errorHandler)} */}
            {/* Generated Image Display */}
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[30rem] p-3 h-[30rem] flex justify-center items-center">
              {
                errorHandler.isError ? (
                  <div className='flex flex-col gap-4 justify-center items-center'>
                    <i className=' text-red-500  object-contain'><BiSolidError className='w-24 h-24'/></i>
                    <p className=' text-lg text-gray-900 text-center'>
                      Error occured while generating the image, please try again or change the model.
                    </p>
                    <p className=' text-lg text-red-500'>
                      Error code: {errorHandler.status}
                    </p>
                  </div>
                ) : (<div></div>)
              }
              
              
              { (form.photo) ? (
                <img
                  src={form.photo}
                  alt={form.photo}
                  className="w-full h-full object-contain"
                />
              ) : !errorHandler.isError && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          
                <button
                type='submit'
                onClick={generateImage}
                className=" mt-3 text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                disabled= {generatingImg}
                >
                  {generatingImg ? 'Generating' : 'Generate'}
                </button>
          

          {/* Footer */}
          <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community</p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? 'Sharing...' : 'Share with the Community'}
            </button>
          </div>
        </form>
        </section>
    </>
    
  )
}

export default CreatePost