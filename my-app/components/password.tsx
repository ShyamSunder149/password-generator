"use-client";

import { useState } from 'react';
import axios from 'axios';

export default function PasswordGenerator() {

    const [formData, setFormData] = useState({
        length: 8,
        includeUppercase: false,
        includeLowercase: false,
        includeSymbols: false,
        includeNumbers: false,
    });

    const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        console.log("value : " + name)
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleGenerate = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/generatepassword', formData);
            setGeneratedPassword(response.data.password);
        } catch (error) {
            console.error('Error generating password:', error);
            setGeneratedPassword(null);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-5">
            <h1 className="font-bold text-3xl">Password Generator</h1>
            <div className="flex flex-row justify-center items-center gap-5 p-5">
                {inputNumber("Length", formData.length, handleChange, "length")}
                {inputCheckbox("Add Uppercase", formData.includeUppercase, handleChange, "includeUppercase")}
                {inputCheckbox("Add Lowercase", formData.includeLowercase, handleChange, "includeLowercase")}
                {inputCheckbox("Add Symbols", formData.includeSymbols, handleChange, "includeSymbols")}
                {inputCheckbox("Add Numbers", formData.includeNumbers, handleChange, "includeNumbers")}
                <button className="border border-black px-2 py-1 rounded-lg bg-blue-200" onClick={handleGenerate}>Generate</button>
            </div>
            {showGeneratedPassword(generatedPassword)}

        </div >
    )
}

function showGeneratedPassword(generatedPassword: string | null) {
    if (generatedPassword && generatedPassword !== "Password Length exceeded") {
        return (
            <div className="mt-4 text-xl font-bold text-green-600 block">
                Generated Password: <div className="whitespace-pre-line break-words">{generatedPassword}</div>
            </div>
        )
    } else {
        return (
            <div className='text-center'>
                <div className="mt-4 text-xl font-bold text-red-600 block">
                    {generatedPassword} <br />
                </div>
                Max Character Limit : 56
            </div>
        )
    }
}

function inputCheckbox(text: string, checked: boolean, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string) {
    return (
        <div className="flex gap-4">
            {text}
            <input type="checkbox" className="rounded text-blue-500 mt-1.5" checked={checked} onChange={handleChange} name={name} />
        </div>
    )
}

function inputNumber(text: string, value: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string) {
    return (
        <div className="flex gap-4">
            <div className="mt-2"> {text} </div>
            <input type="number" className="rounded text-black-500" min="1" value={value} onChange={handleChange} name={name} />
        </div>
    )
} 