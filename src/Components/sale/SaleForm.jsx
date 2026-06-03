import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSale } from "../../features/sale/SaleSlice";
import { fetchProducts } from "../../features/product/ProductSlice";
import { errorToast, successToast } from "../../toast/Toast";


const SaleForm = () => {

    const dispatch = useDispatch()
    const { isLoading, error } = useSelector((state) => state.sale)
    const { products } = useSelector((state) => state.products)
    const [customer, setCustomer] = useState('')
    const [items, setItems] = useState([{
        productId: '',
        quantity: 1
    }])
    const [search, setSearch] = useState('')
    const [showDropdown, setShowDropdown] = useState('')
    const [searchMap, setSearchMap] = useState({})
    const [activeIndex, setActiveIndex] = useState(null)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                productId: '',
                quantity: 1
            }])
    }

    const handleRemoveItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index)
        setItems(updatedItems)
    }

    const handleChange = (
        index,
        field,
        value
    ) => {
        const updatedItems = [...items]
        updatedItems[index][field] = value
        setItems(updatedItems)
    }
    
    const totalAmount = items.reduce((acc, item) => {

        const product = products.find(
            (p) => p.id === Number(item.productId)
        );

        if (!product) return acc;

        return acc + product.sellingPrice * Number(item.quantity);

    }, 0);

    const handleSearchChange = (index, value) => {
        setSearchMap({
            ...searchMap,
            [index]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isLoading) return

        try {

            if (items.length === 0) {
                errorToast("Add atleast 1 product!")
                return;
            }
            const saleData = {


                items: items.map((item) => ({
                    productId: Number(item.productId),
                    quantity: Number(item.quantity)
                }))
            }

            const response = await dispatch(createSale(saleData));

            if (response.meta.requestStatus === 'fulfilled') {
                successToast("Sale created Successfully!")
                setCustomer('')
                setItems([{
                    productId: '',
                    quantity: 1
                }])
            } else {
                errorToast("Failed to create sale!!")
            }

        } catch (error) {
            errorToast("Something went Wrong!!")
        }
    }

    return (

        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Create Sale
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* CUSTOMER */}
                <input
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Customer Name"
                    className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-lg"
                />

                {/* ITEMS */}
                <div className="space-y-4">

                    {items.map((item, index) => {

                        const selectedProduct = products.find(
                            (p) => p.id === Number(item.productId)
                        );

                        return (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-4 gap-4 relative"
                            >

                                {/* PRODUCT SEARCH */}
                                <div className="relative">

                                    <input
                                        type="text"
                                        value={searchMap[index] || ""}
                                        onChange={(e) => {
                                            setActiveIndex(index);
                                            handleSearchChange(index, e.target.value);
                                        }}
                                        onFocus={() => setActiveIndex(index)}
                                        placeholder="Search product..."
                                        className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-lg"
                                    />

                                    {/* DROPDOWN */}
                                    {activeIndex === index && searchMap[index] && (
                                        <div className="absolute z-20 w-full bg-[#0f172a] border border-slate-600 mt-1 rounded-lg max-h-40 overflow-y-auto">

                                            {products
                                                .filter((p) =>
                                                    p.name.toLowerCase().includes(
                                                        searchMap[index].toLowerCase()
                                                    )
                                                )
                                                .map((p) => (
                                                    <div
                                                        key={p.id}
                                                        onClick={() => {
                                                            handleChange(index, "productId", p.id);

                                                            setSearchMap({
                                                                ...searchMap,
                                                                [index]: p.name
                                                            });

                                                            setActiveIndex(null);
                                                        }}
                                                        className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-white"
                                                    >
                                                        {p.name}
                                                    </div>
                                                ))}
                                        </div>
                                    )}

                                </div>

                                {/* QUANTITY */}
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleChange(index, "quantity", e.target.value)
                                    }
                                    className="bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-lg"
                                />

                                {/* PRICE */}
                                <div className="flex items-center text-white font-semibold">
                                    ₹{Number(selectedProduct?.sellPrice || 0) * Number(item.quantity || 0)}
                                </div>

                                {/* REMOVE */}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(index)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Remove
                                </button>

                            </div>
                        );
                    })}
                </div>

                {/* ADD ITEM */}
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    + Add Product
                </button>

                {/* TOTAL */}
                <div className="text-right text-2xl font-bold text-green-400">
                    Total: ₹{totalAmount}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                    {isLoading ? "Creating Sale..." : "Create Sale"}
                </button>

            </form>

        </div>
    );
};


export default SaleForm