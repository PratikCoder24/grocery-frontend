import React from 'react';
import { UserLists } from '../Components/index.js';

const UserPage = () => {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">User Management</h1>
                <p className="text-slate-400 mt-2">View users and promote them to admin</p>
            </div>
            <UserLists />
        </div>
    );
};

export default UserPage;