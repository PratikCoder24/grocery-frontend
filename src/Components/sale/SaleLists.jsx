import { useEffect , useState } from "react";
import { fetchAllSale } from "../../features/sale/SaleSlice";
import { errorToast, successToast } from "../../toast/Toast";
import { useSelector, useDispatch } from "react-redux";
import Receipt from "./SaleReceipt";

const SaleLists = () => {
    const { sale, isLoading, error } = useSelector((state) => state.sale)
    const [selectedSale, setSelectedSale] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllSale())
    }, [])

    return (

        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Sales History
            </h2>


            {isLoading ? (

                <p className="text-gray-400">
                    Loading sales...
                </p>

            ) : error ? (

                <p className="text-red-400">
                    {error}
                </p>

            ) : sale.length === 0 ? (

                <p className="text-gray-400">
                    No sales found
                </p>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-700">

                                <th className="py-3 px-4 text-gray-300">
                                    Invoice
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Date
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Items
                                </th>

                                <th className="py-3 px-4 text-gray-300">
                                    Total Amount
                                </th>
                                <th className="py-3 px-4 text-gray-300">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {sale?.map((s) => (

                                <tr
                                    key={s.id}
                                    className="border-b border-slate-800 hover:bg-[#273449]"
                                >

                                    <td className="py-3 px-4 text-white">
                                        INV-{s.id}
                                    </td>

                                    <td className="py-3 px-4 text-gray-300">
                                        {new Date(s.saleDate).toLocaleString()}
                                    </td>

                                    <td className="py-3 px-4 text-gray-300">
                                        {s.items?.length || 0}
                                    </td>

                                    <td className="py-3 px-4 text-green-400 font-semibold">
                                        ₹{s.totalAmount}
                                    </td>

                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => setSelectedSale(s)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                                        >
                                            View Receipt
                                        </button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>



                    {selectedSale && (
                        <Receipt
                            sale={selectedSale}
                            onClose={() => setSelectedSale(null)}
                        />
                    )}

                </div>



            )}

        </div >
    );
}

export default SaleLists