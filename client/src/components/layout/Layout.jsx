import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black dark-bg-pattern font-jetbrains text-white flex flex-col">
            {/* Universal Scanline */}
            <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-10"></div>

            <Header />

            <div className="flex flex-1 mt-[76px]">
                {/* Sidebar takes up 64 units (256px) on md+ screens */}
                <Sidebar />

                {/* Main content area */}
                <main className="flex-1 md:ml-64 p-6 lg:p-10 z-10 relative">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
