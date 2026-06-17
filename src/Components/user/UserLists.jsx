import { useSelector , useDispatch } from "react-redux";
import { getAllUsers , promoteUser } from "../../features/auth/AuthSlice";
import { successToast , errorToast , promoteToast } from "../../toast/Toast";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

const UserLists = () => {
    const dispatch = useDispatch();
    const {users, userLoading} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getAllUsers())
    },[dispatch])

    const handlePromote = () => {
        promoteToast(`Promote ${email} to ADMIN`, async() => {
            const result = await dispatch(promoteUser(id))
            if(promoteUser.fulfilled.match(result)){
                successToast(`${email} Promoted Successfully!`)
            }else{
                errorToast(result.payload || "Failed to promote user!")
            }
        })
    };

    if(userLoading){
        return <div className="text-slate-400 text-sm">Loading users...</div>;
    }

    return(
        <div className="bg-[#1e293b] rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-[#0f172a] text-slate-400">
                    <tr>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-right p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-t border-slate-800">
                            <td className="p-3 text-slate-200">{u.email}</td>
                            <td className="p-3">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                    u.role === "ROLE_ADMIN"
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-blue-500/10 text-blue-400"
                                }`}>
                                    {u.role}
                                </span>
                            </td>
                            <td className="p-3 text-right">
                                {u.role !== "ROLE_ADMIN" && (
                                    <button
                                        onClick={() => handlePromote(u.id, u.email)}
                                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition ml-auto"
                                    >
                                        <ShieldCheck size={14} />
                                        Promote to Admin
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserLists

