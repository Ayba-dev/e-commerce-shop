import React from 'react'
import { INewProduct } from '../components/createProductForm/CreateProductForm'

export const handleImageChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<INewProduct>>
) => {
  const imageFile = event.target.files![0]

  if (imageFile) {
    const reader = new FileReader()

    reader.onload = () => {
      setState((prevState) => ({
        ...prevState,
        image: reader.result,
      }))
    }

    reader.readAsDataURL(imageFile)
  }
}
