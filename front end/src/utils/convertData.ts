import { FormDataProps } from "../pages/Auth/Register";

export default function convertFormDataToFormDataProps(formData: FormData): FormDataProps {
    const imageFile = formData.get('image') as File;

    const imageBlob = new Blob([imageFile], { type: imageFile.type });

    const convertedImage = new File([imageBlob], imageFile.name, { type: imageFile.type });

    const convertedData: FormDataProps = {
        image: convertedImage,
        name: String(formData.get('name')),
        email: String(formData.get('email')),
        password: String(formData.get('password')),
        confirmpassword: String(formData.get('confirmpassword')),
        phone: String(formData.get('phone')),
    };

    return convertedData;
}
