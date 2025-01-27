import React from 'react'

export const handleImageChange = (
  event: React.ChangeEvent<HTMLInputElement>
  setState: React.Dispatch<React.SetStateAction<any>>
) => {
  const imageFile = event.target.files![0]

  if (imageFile) {
    const reader = new FileReader()

    reader.onload = () => {
      setNewProduct((prevState) => ({
        ...prevState,
        image: reader.result,
      }))
    }

    reader.readAsDataURL(imageFile)
  }
}
