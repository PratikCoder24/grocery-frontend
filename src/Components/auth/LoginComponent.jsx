import {useSelector , useDispatch} from 'react-redux'
import {useState , useEffect} from 'react'
import {loginUser , clearAuthError} from '../../features/auth/AuthSlice'
import {errorToast , successToast} from '../../toast/Toast.jsx'
import {useNavigate , Link} from 'react-router-dom'


const LoginComponent = () => {
    const dispatch = useDispatch();
    const {error , isLoading , user } = useSelector((state) => state.auth);

    const [credentials , setCredentials] = useState({email : "", password  : ""})
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearAuthError());
    },[dispatch])

    useEffect(() => {
        if(user){
            successToast("Logged in successfully");
            navigate("/");
        }
    },[user,navigate])

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(credentials))
    }

    return(
        <div className="w-full max-w-md p-8 bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-white mb-2">Login</h2>
            
            {error && (
                <div className="mb-4 p-3 text-sm text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Registered Email
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        value={credentials.email} 
                        onChange={handleChange} 
                        className="w-full p-3 text-sm text-white bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition" 
                        placeholder="manager@grocery.com" 
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
                        value={credentials.password} 
                        onChange={handleChange} 
                        className="w-full p-3 text-sm text-white bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition" 
                        placeholder="••••••••" 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full py-3 mt-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-800 transition"
                >
                    {isLoading ? "Authenticating..." : "Sign In"}
                </button>
            </form>

            <p className="mt-6 text-xs text-center text-slate-400">
                First time accessing the system?{" "}
                <Link to="/register" className="text-blue-400 hover:underline">Register your account</Link>
            </p>
        </div>
    )
}

export default LoginComponent