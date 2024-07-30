// pages/download/index.tsx
'use client'

import { useState } from 'react';

const data = [
    {
        id: 776,
        name: 'mohist-1.20.1-776-server.jar',
        hash: '4084442da981edb5cf18a42b2caf1780',
        date: '29/07/2024 08:55:35',
        forgeVersion: 'Forge: 47.3.5 NeoForge: 47.1.105',
    },
    {
        id: 775,
        name: 'mohist-1.20.1-775-server.jar',
        hash: 'ddb45090a026ce7b04a9c7ab4d1e5a59',
        date: '28/07/2024 18:34:21',
        forgeVersion: 'Forge: 47.3.5 NeoForge: 47.1.105',
    },
    {
        id: 774,
        name: 'mohist-1.20.1-774-server.jar',
        hash: '83ad34b7b018d35a161bec23664fbdbb',
        date: '28/07/2024 06:26:48',
        forgeVersion: 'Forge: 47.3.5 NeoForge: 47.1.105',
    },
    {
        id: 773,
        name: 'mohist-1.20.1-773-server.jar',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '26/07/2024 06:00:44',
        forgeVersion: 'Forge: 47.3.5 NeoForge: 47.1.105',
    },
    // Add more data as needed
];

export default function DownloadPage() {
    const [builds, setBuilds] = useState(data);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Downloads</h1>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">Nom du Build</th>
                        <th scope="col" className="py-3 px-6">Hash MD5</th>
                        <th scope="col" className="py-3 px-6">Date du Build</th>
                        <th scope="col" className="py-3 px-6">Version de Forge / NeoForge</th>
                        <th scope="col" className="py-3 px-6">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {builds.map((build) => (
                        <tr key={build.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="py-4 px-6">{build.name}</td>
                            <td className="py-4 px-6">{build.hash}</td>
                            <td className="py-4 px-6">{build.date}</td>
                            <td className="py-4 px-6">{build.forgeVersion}</td>
                            <td className="py-4 px-6">
                                <button className="text-blue-600 hover:text-blue-900">Téléchargements</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
