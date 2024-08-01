// pages/download/index.tsx
'use client'

import { useState } from 'react';

const data = [
    {
        id: 773,
        name: 'secureeducrypt-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26T06:00:44Z',
        version: 'v1.20.1',
        tag: 'Alpha',
        type: 'SecureEduCrypt',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26T06:00:44Z',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 775,
        name: 'secureedumail-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26T06:00:44Z',
        version: 'v1.20.2',
        tag: 'Patch',
        type: 'SecureEduMail',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    // Ajoutez d'autres données ici pour le test
    // Ajoutez d'autres éléments pour tester la pagination
];

const DownloadPage = () => {
    const [builds, setBuilds] = useState(data);
    const [filteredBuilds, setFilteredBuilds] = useState(data);
    const [selectedRepoType, setSelectedRepoType] = useState('Tout');
    const [selectedTag, setSelectedTag] = useState('Tag');
    const [selectedPeriod, setSelectedPeriod] = useState('Toute période');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = builds.filter(build =>
            build.name.toLowerCase().includes(searchTerm) ||
            build.hash.toLowerCase().includes(searchTerm) ||
            build.version.toLowerCase().includes(searchTerm) ||
            build.date.toLowerCase().includes(searchTerm) ||
            build.type.toLowerCase().includes(searchTerm)
        );
        setFilteredBuilds(filtered);
        setCurrentPage(1); // Reset to the first page on search
    };

    const handleRepoTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRepoType(event.target.value);
        filterBuilds(event.target.value, selectedTag, selectedPeriod);
    };

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
        filterBuilds(selectedRepoType, event.target.value, selectedPeriod);
    };

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(event.target.value);
        filterBuilds(selectedRepoType, selectedTag, event.target.value);
    };

    const filterBuilds = (repoType: string, tag: string, period: string) => {
        const now = new Date();
        const filtered = builds.filter(build => {
            const buildDate = new Date(build.date);
            const matchesRepoType = repoType === 'Tout' || build.type === repoType;
            const matchesTag = tag === 'Tag' || build.tag === tag;
            let matchesPeriod = true;

            switch (period) {
                case 'Dernière heure':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 3600000;
                    break;
                case 'Dernier jour':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 86400000;
                    break;
                case 'Dernier mois':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 2592000000;
                    break;
                case 'Dernière année':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 31536000000;
                    break;
                default:
                    break;
            }

            return matchesRepoType && matchesTag && matchesPeriod;
        });
        setFilteredBuilds(filtered);
        setCurrentPage(1); // Reset to the first page on filter
    };

    const totalPages = Math.ceil(filteredBuilds.length / itemsPerPage);
    const displayedBuilds = filteredBuilds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="text-center mb-4">
                <h1 className="text-center font-semibold">SecureEduMail</h1>
                <p>Téléchargez les dernières versions ci-dessous</p>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div className="flex items-center space-x-4">
                        <select
                            onChange={handleRepoTypeChange}
                            value={selectedRepoType}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Tout">Tout</option>
                            <option value="SecureEduMail">SecureEduMail</option>
                            <option value="SecureEduRest">SecureEduRest</option>
                            <option value="SecureEduCrypt">SecureEduCrypt</option>
                        </select>
                        <select
                            onChange={handleTagChange}
                            value={selectedTag}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Tag">Tag</option>
                            <option value="Alpha">Alpha</option>
                            <option value="Beta">Beta</option>
                            <option value="Stable">Stable</option>
                            <option value="Patch">Patch</option>
                        </select>
                        <select
                            onChange={handlePeriodChange}
                            value={selectedPeriod}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Toute période">Toute période</option>
                            <option value="Dernière heure">Dernière heure</option>
                            <option value="Dernier jour">Dernier jour</option>
                            <option value="Dernier mois">Dernier mois</option>
                            <option value="Dernière année">Dernière année</option>
                        </select>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m1.5-2.5a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0Z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            onChange={handleSearch}
                            className="block p-2.5 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Rechercher"
                        />
                    </div>
                </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Nom</th>
                    <th scope="col" className="px-6 py-3">Hash</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Version</th>
                    <th scope="col" className="px-6 py-3">Type</th>
                    <th scope="col" className="px-6 py-3">Tag</th>
                    <th scope="col" className="px-6 py-3">Téléchargement</th>
                    <th scope="col" className="px-6 py-3">GitHub</th>
                </tr>
                </thead>
                <tbody>
                {displayedBuilds.map((build) => (
                    <tr key={build.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4"><span
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">#{build.id}</span>
                        </td>
                        <td className="px-6 py-4">{build.name}</td>
                        <td className="px-6 py-4">{build.hash}</td>
                        <td className="px-6 py-4">{build.date}</td>
                        <td className="px-6 py-4"><span
                            className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{build.version}</span>
                        </td>
                        <td className="px-6 py-4"><span
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">{build.type}</span>
                        </td>
                        <td className="px-6 py-4">{build.tag}</td>
                        <td className="px-6 py-4"><a href={build.downloadLink}
                                                     className="text-blue-600 hover:underline">Télécharger</a></td>
                        <td className="px-6 py-4"><a href={build.githubLink}
                                                     className="text-blue-600 hover:underline">GitHub</a></td>
                    </tr>

                ))}
                </tbody>
            </table>

            <nav className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4"
                 aria-label="Table navigation">
                <span
                    className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span
                    className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span
                    className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredBuilds.length)}</span> of <span
                    className="font-semibold text-gray-900 dark:text-white">{filteredBuilds.length}</span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DownloadPage;
