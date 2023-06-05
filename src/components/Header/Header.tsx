import React from 'react';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Header: React.FC<Props> = (props) => {
    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'Trainings', path: '/trainings' },
        { title: 'Training Events', path: '/training-events' },
        { title: 'Employees', path: '/employees' },
        { title: 'Facilitators', path: '/facilitators' },
        { title: 'Reports', path: '/reports' },
    ];

    const linkClass = 'text-white hover:bg-teal-600 px-4 py-2 rounded-lg transition duration-200 ease-in-out';

    return (
        <header className="flex flex-wrap justify-around items-center py-2 px-8 bg-teal-700 rounded-xl shadow-lg mb-6" {...props}>
            {navLinks.map((link) => (
                <Link key={link.path} href={link.path} className={linkClass}>
                    {link.title}
                </Link>
            ))}
        </header>
    );
};

export default Header;