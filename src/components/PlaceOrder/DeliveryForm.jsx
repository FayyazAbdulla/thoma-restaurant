import React, { useState } from 'react';
import swal from 'sweetalert2';
import { useDelivery } from '../../context/DeliveryProvider';
import useAuth from '../../hooks/useFetch';
import TextField from '../Form/TextField';

const DeliveryForm = () => {
    const { user } = useAuth() || {}; // Add a fallback in case useAuth returns undefined
    const [change, setChange] = useState({
        country: '',
        roadNo: '',
        flatno: '',
        name: user?.displayName || '' // Use optional chaining and provide a fallback
    });
    const { setInput, setDisabled } = useDelivery();

    // Handle Change
    const handleChange = (e) => {
        const { value, name } = e.target;
        setChange((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
            country: change.country,
            roadNo: change.roadNo,
            flatno: change.flatno,
            name: change.name
        });
        swal("Information Updated!", "Your shipping details updated successfully!", "success");
        setDisabled(false);
    };

    return (
        <div className="flex flex-col mt-20">
            <h1 className="text-2xl poppins pb-4 border-b border-gray-500 text-gray-700">Enter Your Contact Details</h1>
            <form className="my-4" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3">
                    <TextField
                        type="text"
                        placeholder="Country and District"
                        name="country"
                        value={change.country}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        placeholder="Road Name and Road No"
                        name="roadNo"
                        value={change.roadNo}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        placeholder="Flat, suite or floor"
                        name="flatno"
                        value={change.flatno}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        placeholder="Delivery to"
                        name="name"
                        value={change.name}
                        onChange={handleChange}
                        required
                    />
                    <button className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500">Save & Continue</button>
                </div>
            </form>
        </div>
    );
};

export default DeliveryForm;