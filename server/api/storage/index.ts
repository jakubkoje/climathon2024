// server/api/upload-image.post.ts
import { storage, db } from '~/utils/firebaseClient';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export default defineEventHandler(async (event) => {
    const requestData = await readBody(event);
    console.log(requestData)

    if (requestData?.formData?.step3?.map && requestData.formData.step3.map.length) {
        const data = requestData.formData.step3.map

        let helper = { ...data };

        console.log(helper)


        requestData.formData.step3.map = helper
    }


    // const body = await readMultipartFormData(event);

    // Assume the image file is the first item in form data
    // const file = body?.[0];
    // if (!file) {
    //   throw createError({ statusCode: 400, message: 'No file uploaded' });
    // }

    // const fileBuffer = file.data;
    // const fileName = `${crypto.randomUUID()}-${file.filename}`;


    // Create a storage reference
    // const storageRef = ref(storage, `images/${fileName}`);

    // const requestData = {
    //   image: {
    //     imageFileName: fileName,
    //     path: ''
    //   },
    //   administrator: {
    //     name: 'Lukas Nemec',
    //     email: 'nemec@pucwoll.com',
    //     phoneNumber: '+321321321312'
    //   },
    //   flat: {
    //     address: 'Prievozska 11A, 022 32 Bratislava',
    //     noRezidents: 56
    //   },
    //   container: {
    //     type: 'XL',
    //     cords: {
    //       lan: 47.543,
    //       lat: 45.432
    //     }
    //   }
    // }


    try {
        // Upload file to Firebase Storage
        // const snapshot = await uploadBytes(storageRef, fileBuffer);
        // const downloadURL = await getDownloadURL(snapshot.ref);

        // add download path to db item data
        // requestData.image.path = downloadURL

        // Add new document to the 'requests' collection
        const docRef = await addDoc(collection(db, 'requests'), requestData);

        return { success: true, entryId: docRef.id };
        // return { success: true, downloadURL, entryId: docRef.id };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw createError({ statusCode: 500, message: 'Image upload failed or failed to save request' });
    }
});
