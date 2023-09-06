import React from 'react'

const FormField = ({
  labelName, 
  type, 
  name, 
  placeholder,
  value,
  handleChange,
  isSurpriseMe, 
  handleSurpriseMe
}) => (
  <div className=' mb-3'>
    <div className="flex items-center gap-2 mb-2">
      <label 
      htmlFor={name}
      className="block text-lg font-medium text-gray-900">{labelName}</label>

      {isSurpriseMe && (
        <button type='button' onClick={handleSurpriseMe}
        className="font-semibold text-sm bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black">
          Surprise Me
        </button>
      )}
    </div>

    <input
      type={type}
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
      required
    />
  </div>
)

export default FormField