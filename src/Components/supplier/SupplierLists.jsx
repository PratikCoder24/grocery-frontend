import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { errorToast, successToast, deleteToast } from "../../toast/Toast";
import { updateSupplier, fetchAllSuppliers, fetchSupplierByName, deleteSupplier } from "../../features/supplier/SupplierSlice";


const SupplierList = () => {
    const dispatch = useDispatch()
    const { supplier, isLoading, error } = useSelector((state) => state.supplier)
    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState({
        name: '',
        phone: '',
        email: '',
    })

    useEffect(() => {
        dispatch(fetchAllSuppliers())
    }, [dispatch])

    const handleDelete = (id) => {
        deleteToast("Delete this supplier?", () => {
            dispatch(deleteSupplier(id));
            successToast("Supplier Deleted")
        })
    }

    const handleEdit = (supplier) => {
        setEditId(supplier.id)

        setEditData({
            name: supplier.name || '',
            phone: supplier.phone ||  '',
            email: supplier.email || ''
        })
    }

    const handleCancel = (supplier) => {
        setEditId(null)

        setEditData({
            name: '',
            phone: '',
            email: ''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setEditData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = async (id) => {
        try {
            const response = await dispatch(
                updateSupplier({
                    id,
                    supplierData: {
                        name: editData.name,
                        phone: editData.phone,
                        email: editData.email
                    }
                })
            )

            if (response.meta.requestStatus === 'fulfilled') {
                successToast("Supplier Updated Successfully!")
                setEditId(null)
                setEditData({
                    name: '',
                    phone: '',
                    email: ''
                })
            } else {
                errorToast("Failed to update supplier!")
            }
        } catch (error) {
            errorToast("Something Went Wrong!!")
        }
    }

    return (
        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Suppliers
            </h2>

            {isLoading ? (

                <p className="text-gray-400">Loading...</p>

            ) : error ? (

                <p className="text-red-400">{error}</p>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-700">

                                <th className="py-3 px-4 text-gray-300">
                                    supplier
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    phone-number
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Email
                                </th>
                                <th className="py-3 px-4 text-center text-gray-300">
                                    Actions
                                </th>
                            </tr>




                        </thead>

                        <tbody>

                            {supplier?.map((s) => (

                                <tr
                                    key={s.id}
                                    className="border-b border-slate-800 hover:bg-[#273449]"
                                >

                                    {/* NAME */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === s.id ? (

                                            <input
                                                type="text"
                                                name="name"
                                                value={editData.name}
                                                onChange={handleChange}
                                                className="bg-[#0f172a] border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
                                            />

                                        ) : (
                                            s.name
                                        )}

                                    </td>

                                    {/* SKU */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === s.id ? (

                                            <input
                                                type="text"
                                                name="phone"
                                                value={editData.phone}
                                                onChange={handleChange}
                                                className="bg-[#0f172a] border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
                                            />

                                        ) : (   
                                            s.phone
                                        )}

                                    </td>

                                    {/* COST PRICE */}
                                    <td className="py-3 px-4 text-gray-200">

                                        {editId === s.id ? (

                                            <input
                                                type="email"
                                                name="email"
                                                value={editData.email}
                                                onChange={handleChange}
                                                className="bg-[#0f172a] border border-slate-600 text-white px-3 py-2 rounded-lg w-full"
                                            />

                                        ) : (
                                            s.email
                                        )}

                                    </td>







                                    {/* ACTIONS */}
                                    <td className="py-3 px-4">

                                        <div className="flex justify-center gap-2">

                                            {editId === s.id ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleSave(s.id)
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        onClick={handleCancel}
                                                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(s)
                                                        }
                                                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(s.id)
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-white text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    )

}

export default SupplierList