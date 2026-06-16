import {useSelector , useDispatch} from 'react-redux'
import {useState , useEffect} from 'react'
import {registerUser , clearAuthError} from '../../features/auth/AuthSlice'
import {errorToast , successToast} from '../../toast/Toast.jsx'
import {useNavigate , Link} from 'react-router-dom'


const RegisterComponent = () => {
    const dispatch = useDispatch()
    const {error , isLoading , registrationSuccess} = useSelector((state) => state.auth)
    const [formData , setFormData] = useState({username : "", email : "", password : ""})
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearAuthError());
    },[dispatch])

    useEffect(() => {
        if(registrationSuccess){
            successToast("Registration complete! you can log in now")
            navigate("/login")
        }
    },[registrationSuccess,navigate])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(formData))
    }

    return (

        <div className="w-full max-w-md p-8 bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-white mb-2">Staff Registration</h2>
            <p className="text-xs text-center text-slate-400 mb-6">Create a profile to start tracking sales & inventory</p>

            {error && (
                <div className="mb-4 p-3 text-sm text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Display Name
                    </label>
                    <input 
                        type="text" 
                        name="username" 
                        required 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="w-full p-3 text-sm text-white bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition" 
                        placeholder="Pratik Shenoy" 
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Email Address
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full p-3 text-sm text-white bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition" 
                        placeholder="staff@grocery.com" 
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Password
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="w-full p-3 text-sm text-white bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition" 
                        placeholder="••••••••" 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full py-3 mt-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:bg-emerald-800 transition"
                >
                    {isLoading ? "Saving Profile..." : "Register Profile"}
                </button>
            </form>

            <p className="mt-6 text-xs text-center text-slate-400">
                Already registered?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">Go to Login</Link>
            </p>
        </div>
    )
}

export default RegisterComponent