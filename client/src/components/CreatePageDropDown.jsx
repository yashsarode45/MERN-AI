import React, { useState } from 'react';
import { BiSolidUpArrow } from 'react-icons/bi';
import { AiFillCaretDown } from 'react-icons/ai';
const CreatePageDropDown = ({data, handleChange, form, setForm}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className={`relative flex flex-col gap-5 items-center max-w-xs w-[45%] rounded-lg cursor-pointer`}>
          <div 
          onClick={()=> {
            setIsOpen((prev)=> !prev)
          }}
           className= {`bg-[#EcECF1] p-2 w-full flex items-center justify-between font-bold text-base rounded-lg tracking-normal border-4
            text-gray-800  border-transparent active:border-black duration-300 text-left`}>
            { 
              form.model
            }
            {
              isOpen ? (
                <BiSolidUpArrow/>
              ) : (
                <AiFillCaretDown/>
              )
            }
          </div>
  
          {isOpen && (
            <div className={` bg-slate-50 border  border-black absolute top-16 ${isOpen ? "flex" : "hidden"} flex-col items-start rounded-lg p-2 w-full mb-5 z-20 
            duration-500 ease-in-out`}>
            { 
              data.map((opt, index)=> (
                  <div key={index} onClick={()=> {
                    setForm({...form, model:opt });
                    setIsOpen((prev) => !prev )
                  }}
                  className='flex w-full justify-between hover:bg-gray-200 cursor-pointer rounded-r-lg border-l-transparent duration-150 ease-in-out
                  hover:border-l-black border-l-4 p-4
                  '>{opt}</div>
              ))
            
            }

            </div>
          )}
      </div>
    );
}

export default CreatePageDropDown