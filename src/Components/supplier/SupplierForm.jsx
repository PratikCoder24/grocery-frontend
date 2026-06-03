import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../../toast/Toast";
import { addSupplier } from "../../features/supplier/SupplierSlice";

const SupplierForm = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.supplier)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isLoading) return

        if (!name.trim() || !phone.trim() || !email.trim()) {
            errorToast('All Fields are required!')
        }

        try {
            const supplierData = {
                name: name.trim(),
                phone: phone.trim(),
                email: email.trim(),
            }

            const result = await dispatch(addSupplier(supplierData))

            if (addSupplier.fulfilled.match(result)) {
                successToast("Supplier added Successfully!")

                setName('')
                setEmail('')
                setPhone('')
            } else {
                errorToast("Failed to add supplier!")
            }
        } catch (error) {
            errorToast('Something went Wrong!')
        }
    }

    return (
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl p-8">

            <h2 className="text-2xl font-bold text-white mb-6">
                Add Supplier
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">


                 <div>

                    <label className="block mb-2 text-sm text-gray-300">
                        Supplier Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter supplier name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="
                            w-full
                            bg-[#0f172a]
                            border
                            border-slate-600
                            text-white
                            px-4
                            py-4
                            rounded-xl
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            placeholder:text-gray-500
                        "
                    />

                    <label className="block mb-2 text-sm text-gray-300">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        placeholder="Enter phone-number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="
                            w-full
                            bg-[#0f172a]
                            border
                            border-slate-600
                            text-white
                            px-4
                            py-4
                            rounded-xl
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            placeholder:text-gray-500
                        "
                    />

                    <label className="block mb-2 text-sm text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            w-full
                            bg-[#0f172a]
                            border
                            border-slate-600
                            text-white
                            px-4
                            py-4
                            rounded-xl
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            placeholder:text-gray-500
                        "
                    />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 mt-3 rounded-xl font-semibold text-white disabled:opacity-60"
                >
                    {isLoading ? "Adding..." : "Add Supplier"}
                </button>
                </div>





            </form>

        </div>
    )

}

export default SupplierForm