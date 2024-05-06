import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');

    useEffect(() => {
        setName(user?.name || 'Ailton Aires');
    }, [user]);

    const handleEditProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Edit Profile');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center text-secondary mt-10">Edit Profile</h1>
            <div className="flex flex-col md:flex-row mt-10 md:mt-20">
                <div className="flex flex-col items-center md:w-1/2 w-full">
                    <img
                        src="https://avatars.githubusercontent.com/u/31558600?v=4"
                        alt="Profile"
                        className="rounded-full w-32 h-32 md:w-80 md:h-80"
                    />
                    <div className="mt-4">
                        <span className="text-2xl md:text-4xl">{name}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center md:w-1/2 w-full mt-8 md:mt-0">
                    <form
                        onSubmit={handleEditProfile}
                        className="flex flex-col max-md:w-full"
                    >
                       
                        <label htmlFor="name" className="text-lg">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full md:w-80"
                        />
                        <label htmlFor="email" className="text-lg mt-4">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            className="border border-gray-300 rounded p-2 w-full md:w-80 mt-2"
                            placeholder="Email"
                            readOnly
                        />
                        <label htmlFor="password" className="text-lg mt-4">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 rounded p-2 w-full md:w-80 mt-2"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white rounded p-2 mt-4 w-full md:w-80 hover:bg-secondary transition-all duration-300"
                        >
                            Edit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile